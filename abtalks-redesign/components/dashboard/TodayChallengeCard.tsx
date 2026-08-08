"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, ChevronRight, CheckCircle2, AlertCircle } from "lucide-react";

interface TodayChallengeCardProps {
  currentDay: number;
  title: string;
  estimatedTime: string;
  difficulty: string;
  isCompleted: boolean;
  isMissedDay?: boolean;
}

const difficultyConfig: Record<
  string,
  { label: string; color: string; bg: string; border: string }
> = {
  Beginner: {
    label: "Beginner",
    color: "#4ade80",
    bg: "rgba(34, 197, 94, 0.08)",
    border: "rgba(34, 197, 94, 0.2)",
  },
  Intermediate: {
    label: "Intermediate",
    color: "#fbbf24",
    bg: "rgba(245, 158, 11, 0.08)",
    border: "rgba(245, 158, 11, 0.2)",
  },
  Advanced: {
    label: "Advanced",
    color: "#f87171",
    bg: "rgba(239, 68, 68, 0.08)",
    border: "rgba(239, 68, 68, 0.2)",
  },
};

export function TodayChallengeCard({
  currentDay,
  title,
  estimatedTime,
  difficulty,
  isCompleted,
  isMissedDay,
}: TodayChallengeCardProps) {
  const diff = difficultyConfig[difficulty] || difficultyConfig.Beginner;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut", delay: 0.3 }}
      className="rounded-3xl p-5"
      style={{
        background: "#18181B",
        border: isCompleted
          ? "1px solid rgba(34, 197, 94, 0.3)"
          : isMissedDay
          ? "1px solid rgba(239, 68, 68, 0.2)"
          : "1px solid rgba(79, 70, 229, 0.25)",
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span
              className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
              style={{
                background: "rgba(79, 70, 229, 0.12)",
                border: "1px solid rgba(79, 70, 229, 0.25)",
                color: "#818cf8",
              }}
            >
              Day {currentDay}
            </span>
            {isCompleted && (
              <span
                className="text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1"
                style={{
                  background: "rgba(34, 197, 94, 0.12)",
                  border: "1px solid rgba(34, 197, 94, 0.25)",
                  color: "#4ade80",
                }}
              >
                <CheckCircle2 size={10} />
                Done
              </span>
            )}
            {isMissedDay && !isCompleted && (
              <span
                className="text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1"
                style={{
                  background: "rgba(239, 68, 68, 0.08)",
                  border: "1px solid rgba(239, 68, 68, 0.2)",
                  color: "#f87171",
                }}
              >
                <AlertCircle size={10} />
                Overdue
              </span>
            )}
          </div>
          <h3
            className="text-base font-bold leading-tight"
            style={{ color: "#fafafa" }}
          >
            {title}
          </h3>
        </div>
      </div>

      {/* Meta info */}
      <div className="flex items-center gap-3 mb-5">
        <div
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid #27272a" }}
        >
          <Clock size={12} color="#a1a1aa" />
          <span className="text-xs" style={{ color: "#a1a1aa" }}>
            {estimatedTime}
          </span>
        </div>
        <div
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl"
          style={{
            background: diff.bg,
            border: `1px solid ${diff.border}`,
          }}
        >
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: diff.color }}
          />
          <span className="text-xs font-medium" style={{ color: diff.color }}>
            {diff.label}
          </span>
        </div>
      </div>

      {/* CTA Button */}
      <Link
        href={`/day/${currentDay}`}
        id="open-today-challenge"
        className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl font-semibold text-sm transition-all duration-200"
        style={
          isCompleted
            ? {
                background: "rgba(34, 197, 94, 0.1)",
                border: "1px solid rgba(34, 197, 94, 0.25)",
                color: "#4ade80",
              }
            : {
                background: "#4F46E5",
                color: "white",
                boxShadow: "0 4px 20px rgba(79, 70, 229, 0.35)",
              }
        }
      >
        {isCompleted ? (
          <>
            <CheckCircle2 size={16} />
            Review Submission
          </>
        ) : (
          <>
            Open Challenge
            <ChevronRight size={16} />
          </>
        )}
      </Link>
    </motion.div>
  );
}
