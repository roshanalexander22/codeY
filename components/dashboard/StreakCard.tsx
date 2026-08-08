"use client";

import { motion } from "framer-motion";
import { Flame, TrendingUp, Zap } from "lucide-react";

interface StreakCardProps {
  streak: number;
  longestStreak: number;
  isMissedDay?: boolean;
  isFirstDay?: boolean;
}

export function StreakCard({
  streak,
  longestStreak,
  isMissedDay,
  isFirstDay,
}: StreakCardProps) {
  const isActive = !isMissedDay;
  const flameColor = isMissedDay
    ? "#6b7280"
    : streak >= 30
    ? "#f97316"
    : streak >= 14
    ? "#f59e0b"
    : "#ef4444";

  const glowColor = isMissedDay
    ? "rgba(107, 114, 128, 0.1)"
    : streak >= 14
    ? "rgba(245, 158, 11, 0.15)"
    : "rgba(239, 68, 68, 0.12)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut", delay: 0.1 }}
      className="relative overflow-hidden rounded-3xl p-5 card glass-card"
      style={{
        background: "var(--card)",
        border: `1px solid ${isMissedDay ? "var(--border)" : "rgba(239, 68, 68, 0.25)"}`,
        boxShadow: `0 0 40px ${glowColor}`,
      }}
    >
      {/* Background gradient orb */}
      {isActive && (
        <div
          className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ background: flameColor }}
        />
      )}

      <div className="relative flex items-center justify-between">
        {/* Left: streak count */}
        <div className="flex items-center gap-4">
          {/* Flame icon */}
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center relative"
            style={{
              background: isMissedDay
                ? "rgba(107, 114, 128, 0.1)"
                : "rgba(239, 68, 68, 0.12)",
              border: `1px solid ${isMissedDay ? "var(--border)" : "rgba(239, 68, 68, 0.25)"}`,
            }}
          >
            <motion.div
              animate={
                isActive
                  ? {
                      scale: [1, 1.08, 1],
                      rotate: [-2, 2, -2],
                    }
                  : {}
              }
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Flame
                size={28}
                fill={isMissedDay ? "none" : flameColor}
                color={flameColor}
              />
            </motion.div>
          </div>

          {/* Streak number */}
          <div>
            <motion.div
              key={streak}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex items-baseline gap-1"
            >
              <span
                className="text-5xl font-black tabular-nums text-[var(--foreground)]"
              >
                {isFirstDay ? 0 : streak}
              </span>
              <span
                className="text-sm font-medium text-[var(--muted-foreground)]"
              >
                day{streak !== 1 ? "s" : ""}
              </span>
            </motion.div>
            <p
              className="text-xs font-semibold uppercase tracking-wider mt-0.5"
              style={{
                color: isMissedDay ? "#6b7280" : flameColor,
              }}
            >
              {isMissedDay ? "Streak broken" : isFirstDay ? "Starting today!" : "Current streak"}
            </p>
          </div>
        </div>

        {/* Right: best streak */}
        <div className="text-right">
          <div className="flex items-center gap-1.5 justify-end mb-1">
            <TrendingUp size={12} className="text-[var(--muted-foreground)]" />
            <span className="text-xs text-[var(--muted-foreground)]">
              Best
            </span>
          </div>
          <span
            className="text-xl font-bold text-[var(--foreground)]"
          >
            {longestStreak}
          </span>
          <p className="text-xs text-[var(--muted-foreground)]">
            days
          </p>
        </div>
      </div>

      {/* Missed day warning */}
      {isMissedDay && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ delay: 0.3 }}
          className="mt-4 rounded-2xl px-4 py-3 flex items-center gap-2"
          style={{
            background: "rgba(239, 68, 68, 0.08)",
            border: "1px solid rgba(239, 68, 68, 0.2)",
          }}
        >
          <Flame size={14} color="#f87171" />
          <p className="text-xs font-medium" style={{ color: "#f87171" }}>
            Submit today to restart your streak before midnight
          </p>
        </motion.div>
      )}

      {/* First day message */}
      {isFirstDay && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ delay: 0.3 }}
          className="mt-4 rounded-2xl px-4 py-3 flex items-center gap-2"
          style={{
            background: "var(--primary-glow)",
            border: "1px solid var(--primary)",
          }}
        >
          <Zap size={14} style={{ color: "var(--primary)" }} />
          <p className="text-xs font-medium" style={{ color: "var(--primary)" }}>
            Day 1! Submit your first proof of work to start your streak
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
