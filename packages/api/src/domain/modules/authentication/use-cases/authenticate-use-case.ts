import AbstractUseCase from '@/core/abstract-use-case';
import InvalidFormatException from '@/exceptions/invalid-format-exception';
import Either, { Left, Right } from '@/lib/either';
import PasswordHash from '@/modules/users/entities/password-hash';
import IUsersRepository from '@/modules/users/repository/interfaces/iusers-repository';
import ICryptoService from '@/services/interfaces/icrypto-service';
import type { TokenPayload } from '@/types/token';

import type { AuthenticateReceivedFields } from '../dtos/authenticate-dtos';

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
  constructor(
    private readonly usersRepository: IUsersRepository,
    private readonly cryptoService: ICryptoService
  ) {}

  async execute({ fields }: Input): Promise<Left | Right<Output>> {
    const user = await this.usersRepository.findByEmail(fields.email);

    if (!user || !user.password.equals(fields.password)) {
      return Either.toLeft(
        new InvalidFormatException('invalid [email] or [password]')
      );
    }

    user.password = PasswordHash.create(fields.password);

    await this.usersRepository.update(user);

    const token = this.cryptoService.encode<TokenPayload>({
      userId: user.id.toString()
    });

    return Either.toRight({
      user: {
        email: user.email
      },
      token
    });
  }
}

export default AuthenticateUseCase;
