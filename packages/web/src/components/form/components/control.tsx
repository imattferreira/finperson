import type { JSX } from "solid-js/jsx-runtime";
import type { InvalidEventHandler } from "../types";
import { SubmitElementEvent } from "~/@types/events";

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
      return;
    }

    props["on:submit"](event);
  };

  return (
    <form
      ref={formRef}
      class="flex flex-col space-y-4 w-full"
      onSubmit={onSubmit}
      oninvalid={props.control.onInvalid}
    >
      {props.children}
    </form>
  );
};

export default Control;
