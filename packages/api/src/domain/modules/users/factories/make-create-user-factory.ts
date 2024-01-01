import type { Domain } from '@/types/domain';

import CreateUserHandler from '../handlers/create-user-handler';
import makeCreateUserUseCaseFactory from '../use-cases/factories/make-create-user-use-case-factory';

const createUserFactory: Domain.Factory = () => {
  const handler = new CreateUserHandler(makeCreateUserUseCaseFactory());

  return (event) => handler.handleWith(event);
};

export default createUserFactory;
