// TODO finish implementation of parser
import { z } from 'zod';

import ParserException from '@/exceptions/parser-exception';
import Either, { Left, Right } from '@/lib/either';

import IParserService from '../interfaces/iparser-service';
class ParserService implements IParserService {
  #handle<T, I>(parsed: z.SafeParseReturnType<I, T>): Left | Right<T> {
    if (parsed.success) {
      return Either.toRight(parsed.data);
    }

    return Either.toLeft(new ParserException(parsed.error));
  }

  uuid(data: unknown): Left | Right<string> {
    const validator = z.string().uuid();

    return this.#handle<string, string>(validator.safeParse(data));
  }

  email(data: unknown): Left | Right<string> {
    const validator = z.string().email();

    return this.#handle<string, string>(validator.safeParse(data));
  }

  password(data: unknown): Left | Right<string> {
    const validator = z
      .string()
      .min(8)
      .max(32)
      .regex(/a-zA-Z/)
      .regex(/0-9/)
      .regex(/[!@#$%^&*(),.?":{}|<>]/);

    return this.#handle<string, string>(validator.safeParse(data));
  }

  shape<T extends z.ZodRawShape>(shape: T): z.ZodObject<T, 'strip'> {
    return z.object(shape);
  }

  parseJson<O extends object, T extends z.ZodTypeDef, I>(
    str: Nullish<string>,
    schema: z.ZodType<O, T, I>
  ): Left | Right<O> {
    const validator = z
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
      .pipe(schema);

    return this.#handle<O, string>(validator.safeParse(str));
  }

  parseObj<O extends object>(
    obj: unknown,
    schema: z.ZodType<O, z.ZodTypeDef, O>
  ): Left | Right<O> {
    return this.#handle<O, O>(schema.safeParse(obj));
  }
}

export default ParserService;
