import * as Domain from '@/types/domain';

import DeleteTransactionHandler from '../handlers/delete-transaction-handler';
import makeDeleteTransactionUseCaseFactory from '../use-cases/factories/make-delete-transaction-use-case-factory';

const makeDeleteTransactionFactory: Domain.Factory = () => {
  const handler = new DeleteTransactionHandler(
    makeDeleteTransactionUseCaseFactory()
  );

  return (event) => handler.handleWith(event);
};

export default makeDeleteTransactionFactory;
