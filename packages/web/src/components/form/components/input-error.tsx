import { ErrorTypes } from '../types';

// TODO add icon
type ErrorProps = {
  type: ErrorTypes;
};

// TODO create generic messages
const MESSAGES_BY_TYPE: Record<ErrorTypes, string> = {
  bad_input: '',
  custom: '',
  pattern_mismatch: '',
  range_overflow: '',
  range_underflow: '',
  step_mismatch: '',
  too_long: '',
  too_short: '',
  type_mismatch: '',
  value_missing: 'Is necessary fill this field.'
};

const InputError = (props: ErrorProps) => (
  <div class="text-red-400 mt-1">
    <p class="text-sm">{MESSAGES_BY_TYPE[props.type]}</p>
  </div>
);

export default InputError;
