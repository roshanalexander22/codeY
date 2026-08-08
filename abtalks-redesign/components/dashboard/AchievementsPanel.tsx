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

  // Robust XP-to-level formula: 500 XP per level
  const XP_PER_LEVEL = 500;
  const xpIntoLevel = xp % XP_PER_LEVEL;
  const xpProgress = xpIntoLevel === 0 && xp > 0 ? 100 : (xpIntoLevel / XP_PER_LEVEL) * 100;
  const xpToNext = xpIntoLevel === 0 && xp > 0 ? 0 : XP_PER_LEVEL - xpIntoLevel;

  // Unused vars suppression
  void completedDays;
  void streak;

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
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold" style={{ color: "#fafafa" }}>
              Achievements
            </h3>
            <button
              type="button"
              onClick={() => onSelectAchievement && onSelectAchievement(achievementDetails[0])}
              className="text-[11px] font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              View all &rarr;
            </button>
          </div>
          <p className="text-xs mt-0.5" style={{ color: "#a1a1aa" }}>
            {isFirstDay
              ? "Earn your first badge today"
              : `${earnedCount} of ${achievementDetails.length} unlocked`}
          </p>
        </div>

        {/* XP + Level */}
        <div className="text-right">
          <div className="flex items-center gap-1 justify-end">
            <Rocket size={12} color="#818cf8" />
            <span className="text-xs font-black" style={{ color: "#818cf8" }}>
              Lvl {level}
            </span>
          </div>
          <span className="text-xs" style={{ color: "#a1a1aa" }}>
            {xp.toLocaleString()} XP
          </span>
        </div>
      </div>

      {/* XP progress bar with animated glow dot */}
      <div className="mb-5">
        <div className="flex justify-between text-xs mb-1.5" style={{ color: "#6b7280" }}>
          <span>Level {level}</span>
          <span>Level {level + 1}</span>
        </div>
        <div
          className="relative rounded-full overflow-visible"
          style={{ background: "#27272a", height: "6px" }}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${xpProgress}%` }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
            className="h-full rounded-full relative"
            style={{
              background: "linear-gradient(90deg, #4F46E5, #a78bfa)",
            }}
          >
            {/* Glowing endpoint dot */}
            {xpProgress > 5 && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.0, duration: 0.3 }}
                className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full"
                style={{
                  background: "#a78bfa",
                  boxShadow: "0 0 8px #a78bfa, 0 0 16px #a78bfa60",
                  transform: "translateX(50%) translateY(-50%)",
                }}
              />
            )}
          </motion.div>
        </div>
        <p className="text-xs mt-1.5" style={{ color: "#6b7280" }}>
          {xpToNext > 0 ? `${xpToNext} XP to next level` : "Level complete! 🎉"}
        </p>
      </div>

      {/* Achievements grid */}
      <div className="grid grid-cols-3 gap-2.5">
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
              whileHover={{ scale: item.earned ? 1.05 : 1.02 }}
              whileTap={{ scale: 0.96 }}
              className="flex flex-col items-center gap-1.5 p-2.5 rounded-2xl cursor-pointer text-left w-full transition-colors"
              style={{
                background: item.earned ? item.bg : "rgba(255,255,255,0.02)",
                border: `1px solid ${item.earned ? item.border : "#27272a"}`,
                opacity: item.earned ? 1 : 0.4,
              }}
              aria-label={`View achievement: ${item.label}`}
            >
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{
                  background: item.earned ? item.bg : "transparent",
                  boxShadow: item.earned ? `0 0 12px ${item.color}30` : "none",
                }}
              >
                <Icon size={16} color={item.earned ? item.color : "#4b5563"} />
              </div>
              <div className="text-center">
                <p
                  className="text-[10px] font-semibold leading-tight"
                  style={{
                    color: item.earned ? "#fafafa" : "#4b5563",
                  }}
                >
                  {item.label}
                </p>
                {item.earned && item.earnedOn ? (
                  <p className="text-[9px] mt-0.5 text-emerald-400 font-medium">
                    Unlocked
                  </p>
                ) : (
                  <p className="text-[9px] mt-0.5 text-zinc-500 font-bold tabular-nums">
                    {item.id === "halfway" ? "11 / 30" : item.id === "champion" ? "11 / 60" : "Locked"}
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
