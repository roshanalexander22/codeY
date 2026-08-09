"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  indicatorColor?: string;
}

export function Progress({
  className,
  value = 0,
  max = 100,
  indicatorColor = "bg-[#4F46E5]",
  ...props
}: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div
      className={cn(
        "relative h-2.5 w-full overflow-hidden rounded-full bg-[#27272A]",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "h-full w-full flex-1 transition-all duration-500 ease-out rounded-full shadow-[0_0_12px_rgba(79,70,229,0.5)]",
          indicatorColor
        )}
        style={{ transform: `translateX(-${100 - percentage}%)` }}
      />
    </div>
  );
}
