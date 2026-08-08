"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "success";
  size?: "sm" | "md" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", children, disabled, ...props },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] cursor-pointer rounded-[16px]";

    const variants = {
      primary:
        "bg-[var(--primary)] text-white hover:opacity-90 shadow-[0_0_20px_var(--primary-glow)] border border-[var(--primary)]",
      secondary:
        "bg-[var(--card)] text-[var(--foreground)] hover:bg-[var(--muted)] border border-[var(--border)] shadow-xs",
      outline:
        "bg-transparent text-[var(--foreground)] border border-[var(--border)] hover:bg-[var(--card)]",
      ghost:
        "bg-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--card)]",
      danger:
        "bg-[#EF4444] text-white hover:bg-[#F87171] shadow-[0_0_15px_rgba(239,68,68,0.3)]",
      success:
        "bg-[#22C55E] text-white hover:bg-[#4ADE80] shadow-[0_0_15px_rgba(34,197,94,0.3)]",
    };

    const sizes = {
      sm: "h-9 px-4 text-xs font-semibold",
      md: "h-11 px-6 text-sm font-semibold",
      lg: "h-13 px-8 text-base font-semibold",
      icon: "h-11 w-11 p-0",
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
