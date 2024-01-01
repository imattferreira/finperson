export const AvailableCategoriesEnum = {
  CLOTHES: 'CLOTHES',
  EDUCATION: 'EDUCATION',
  FOOD: 'FOOD',
  FUN: 'FUN',
  HEALTH: 'HEALTH',
  TRANSPORT: 'TRANSPORT'
} as const;

type AvailableCategories = InlineEnum<typeof AvailableCategoriesEnum>;

class TransactionCategory {
  #value: AvailableCategories;

  constructor(value: AvailableCategories) {
    this.#value = value;
  }

  static create(value: AvailableCategories): TransactionCategory {
    return new TransactionCategory(value);
  }

  public toString(): AvailableCategories {
    return this.#value;
  }
}

export default TransactionCategory;
