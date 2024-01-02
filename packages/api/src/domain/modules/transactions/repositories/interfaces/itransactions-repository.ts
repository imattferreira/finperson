import Transaction from '../../entities/transaction';

interface ITransactionsRepository {
  create(data: Transaction): Promise<void>;
  findByName(name: string): Promise<Nullish<Transaction>>;
  findAll(data: {
    filters?: { year: number; month: number };
  }): Promise<Transaction[]>;
}

export default ITransactionsRepository;
