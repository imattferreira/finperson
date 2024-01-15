// TODO implement sizes
import { JSX } from "solid-js";
import { styler } from "~/utils/styler";

type ButtonTypes = "primary" | "secondary";

type ContainerProps = {
  children: JSX.Element;
  disabled?: boolean;
  htmlType?: "submit" | "button";
  loading?: boolean;
  type: ButtonTypes;
};

const TYPES: Record<ButtonTypes, string> = {
  primary: "bg-emerald-600 text-zinc-300",
  secondary: "bg-zinc-500 text-zinc-300",
};

const Container = (props: ContainerProps) => (
  <button
    class={styler(
      "p-2 rounded-sm font-bold hover:opacity-80 transition-all",
      TYPES[props.type],
      props.loading ? "opacity-80" : "disabled:opacity-60"
    )}
    disabled={props.disabled || props.loading}
    type={props.htmlType}
  >
    {/* TODO add spinner when loading */}
    {!props.loading && props.children}
  </button>
);

export default Container;
