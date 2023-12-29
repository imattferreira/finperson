import { z } from 'zod';

const custom = {
  json: <O extends Record<string, unknown>, T extends z.ZodTypeDef, I>(
    data: string | null,
    schema: z.ZodType<O, T, I>
  ) => {
    return z
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
      .parse(data);
  }
};

export default Object.assign(custom, z);
