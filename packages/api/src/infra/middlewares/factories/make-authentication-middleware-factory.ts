import makeCryptoServiceFactory from '@/services/factories/make-crypto-service-factory';
import * as Domain from '@/types/domain';

import AuthenticationMiddleware from '../authentication-middleware';

const makeAuthenticationMiddlewareFactory: Domain.MiddlewareFactory = () => {
  const middleware = new AuthenticationMiddleware(makeCryptoServiceFactory());

  return (event) => middleware.intermediateWith(event);
};

export default makeAuthenticationMiddlewareFactory;
