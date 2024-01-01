import makeUsersRepositoryFactory from '@/modules/authentication/repository/factories/make-users-repository-factory';

import CreateUserUseCase from '../create-user-use-case';

const makeCreateUserUseCaseFactory = () =>
  new CreateUserUseCase(makeUsersRepositoryFactory());

export default makeCreateUserUseCaseFactory;
