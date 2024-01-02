import AbstractUseCase from '@/core/abstract-use-case';
import Timestamp from '@/domain/shared/entities/timestamp';
import InvalidFormatException from '@/exceptions/invalid-format-exception';
import { diffInDays, diffInMonths, now } from '@/lib/date';
import Either, { Left, Right } from '@/lib/either';

import { CreateTransactionReceivedFields } from '../dtos/create-transaction-dtos';
import Transaction from '../entities/transaction';
import TransactionOperation from '../entities/transaction-operation';
import TransactionRecurrence from '../entities/transaction-recurrence-types';
import TransactionCategory from '../entities/transactions-categories';
import ITransactionsRepository from '../repositories/interfaces/itransactions-repository';

interface Input {
  fields: CreateTransactionReceivedFields;
}

// TODO padronize output returns
interface Output {
  transaction: Transaction;
}

const MONTHS_PER_YEAR_LENGTH = 12;
const MAX_ALLOWED_YEAR_FOR_INTERVAL = 1;

class CreateTransactionUseCase implements AbstractUseCase<Input, Output> {
  constructor(
    private readonly transactionsRepository: ITransactionsRepository
  ) {}
  async execute({ fields }: Input): Promise<Left | Right<Output>> {
    if (fields.recurrence) {
      if (
        fields.recurrence.recurrence === 'MONTH' &&
        fields.recurrence.interval > MONTHS_PER_YEAR_LENGTH
      ) {
        return Either.toLeft(
          new InvalidFormatException(
            '[format.interval] should not be bigger than 12 months'
          )
        );
      }

      if (
        fields.recurrence.recurrence === 'YEAR' &&
        fields.recurrence.interval > MAX_ALLOWED_YEAR_FOR_INTERVAL
      ) {
        return Either.toLeft(
          new InvalidFormatException(
            '[format.interval] should not be bigger than 1 year'
          )
        );
      }
    }

    if (fields.future) {
      if (diffInDays(fields.future, now()) < 0) {
        Either.toLeft(
          new InvalidFormatException('[future] should be bigger than now')
        );
      }
    }

    const transactionAlreadyExists =
      await this.transactionsRepository.findByName(fields.name);

    if (transactionAlreadyExists) {
      const isStoredRecurrenceTransaction = transactionAlreadyExists.recurrence;
      const isStoredTransactionFromCurrMonth =
        diffInMonths(transactionAlreadyExists.createdAt.toString(), now()) ===
        0;

      if (isStoredRecurrenceTransaction || isStoredTransactionFromCurrMonth) {
        return Either.toLeft(
          new InvalidFormatException(
            '[name] already exists in a recurrence transaction'
          )
        );
      }
    }

    if (fields.operation === 'WITHDRAW') {
      // verify if user as money to withdraw
    }

    const transaction = Transaction.create({
      category: TransactionCategory.create(fields.category),
      operation: TransactionOperation.create(fields.operation),
      recurrence: fields.recurrence
        ? TransactionRecurrence.create(fields.recurrence)
        : null,
      value: fields.value,
      future: fields.future ? new Timestamp(fields.future) : null
    });

    return Either.toRight({ transaction });
  }
}

export default CreateTransactionUseCase;
