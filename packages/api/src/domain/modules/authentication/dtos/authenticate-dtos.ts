import { z } from 'zod';

import parser from '@/lib/parser';

export type AuthenticateReceivedFields = z.infer<typeof receivedFieldsSchema>;

export const receivedFieldsSchema = parser.object({
  email: parser.string().email(),
  password: parser.password()
});
