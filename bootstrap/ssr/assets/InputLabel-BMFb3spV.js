import { jsx } from "react/jsx-runtime";
function InputLabel({
  value,
  className = "",
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx("label", { ...props, className: `label fieldset` + className, children: /* @__PURE__ */ jsx("span", { className: "fieldset-legend", children: value ? value : children }) });
}
export {
  InputLabel as I
};
