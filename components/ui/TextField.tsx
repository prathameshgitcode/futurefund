import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="w-full">
        <label
          htmlFor={inputId}
          className="block text-xs font-semibold uppercase tracking-wide text-ink mb-2"
        >
          {label}
        </label>
        <input
          id={inputId}
          ref={ref}
          className={cn(
            "focus-ring w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm placeholder:text-ink-soft",
            error && "border-red-400",
            className,
          )}
          {...props}
        />
        {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
      </div>
    );
  },
);
TextField.displayName = "TextField";
