import makeUsersRepositoryFactory from '@/modules/users/repository/factories/make-users-repository-factory';
import makeCryptoServiceFactory from '@/services/factories/make-crypto-service-factory';

import AuthenticateUseCase from '../authenticate-use-case';

const makeAuthenticateUseCaseFactory = () =>
  new AuthenticateUseCase(
    makeUsersRepositoryFactory(),
    makeCryptoServiceFactory()
  );

export default makeAuthenticateUseCaseFactory;
