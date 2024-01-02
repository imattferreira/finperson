import routeAdapter from '@/infra/adapters/routeAdapter';
import makeCreateUserFactory from '@/modules/users/factories/make-create-user-factory';

const POST = routeAdapter({
  handler: makeCreateUserFactory()
});

export { POST };
