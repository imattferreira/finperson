import makeAuthenticateFactory from '@/domain/authentication/factories/make-authenticate-factory';

// TODO treat server errors
const POST = makeAuthenticateFactory();

export { POST };
