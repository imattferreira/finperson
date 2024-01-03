import { z } from 'zod';

import { Left, Right } from '@/lib/either';

interface IParserService {
  uuid(data: unknown): Left | Right<string>;
  email(data: unknown): Left | Right<string>;
  password(data: unknown): Left | Right<string>;
  shape<T extends z.ZodRawShape>(shape: T): z.ZodObject<T, 'strip'>;
  parseJson<O extends object, T extends z.ZodTypeDef, I>(
    str: Nullish<string>,
    schema: z.ZodType<O, T, I>
  ): Left | Right<O>;
  parseObj<O extends object>(
    obj: unknown,
    schema: z.ZodType<O, z.ZodTypeDef, O>
  ): Left | Right<O>;
}

export default IParserService;
