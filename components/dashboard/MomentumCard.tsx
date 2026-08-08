"use client";

import { motion } from "framer-motion";
import { Gauge, Zap, TrendingUp, AlertTriangle } from "lucide-react";

interface MomentumCardProps {
  score: number;
  label: string;
}

export function MomentumCard({ score, label }: MomentumCardProps) {
  const isHigh = score >= 80;
  const isMedium = score >= 50 && score < 80;

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut", delay: 0.15 }}
      className="rounded-3xl p-5 relative overflow-hidden flex flex-col justify-between glass-card"
      style={{
        background: "var(--card)",
        border: `1px solid ${border}`,
      }}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: bg }}
          >
            <Gauge size={16} color={color} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[var(--foreground)]">Momentum</h3>
            <p className="text-[11px] text-[var(--muted-foreground)]">Consistency score</p>
          </div>
        </div>

        <div
          className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold"
          style={{ background: bg, border: `1px solid ${border}`, color }}
        >
          <StatusIcon size={12} />
          <span>{score}%</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1.5 my-2">
        <div className="flex justify-between text-[11px] text-[var(--muted-foreground)]">
          <span>Current Pace</span>
          <span className="font-semibold" style={{ color }}>
            {isHigh ? "Strong" : isMedium ? "Steady" : "Low"}
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${score}%` }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            className="h-full rounded-full"
            style={{ background: color }}
          />
        </div>
      </div>

      {/* Subtitle / Feedback */}
      <p className="text-xs text-[var(--foreground)] leading-relaxed mt-1 font-medium">{label}</p>
    </motion.div>
  );
}
