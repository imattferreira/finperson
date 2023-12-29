import InvalidFormatException from '../../../../exceptions/invalid-format-exception';
import Either, { Left, Right } from '../../../../lib/either';
import { comparePassword, encryptPassword } from '../../entities/user';
import IUsersRepository from '../../repository/interfaces/iusers-repository';
import type { AuthenticateReceivedFields } from './schemas';

class AuthenticateUseCase {
  constructor(private readonly usersRepository: IUsersRepository) {}

  async execute(
    fields: AuthenticateReceivedFields
  ): Promise<Left | Right<Obj>> {
    const user = await this.usersRepository.findByEmail(fields.email);

    if (!user) {
      return Either.toLeft(
        new InvalidFormatException('invalid [email] or [password]')
      );
    }

    if (!comparePassword(user.password, fields.password)) {
      return Either.toLeft(
        new InvalidFormatException('invalid [email] or [password]')
      );
    }

    user.password = encryptPassword(fields.password);

    await this.usersRepository.update(user);

    // TODO
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
