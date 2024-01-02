import makeTransactionsRepositoryFactory from '../../repositories/factories/make-transactions-repository-factory';
import DeleteTransactionUseCase from '../delete-transaction-use-case';

const makeDeleteTransactionUseCaseFactory = () =>
  new DeleteTransactionUseCase(makeTransactionsRepositoryFactory());

export default makeDeleteTransactionUseCaseFactory;
