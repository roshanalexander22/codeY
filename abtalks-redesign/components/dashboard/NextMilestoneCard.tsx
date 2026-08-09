"use client";

import { motion } from "framer-motion";
import { Award, Gift, Clock } from "lucide-react";

interface NextMilestoneCardProps {
  currentDay?: number;
  milestoneDay?: number;
  rewardXp?: number;
}

export function NextMilestoneCard({
  currentDay = 12,
  milestoneDay = 14,
  rewardXp = 250,
}: NextMilestoneCardProps) {
  const daysLeft = Math.max(0, milestoneDay - currentDay);
  const pct = Math.min(100, Math.round((currentDay / milestoneDay) * 100));

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut", delay: 0.5 }}
      className="rounded-3xl p-5 bg-[#18181B] border border-zinc-800 flex flex-col justify-between h-full"
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Award size={16} className="text-amber-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-200">
              Next Milestone
            </h3>
          </div>
          <span className="text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full flex items-center gap-1">
            <Gift size={11} />
            +{rewardXp} XP Reward
          </span>
        </div>

        <div className="mt-2">
          <h4 className="text-base font-bold text-zinc-100 flex items-center gap-2">
            🏆 Day {milestoneDay} Milestone
          </h4>
          <p className="text-xs text-zinc-400 mt-1 flex items-center gap-1">
            <Clock size={12} className="text-zinc-500" />
            <span>{daysLeft} days remaining until unlock</span>
          </p>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-zinc-800/80">
        <div className="flex justify-between text-xs mb-1.5 font-medium">
          <span className="text-zinc-400">Progress</span>
          <span className="text-zinc-200 font-bold tabular-nums">
            {currentDay} / {milestoneDay} days ({pct}%)
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full rounded-full bg-gradient-to-r from-amber-500 to-yellow-400"
          />
        </div>
      </div>
    </motion.div>
  );
}
