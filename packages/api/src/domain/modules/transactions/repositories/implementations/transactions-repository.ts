/* eslint-disable @typescript-eslint/no-unused-vars */
import Transaction from '../../entities/transaction';
import ITransactionsRepository from '../interfaces/itransactions-repository';

class TransactionsRepository implements ITransactionsRepository {
  create(data: Transaction): Promise<void> {
    throw new Error('Method not implemented.');
  }

  findByName(name: string): Promise<Nullish<Transaction>> {
    throw new Error('Method not implemented.');
  }

  findAll(data: {
    filters?: { year: number; month: number } | undefined;
  }): Promise<Transaction[]> {
    throw new Error('Method not implemented.');
  }

  delete(transactionId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export default TransactionsRepository;
