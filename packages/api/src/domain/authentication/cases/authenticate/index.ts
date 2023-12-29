import { type Domain } from '../../../../types/domain';
import AuthenticateHandler from './handler';
import AuthenticateUseCase from './use-case';

const authenticateFactory: Domain.Factory = () => {
  const handler = new AuthenticateHandler(new AuthenticateUseCase());

  return (event) => handler.handleWith(event);
};

export default authenticateFactory;
