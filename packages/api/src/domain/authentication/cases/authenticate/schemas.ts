import { z } from 'zod';
import parser from '../../../../lib/parser';

export type AuthenticateReceivedFields = {
  required: z.infer<typeof requiredFieldsSchema>;
};

export const requiredFieldsSchema = parser.object({
  email: parser.string().email(),
  password: parser.string()
});
