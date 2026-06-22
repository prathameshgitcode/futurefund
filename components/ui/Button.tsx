"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "mint";
type Size = "sm" | "md" | "lg";

interface ButtonBaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary: "bg-ink text-white hover:bg-black",
  secondary: "bg-green-600 text-white hover:bg-green-700",
  outline: "bg-transparent text-ink border border-border hover:bg-surface-2",
  ghost: "bg-transparent text-ink hover:bg-surface-2",
  mint: "bg-mint-400 text-navy hover:bg-mint-500",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-3 text-sm",
  lg: "px-7 py-4 text-base",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-200 focus-ring whitespace-nowrap cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed";

interface ButtonProps
  extends
    Omit<ButtonBaseProps, "children">,
    ButtonHTMLAttributes<HTMLButtonElement> {
  href?: undefined;
}
interface LinkButtonProps extends ButtonBaseProps {
  href: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "primary", size = "md", className, children, ...props },
    ref,
  ) => (
    <button
      ref={ref}
      className={cn(
        base,
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  ),
);
Button.displayName = "Button";

export function LinkButton({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        base,
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
    >
      {children}
    </Link>
  );
}
