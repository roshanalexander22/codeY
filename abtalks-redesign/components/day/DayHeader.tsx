"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Flame } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface DayHeaderProps {
  streak: number;
  dayId: number;
}

export function DayHeader({ streak, dayId }: DayHeaderProps) {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={cn(
        "sticky top-0 z-50 w-full",
        "flex items-center justify-between",
        "px-4 py-3",
        "border-b"
      )}
      style={{
        background: "rgba(9, 9, 11, 0.85)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderColor: "var(--border)",
      }}
    >
      {/* Back button */}
      <Link
        href="/dashboard"
        className={cn(
          "touch-target flex items-center justify-center",
          "w-10 h-10 rounded-2xl",
          "transition-colors duration-200"
        )}
        style={{
          background: "rgba(255,255,255,0.06)",
          border: "1px solid var(--border)",
        }}
        aria-label="Back to dashboard"
      >
        <ArrowLeft size={18} style={{ color: "var(--foreground)" }} />
      </Link>

      {/* Wordmark */}
      <div className="flex flex-col items-center">
        <span
          className="text-sm font-bold tracking-wider uppercase"
          style={{ color: "var(--foreground)", letterSpacing: "0.12em" }}
        >
          ABTalks
        </span>
        <span className="text-xs" style={{ color: "var(--muted)" }}>
          Day {dayId} of 60
        </span>
      </div>

      {/* Streak badge */}
      <div
        className="flex items-center gap-1.5 px-3 py-2 rounded-2xl"
        style={{
          background:
            streak > 0
              ? "rgba(245, 158, 11, 0.12)"
              : "rgba(255,255,255,0.06)",
          border: `1px solid ${streak > 0 ? "rgba(245, 158, 11, 0.3)" : "var(--border)"}`,
        }}
      >
        <span
          className={cn("text-base", streak > 0 && "streak-fire")}
          role="img"
          aria-label="streak"
        >
          {streak > 0 ? "🔥" : "💤"}
        </span>
        <span
          className="text-sm font-bold"
          style={{ color: streak > 0 ? "#fbbf24" : "var(--muted)" }}
        >
          {streak}
        </span>
      </div>
    </motion.header>
  );
}
