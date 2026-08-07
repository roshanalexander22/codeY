"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-[16px] border border-[#27272A] bg-[#18181B] px-4 py-2 text-sm text-[#FAFAFA] placeholder:text-[#A1A1AA] focus:border-[#4F46E5] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/40 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
