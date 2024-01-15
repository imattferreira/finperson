import type { JSX } from "solid-js/jsx-runtime";
import type { InvalidEventHandler } from "../types";
import type { SubmitElementEvent } from "~/@types/events";
import { getErrorType } from "../utils";

type ControlProps = {
  children: JSX.Element[];
  "on:submit": (event: SubmitElementEvent<HTMLFormElement>) => void;
  control: {
    onInvalid: InvalidEventHandler;
  };
};

const Control = (props: ControlProps) => {
  let formRef: HTMLFormElement | undefined;

  const onSubmit = (event: SubmitElementEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValid = formRef!.checkValidity();

    if (!isValid) {
      const messages = [];

      const inputs = formRef!.querySelectorAll("input");

      for (const input of inputs) {
        if (!input.validationMessage) {
          return;
        }

        messages.push({
          name: input.name,
          type: getErrorType(input.validity),
        });
      }

      props.control.onInvalid(messages);
      return;
    }

    props["on:submit"](event);
  };

  return (
    <form
      ref={formRef}
      class="flex flex-col space-y-4 w-full"
      onSubmit={onSubmit}
      noValidate
    >
      {props.children}
    </form>
  );
};

export default Control;
