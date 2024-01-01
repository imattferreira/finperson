import type { Domain } from '@/types/domain';

import AuthenticateHandler from '../handlers/authenticate-handler';
import makeAuthenticateUseCaseFactory from '../use-cases/factories/make-authenticate-use-case-factory';

const makeAuthenticateFactory: Domain.Factory = () => {
  const handler = new AuthenticateHandler(makeAuthenticateUseCaseFactory());

  return (event) => handler.handleWith(event);
};

export default makeAuthenticateFactory;
