import { ChangeElementEvent } from "~/@types/events";

export type Validator<T extends FieldTypes> = (value: T) => string[] | void;

export type Normalizer = (data: FieldTypes) => FieldTypes;

export type FieldTypes = string | number;

export type FormFields = Record<string, FieldTypes>;

export type FormError<T> = {
  [k in keyof T]: ErrorTypes[] | null;
};

export type ErrorTypes =
  | "bad_input"
  | "custom"
  | "pattern_mismatch"
  | "range_overflow"
  | "range_underflow"
  | "step_mismatch"
  | "too_long"
  | "too_short"
  | "type_mismatch"
  | "value_missing";

export type InvalidEventHandler = (
  messages: { name: string; type: ErrorTypes }[]
) => void;

export type ChangeEventSyntheticHandler = (
  name: string,
  normalizer?: Normalizer
) => (event: ChangeElementEvent<HTMLInputElement>) => void;
