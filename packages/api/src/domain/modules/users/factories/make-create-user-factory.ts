import makeParserServiceFactory from '@/services/factories/make-parser-service-factory';
import * as Domain from '@/types/domain';

import CreateUserHandler from '../handlers/create-user-handler';
import makeCreateUserUseCaseFactory from '../use-cases/factories/make-create-user-use-case-factory';

const createUserFactory: Domain.Factory = () => {
  const handler = new CreateUserHandler(
    makeCreateUserUseCaseFactory(),
    makeParserServiceFactory()
  );

  return (event) => handler.handleWith(event);
};

export default createUserFactory;
