import AbstractUseCase from '@/domain/shared/abstract-use-case';
import Either, { Left, Right } from '@/lib/either';

import { CreateTransactionReceivedFields } from '../dtos/create-transaction-dtos';
import Transaction from '../entities/transaction';
import TransactionTypes from '../entities/transaction-types';
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
    }

    if (fields.future) {
      // validate future date
    }

    // verify if transaction name already exists in this month

    if (fields.type === TransactionTypes.WITHDRAW) {
      // verify if user as money to withdraw
    }

    const transaction = new Transaction();

    return Either.toRight(transaction);
  }
}

export default CreateTransactionUseCase;
