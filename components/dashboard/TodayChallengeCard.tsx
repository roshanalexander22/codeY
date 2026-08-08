"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, ChevronRight, CheckCircle2, AlertCircle, Play } from "lucide-react";

interface TodayChallengeCardProps {
  currentDay: number;
  title: string;
  estimatedTime: string;
  difficulty: string;
  isCompleted: boolean;
  isMissedDay?: boolean;
  isFirstDay?: boolean;
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
  isFirstDay,
}: TodayChallengeCardProps) {
  const diff = difficultyConfig[difficulty] || difficultyConfig.Beginner;

  const ctaText = isCompleted
    ? "Review Submission"
    : isFirstDay
    ? "Start Day 1"
    : `Continue Day ${currentDay}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut", delay: 0.3 }}
      whileHover={{ y: -2 }}
      className="rounded-3xl p-5 flex flex-col justify-between transition-all card glass-card"
      style={{
        background: "var(--card)",
        border: isCompleted
          ? "1px solid rgba(34, 197, 94, 0.3)"
          : isMissedDay
          ? "1px solid rgba(239, 68, 68, 0.3)"
          : "1px solid var(--border)",
      }}
    >
      <div>
        {/* Header Badges */}
        <div className="flex items-center gap-2 mb-3">
          <span
            className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
            style={{
              background: "var(--primary-glow)",
              border: "1px solid rgba(79, 70, 229, 0.25)",
              color: "var(--primary)",
            }}
          >
            Day {currentDay} Challenge
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
              <CheckCircle2 size={11} />
              Submitted
            </span>
          )}

          {isMissedDay && !isCompleted && (
            <span
              className="text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1"
              style={{
                background: "rgba(239, 68, 68, 0.1)",
                border: "1px solid rgba(239, 68, 68, 0.25)",
                color: "#f87171",
              }}
            >
              <AlertCircle size={11} />
              Needs Recovery
            </span>
          )}
        </div>

        {/* Title */}
        <h3
          className="text-base sm:text-lg font-bold leading-snug break-words mb-3 text-[var(--foreground)]"
        >
          {title}
        </h3>

        {/* Meta tags */}
        <div className="flex items-center gap-2.5 mb-5 flex-wrap">
          <div
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs text-[var(--muted-foreground)]"
            style={{ background: "rgba(161, 161, 170, 0.08)", border: "1px solid var(--border)" }}
          >
            <Clock size={13} className="text-[var(--muted-foreground)]" />
            <span>{estimatedTime}</span>
          </div>

          <div
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold"
            style={{
              background: diff.bg,
              border: `1px solid ${diff.border}`,
              color: diff.color,
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: diff.color }} />
            <span>{diff.label}</span>
          </div>
        </div>
      </div>

      {/* Primary CTA Button */}
      <Link
        href={`/day/${currentDay}`}
        id="open-today-challenge"
        className="flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-2xl font-bold text-sm transition-all duration-200 group cursor-pointer"
        style={
          isCompleted
            ? {
                background: "rgba(34, 197, 94, 0.12)",
                border: "1px solid rgba(34, 197, 94, 0.3)",
                color: "#4ade80",
              }
            : {
                background: "var(--primary)",
                color: "white",
                boxShadow: "0 4px 20px var(--primary-glow)",
              }
        }
      >
        {isCompleted ? (
          <>
            <CheckCircle2 size={16} />
            <span>{ctaText}</span>
          </>
        ) : (
          <>
            <Play size={15} className="fill-white text-white" />
            <span>{ctaText}</span>
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </Link>
    </motion.div>
  );
}
