import routeAdapter from '@/infra/adapters/routeAdapter';
import makeAuthenticateFactory from '@/modules/authentication/factories/make-authenticate-factory';

const POST = routeAdapter({
  handler: makeAuthenticateFactory()
});

export { POST };
