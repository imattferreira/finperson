import type { FormError, FormFields } from "./types";

export function errorsInitializer<T extends FormFields>(fields: T) {
  const result = {} as FormError<T>;

  for (const field in fields) {
    result[field] = null;
  }

  return result;
}
