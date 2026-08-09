"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Clock,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Play,
  Timer,
  Share2,
} from "lucide-react";
import { useEffect, useState } from "react";

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

// ── Midnight countdown — IST (UTC+5:30) ─────────────────────────────────────
function useMidnightCountdown() {
  const getTimeLeft = () => {
    const now = new Date();
    // IST offset: UTC+5:30
    const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;
    const nowIST = new Date(now.getTime() + IST_OFFSET_MS - now.getTimezoneOffset() * 60000);

    const midnight = new Date(nowIST);
    midnight.setHours(24, 0, 0, 0);

    const diffMs = midnight.getTime() - nowIST.getTime();
    const totalSecs = Math.max(0, Math.floor(diffMs / 1000));
    const hours = Math.floor(totalSecs / 3600);
    const minutes = Math.floor((totalSecs % 3600) / 60);
    const isUrgent = hours < 2;
    const isCritical = hours === 0 && minutes <= 30;

    return {
      hours,
      minutes,
      label:
        hours > 0
          ? `${hours}h ${minutes}m left`
          : `${minutes}m left`,
      isUrgent,
      isCritical,
    };
  };

  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 60_000);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return timeLeft;
}

// ── LinkedIn share quick-action ──────────────────────────────────────────────
function LinkedInShareButton({ day, title }: { day: number; title: string }) {
  const text = encodeURIComponent(
    `Day ${day} of #ABTalks 60-Day Challenge ✅\n\nToday I built: ${title}\n\nBuilding consistently, one day at a time. 🔥\n\n#BuildInPublic #100DaysOfCode #ABTalks`
  );
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?text=${text}`;

  return (
    <a
      href={linkedInUrl}
      target="_blank"
      rel="noopener noreferrer"
      id="share-linkedin"
      className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-2xl font-semibold text-sm transition-all duration-200 active:scale-[0.98]"
      style={{
        background: "rgba(10, 102, 194, 0.12)",
        border: "1px solid rgba(10, 102, 194, 0.35)",
        color: "#60a5fa",
      }}
    >
      <Share2 size={15} />
      <span>Share on LinkedIn</span>
    </a>
  );
}

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
  const countdown = useMidnightCountdown();

  const ctaText = isCompleted
    ? "Review Submission"
    : isFirstDay
    ? "Start Day 1"
    : `Open Day ${currentDay}`;

  const cardBorder = isCompleted
    ? "1px solid rgba(34, 197, 94, 0.3)"
    : isMissedDay
    ? "1px solid rgba(239, 68, 68, 0.3)"
    : countdown.isCritical
    ? "1px solid rgba(239, 68, 68, 0.4)"
    : countdown.isUrgent
    ? "1px solid rgba(245, 158, 11, 0.35)"
    : "1px solid rgba(79, 70, 229, 0.3)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut", delay: 0.3 }}
      className="rounded-3xl p-5 flex flex-col justify-between transition-all duration-300 h-full"
      style={{
        background: "#18181B",
        border: cardBorder,
        boxShadow: isCompleted
          ? "0 0 32px rgba(34, 197, 94, 0.06)"
          : countdown.isUrgent && !isCompleted
          ? "0 0 32px rgba(239, 68, 68, 0.06)"
          : "none",
      }}
    >
      <div>
        {/* Header Badges */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span
            className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
            style={{
              background: "rgba(79, 70, 229, 0.12)",
              border: "1px solid rgba(79, 70, 229, 0.25)",
              color: "#818cf8",
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
          className="text-base sm:text-lg font-bold leading-snug break-words mb-3"
          style={{ color: "#fafafa" }}
        >
          {title}
        </h3>

        {/* Meta tags */}
        <div className="flex items-center gap-2.5 mb-3 flex-wrap">
          <div
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs text-zinc-400"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid #27272a" }}
          >
            <Clock size={13} color="#a1a1aa" />
            <span>⏱ {estimatedTime}</span>
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

          <div
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold text-indigo-300"
            style={{ background: "rgba(79, 70, 229, 0.12)", border: "1px solid rgba(79, 70, 229, 0.25)" }}
          >
            <span>+150 XP</span>
          </div>
        </div>

        {/* Skills */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[11px] text-zinc-500 font-semibold">Skills:</span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {["Express", "MongoDB", "REST API"].map((skill) => (
              <span
                key={skill}
                className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-zinc-800/80 text-zinc-300 border border-zinc-700/60"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* ── Midnight Countdown (only when not completed) ── */}
        {!isCompleted && !isMissedDay && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ delay: 0.5, duration: 0.3 }}
            className="mb-4 flex items-center gap-2 px-3 py-2.5 rounded-2xl"
            style={{
              background: countdown.isCritical
                ? "rgba(239, 68, 68, 0.08)"
                : countdown.isUrgent
                ? "rgba(245, 158, 11, 0.08)"
                : "rgba(255,255,255,0.03)",
              border: `1px solid ${
                countdown.isCritical
                  ? "rgba(239, 68, 68, 0.25)"
                  : countdown.isUrgent
                  ? "rgba(245, 158, 11, 0.22)"
                  : "#27272a"
              }`,
            }}
          >
            <Timer
              size={13}
              color={
                countdown.isCritical
                  ? "#f87171"
                  : countdown.isUrgent
                  ? "#fbbf24"
                  : "#6b7280"
              }
            />
            <span
              className="text-xs font-semibold"
              style={{
                color: countdown.isCritical
                  ? "#f87171"
                  : countdown.isUrgent
                  ? "#fbbf24"
                  : "#6b7280",
              }}
            >
              Submit before midnight IST
            </span>
            <span
              className="text-xs font-black tabular-nums ml-auto"
              style={{
                color: countdown.isCritical
                  ? "#f87171"
                  : countdown.isUrgent
                  ? "#fbbf24"
                  : "#a1a1aa",
              }}
            >
              {countdown.label}
            </span>
          </motion.div>
        )}
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-2.5">
        {/* Primary CTA */}
        <Link
          href={`/day/${currentDay}`}
          id="open-today-challenge"
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-2xl font-bold text-sm transition-all duration-200 group active:scale-[0.98]"
          style={
            isCompleted
              ? {
                  background: "rgba(34, 197, 94, 0.12)",
                  border: "1px solid rgba(34, 197, 94, 0.3)",
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
              <span>{ctaText}</span>
            </>
          ) : (
            <>
              <Play size={15} className="fill-white" />
              <span>Start Challenge</span>
              <ChevronRight
                size={16}
                className="group-hover:translate-x-1 transition-transform ml-auto"
              />
            </>
          )}
        </Link>

        {/* View Details CTA */}
        <Link
          href={`/day/${currentDay}`}
          className="flex items-center justify-center gap-1.5 py-3 px-4 rounded-2xl font-semibold text-xs transition-all duration-200 active:scale-[0.98] bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-zinc-100 hover:border-zinc-700"
        >
          <span>View Details</span>
        </Link>

        {/* LinkedIn share — only visible when completed */}
        {isCompleted && (
          <LinkedInShareButton day={currentDay} title={title} />
        )}
      </div>
    </motion.div>
  );
}
