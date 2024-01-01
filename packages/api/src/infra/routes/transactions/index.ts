import middleware from '@/infra/middlewares';
import makeAuthenticationMiddlewareFactory from '@/infra/middlewares/factories/make-authentication-middleware-factory';
import makeCreateTransactionFactory from '@/modules/transactions/factories/make-create-transaction-factory';

const POST = middleware(
  [makeAuthenticationMiddlewareFactory()],
  makeCreateTransactionFactory()
);

export { POST };
