export {};

declare global {
  type Nullish<T> = T | null;

  type GenericRecord = Record<string, unknown>;

  type InlineEnum<Enum> = Enum[keyof Enum];
}
