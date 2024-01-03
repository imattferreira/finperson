import { z } from 'zod';

import { getYear } from '@/lib/date';
import parser from '@/lib/parser';

export type ReceivedFields = z.infer<typeof receivedFiltersSchema>;

export const receivedFiltersSchema = parser.object({
  year: parser
    .number()
    .min(getYear() - 10)
    .max(getYear() + 10),
  month: parser.number().min(1).max(12)
});
