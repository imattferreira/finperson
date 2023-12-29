import { type Domain } from '../../../../types/domain';
import UsersRepository from '../../../authentication/repository/implementations/users-repository';
import CreateUserHandler from './handler';
import CreateUserUseCase from './use-case';

const createUserFactory: Domain.Factory = () => {
  const handler = new CreateUserHandler(
    new CreateUserUseCase(new UsersRepository())
  );

  return (event) => handler.handleWith(event);
};

export default createUserFactory;
