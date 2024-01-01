import UsersRepository from '../implementations/users-repository';

const makeUsersRepositoryFactory = () => new UsersRepository();

export default makeUsersRepositoryFactory;
