// TODO adjust accessibility (aka colors)
import type { JSX } from "solid-js/jsx-runtime";
import type {
  ChangeEventSyntheticHandler,
  Normalizer,
  Validator,
} from "../types";
import { For } from "solid-js";
import InputError from "./input-error";
import { SubmitElementEvent } from "~/@types/events";

type InputElement = Omit<
  JSX.InputHTMLAttributes<HTMLInputElement>,
  "class" | "pattern" | "name"
>;

type InputProps = InputElement & {
  name: string;
  errors?: string[] | null;
  "use:normalizer"?: Normalizer;
  "use:validate"?: Validator<string>;
  "on:change": ChangeEventSyntheticHandler;
};

const Input = (props: InputProps) => {
  let inputRef: HTMLInputElement | undefined;

  function onSubmit(event: SubmitElementEvent<HTMLInputElement>) {
    const validator = props["use:validate"];

    if (!validator) {
      return;
    }

    const error = validator(event.currentTarget.value);

    if (!error) {
      return;
    }

    inputRef!.setCustomValidity(JSON.stringify(error));
  }

  return (
    <div>
      <input
        ref={inputRef}
        class="bg-zinc-700 p-2 rounded-sm w-full"
        {...props}
        onChange={props["on:change"](props.name, props["use:normalizer"])}
        onSubmit={onSubmit}
      />
      {props?.errors && (
        <div class="mb-1">
          <For each={props.errors}>
            {(error) => <InputError message={error} />}
          </For>
        </div>
      )}
    </div>
  );
};

export default Input;
