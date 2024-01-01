import Entity, { type EntityRequiredFields } from '@/core/entities/entity';
import { floatToInt, intToFloat } from '@/lib/number';

import TransactionOperation from './transaction-operation';
import TransactionRecurrence from './transaction-recurrence-types';
import TransactionCategory from './transactions-categories';

interface TransactionFields extends Partial<EntityRequiredFields> {
  recurrence?: TransactionRecurrence | null;
  operation: TransactionOperation;
  category: TransactionCategory;
  value: number;
}

class Transaction extends Entity<
  Omit<TransactionFields, 'id' | 'createdAt' | 'updatedAt'>
> {
  static create({
    id,
    category,
    operation,
    recurrence = null,
    value,
    createdAt,
    updatedAt
  }: TransactionFields): Transaction {
    return new Transaction(
      { category, operation, recurrence, value: floatToInt(value) },
      { id, createdAt, updatedAt }
    );
  }

  get category(): TransactionCategory {
    return this.fields.category;
  }

  get operation(): TransactionOperation {
    return this.fields.operation;
  }

  get recurrence(): TransactionRecurrence | null {
    return this.recurrence;
  }

  get value(): number {
    return intToFloat(this.fields.value);
  }
}

export default Transaction;
