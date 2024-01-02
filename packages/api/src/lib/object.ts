import { camelcase, snakecase } from './string';

export const isObject = (obj: unknown): obj is GenericRecord =>
  typeof obj === 'object' && !Array.isArray(obj) && obj !== null;

export const stringify = (obj: unknown): string => JSON.stringify(obj);

export const parseJson = <T = Record<string, unknown>>(obj: string): T =>
  JSON.parse(obj);

export function snake(obj: GenericRecord): GenericRecord {
  const result = {};

  function _snake(temp: GenericRecord, converted: GenericRecord) {
    if (!isObject(temp)) {
      return converted;
    }

    const keys = Object.keys(temp);

    for (const key of keys) {
      const convertedKey = snakecase(key);

      if (!isObject(temp[key])) {
        converted[convertedKey] = temp[key];
        continue;
      }

      converted[convertedKey] = {};

      _snake(
        temp[key] as GenericRecord,
        converted[convertedKey] as GenericRecord
      );
    }
  }

  _snake(obj, result);

  return result;
}

export function camel(obj: GenericRecord): GenericRecord {
  const result = {};

  function _camel(_obj: GenericRecord, converted: GenericRecord) {
    if (!isObject(_obj)) {
      return converted;
    }

    const keys = Object.keys(_obj);

    for (const key of keys) {
      const convertedKey = camelcase(key);

      if (!isObject(_obj[key])) {
        converted[convertedKey] = _obj[key];
        continue;
      }

      converted[convertedKey] = {};

      _camel(
        _obj[key] as GenericRecord,
        converted[convertedKey] as GenericRecord
      );
    }
  }

  _camel(obj, result);

  return result;
}
