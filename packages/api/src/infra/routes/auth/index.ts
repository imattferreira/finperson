import makeAuthenticateFactory from '@/domain/modules/authentication/factories/make-authenticate-factory';

// TODO treat server errors
const POST = makeAuthenticateFactory();

export { POST };
