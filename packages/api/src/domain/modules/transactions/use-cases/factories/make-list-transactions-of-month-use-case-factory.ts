import makeTransactionsRepositoryFactory from '../../repositories/factories/make-transactions-repository-factory';
import ListTransactionsOfMonthUseCase from '../list-transactions-of-month-use-case';

const makeListTransactionsOfMonthUseCaseFactory = () =>
  new ListTransactionsOfMonthUseCase(makeTransactionsRepositoryFactory());

export default makeListTransactionsOfMonthUseCaseFactory;
