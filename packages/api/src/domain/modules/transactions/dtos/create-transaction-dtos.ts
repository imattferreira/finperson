import { z } from 'zod';

import parser from '@/lib/parser';

import { AvailableOperationsEnum } from '../entities/transaction-operation';
import { AvailableRecurrencesEnum } from '../entities/transaction-recurrence-types';
import { AvailableCategoriesEnum } from '../entities/transactions-categories';

export type CreateTransactionReceivedFields = z.infer<
  typeof receivedFieldsSchema
>;

export const receivedFieldsSchema = parser.object({
  name: parser.string().min(3),
  category: parser.nativeEnum(AvailableCategoriesEnum),
  recurrence: parser
    .object({
      each: parser.number().min(1).max(31),
      repeatTimes: parser.number().min(1).nullable(),
      recurrence: parser.nativeEnum(AvailableRecurrencesEnum)
    })
    .nullable(),
  future: parser.date().nullable(),
  operation: parser.nativeEnum(AvailableOperationsEnum),
  value: parser.number().min(0.01).max(100_000_000)
});
