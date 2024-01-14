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

type FormControlInput<T> = {
  fields: T;
};

type ValidatorIntermediary<T extends FieldTypes> = (value: T) => string[];

type Submitter<T> = (fields: T) => Promise<void> | void;

function useFormControl<T extends FormFields>({ fields }: FormControlInput<T>) {
  const [stored, setStored] = createStore<T>(fields);
  const [errors, setErrors] = createStore<FormError<T>>(
    errorsInitializer(fields)
  );

  const changer: ChangeEventSyntheticHandler =
    (name, normalizer) => (event) => {
      const { value } = event.currentTarget;

      setStored({ ...stored, [name]: normalizer ? normalizer(value) : value });
    };

  const validator =
    <T extends FieldTypes>(fn: ValidatorIntermediary<T>): Validator<T> =>
    (data: T) => {
      const errors = fn(data);

      return errors.length > 0 ? errors : undefined;
    };

  const onSubmit = (submitter: Submitter<T>) => () => submitter(stored);

  const onInvalid: InvalidEventHandler = (event) => {
    // TODO verify if popup appear yet (noValidate on form??)
    event.stopPropagation();

    const inputs = event.target.querySelectorAll("input");
    const errors: FormError<T> = {} as FormError<T>;

    inputs.forEach((input) => {
      if (input.validationMessage) {
        // TODO before parse, validate if is native validation
        errors[input.name as keyof T] = JSON.parse(input.validationMessage);
      }
    });

    setErrors(errors);
  };

  return {
    control: { onInvalid },
    errors,
    fields: stored,
    changer,
    validator,
    onSubmit,
  };
}

export default useFormControl;
