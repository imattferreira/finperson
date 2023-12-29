import InvalidFormatException from '../../../../exceptions/invalid-format-exception';
import Either, { Left, Right } from '../../../../lib/either';
import { comparePassword, encryptPassword } from '../../entities/user';
import UsersRepository from '../../repository/interfaces/users-repository';
import type { AuthenticateReceivedFields } from './schemas';

class AuthenticateUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(
    received: AuthenticateReceivedFields
  ): Promise<Left | Right<Record<string, unknown>>> {
    const user = await this.usersRepository.findByEmail(
      received.required.email
    );

    if (!user) {
      return Either.toLeft(
        new InvalidFormatException('invalid [email] or [password]')
      );
    }

    if (!comparePassword(user.password, received.required.password)) {
      return Either.toLeft(
        new InvalidFormatException('invalid [email] or [password]')
      );
    }

    user.password = encryptPassword(received.required.password);

    await this.usersRepository.update(user);

    const token = '';

    return Either.toRight({
      user: {
        email: user.email
      },
      token
    });
  }
}

export default AuthenticateUseCase;
