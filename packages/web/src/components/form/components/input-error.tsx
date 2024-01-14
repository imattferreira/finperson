// TODO add icon
type ErrorProps = {
  message: string;
};

const InputError = (props: ErrorProps) => (
  <div class="text-red-400">
    <p>{props.message}</p>
  </div>
);

export default InputError;
