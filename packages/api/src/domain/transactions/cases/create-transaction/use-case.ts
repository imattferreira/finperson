import Either, { Left, Right } from '../../../../lib/either';
import Transaction from '../../entities/transaction';
import TransactionTypes from '../../entities/transaction-types';
import ITransactionsRepository from '../../repositories/interfaces/itransactions-repository';
import { CreateTransactionReceivedFields } from './schema';

class CreateTransactionUseCase {
  constructor(
    private readonly transactionsRepository: ITransactionsRepository
  ) {}

  async execute(
    fields: CreateTransactionReceivedFields
  ): Promise<Left | Right<Obj>> {
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
