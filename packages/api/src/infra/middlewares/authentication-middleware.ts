import UnauthorizedException from '@/exceptions/unauthorized-exception';
import AbstractMiddleware from '@/infra/shared/abstract-middleware';
import Either from '@/lib/either';
import { reject } from '@/lib/handler';
import ICryptoService from '@/services/interfaces/icrypto-service';
import * as Domain from '@/types/domain';
import type { TokenPayload } from '@/types/token';

class AuthenticationMiddleware implements AbstractMiddleware {
  constructor(private readonly cryptoService: ICryptoService) {}

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

    const token = auth.split(' ').at(-1) as string;

    if (!this.cryptoService.validate(token)) {
      return reject(
        Either.toLeft(
          new UnauthorizedException('invalid authentication or is expired')
        ).unwrap()
      );
    }

    const payload = this.cryptoService.decode<TokenPayload>(token);

    return { user: { userId: payload.userId } };
  }
}

export default AuthenticationMiddleware;
