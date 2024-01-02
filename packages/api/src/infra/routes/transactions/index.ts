import makeListTransactionsOfMonthFactory from '@/domain/modules/transactions/factories/make-list-transactions-of-month-factory';
import middlewareAdapter from '@/infra/adapters/middlewareAdapter';
import routeAdapter from '@/infra/adapters/routeAdapter';
import makeAuthenticationMiddlewareFactory from '@/infra/middlewares/factories/make-authentication-middleware-factory';
import makeCreateTransactionFactory from '@/modules/transactions/factories/make-create-transaction-factory';

const POST = routeAdapter({
  middlewares: [middlewareAdapter(makeAuthenticationMiddlewareFactory())],
  handler: makeCreateTransactionFactory()
});

const GET = routeAdapter({
  middlewares: [middlewareAdapter(makeAuthenticationMiddlewareFactory())],
  handler: makeListTransactionsOfMonthFactory()
});

export { GET, POST };
