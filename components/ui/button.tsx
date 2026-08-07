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
      "inline-flex items-center justify-center font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B] disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] cursor-pointer rounded-[16px]";

    const variants = {
      primary:
        "bg-[#4F46E5] text-white hover:bg-[#6366F1] shadow-[0_0_20px_rgba(79,70,229,0.35)] hover:shadow-[0_0_25px_rgba(99,102,241,0.5)] border border-[#6366F1]/30",
      secondary:
        "bg-[#18181B] text-[#FAFAFA] hover:bg-[#27272A] border border-[#27272A]",
      outline:
        "bg-transparent text-[#FAFAFA] border border-[#27272A] hover:bg-[#18181B] hover:border-[#3F3F46]",
      ghost:
        "bg-transparent text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-[#18181B]",
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
