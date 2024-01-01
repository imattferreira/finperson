import makeTransactionsRepositoryFactory from '../../repositories/factories/make-transactions-repository-factory';
import CreateTransactionUseCase from '../create-transaction-use-case';

const makeCreateTransactionUseCaseFactory = () =>
  new CreateTransactionUseCase(makeTransactionsRepositoryFactory());

export default makeCreateTransactionUseCaseFactory;
