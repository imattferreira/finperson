import { JSX } from "solid-js";
import { styler } from "~/utils/styler";

type ButtonTypes = "primary";

type ContainerProps = {
  type: ButtonTypes;
  disabled?: boolean;
  children: JSX.Element;
  htmlType?: "submit" | "button";
};

// TODO make disabled styles
// make sizes (context can be necessary)
const TYPES: Record<ButtonTypes, string> = {
  primary: "bg-emerald-600 text-zinc-300",
};

const Container = (props: ContainerProps) => (
  <button
    class={styler("p-2 rounded-sm font-bold", TYPES[props.type])}
    type={props.htmlType}
  >
    {props.children}
  </button>
);

export default Container;
