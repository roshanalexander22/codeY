"use client";

import { motion } from "framer-motion";
import { Crown, TrendingUp } from "lucide-react";

interface LeaderboardEntry {
  rank: number;
  name: string;
  avatar: string;
  streak: number;
  xp: number;
  isCurrentUser?: boolean;
}

interface LeaderboardPreviewProps {
  entries: LeaderboardEntry[];
  isFirstDay?: boolean;
}

export function LeaderboardPreview({ entries, isFirstDay }: LeaderboardPreviewProps) {
  const topColors: Record<number, string> = {
    1: "#f59e0b",
    2: "#9ca3af",
    3: "#cd7c2c",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut", delay: 0.6 }}
      className="rounded-3xl p-5"
      style={{
        background: "#18181B",
        border: "1px solid #27272a",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold" style={{ color: "#fafafa" }}>
            Leaderboard
          </h3>
          <p className="text-xs mt-0.5" style={{ color: "#a1a1aa" }}>
            {isFirstDay ? "Compete with your cohort" : "Top performers this week"}
          </p>
        </div>
        <div
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
          style={{
            background: "rgba(245, 158, 11, 0.1)",
            border: "1px solid rgba(245, 158, 11, 0.25)",
          }}
        >
          <Crown size={12} color="#f59e0b" />
          <span className="text-xs font-bold" style={{ color: "#f59e0b" }}>
            Weekly
          </span>
        </div>
      </div>

      {isFirstDay ? (
        <div
          className="rounded-2xl p-4 text-center"
          style={{
            background: "rgba(79, 70, 229, 0.06)",
            border: "1px solid rgba(79, 70, 229, 0.15)",
          }}
        >
          <TrendingUp size={24} color="#818cf8" className="mx-auto mb-2" />
          <p className="text-sm font-medium" style={{ color: "#a1a1aa" }}>
            Complete Day 1 to appear on the leaderboard
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {entries.map((entry, i) => (
            <motion.div
              key={entry.rank}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.65 + i * 0.07, duration: 0.3 }}
              className="flex items-center gap-3 p-3 rounded-2xl"
              style={{
                background: entry.isCurrentUser
                  ? "rgba(79, 70, 229, 0.1)"
                  : "rgba(255,255,255,0.02)",
                border: entry.isCurrentUser
                  ? "1px solid rgba(79, 70, 229, 0.25)"
                  : "1px solid transparent",
              }}
            >
              {/* Rank */}
              <div
                className="w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background:
                    entry.rank <= 3
                      ? `rgba(${entry.rank === 1 ? "245,158,11" : entry.rank === 2 ? "156,163,175" : "205,124,44"},0.15)`
                      : "rgba(255,255,255,0.04)",
                }}
              >
                {entry.rank <= 3 ? (
                  <Crown
                    size={13}
                    color={topColors[entry.rank] || "#6b7280"}
                    fill={topColors[entry.rank] || "none"}
                  />
                ) : (
                  <span
                    className="text-xs font-bold tabular-nums"
                    style={{ color: "#6b7280" }}
                  >
                    {entry.rank}
                  </span>
                )}
              </div>

              {/* Avatar */}
              <div
                className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0"
                style={{
                  border: entry.isCurrentUser
                    ? "2px solid #4F46E5"
                    : "2px solid #27272a",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={entry.avatar}
                  alt={entry.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name */}
              <div className="flex-1 min-w-0">
                <p
                  className="text-sm font-semibold truncate"
                  style={{
                    color: entry.isCurrentUser ? "#818cf8" : "#fafafa",
                  }}
                >
                  {entry.name}{" "}
                  {entry.isCurrentUser && (
                    <span className="text-xs font-normal" style={{ color: "#6b7280" }}>
                      (you)
                    </span>
                  )}
                </p>
                <p className="text-xs" style={{ color: "#6b7280" }}>
                  🔥 {entry.streak} streak
                </p>
              </div>

              {/* XP */}
              <div className="text-right">
                <p
                  className="text-sm font-bold tabular-nums"
                  style={{ color: "#fafafa" }}
                >
                  {entry.xp.toLocaleString()}
                </p>
                <p className="text-xs" style={{ color: "#6b7280" }}>
                  XP
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
