"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export function Avatar({
  className,
  src,
  alt = "User Avatar",
  fallback = "AB",
  size = "md",
  ...props
}: AvatarProps) {
  const [imageError, setImageError] = React.useState(false);

  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
    xl: "h-16 w-16 text-lg font-bold",
  };

  return (
    <div
      className={cn(
        "relative flex shrink-0 overflow-hidden rounded-full border-2 border-[#4F46E5]/40 bg-[#18181B] shadow-[0_0_15px_rgba(79,70,229,0.2)] items-center justify-center text-[#FAFAFA] font-medium",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {src && !imageError ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={src}
          alt={alt}
          onError={() => setImageError(true)}
          className="aspect-square h-full w-full object-cover"
        />
      ) : (
        <span className="bg-gradient-to-br from-[#4F46E5] to-[#27272A] w-full h-full flex items-center justify-center text-white">
          {fallback}
        </span>
      )}
    </div>
  );
}
