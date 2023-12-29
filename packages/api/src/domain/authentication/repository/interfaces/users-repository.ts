import User from '../../entities/user';

interface UsersRepository {
  findByEmail(email: string): Promise<User | null>;
  update(user: User): Promise<User>;
}

export default UsersRepository;
