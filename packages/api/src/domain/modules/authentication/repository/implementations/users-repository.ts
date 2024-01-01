/* eslint-disable @typescript-eslint/no-unused-vars */
import User from '../../../users/entities/user';
import IUsersRepository from '../interfaces/iusers-repository';

class UsersRepository implements IUsersRepository {
  create(user: User): Promise<void> {
    throw new Error('Method not implemented.');
  }

  findByEmail(email: string): Promise<Nullish<User>> {
    throw new Error('Method not implemented.');
  }

  update(user: User): Promise<User> {
    throw new Error('Method not implemented.');
  }
}

export default UsersRepository;
