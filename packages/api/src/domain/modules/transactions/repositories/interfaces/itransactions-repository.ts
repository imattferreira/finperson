import Transaction from '../../entities/transaction';

interface ITransactionsRepository {
  create(data: Transaction): Promise<void>;
  findByName(name: string): Promise<Nullish<Transaction>>;
}

export default ITransactionsRepository;
