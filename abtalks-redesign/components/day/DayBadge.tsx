"use client";

import { motion } from "framer-motion";
import { Clock, Zap, Star } from "lucide-react";
import { cn, getDifficultyColor, getDifficultyStars } from "@/lib/utils";

interface DayBadgeProps {
  dayId: number;
  track: string;
  difficulty: string;
  estimatedTime: string;
  xpReward: number;
}

const difficultyLabels: Record<string, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

export function DayBadge({
  dayId,
  track,
  difficulty,
  estimatedTime,
  xpReward,
}: DayBadgeProps) {
  const stars = getDifficultyStars(difficulty);
  const colorKey = getDifficultyColor(difficulty);

  const colorMap: Record<string, { bg: string; text: string; border: string }> = {
    success: {
      bg: "rgba(34, 197, 94, 0.1)",
      text: "#4ade80",
      border: "rgba(34, 197, 94, 0.3)",
    },
    warning: {
      bg: "rgba(245, 158, 11, 0.1)",
      text: "#fbbf24",
      border: "rgba(245, 158, 11, 0.3)",
    },
    danger: {
      bg: "rgba(239, 68, 68, 0.1)",
      text: "#f87171",
      border: "rgba(239, 68, 68, 0.3)",
    },
  };

  const colors = colorMap[colorKey] ?? colorMap.success;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25, ease: "easeOut", delay: 0.05 }}
      className="px-4 py-2"
    >
      <div
        className="card p-4 flex items-start gap-4"
        style={{ background: "var(--card)", borderColor: "var(--border)" }}
      >
        {/* Day number */}
        <div
          className="flex-shrink-0 w-14 h-14 rounded-2xl flex flex-col items-center justify-center"
          style={{
            background: "var(--primary-glow)",
            border: "1.5px solid rgba(79, 70, 229, 0.4)",
          }}
        >
          <span className="text-xs font-semibold" style={{ color: "#818cf8" }}>
            DAY
          </span>
          <span
            className="text-xl font-black leading-none"
            style={{ color: "#c7d2fe" }}
          >
            {dayId}
          </span>
        </div>

        {/* Metadata */}
        <div className="flex-1 min-w-0">
          {/* Track */}
          <span
            className="badge badge-primary inline-flex mb-2"
            style={{ fontSize: "0.7rem" }}
          >
            {track}
          </span>

          {/* Meta row */}
          <div className="flex flex-wrap gap-3 mt-1">
            {/* Time */}
            <div
              className="flex items-center gap-1"
              style={{ color: "var(--muted)" }}
            >
              <Clock size={13} />
              <span className="text-xs">{estimatedTime}</span>
            </div>

            {/* Difficulty stars */}
            <div className="flex items-center gap-1">
              {Array.from({ length: 3 }, (_, i) => (
                <Star
                  key={i}
                  size={12}
                  style={{
                    color: i < stars ? colors.text : "var(--border)",
                    fill: i < stars ? colors.text : "transparent",
                  }}
                />
              ))}
              <span className="text-xs ml-0.5" style={{ color: colors.text }}>
                {difficultyLabels[difficulty.toLowerCase()] ?? difficulty}
              </span>
            </div>

            {/* XP */}
            <div
              className="flex items-center gap-1"
              style={{ color: "#818cf8" }}
            >
              <Zap size={13} fill="currentColor" />
              <span className="text-xs font-semibold">+{xpReward} XP</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
