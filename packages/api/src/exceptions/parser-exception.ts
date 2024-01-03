import { ZodError } from 'zod';

import InvalidFormatException from './invalid-format-exception';

class ParserException extends InvalidFormatException {
  constructor(message: ZodError<unknown>) {
    super(message.issues[0].message);
  }
}

export default ParserException;
