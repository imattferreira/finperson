import type { Domain } from '@/types/domain';

import CreateTransactionHandler from '../handlers/create-transaction-handler';
import makeCreateTransactionUseCaseFactory from '../use-cases/factories/make-create-transaction-use-case-factory';

const makeCreateTransactionFactory: Domain.Factory = () => {
  const handler = new CreateTransactionHandler(
    makeCreateTransactionUseCaseFactory()
  );

  return (event) => handler.handleWith(event);
};

export default makeCreateTransactionFactory;
