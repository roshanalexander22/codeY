"use client";

import { motion } from "framer-motion";
import { Trophy, Star, Zap, Shield, Flame, Code2, Rocket } from "lucide-react";

interface Achievement {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
  color: string;
  bg: string;
  border: string;
  earned: boolean;
  earnedOn?: string;
}

interface AchievementsPanelProps {
  completedDays: number;
  streak: number;
  xp: number;
  level: number;
  isFirstDay?: boolean;
}

export function AchievementsPanel({
  completedDays,
  streak,
  xp,
  level,
  isFirstDay,
}: AchievementsPanelProps) {
  const achievements: Achievement[] = [
    {
      id: "first-blood",
      label: "First Blood",
      description: "Complete Day 1",
      icon: Zap,
      color: "#818cf8",
      bg: "rgba(79, 70, 229, 0.1)",
      border: "rgba(79, 70, 229, 0.25)",
      earned: completedDays >= 1,
      earnedOn: "Jul 27",
    },
    {
      id: "week-one",
      label: "Week One",
      description: "7-day streak",
      icon: Flame,
      color: "#f59e0b",
      bg: "rgba(245, 158, 11, 0.1)",
      border: "rgba(245, 158, 11, 0.25)",
      earned: streak >= 7,
      earnedOn: "Aug 2",
    },
    {
      id: "consistent",
      label: "Consistent",
      description: "11-day streak",
      icon: Star,
      color: "#fbbf24",
      bg: "rgba(251, 191, 36, 0.1)",
      border: "rgba(251, 191, 36, 0.25)",
      earned: streak >= 11,
      earnedOn: "Aug 6",
    },
    {
      id: "builder",
      label: "Builder",
      description: "12+ days done",
      icon: Code2,
      color: "#a78bfa",
      bg: "rgba(167, 139, 250, 0.1)",
      border: "rgba(167, 139, 250, 0.25)",
      earned: completedDays >= 12,
    },
    {
      id: "halfway",
      label: "Halfway",
      description: "30 days done",
      icon: Shield,
      color: "#22c55e",
      bg: "rgba(34, 197, 94, 0.1)",
      border: "rgba(34, 197, 94, 0.25)",
      earned: completedDays >= 30,
    },
    {
      id: "champion",
      label: "Champion",
      description: "60 days done",
      icon: Trophy,
      color: "#f97316",
      bg: "rgba(249, 115, 22, 0.1)",
      border: "rgba(249, 115, 22, 0.25)",
      earned: completedDays >= 60,
    },
  ];

  const earnedCount = achievements.filter((a) => a.earned).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut", delay: 0.45 }}
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
            Achievements
          </h3>
          <p className="text-xs mt-0.5" style={{ color: "#a1a1aa" }}>
            {isFirstDay ? "Earn your first badge today" : `${earnedCount} of ${achievements.length} unlocked`}
          </p>
        </div>

        {/* XP + Level */}
        <div className="text-right">
          <div className="flex items-center gap-1 justify-end">
            <Rocket size={12} color="#818cf8" />
            <span className="text-xs font-bold" style={{ color: "#818cf8" }}>
              Lvl {level}
            </span>
          </div>
          <span className="text-xs" style={{ color: "#a1a1aa" }}>
            {xp.toLocaleString()} XP
          </span>
        </div>
      </div>

      {/* XP progress bar */}
      <div className="mb-5">
        <div className="flex justify-between text-xs mb-1.5" style={{ color: "#6b7280" }}>
          <span>Level {level}</span>
          <span>Level {level + 1}</span>
        </div>
        <div
          className="rounded-full overflow-hidden"
          style={{ background: "#27272a", height: "6px" }}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((xp % 500) / 500) * 100}%` }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
            className="h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, #4F46E5, #a78bfa)",
            }}
          />
        </div>
        <p className="text-xs mt-1" style={{ color: "#6b7280" }}>
          {500 - (xp % 500)} XP to next level
        </p>
      </div>

      {/* Achievements grid */}
      <div className="grid grid-cols-3 gap-3">
        {achievements.map((achievement, i) => {
          const Icon = achievement.icon;
          return (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.5 + i * 0.06,
                duration: 0.3,
                ease: "easeOut",
              }}
              className="flex flex-col items-center gap-2 p-3 rounded-2xl"
              style={{
                background: achievement.earned ? achievement.bg : "rgba(255,255,255,0.02)",
                border: `1px solid ${achievement.earned ? achievement.border : "#27272a"}`,
                opacity: achievement.earned ? 1 : 0.4,
              }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{
                  background: achievement.earned ? achievement.bg : "transparent",
                }}
              >
                <Icon
                  size={18}
                  color={achievement.earned ? achievement.color : "#4b5563"}
                />
              </div>
              <div className="text-center">
                <p
                  className="text-xs font-semibold leading-tight"
                  style={{
                    color: achievement.earned ? "#fafafa" : "#4b5563",
                  }}
                >
                  {achievement.label}
                </p>
                {achievement.earned && achievement.earnedOn && (
                  <p className="text-xs mt-0.5" style={{ color: "#6b7280" }}>
                    {achievement.earnedOn}
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
