import Button from "@/Components/ui/Button";
import { Search } from "lucide-react";
import {
  FormEvent,
  forwardRef,
  InputHTMLAttributes,
  useId,
} from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
  className?: string;
  name?: string;
  id?: string;
  disabled?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, error, hint, className = "", id, disabled, ...props },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-black"
          >
            {label}
          </label>
        )}

        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          className={[
            "w-full border border-black bg-white px-3 py-2 text-sm text-black placeholder:text-gray-400",
            "transition-colors duration-150",
            "hover:bg-gray-50",
            "focus:bg-white focus:outline focus:outline-2 focus:outline-offset-0 focus:outline-black",
            "disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-100 disabled:text-gray-400",
            error ? "border-red-600 focus:outline-red-600" : "",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          {...props}
        />

        {hint && !error && (
          <p className="mt-1 text-xs text-gray-500">{hint}</p>
        )}

        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = "Search products...",
  className = "",
  name = "keyword",
  id,
  disabled = false,
}: SearchBarProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit?.();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={["flex w-full items-stretch", className].join(" ")}
    >
      <Input
        id={id}
        name={name}
        type="search"
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="border-r-0 focus:z-10"
        aria-label={placeholder}
      />

      <Button
        type="submit"
        variant="solid"
        size="md"
        disabled={disabled}
        className="shrink-0 border-l-0 px-3"
        aria-label="Search"
      >
        <Search className="h-4 w-4" />
      </Button>
    </form>
  );
}

export default Input;
