"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "primary" | "secondary" | "success" | "warning" | "danger" | "outline";
}

export function Badge({
  className,
  variant = "primary",
  children,
  ...props
}: BadgeProps) {
  const base =
    "inline-flex items-center px-3 py-1 text-xs font-semibold rounded-[999px] transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";

  const variants = {
    primary:
      "bg-[#4F46E5]/15 text-[#818CF8] border border-[#4F46E5]/30 shadow-[0_0_10px_rgba(79,70,229,0.2)]",
    secondary: "bg-[#27272A] text-[#FAFAFA] border border-[#3F3F46]/50",
    success:
      "bg-[#22C55E]/15 text-[#4ADE80] border border-[#22C55E]/30 shadow-[0_0_10px_rgba(34,197,94,0.2)]",
    warning:
      "bg-[#F59E0B]/15 text-[#FBBF24] border border-[#F59E0B]/30 shadow-[0_0_10px_rgba(245,158,11,0.2)]",
    danger:
      "bg-[#EF4444]/15 text-[#F87171] border border-[#EF4444]/30 shadow-[0_0_10px_rgba(239,68,68,0.2)]",
    outline: "bg-transparent text-[#A1A1AA] border border-[#27272A]",
  };

  return (
    <div className={cn(base, variants[variant], className)} {...props}>
      {children}
    </div>
  );
}
