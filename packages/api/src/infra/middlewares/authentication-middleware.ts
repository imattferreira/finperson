import UnauthorizedException from '@/exceptions/unauthorized-exception';
import AbstractMiddleware from '@/infra/shared/abstract-middleware';
import Either from '@/lib/either';
import { reject } from '@/lib/handler';
import { decodeToken, isTokenValid } from '@/lib/token';
import type { Domain } from '@/types/domain';
import type { TokenPayload } from '@/types/token';

class AuthenticationMiddleware implements AbstractMiddleware {
  async intermediateWith(
    event: Domain.Event
  ): Promise<Domain.Output | Domain.EventContext> {
    const auth = event.headers['Authorization'];

    if (!auth || !auth.includes('Bearer ')) {
      return reject(
        Either.toLeft(
          new UnauthorizedException('authentication is missing')
        ).unwrap()
      );
    }

    const token = auth.split(' ').at(-1);

    if (!isTokenValid(token)) {
      return reject(
        Either.toLeft(
          new UnauthorizedException('invalid authentication or is expired')
        ).unwrap()
      );
    }

    const payload = decodeToken<TokenPayload>(token);

    return { user: { userId: payload.userId } };
  }
}

export default AuthenticationMiddleware;
