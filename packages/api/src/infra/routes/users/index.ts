import makeCreateUserFactory from '@/domain/modules/users/factories/make-create-user-factory';
import routeAdapter from '@/infra/adapters/routeAdapter';

const POST = routeAdapter({
  handler: makeCreateUserFactory()
});

export { POST };
