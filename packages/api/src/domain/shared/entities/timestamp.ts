class Timestamp {
  #value: string;

  constructor(value = new Date().toISOString()) {
    this.#value = value ?? new Date().toUTCString();
  }

  static create(value = new Date().toISOString()): Timestamp {
    return new Timestamp(value);
  }

  public toString(): string {
    return this.#value;
  }
}

export default Timestamp;
