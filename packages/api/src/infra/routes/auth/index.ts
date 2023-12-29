import authenticateFactory from '@/domain/authentication/cases/authenticate';

// TODO treat server errors
const POST = authenticateFactory();

export { POST };
