"use client";

import React from "react";
import { User } from "lucide-react";

export type AvatarSize = "sm" | "md" | "lg" | "xl";

interface AvatarProps {
  src?: string;
  name?: string;
  fallback?: string;
  size?: AvatarSize;
  className?: string;
  border?: boolean;
  onlineDot?: boolean;
}

const sizeMap: Record<AvatarSize, { container: string; iconSize: number; font: string; dot: string }> = {
  sm: { container: "w-7 h-7", iconSize: 14, font: "text-xs", dot: "w-2 h-2" },
  md: { container: "w-10 h-10", iconSize: 18, font: "text-sm font-bold", dot: "w-3 h-3" },
  lg: { container: "w-12 h-12", iconSize: 22, font: "text-base font-bold", dot: "w-3.5 h-3.5" },
  xl: { container: "w-16 h-16", iconSize: 28, font: "text-lg font-black", dot: "w-4 h-4" },
};

export function Avatar({
  src,
  name = "User",
  fallback,
  size = "md",
  className = "",
  border = true,
  onlineDot = false,
}: AvatarProps) {
  const config = sizeMap[size];
  const initial = (fallback || name.charAt(0)).toUpperCase();

  return (
    <div className={`relative inline-block flex-shrink-0 ${className}`}>
      <div
        className={`${config.container} rounded-full overflow-hidden flex items-center justify-center transition-transform`}
        style={{
          background: "var(--primary-glow)",
          border: border ? "2px solid var(--primary)" : "none",
        }}
        aria-label={`${name}'s profile avatar`}
      >
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={name} className="w-full h-full object-cover" />
        ) : (
          <span className={config.font} style={{ color: "var(--primary)" }}>
            {initial || <User size={config.iconSize} />}
          </span>
        )}
      </div>

      {onlineDot && (
        <div
          className={`absolute -bottom-0.5 -right-0.5 ${config.dot} rounded-full border-2`}
          style={{
            background: "#22c55e",
            borderColor: "var(--background)",
          }}
          title="Online"
        />
      )}
    </div>
  );
}
