"use client";

import { motion } from "framer-motion";
import { Target, Zap, Info } from "lucide-react";

interface ProgressCardProps {
  currentDay: number;
  totalDays: number;
  completedDays: number[];
  onClick?: () => void;
}

export function ProgressCard({
  currentDay,
  totalDays,
  completedDays,
  onClick,
}: ProgressCardProps) {
  const progress = (completedDays.length / totalDays) * 100;
  const circumference = 2 * Math.PI * 44; // radius = 44
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  // Next milestone
  const milestones = [7, 14, 21, 30, 45, 60];
  const nextMilestone = milestones.find((m) => m > completedDays.length) || 60;
  const daysToMilestone = nextMilestone - completedDays.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut", delay: 0.2 }}
      whileHover={{ y: -2 }}
      onClick={onClick}
      className="rounded-3xl p-5 cursor-pointer hover:border-indigo-500/40 transition-all flex flex-col justify-between h-full"
      style={{
        background: "#18181B",
        border: "1px solid rgba(79, 70, 229, 0.2)",
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold flex items-center gap-1.5" style={{ color: "#fafafa" }}>
            Challenge Progress
            <Info size={12} className="text-indigo-400 opacity-70" />
          </h3>
          <p className="text-xs mt-0.5" style={{ color: "#a1a1aa" }}>
            60-Day journey
          </p>
        </div>
        <div
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
          style={{
            background: "rgba(79, 70, 229, 0.12)",
            border: "1px solid rgba(79, 70, 229, 0.25)",
          }}
        >
          <Target size={12} color="#818cf8" />
          <span className="text-xs font-bold" style={{ color: "#818cf8" }}>
            Day {currentDay}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        {/* Progress ring */}
        <div className="relative flex-shrink-0">
          <svg width="110" height="110" viewBox="0 0 110 110">
            {/* Background track */}
            <circle
              cx="55"
              cy="55"
              r="44"
              fill="none"
              stroke="#27272a"
              strokeWidth="7"
            />
            {/* Progress arc */}
            <motion.circle
              cx="55"
              cy="55"
              r="44"
              fill="none"
              stroke="url(#progressGradient)"
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
              transform="rotate(-90 55 55)"
            />
            <defs>
              <linearGradient
                id="progressGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#4F46E5" />
                <stop offset="100%" stopColor="#818cf8" />
              </linearGradient>
            </defs>
          </svg>
          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="text-2xl font-black tabular-nums"
              style={{ color: "#fafafa" }}
            >
              {completedDays.length}
            </motion.span>
            <span className="text-xs" style={{ color: "#a1a1aa" }}>
              / {totalDays}
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex-1 space-y-4">
          {/* Days remaining */}
          <div>
            <p className="text-xs mb-1.5" style={{ color: "#a1a1aa" }}>
              Days remaining
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold" style={{ color: "#fafafa" }}>
                {totalDays - completedDays.length}
              </span>
              <span className="text-xs" style={{ color: "#a1a1aa" }}>
                days
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div>
            <div className="flex justify-between mb-1.5">
              <span className="text-xs" style={{ color: "#a1a1aa" }}>
                {Math.round(progress)}% complete
              </span>
            </div>
            <div
              className="rounded-full overflow-hidden"
              style={{ background: "#27272a", height: "6px" }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, #4F46E5, #818cf8)",
                }}
              />
            </div>
          </div>

          {/* Next milestone */}
          <div
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl"
            style={{
              background: "rgba(34, 197, 94, 0.08)",
              border: "1px solid rgba(34, 197, 94, 0.2)",
            }}
          >
            <Zap size={11} color="#4ade80" />
            <p className="text-xs" style={{ color: "#4ade80" }}>
              <span className="font-bold">{daysToMilestone} days</span> to Day{" "}
              {nextMilestone} milestone
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
