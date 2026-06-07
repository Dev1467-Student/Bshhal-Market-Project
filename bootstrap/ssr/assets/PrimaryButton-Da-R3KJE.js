import { jsx } from "react/jsx-runtime";
function hasCustomRounded(className) {
  return /\brounded(-[a-z]+)?\b/.test(className);
}
function hasCustomCase(className) {
  return /\b(?:uppercase|lowercase|capitalize|normal-case)\b/.test(className);
}
function PrimaryButton({
  className = "",
  disabled,
  children,
  ...props
}) {
  const finalClassName = [
    "inline-flex items-center border border-transparent bg-purple-800 px-4 py-2 text-xs font-semibold  tracking-widest text-white transition duration-150 ease-in-out hover:bg-purple-700 focus:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 active:bg-purple-800 dark:bg-purple-200 dark:text-purple-700 dark:hover:bg-white dark:focus:bg-white dark:focus:ring-offset-purple-700 dark:active:bg-purple-300",
    disabled ? "opacity-25" : "",
    hasCustomRounded(className) ? "" : "rounded-md",
    hasCustomCase(className) ? "text-[13px]" : "uppercase",
    className
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsx("button", { ...props, className: finalClassName, disabled, children });
}
export {
  PrimaryButton as P
};
