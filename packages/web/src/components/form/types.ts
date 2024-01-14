// TODO organize better
import type { JSX } from "solid-js/jsx-runtime";
import { ChangeElementEvent } from "~/@types/events";

export type Validator<T extends FieldTypes> = (value: T) => string[] | void;

export type Normalizer = (data: FieldTypes) => FieldTypes;

export type FieldTypes = string | number;

export type FormFields = Record<string, FieldTypes>;

export type FormError<T> = {
  [k in keyof T]: string[] | null;
};

export type InvalidEventHandler = JSX.EventHandlerUnion<HTMLFormElement, Event>;

export type ChangeEventSyntheticHandler = (
  name: string,
  normalizer?: Normalizer
) => (event: ChangeElementEvent<HTMLInputElement>) => void;
