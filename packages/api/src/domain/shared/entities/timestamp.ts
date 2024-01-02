class Timestamp {
  #value: string;

  constructor(value = new Date().toISOString()) {
    this.#value = value;
  }

  static create(value?: string): Timestamp {
    return new Timestamp(value);
  }

  public toString(): string {
    return this.#value;
  }
}

export default Timestamp;
