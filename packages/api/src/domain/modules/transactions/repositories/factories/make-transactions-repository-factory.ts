import TransactionsRepository from '../implementations/transactions-repository';

const makeTransactionsRepositoryFactory = () => new TransactionsRepository();

export default makeTransactionsRepositoryFactory;
