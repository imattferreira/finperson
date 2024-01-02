// TODO boundary-contexts
import AbstractUseCase from '@/core/abstract-use-case';
import ConflictException from '@/exceptions/conflict-exception';
import Either, { Left, Right } from '@/lib/either';
import User from '@/modules/users/entities/user';
import IUsersRepository from '@/modules/users/repository/interfaces/iusers-repository';

import { type CreateUserReceivedFields } from '../dtos/create-user-dtos';
import PasswordHash from '../entities/password-hash';

interface Input {
  fields: CreateUserReceivedFields;
}

type Output = null;

class CreateUserUseCase implements AbstractUseCase<Input, Output> {
  constructor(private readonly usersRepository: IUsersRepository) {}
  async execute({ fields }: Input): Promise<Left | Right<Output>> {
    const userAlreadyExists = await this.usersRepository.findByEmail(
      fields.email
    );

    if (userAlreadyExists) {
      return Either.toLeft(new ConflictException('[email] already exists'));
    }

    const user = User.create({
      name: fields.name,
      email: fields.email,
      password: PasswordHash.create(fields.password)
    });

    await this.usersRepository.create(user);

    return Either.toRight(null);
  }
}

export default CreateUserUseCase;
