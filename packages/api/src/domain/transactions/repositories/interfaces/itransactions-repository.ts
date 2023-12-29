import Transaction from '../../entities/transaction';

interface ITransactionsRepository {
  create(data: Transaction): Promise<void>;
}

export default ITransactionsRepository;
