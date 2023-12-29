import type { Domain } from '@/types/domain';
import UsersRepository from '../../repository/implementations/users-repository';
import AuthenticateHandler from './handler';
import AuthenticateUseCase from './use-case';

const authenticateFactory: Domain.Factory = () => {
  const handler = new AuthenticateHandler(
    new AuthenticateUseCase(new UsersRepository())
  );

  return (event) => handler.handleWith(event);
};

export default authenticateFactory;
