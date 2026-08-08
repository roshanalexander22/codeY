"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface DayHeaderProps {
  streak: number;
  dayId: number;
  track?: string;
}

export function DayHeader({ streak, dayId, track = "Full Stack Development" }: DayHeaderProps) {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full border-b"
      style={{
        background: "rgba(9, 9, 11, 0.85)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderColor: "var(--border)",
      }}
    >
      <div className="max-w-[1280px] mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
        {/* Left: Back button & track info */}
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className={cn(
              "touch-target flex items-center justify-center",
              "w-10 h-10 rounded-2xl",
              "transition-colors duration-200 hover:bg-white/10"
            )}
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid var(--border)",
            }}
            aria-label="Back to dashboard"
          >
            <ArrowLeft size={18} style={{ color: "var(--foreground)" }} />
          </Link>

          <div className="hidden sm:flex flex-col">
            <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
              {track}
            </span>
            <span className="text-xs text-zinc-400">
              ABTalks 60-Day Challenge
            </span>
          </div>
        </div>

        {/* Center: Title / Day indicator */}
        <div className="flex flex-col items-center">
          <span
            className="text-xs sm:text-sm font-black tracking-widest uppercase"
            style={{ color: "var(--foreground)", letterSpacing: "0.14em" }}
          >
            ABTalks
          </span>
          <span className="text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>
            Day {dayId} of 60
          </span>
        </div>

        {/* Right: Streak badge */}
        <div
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl"
          style={{
            background:
              streak > 0
                ? "rgba(245, 158, 11, 0.12)"
                : "rgba(255,255,255,0.06)",
            border: `1px solid ${streak > 0 ? "rgba(245, 158, 11, 0.3)" : "var(--border)"}`,
          }}
        >
          <span
            className={cn("text-sm sm:text-base", streak > 0 && "streak-fire")}
            role="img"
            aria-label="streak"
          >
            {streak > 0 ? "🔥" : "💤"}
          </span>
          <span
            className="text-xs sm:text-sm font-bold"
            style={{ color: streak > 0 ? "#fbbf24" : "var(--muted-foreground)" }}
          >
            {streak > 0 ? `${streak} day streak` : "0 streak"}
          </span>
        </div>
      </div>
    </motion.header>
  );
}
