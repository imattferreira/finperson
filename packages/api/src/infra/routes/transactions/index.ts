import middleware from '@/infra/middlewares';
import makeAuthenticationMiddlewareFactory from '@/infra/middlewares/factories/make-authentication-middleware-factory';
import createTransactionFactory from '@/modules/transactions/cases/create-transaction';

const POST = middleware(
  [makeAuthenticationMiddlewareFactory()],
  createTransactionFactory()
);

export { POST };
