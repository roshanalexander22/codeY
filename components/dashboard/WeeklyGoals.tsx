"use client";

import { motion } from "framer-motion";
import { Target, CheckCircle2, Zap, Sparkles } from "lucide-react";

interface WeeklyGoalsProps {
  completedThisWeek?: number;
  targetChallenges?: number;
  streakThisWeek?: number;
  targetStreak?: number;
  xpThisWeek?: number;
  targetXp?: number;
}

export function WeeklyGoals({
  completedThisWeek = 4,
  targetChallenges = 5,
  streakThisWeek = 7,
  targetStreak = 7,
  xpThisWeek = 320,
  targetXp = 500,
}: WeeklyGoalsProps) {
  const goals = [
    {
      title: "Complete challenges",
      current: completedThisWeek,
      total: targetChallenges,
      unit: "",
      color: "var(--primary)",
      icon: Target,
    },
    {
      title: "Maintain streak",
      current: streakThisWeek,
      total: targetStreak,
      unit: "days",
      color: "#22c55e",
      icon: CheckCircle2,
    },
    {
      title: "Earn XP",
      current: xpThisWeek,
      total: targetXp,
      unit: "XP",
      color: "#f59e0b",
      icon: Zap,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut", delay: 0.4 }}
      className="rounded-3xl p-5 w-full bg-[var(--card)] border border-[var(--border)] glass-card"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles size={16} style={{ color: "var(--primary)" }} />
          <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">
            Weekly Goals
          </h3>
        </div>
        <span className="text-xs font-semibold text-[var(--primary)] bg-[var(--primary-glow)] border border-[var(--primary)] px-2.5 py-1 rounded-full">
          Week 2 of 8
        </span>
      </div>

      <div className="space-y-3.5">
        {goals.map((g) => {
          const pct = Math.min(100, Math.round((g.current / g.total) * 100));
          const Icon = g.icon;
          return (
            <div key={g.title} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[var(--foreground)] flex items-center gap-1.5">
                  <Icon size={13} color={g.color} />
                  {g.title}
                </span>
                <span className="font-bold text-[var(--muted-foreground)] tabular-nums">
                  {g.current} / {g.total} {g.unit}
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{ background: g.color }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-3 border-t border-[var(--border)] flex items-center gap-2 text-xs text-[var(--muted-foreground)] font-medium">
        <span className="text-emerald-500 font-bold">🎯 Status:</span>
        <span>1 more challenge to complete your weekly goal.</span>
      </div>
    </motion.div>
  );
}
