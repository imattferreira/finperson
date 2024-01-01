import Timestamp from './timestamp';
import UniqueEntityID from './unique-entity-id';

export interface EntityRequiredFields {
  id: UniqueEntityID;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

class Entity<Stored> {
  #id: UniqueEntityID;
  #createdAt: Timestamp;
  #updatedAt: Timestamp;
  protected fields: Required<Stored>;

  constructor(
    data: Required<Stored>,
    {
      id = new UniqueEntityID(),
      createdAt = new Timestamp(),
      updatedAt = new Timestamp()
    }: Partial<EntityRequiredFields>
  ) {
    this.fields = data;
    this.#id = id;
    this.#createdAt = createdAt;
    this.#updatedAt = updatedAt;
  }

  get id(): UniqueEntityID {
    return this.#id;
  }

  get createdAt(): Timestamp {
    return this.#createdAt;
  }

  get updatedAt(): Timestamp {
    return this.#updatedAt;
  }

  protected touch(): void {
    this.#updatedAt = new Timestamp();
  }
}

export default Entity;
