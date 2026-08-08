"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, CheckCircle2, XCircle, Trophy, RotateCcw } from "lucide-react";

type EdgeCaseType = "no-streak" | "missed-yesterday" | "already-submitted" | "challenge-complete";

interface EdgeCaseBannerProps {
  type: EdgeCaseType;
  onViewSubmission?: () => void;
}

const configs = {
  "no-streak": {
    icon: RotateCcw,
    emoji: "👋",
    title: "Day 1 — Welcome!",
    message:
      "This is the beginning. Don't think too much. Just build something today and submit your proof.",
    bg: "rgba(79, 70, 229, 0.08)",
    border: "rgba(79, 70, 229, 0.3)",
    iconColor: "#818cf8",
    titleColor: "#c7d2fe",
  },
  "missed-yesterday": {
    icon: AlertTriangle,
    emoji: "⚠️",
    title: "Streak reset",
    message:
      "You missed yesterday. Your streak is back to 0 — but you're still in the challenge. Start fresh today.",
    bg: "rgba(239, 68, 68, 0.08)",
    border: "rgba(239, 68, 68, 0.3)",
    iconColor: "#f87171",
    titleColor: "#fca5a5",
  },
  "already-submitted": {
    icon: CheckCircle2,
    emoji: "✅",
    title: "Already submitted today",
    message: "Great job! You've already completed Day 12. Come back tomorrow for Day 13.",
    bg: "rgba(34, 197, 94, 0.08)",
    border: "rgba(34, 197, 94, 0.3)",
    iconColor: "#4ade80",
    titleColor: "#86efac",
  },
  "challenge-complete": {
    icon: Trophy,
    emoji: "🏆",
    title: "You completed all 60 days!",
    message: "An incredible achievement. You built every single day. Your certificate is ready.",
    bg: "rgba(245, 158, 11, 0.08)",
    border: "rgba(245, 158, 11, 0.3)",
    iconColor: "#fbbf24",
    titleColor: "#fde68a",
  },
};

export function EdgeCaseBanner({ type, onViewSubmission }: EdgeCaseBannerProps) {
  const config = configs[type];
  const Icon = config.icon;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="mx-4 my-2 rounded-2xl p-4"
        style={{
          background: config.bg,
          border: `1px solid ${config.border}`,
        }}
        role="alert"
      >
        <div className="flex items-start gap-3">
          <span className="text-xl flex-shrink-0 mt-0.5">{config.emoji}</span>
          <div className="flex-1">
            <p
              className="text-sm font-semibold mb-1"
              style={{ color: config.titleColor }}
            >
              {config.title}
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
              {config.message}
            </p>
            {type === "already-submitted" && onViewSubmission && (
              <button
                onClick={onViewSubmission}
                className="mt-3 text-sm font-semibold"
                style={{ color: "#4ade80", background: "none", border: "none", cursor: "pointer", padding: 0 }}
              >
                View your submission →
              </button>
            )}
            {type === "challenge-complete" && (
              <button
                className="mt-3 text-sm font-semibold"
                style={{ color: "#fbbf24", background: "none", border: "none", cursor: "pointer", padding: 0 }}
              >
                Download Certificate →
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
