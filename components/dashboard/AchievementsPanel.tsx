"use client";

import { motion } from "framer-motion";
import { Trophy, Star, Zap, Shield, Flame, Code2, Rocket } from "lucide-react";
import { achievementDetails, AchievementDetail } from "@/data/dashboard";

interface AchievementsPanelProps {
  completedDays: number;
  streak: number;
  xp: number;
  level: number;
  isFirstDay?: boolean;
  onSelectAchievement?: (achievement: AchievementDetail) => void;
}

export function AchievementsPanel({
  completedDays,
  streak,
  xp,
  level,
  isFirstDay,
  onSelectAchievement,
}: AchievementsPanelProps) {
  const earnedCount = achievementDetails.filter((a) => a.earned).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut", delay: 0.45 }}
      className="rounded-3xl p-5 bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] glass-card"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-[var(--foreground)]">
            Achievements
          </h3>
          <p className="text-xs text-[var(--muted-foreground)] mt-0.5">
            {isFirstDay
              ? "Earn your first badge today"
              : `${earnedCount} of ${achievementDetails.length} unlocked`}
          </p>
        </div>

        {/* XP + Level */}
        <div className="text-right">
          <div className="flex items-center gap-1 justify-end">
            <Rocket size={12} className="text-[var(--primary)]" />
            <span className="text-xs font-bold text-[var(--primary)]">
              Lvl {level}
            </span>
          </div>
          <span className="text-xs text-[var(--muted-foreground)]">
            {xp.toLocaleString()} XP
          </span>
        </div>
      </div>

      {/* XP progress bar */}
      <div className="mb-5">
        <div className="flex justify-between text-xs text-[var(--muted-foreground)] mb-1.5">
          <span>Level {level}</span>
          <span>Level {level + 1}</span>
        </div>
        <div className="rounded-full overflow-hidden bg-white/10 h-1.5">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((xp % 500) / 500) * 100}%` }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
            className="h-full rounded-full bg-[var(--primary)]"
          />
        </div>
        <p className="text-xs text-[var(--muted-foreground)] mt-1">
          {500 - (xp % 500)} XP to next level
        </p>
      </div>

      {/* Achievements grid */}
      <div className="grid grid-cols-3 gap-3">
        {achievementDetails.map((item, i) => {
          const iconMap: Record<string, React.ElementType> = {
            Zap,
            Flame,
            Star,
            Code2,
            Shield,
            Trophy,
          };
          const Icon = iconMap[item.iconName] || Trophy;

          return (
            <motion.button
              key={item.id}
              type="button"
              onClick={() => onSelectAchievement && onSelectAchievement(item)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.5 + i * 0.06,
                duration: 0.3,
                ease: "easeOut",
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className={`flex flex-col items-center gap-2 p-3 rounded-2xl cursor-pointer text-left w-full transition-all border ${
                item.earned
                  ? "bg-[var(--primary-glow)] border-[var(--primary)]"
                  : "bg-white/5 border-[var(--border)] opacity-50"
              }`}
              aria-label={`View achievement ${item.label}`}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
              >
                <Icon size={18} className={item.earned ? "text-[var(--primary)]" : "text-[var(--muted-foreground)]"} />
              </div>
              <div className="text-center">
                <p
                  className={`text-xs font-semibold leading-tight ${
                    item.earned ? "text-[var(--foreground)]" : "text-[var(--muted-foreground)]"
                  }`}
                >
                  {item.label}
                </p>
                {item.earned && item.earnedOn && (
                  <p className="text-[10px] text-[var(--muted-foreground)] mt-0.5">
                    {item.earnedOn}
                  </p>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
