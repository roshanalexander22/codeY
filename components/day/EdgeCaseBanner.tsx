"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, CheckCircle2, Trophy, RotateCcw } from "lucide-react";

type EdgeCaseType = "no-streak" | "missed-yesterday" | "already-submitted" | "challenge-complete";

interface EdgeCaseBannerProps {
  type: EdgeCaseType;
  onViewSubmission?: () => void;
}

const configs = {
  "no-streak": {
    icon: RotateCcw,
    emoji: "🚀",
    title: "Your first day starts here",
    message:
      "Complete today's challenge to kickstart your 60-day coding streak and build momentum.",
    bg: "rgba(79, 70, 229, 0.08)",
    border: "rgba(79, 70, 229, 0.3)",
    iconColor: "#818cf8",
    titleColor: "#c7d2fe",
  },
  "missed-yesterday": {
    icon: AlertTriangle,
    emoji: "💪",
    title: "Yesterday got away from you",
    message:
      "You don't lose the skills or code you've already built. Dust off your terminal and jump right back in today.",
    bg: "rgba(245, 158, 11, 0.08)",
    border: "rgba(245, 158, 11, 0.3)",
    iconColor: "#fbbf24",
    titleColor: "#fde68a",
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
                type="button"
                onClick={onViewSubmission}
                className="mt-3 text-sm font-semibold hover:underline"
                style={{ color: "#4ade80", background: "none", border: "none", cursor: "pointer", padding: 0 }}
              >
                View your submission →
              </button>
            )}
            {type === "missed-yesterday" && (
              <button
                type="button"
                onClick={() => {
                  document.getElementById("submission-section")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="mt-3 text-sm font-semibold hover:underline"
                style={{ color: "#fbbf24", background: "none", border: "none", cursor: "pointer", padding: 0 }}
              >
                Continue today&apos;s challenge →
              </button>
            )}
            {type === "challenge-complete" && (
              <button
                type="button"
                className="mt-3 text-sm font-semibold hover:underline"
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
