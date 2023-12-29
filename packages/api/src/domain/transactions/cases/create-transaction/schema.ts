import { z } from 'zod';
import parser from '../../../../lib/parser';
import TransactionTypes from '../../entities/transaction-types';
import TransactionRecurrenceTypes from '../../entities/transaction-recurrence-types';
import TransactionCategories from '../../entities/transactions-categories';

export type CreateTransactionReceivedFields = z.infer<
  typeof receivedFieldsSchema
>;

export const receivedFieldsSchema = parser.object({
  name: parser.string().min(3),
  category: parser.nativeEnum(TransactionCategories),
  recurrence: parser
    .object({
      each: parser.number().min(1).max(31),
      times: parser.number().min(1).nullable(),
      type: parser.nativeEnum(TransactionRecurrenceTypes)
    })
    .nullable(),
  future: parser.date().nullable(),
  type: parser.nativeEnum(TransactionTypes),
  value: parser.number().min(0.01).max(100_000_000)
});
