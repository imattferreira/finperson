import makeUsersRepositoryFactory from '../../repository/factories/make-users-repository-factory';
import AuthenticateUseCase from '../authenticate-use-case';

const makeAuthenticateUseCaseFactory = () =>
  new AuthenticateUseCase(makeUsersRepositoryFactory());

export default makeAuthenticateUseCaseFactory;
