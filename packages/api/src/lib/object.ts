import { camelcase, snakecase } from './string';

const isObj = (obj: unknown): obj is object =>
  typeof obj === 'object' && !Array.isArray(obj) && obj !== null;

export const stringify = (obj: unknown): string => JSON.stringify(obj);

export const parseJson = <T extends object>(obj: string): T => JSON.parse(obj);

export function snake<T = object>(obj: object): object {
  const result: Partial<T> = {};

  function handler(_obj: object, curr: object) {
    if (!isObj(_obj)) {
      return curr;
    }

    const keys = Object.keys(_obj);

    for (const key of keys) {
      const snakedKey = snakecase(key);

      if (isObj(_obj[key])) {
        curr[snakedKey] = {};

        handler(_obj[key] as object, curr[snakedKey] as object);
        continue;
      }

      curr[snakedKey] = _obj[key];
    }
  }

  handler(obj, result);

  return result;
}

export function camel<T = object>(obj: object): object {
  const result: Partial<T> = {};

  function handler(_obj: object, curr: object) {
    if (!isObj(_obj)) {
      return curr;
    }

    const keys = Object.keys(_obj);

    for (const key of keys) {
      const cameldKey = camelcase(key);

      if (isObj(_obj[key])) {
        curr[cameldKey] = {};

        handler(_obj[key] as object, curr[cameldKey] as object);
        continue;
      }

      curr[cameldKey] = _obj[key];
    }
  }

  handler(obj, result);

  return result;
}
