import { z } from 'zod';
import Either, { Left, Right } from './either';
import InvalidFormatException from '../exceptions/invalid-format-exception';

const custom = {
  json: <O extends Obj, T extends z.ZodTypeDef, I>(
    data: string | null,
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
  }
};

export default Object.assign(custom, z);
