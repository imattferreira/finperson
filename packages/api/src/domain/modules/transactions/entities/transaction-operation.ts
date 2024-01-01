export const AvailableOperationsEnum = {
  INCOME: 'INCOME',
  WITHDRAW: 'WITHDRAW'
} as const;

type AvailableOperations = InlineEnum<typeof AvailableOperationsEnum>;

class TransactionOperation {
  #value: AvailableOperations;

  constructor(value: AvailableOperations) {
    this.#value = value;
  }

  static create(value: AvailableOperations): TransactionOperation {
    return new TransactionOperation(value);
  }

  public toString(): AvailableOperations {
    return this.#value;
  }
}

export default TransactionOperation;
