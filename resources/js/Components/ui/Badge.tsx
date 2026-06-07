import { HTMLAttributes } from "react";

export type BadgeVariant = "solid" | "outline" | "muted";
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantClasses: Record<BadgeVariant, string> = {
  solid:
    "border border-black dark:border-white bg-black dark:bg-white text-white dark:text-black hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white",
  outline:
    "border border-black dark:border-gray-500 bg-white dark:bg-transparent text-black dark:text-gray-300 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black",
  muted:
    "border border-gray-300 dark:border-gray-600 bg-white dark:bg-transparent text-gray-600 dark:text-gray-400 hover:border-black dark:hover:border-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black",
};

export default function Badge({ variant = "outline", className = "", children, ...props }: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center px-2 py-0.5 text-xs font-medium uppercase tracking-wide transition-colors duration-150",
        variantClasses[variant],
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </span>
  );
}