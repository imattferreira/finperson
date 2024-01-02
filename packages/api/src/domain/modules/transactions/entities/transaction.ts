// TODO add field to finish recurrence transaction
import Entity, { type EntityRequiredFields } from '@/core/entities/entity';
import Timestamp from '@/domain/shared/entities/timestamp';
import { floatToInt, intToFloat } from '@/lib/number';

import TransactionOperation from './transaction-operation';
import TransactionRecurrence from './transaction-recurrence-types';
import TransactionCategory from './transactions-categories';

interface TransactionFields extends Partial<EntityRequiredFields> {
  category: TransactionCategory;
  future: Timestamp | null;
  operation: TransactionOperation;
  recurrence?: TransactionRecurrence | null;
  value: number;
}

class Transaction extends Entity<
  Omit<TransactionFields, 'id' | 'createdAt' | 'updatedAt'>
> {
  static create({
    id,
    category,
    future = null,
    operation,
    recurrence = null,
    value,
    createdAt,
    updatedAt
  }: TransactionFields): Transaction {
    return new Transaction(
      { category, future, operation, recurrence, value: floatToInt(value) },
      { id, createdAt, updatedAt }
    );
  }

  get category(): TransactionCategory {
    return this.fields.category;
  }

  get future(): Timestamp | null {
    return this.fields.future;
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
