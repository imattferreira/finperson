import makeDeleteTransactionFactory from '@/domain/modules/transactions/factories/make-delete-transaction-factory';
import middlewareAdapter from '@/infra/adapters/middlewareAdapter';
import routeAdapter from '@/infra/adapters/routeAdapter';
import makeAuthenticationMiddlewareFactory from '@/infra/middlewares/factories/make-authentication-middleware-factory';

const DELETE = routeAdapter({
  middlewares: [middlewareAdapter(makeAuthenticationMiddlewareFactory())],
  handler: makeDeleteTransactionFactory()
});

export { DELETE };
