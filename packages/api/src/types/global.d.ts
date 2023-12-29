export {};

declare global {
  type Copy<T> = { [K in keyof T]: T[K] };

  type Obj = Record<string, unknown>;
}
