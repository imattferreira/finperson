import makeParserServiceFactory from '@/services/factories/make-parser-service-factory';
import * as Domain from '@/types/domain';

import AuthenticateHandler from '../handlers/authenticate-handler';
import makeAuthenticateUseCaseFactory from '../use-cases/factories/make-authenticate-use-case-factory';

const makeAuthenticateFactory: Domain.Factory = () => {
  const handler = new AuthenticateHandler(
    makeAuthenticateUseCaseFactory(),
    makeParserServiceFactory()
  );

  return (event) => handler.handleWith(event);
};

export default makeAuthenticateFactory;
