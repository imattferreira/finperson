class User {
  #email: string;
  #password: string;

  constructor({ email, password }: { email: string; password: string }) {
    this.#password = password;
    this.#email = email;
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
