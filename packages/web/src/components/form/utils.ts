import type { ErrorTypes, FormError, FormFields } from './types';

export function errorsInitializer<T extends FormFields>(fields: T) {
  const result = {} as FormError<T>;

  for (const field in fields) {
    result[field] = null;
  }

  return result;
}

export function getErrorType(state: ValidityState): ErrorTypes {
  if (state.badInput) {
    return 'bad_input';
  } else if (state.patternMismatch) {
    return 'pattern_mismatch';
  } else if (state.rangeOverflow) {
    return 'range_overflow';
  } else if (state.rangeUnderflow) {
    return 'range_underflow';
  } else if (state.stepMismatch) {
    return 'step_mismatch';
  } else if (state.tooLong) {
    return 'too_long';
  } else if (state.tooShort) {
    return 'too_short';
  } else if (state.typeMismatch) {
    return 'type_mismatch';
  } else if (state.valueMissing) {
    return 'value_missing';
  }

  return 'custom';
}
