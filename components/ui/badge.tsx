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
      "bg-[var(--primary-glow)] text-[var(--primary)] border border-[var(--primary)] shadow-xs",
    secondary: "bg-[var(--card)] text-[var(--foreground)] border border-[var(--border)]",
    success:
      "bg-[#22C55E]/15 text-[#22c55e] border border-[#22C55E]/30 shadow-xs",
    warning:
      "bg-[#F59E0B]/15 text-[#f59e0b] border border-[#F59E0B]/30 shadow-xs",
    danger:
      "bg-[#EF4444]/15 text-[#ef4444] border border-[#EF4444]/30 shadow-xs",
    outline: "bg-transparent text-[var(--muted-foreground)] border border-[var(--border)]",
  };

  return (
    <div className={cn(base, variants[variant], className)} {...props}>
      {children}
    </div>
  );
}
