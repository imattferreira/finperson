import { randomUUID } from 'node:crypto';

class UniqueEntityID {
  #value: string;

  constructor(value: string = randomUUID()) {
    this.#value = value;
  }

  static create(value?: string): UniqueEntityID {
    return new UniqueEntityID(value);
  }

  public toString(): string {
    return this.#value;
  }

  public equals(id: string): boolean {
    return this.#value === id;
  }
}

export default UniqueEntityID;
