class User {
  #name: string;
  #email: string;
  #password: string;

  constructor({
    name,
    email,
    password
  }: {
    name: string;
    email: string;
    password: string;
  }) {
    this.#name = name;
    this.#email = email;
    this.#password = password;
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
