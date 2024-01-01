import AbstractUseCase from '@/domain/shared/abstract-use-case';
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
interface Output {}

class CreateTransactionUseCase implements AbstractUseCase<Input, Output> {
  constructor(
    private readonly transactionsRepository: ITransactionsRepository
  ) {}
  async execute({ fields }: Input): Promise<Left | Right<Output>> {
    if (fields.recurrence) {
      // validate recurrence date
      // verify if transaction name already exists in recurrence
      // verify if each is valid when recurrence is MONTH
      // verify if each is valid when recurrence is YEAR
    }

    if (fields.future) {
      // validate future date
    }

    // verify if transaction name already exists in this month

    if (fields.operation === 'WITHDRAW') {
      // verify if user as money to withdraw
    }

    const transaction = Transaction.create({
      category: TransactionCategory.create(fields.category),
      operation: TransactionOperation.create(fields.operation),
      recurrence: fields.recurrence
        ? TransactionRecurrence.create(fields.recurrence)
        : null,
      value: fields.value
    });

    return Either.toRight(transaction);
  }
}

export default CreateTransactionUseCase;
