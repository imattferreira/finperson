import Entity, { type EntityRequiredFields } from '@/core/entities/entity';

import PasswordHash from './password-hash';

interface UserFields extends Partial<EntityRequiredFields> {
  name: string;
  email: string;
  password: PasswordHash;
}

class User extends Entity<Omit<UserFields, 'id' | 'createdAt' | 'updatedAt'>> {
  static create({
    id,
    email,
    name,
    password,
    createdAt,
    updatedAt
  }: UserFields): User {
    return new User({ email, name, password }, { id, createdAt, updatedAt });
  }

  get name(): string {
    return this.fields.name;
  }

  get email(): string {
    return this.fields.email;
  }

  get password(): PasswordHash {
    return this.fields.password;
  }

  set password(password: PasswordHash) {
    this.fields.password = password;

    this.touch();
  }
}

export default User;
