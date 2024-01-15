import { createStore } from "solid-js/store";
import type {
  ChangeEventSyntheticHandler,
  FieldTypes,
  FormError,
  FormFields,
  InvalidEventHandler,
  Validator,
} from "../types";
import { errorsInitializer } from "../utils";

type ValidatorIntermediary<T extends FieldTypes> = (value: T) => string[];

type Submitter<T> = (fields: T) => Promise<void> | void;

function useFormControl<T extends FormFields>(fields: T) {
  const [stored, setStored] = createStore<T>(fields);
  const [errors, setErrors] = createStore<FormError<T>>(
    errorsInitializer(fields)
  );

  const changer: ChangeEventSyntheticHandler =
    (name, normalizer) => (event) => {
      const { value } = event.currentTarget;

      setStored({ ...stored, [name]: normalizer ? normalizer(value) : value });
    };

  const cleanup = () => {
    setStored(fields);
    setErrors(errorsInitializer(fields));
  };

  const validator =
    <T extends FieldTypes>(fn: ValidatorIntermediary<T>): Validator<T> =>
    (data: T) => {
      const errors = fn(data);

      return errors.length > 0 ? errors : undefined;
    };

  const onSubmit = (submitter: Submitter<T>) => () => submitter(stored);

  const onInvalid: InvalidEventHandler = (messages) => {
    const result: FormError<T> = {} as FormError<T>;

    messages.forEach(({ name, type }) => {
      result[name as keyof T] = [type];
    });

    setErrors(result);
  };

  return {
    control: { onInvalid },
    errors,
    fields: stored,
    changer,
    cleanup,
    validator,
    onSubmit,
  };
}

export default useFormControl;
