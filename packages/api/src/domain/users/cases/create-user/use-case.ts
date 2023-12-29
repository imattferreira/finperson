import ConflictException from '../../../../exceptions/conflict-exception';
import Either, { Left, Right } from '../../../../lib/either';
// TODO boundary-contexts
import User, { encryptPassword } from '../../../authentication/entities/user';
// TODO boundary-contexts
import IUsersRepository from '../../../authentication/repository/interfaces/iusers-repository';
import { CreateUserReceivedFields } from './schemas';

class CreateUserUseCase {
  constructor(private readonly usersRepository: IUsersRepository) {}

  async execute(fields: CreateUserReceivedFields): Promise<Left | Right<null>> {
    const userAlreadyExists = await this.usersRepository.findByEmail(
      fields.email
    );

    if (userAlreadyExists) {
      return Either.toLeft(new ConflictException('[email] already exists'));
    }

    const user = new User({
      name: fields.name,
      email: fields.email,
      password: encryptPassword(fields.password)
    });

    await this.usersRepository.create(user);

    return Either.toRight(null);
  }
}

export default CreateUserUseCase;
