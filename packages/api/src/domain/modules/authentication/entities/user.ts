import Entity from '@/core/entities/entity';
import Timestamp from '@/core/entities/timestamp';
import UniqueEntityID from '@/core/entities/unique-entity-id';

import PasswordHash from './password-hash';

interface UserStored {
  id?: UniqueEntityID;
  name: string;
  email: string;
  password: PasswordHash;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

class User extends Entity<Omit<UserStored, 'id' | 'createdAt' | 'updatedAt'>> {
  static create({
    id,
    email,
    name,
    password,
    createdAt,
    updatedAt
  }: UserStored): User {
    // TODO validate if email is valid
    return new User({ email, name, password }, { id, createdAt, updatedAt });
  }

  get name(): string {
    return this.stored.name;
  }

  get email(): string {
    return this.stored.email;
  }

  get password(): PasswordHash {
    return this.stored.password;
  }

  set password(password: PasswordHash) {
    this.stored.password = password;

    this.touch();
  }
}

export default User;
