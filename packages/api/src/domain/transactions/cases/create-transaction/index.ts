import type { Domain } from '@/types/domain';
import TransactionsRepository from '../../repositories/implementations/transactions-repository';
import CreateTransactionHandler from './handler';
import CreateTransactionUseCase from './use-case';

const createTransactionFactory: Domain.Factory = () => {
  const handler = new CreateTransactionHandler(
    new CreateTransactionUseCase(new TransactionsRepository())
  );

  return (event) => handler.handleWith(event);
};

export default createTransactionFactory;
