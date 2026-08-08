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
  const isMilestone = streak >= 7;
  const isLegendary = streak >= 30;

  const flameColor = isMissedDay
    ? "#6b7280"
    : isLegendary
    ? "#f97316"
    : isMilestone
    ? "#f59e0b"
    : "#ef4444";

  const glowColor = isMissedDay
    ? "rgba(107, 114, 128, 0.08)"
    : isLegendary
    ? "rgba(249, 115, 22, 0.15)"
    : isMilestone
    ? "rgba(245, 158, 11, 0.12)"
    : "rgba(239, 68, 68, 0.10)";

  // Ring color for milestone streaks
  const ringColor = isMissedDay
    ? "#27272a"
    : isLegendary
    ? "#f97316"
    : isMilestone
    ? "#f59e0b"
    : "rgba(239, 68, 68, 0.4)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut", delay: 0.1 }}
      className="relative overflow-hidden rounded-3xl p-5 h-full"
      style={{
        background: `linear-gradient(135deg, #18181B 0%, #1c1c20 100%)`,
        border: `1px solid ${isMissedDay ? "#27272a" : isMilestone ? ringColor : "rgba(239, 68, 68, 0.22)"}`,
        boxShadow: `0 0 40px ${glowColor}`,
      }}
    >
      {/* Background gradient orb */}
      {isActive && (
        <div
          className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-15 pointer-events-none"
          style={{ background: flameColor }}
        />
      )}

      <div className="relative flex items-center justify-between">
        {/* Left: streak count */}
        <div className="flex items-center gap-4">
          {/* Flame icon with milestone ring */}
          <div className="relative">
            {/* Pulsing ring for milestone streaks */}
            {isMilestone && isActive && (
              <motion.div
                className="absolute inset-0 rounded-2xl"
                animate={{
                  boxShadow: [
                    `0 0 0 0 ${flameColor}40`,
                    `0 0 0 6px ${flameColor}00`,
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                style={{ borderRadius: "16px" }}
              />
            )}
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center relative"
              style={{
                background: isMissedDay
                  ? "rgba(107, 114, 128, 0.1)"
                  : isMilestone
                  ? `rgba(${isLegendary ? "249,115,22" : "245,158,11"}, 0.12)`
                  : "rgba(239, 68, 68, 0.1)",
                border: `2px solid ${isMissedDay ? "#27272a" : ringColor}`,
              }}
            >
              <motion.div
                animate={
                  isActive
                    ? {
                        scale: [1, 1.1, 1],
                        rotate: [-3, 3, -3],
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
                className="text-5xl font-black tabular-nums"
                style={{ color: isMissedDay ? "#6b7280" : "#fafafa" }}
              >
                {isFirstDay ? 0 : streak}
              </span>
              <span
                className="text-sm font-medium"
                style={{ color: "#a1a1aa" }}
              >
                day{streak !== 1 ? "s" : ""}
              </span>
            </motion.div>
            <div className="flex items-center gap-1.5 mt-0.5">
              {isMilestone && isActive && (
                <Zap size={10} color={flameColor} className="flex-shrink-0" />
              )}
              <p
                className="text-xs font-semibold uppercase tracking-wider"
                style={{
                  color: isMissedDay ? "#6b7280" : flameColor,
                }}
              >
                {isMissedDay
                  ? "Streak broken"
                  : isFirstDay
                  ? "Starting today!"
                  : isMilestone
                  ? "🔥 On fire!"
                  : "Current streak"}
              </p>
            </div>
          </div>
        </div>

        {/* Right: best streak */}
        <div className="text-right">
          <div className="flex items-center gap-1.5 justify-end mb-1">
            <TrendingUp size={12} color="#a1a1aa" />
            <span className="text-xs" style={{ color: "#a1a1aa" }}>
              Best
            </span>
          </div>
          <span
            className="text-xl font-bold"
            style={{ color: "#fafafa" }}
          >
            {longestStreak}
          </span>
          <p className="text-xs" style={{ color: "#6b7280" }}>
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
            background: "rgba(79, 70, 229, 0.08)",
            border: "1px solid rgba(79, 70, 229, 0.2)",
          }}
        >
          <Zap size={14} color="#818cf8" />
          <p className="text-xs font-medium" style={{ color: "#818cf8" }}>
            Day 1! Submit your first proof of work to start your streak
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
