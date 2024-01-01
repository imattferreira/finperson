import type { Domain } from '@/types/domain';

import AuthenticationMiddleware from '../authentication-middleware';

const makeAuthenticationMiddlewareFactory: Domain.Factory = () => {
  const middleware = new AuthenticationMiddleware();

  return (event) => middleware.intermediateWith(event);
};

export default makeAuthenticationMiddlewareFactory;
