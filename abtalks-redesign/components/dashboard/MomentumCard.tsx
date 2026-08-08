"use client";

import { motion } from "framer-motion";
import { Gauge, Zap, TrendingUp, AlertTriangle, TrendingDown } from "lucide-react";

interface MomentumCardProps {
  score: number;
  label: string;
}

export function MomentumCard({ score, label }: MomentumCardProps) {
  const isHigh = score >= 80;
  const isMedium = score >= 50 && score < 80;
  const isLow = score < 50;

  const color = isHigh ? "#22c55e" : isMedium ? "#f59e0b" : "#ef4444";
  const bg = isHigh
    ? "rgba(34, 197, 94, 0.08)"
    : isMedium
    ? "rgba(245, 158, 11, 0.08)"
    : "rgba(239, 68, 68, 0.08)";
  const border = isHigh
    ? "rgba(34, 197, 94, 0.25)"
    : isMedium
    ? "rgba(245, 158, 11, 0.25)"
    : "rgba(239, 68, 68, 0.25)";

  const StatusIcon = isHigh ? Zap : isMedium ? TrendingUp : AlertTriangle;
  const TrendIcon = score > 60 ? TrendingUp : TrendingDown;

  // Segmented dots: 5 dots, each represents 20% of score
  const filledDots = Math.round(score / 20);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut", delay: 0.15 }}
      className="rounded-3xl p-5 relative overflow-hidden flex flex-col justify-between h-full"
      style={{
        background: "#18181B",
        border: `1px solid ${border}`,
      }}
    >
      {/* Subtle background orb */}
      <div
        className="absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: color }}
      />

      {/* Top Header */}
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: bg, border: `1px solid ${border}` }}
            >
              <Gauge size={16} color={color} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-zinc-100">Momentum</h3>
              <p className="text-[11px] text-zinc-400">Consistency score</p>
            </div>
          </div>

          {/* Score badge */}
          <div
            className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black tabular-nums"
            style={{ background: bg, border: `1px solid ${border}`, color }}
          >
            <StatusIcon size={11} />
            <span>{score}%</span>
          </div>
        </div>

        {/* Segmented dot progress */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1.5 flex-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.25, ease: "easeOut" }}
                className="flex-1 h-2 rounded-full origin-left"
                style={{
                  background: i < filledDots ? color : "#27272a",
                  boxShadow: i < filledDots ? `0 0 6px ${color}50` : "none",
                }}
              />
            ))}
          </div>
          <div className="flex items-center gap-1">
            <TrendIcon
              size={12}
              color={score > 60 ? "#22c55e" : "#f87171"}
            />
            <span
              className="text-[11px] font-semibold"
              style={{ color: score > 60 ? "#22c55e" : "#f87171" }}
            >
              {isHigh ? "Strong" : isMedium ? "Steady" : "Low"}
            </span>
          </div>
        </div>

        {/* Pace row */}
        <div className="flex items-center justify-between text-[11px] mb-2">
          <span className="text-zinc-500">Current pace</span>
          <span className="font-semibold" style={{ color }}>
            {isHigh
              ? "Above average"
              : isMedium
              ? "On track"
              : "Needs attention"}
          </span>
        </div>
      </div>

      {/* Subtitle */}
      <p
        className="text-xs text-zinc-400 leading-relaxed font-medium border-t border-zinc-800 pt-3"
        style={{ color: isLow ? "#a1a1aa" : "#71717a" }}
      >
        {label}
      </p>
    </motion.div>
  );
}
