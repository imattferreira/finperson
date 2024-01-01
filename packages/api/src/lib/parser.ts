import { z } from 'zod';

import InvalidFormatException from '@/exceptions/invalid-format-exception';

import Either, { Left, Right } from './either';

const custom = {
  json: <O extends object, T extends z.ZodTypeDef, I>(
    data: Nullish<string>,
    schema: z.ZodType<O, T, I>
  ): Left | Right<O> => {
    const parsed = z
      .custom<string>((json) => {
        try {
          if (!json) {
            return false;
          }

          JSON.parse(json as string);
          return true;
        } catch (error) {
          return false;
        }
      }, 'invalid json')
      .transform((str) => JSON.parse(str))
      .pipe(schema)
      .safeParse(data);

    if (parsed.success) {
      return Either.toRight(parsed.data);
    }

    // consider only the first parser error
    return Either.toLeft(
      new InvalidFormatException(parsed.error.errors[0].message)
    );
  },
  password: () => z.string().min(8).max(32)
};

export default Object.assign(custom, z);
