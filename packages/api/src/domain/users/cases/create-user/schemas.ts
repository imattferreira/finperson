import { z } from 'zod';
import parser from '../../../../lib/parser';

export type CreateUserReceivedFields = z.infer<typeof receivedFieldsSchema>;

// TODO customize error msgs
export const receivedFieldsSchema = parser.object({
  name: parser.string().min(6),
  email: parser.string().email(),
  password: parser.string().min(8).max(28)
});
