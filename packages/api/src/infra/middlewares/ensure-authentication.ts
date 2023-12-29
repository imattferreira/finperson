import UsersRepository from '../../domain/authentication/repository/implementations/users-repository';
import UnauthorizedException from '../../exceptions/unauthorized-exception';
import Either from '../../lib/either';
import { reject } from '../../lib/handler';
import { decodeToken, isValidToken } from '../../lib/token';
import type { Domain } from '../../types/domain';

const ensureAuthentication: Domain.Middleware = async (event: Domain.Event) => {
  const auth = event.headers['Authorization'];

  if (!auth || !auth.includes('Bearer ')) {
    return reject(
      Either.toLeft(
        new UnauthorizedException('authentication is missing')
      ).unwrap()
    );
  }

  const token = auth.split(' ').at(-1);

  if (!isValidToken(token)) {
    return reject(
      Either.toLeft(
        new UnauthorizedException('invalid authentication or is expired')
      ).unwrap()
    );
  }

  const payload = decodeToken(token);
  const usersRepository = new UsersRepository();

  const user = await usersRepository.findById(payload.userId);

  if (!user) {
    return reject(
      Either.toLeft(
        new UnauthorizedException('invalid authentication or is expired')
      ).unwrap()
    );
  }

  event.ctx = { user: { userId: payload.userId } };
};

export default ensureAuthentication;
