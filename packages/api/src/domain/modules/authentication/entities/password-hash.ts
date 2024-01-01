import bcrypt from 'bcrypt';

class PasswordHash {
  #value: string;
  #salt = 10;

  constructor(plainText: string, isHashed = false) {
    // TODO validate if password is valid
    this.#value = isHashed ? plainText : this.hash(plainText);
  }

  static create(plainText: string, isHashed?: boolean): PasswordHash {
    return new PasswordHash(plainText, isHashed);
  }

  private hash(plainText: string): string {
    return bcrypt.hashSync(plainText, this.#salt);
  }

  public equals(plainText: string): boolean {
    return bcrypt.compareSync(plainText, this.#value);
  }
}

export default PasswordHash;
