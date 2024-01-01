import { camelcase, snakecase } from './string';

const isObj = (obj: unknown): obj is Obj =>
  typeof obj === 'object' && !Array.isArray(obj) && obj !== null;

export const stringify = (obj: unknown): string => JSON.stringify(obj);

export const parseJson = <T extends Record<string, unknown>>(obj: string): T =>
  JSON.parse(obj);

export function snake<T = Obj>(obj: Obj): Obj {
  const result: Partial<T> = {};

  function handler(_obj: Obj, curr: Obj) {
    if (!isObj(_obj)) {
      return curr;
    }

    const keys = Object.keys(_obj);

    for (const key of keys) {
      const snakedKey = snakecase(key);

      if (isObj(_obj[key])) {
        curr[snakedKey] = {};

        handler(_obj[key] as Obj, curr[snakedKey] as Obj);
        continue;
      }

      curr[snakedKey] = _obj[key];
    }
  }

  handler(obj, result);

  return result;
}

export function camel<T = Obj>(obj: Obj): Obj {
  const result: Partial<T> = {};

  function handler(_obj: Obj, curr: Obj) {
    if (!isObj(_obj)) {
      return curr;
    }

    const keys = Object.keys(_obj);

    for (const key of keys) {
      const cameldKey = camelcase(key);

      if (isObj(_obj[key])) {
        curr[cameldKey] = {};

        handler(_obj[key] as Obj, curr[cameldKey] as Obj);
        continue;
      }

      curr[cameldKey] = _obj[key];
    }
  }

  handler(obj, result);

  return result;
}
