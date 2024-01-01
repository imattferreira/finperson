import AbstractUseCase from '@/domain/shared/abstract-use-case';
import InvalidFormatException from '@/exceptions/invalid-format-exception';
import Either, { Left, Right } from '@/lib/either';
import { createToken } from '@/lib/token';
import { TokenPayload } from '@/types/token';

import type { AuthenticateReceivedFields } from '../dtos/authenticate-dtos';
import { comparePassword, encryptPassword } from '../entities/user';
import IUsersRepository from '../repository/interfaces/iusers-repository';

interface Input {
  fields: AuthenticateReceivedFields;
}

interface Output {
  user: {
    email: string;
  };
  token: string;
}

class AuthenticateUseCase implements AbstractUseCase<Input, Output> {
  constructor(private readonly usersRepository: IUsersRepository) {}
  async execute({ fields }: Input): Promise<Left | Right<Output>> {
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

    const token = createToken<TokenPayload>({ userId: user.id });

    return Either.toRight({
      user: {
        email: user.email
      },
      token
    });
  }
}

export default AuthenticateUseCase;
