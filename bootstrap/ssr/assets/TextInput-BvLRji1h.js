import { jsx } from "react/jsx-runtime";
import { forwardRef, useRef, useImperativeHandle, useEffect } from "react";
const TextInput = forwardRef(function TextInput2({
  type = "text",
  className = "",
  isFocused = false,
  ...props
}, ref) {
  const localRef = useRef(null);
  useImperativeHandle(ref, () => ({
    focus: () => {
      var _a;
      return (_a = localRef.current) == null ? void 0 : _a.focus();
    }
  }));
  useEffect(() => {
    var _a;
    if (isFocused) {
      (_a = localRef.current) == null ? void 0 : _a.focus();
    }
  }, [isFocused]);
  return /* @__PURE__ */ jsx(
    "input",
    {
      ...props,
      type,
      className: "input rounded-md border border-gray-300 shadow-sm dark:text-gray-300 focus:border-violet-900 focus:ring-1 focus:ring-violet-900 dark:focus:border-indigo-600 dark:focus:ring-1 dark:focus:ring-indigo-600 focus:outline-none transition-all duration-200 ease-in-out " + className,
      ref: localRef
    }
  );
});
export {
  TextInput as T
};
