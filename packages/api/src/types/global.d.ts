export {};

// TODO remove
declare global {
  type Copy<T> = { [K in keyof T]: T[K] };

  type Obj = Record<string, unknown>;

  type Nullish<T> = T | null;
}
