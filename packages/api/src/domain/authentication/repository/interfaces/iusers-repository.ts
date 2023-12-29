import User from '../../entities/user';

interface IUsersRepository {
  create(user: User): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
  update(user: User): Promise<User>;
}

export default IUsersRepository;
