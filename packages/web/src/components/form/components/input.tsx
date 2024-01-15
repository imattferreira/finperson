import { For, lazy, Suspense } from 'solid-js';
import type { JSX } from 'solid-js/jsx-runtime';

import type { SubmitElementEvent } from '~/@types/events';

import type {
  ChangeEventSyntheticHandler,
  ErrorTypes,
  Normalizer,
  Validator
} from '../types';

const InputError = lazy(() => import('./input-error'));

type InputElement = Omit<
  JSX.InputHTMLAttributes<HTMLInputElement>,
  'class' | 'pattern' | 'name'
>;

type InputProps = InputElement & {
  name: string;
  errors?: ErrorTypes[] | null;
  label: string;
  'use:normalizer'?: Normalizer;
  'use:validate'?: Validator<string>;
  'on:change': ChangeEventSyntheticHandler;
};

const Input = (props: InputProps) => {
  let inputRef: HTMLInputElement | undefined;

  function onSubmit(event: SubmitElementEvent<HTMLInputElement>) {
    const validator = props['use:validate'];

    if (!validator) {
      return;
    }

    const error = validator(event.currentTarget.value);

    if (!error) {
      return;
    }

    inputRef!.setCustomValidity(JSON.stringify(error));
  }

  const onChange = () =>
    props['on:change'](props.name, props['use:normalizer']);

  return (
    <div>
      <label for={props.name}>{props.label}</label>
      <input
        id={props.name}
        ref={inputRef}
        class="mt-1 bg-zinc-700 p-2 rounded-sm w-full outline-none focus:border-emerald-600 border-zinc-700 border transition-all"
        {...props}
        onChange={onChange}
        onSubmit={onSubmit}
      />
      {props?.errors && (
        <div class="mb-1">
          <For each={props.errors}>
            {(error) => (
              <Suspense>
                <InputError type={error} />
              </Suspense>
            )}
          </For>
        </div>
      )}
    </div>
  );
};

export default Input;
