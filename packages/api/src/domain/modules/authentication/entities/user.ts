import { randomUUID } from 'node:crypto';

class User {
  #id: string;
  #name: string;
  #email: string;
  #password: string;

  constructor({
    id,
    name,
    email,
    password
  }: {
    id?: string;
    name: string;
    email: string;
    password: string;
  }) {
    this.#id = id ? id : randomUUID();
    this.#name = name;
    this.#email = email;
    this.#password = password;
  }

  get id(): string {
    return this.#id;
  }

  get name(): string {
    return this.#name;
  }

  get email(): string {
    return this.#email;
  }

  get password(): string {
    return this.#password;
  }

  set password(data: string) {
    this.#password = data;
  }
}

export function comparePassword(password: string, _password: string) {
  return false;
}

export function encryptPassword(password: string) {
  return '';
}

export default User;
