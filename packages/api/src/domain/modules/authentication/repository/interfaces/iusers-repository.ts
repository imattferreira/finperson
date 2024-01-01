import User from '../../../users/entities/user';

interface IUsersRepository {
  create(user: User): Promise<void>;
  findByEmail(email: string): Promise<Nullish<User>>;
  update(user: User): Promise<User>;
}

export default IUsersRepository;
