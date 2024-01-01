import Timestamp from './timestamp';
import UniqueEntityID from './unique-entity-id';

interface EntityStored {
  id: UniqueEntityID;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

class Entity<Stored> {
  #id: UniqueEntityID;
  #createdAt: Timestamp;
  #updatedAt: Timestamp;
  protected stored: Required<Stored>;

  constructor(
    data: Required<Stored>,
    {
      id = new UniqueEntityID(),
      createdAt = new Timestamp(),
      updatedAt = new Timestamp()
    }: Partial<EntityStored>
  ) {
    this.stored = data;
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
