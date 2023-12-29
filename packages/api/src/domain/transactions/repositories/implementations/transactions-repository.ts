/* eslint-disable @typescript-eslint/no-unused-vars */
import Transaction from '../../entities/transaction';
import ITransactionsRepository from '../interfaces/itransactions-repository';

class TransactionsRepository implements ITransactionsRepository {
  create(data: Transaction): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export default TransactionsRepository;
