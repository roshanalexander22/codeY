"use client";

import { motion } from "framer-motion";
import { Flame, TrendingUp, Zap, Trophy, Clock } from "lucide-react";

interface LearningInsightsProps {
  streak?: number;
  completedCount?: number;
  totalXp?: number;
}

export function LearningInsights({
  streak = 11,
  completedCount = 11,
  totalXp = 1650,
}: LearningInsightsProps) {
  const insights = [
    {
      label: "Current streak",
      value: `${streak} days`,
      icon: Flame,
      color: "#f59e0b",
      bg: "rgba(245, 158, 11, 0.1)",
      border: "rgba(245, 158, 11, 0.2)",
    },
    {
      label: "Completion rate",
      value: "78%",
      icon: TrendingUp,
      color: "#22c55e",
      bg: "rgba(34, 197, 94, 0.1)",
      border: "rgba(34, 197, 94, 0.2)",
    },
    {
      label: "Completed",
      value: `${completedCount} challenges`,
      icon: Zap,
      color: "var(--primary)",
      bg: "var(--primary-glow)",
      border: "var(--primary)",
    },
    {
      label: "XP earned",
      value: `${totalXp.toLocaleString()} XP`,
      icon: Trophy,
      color: "#f59e0b",
      bg: "rgba(245, 158, 11, 0.1)",
      border: "rgba(245, 158, 11, 0.2)",
    },
    {
      label: "Learning time",
      value: "18h 40m",
      icon: Clock,
      color: "#a78bfa",
      bg: "rgba(167, 139, 250, 0.1)",
      border: "rgba(167, 139, 250, 0.2)",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut", delay: 0.45 }}
      className="w-full"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
          Learning Insights
        </h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {insights.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="p-3.5 rounded-2xl bg-[var(--card)] border border-[var(--border)] flex flex-col justify-between glass-card"
            >
              <div
                className="w-7 h-7 rounded-xl flex items-center justify-center mb-2.5"
                style={{ background: item.bg, border: `1px solid ${item.border}` }}
              >
                <Icon size={14} color={item.color} />
              </div>
              <div>
                <p className="text-[11px] text-[var(--muted-foreground)] font-medium">
                  {item.label}
                </p>
                <p className="text-sm font-black text-[var(--foreground)] mt-0.5 tabular-nums">
                  {item.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
