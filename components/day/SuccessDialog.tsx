"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { CheckCircle2, Zap, ArrowRight, X, Eye } from "lucide-react";
import Link from "next/link";

interface TomorrowChallenge {
  id: number;
  title: string;
  difficulty: string;
  estimatedTime: string;
}

interface SuccessDialogProps {
  isOpen: boolean;
  dayId: number;
  xpEarned: number;
  newStreak: number;
  tomorrowChallenge?: TomorrowChallenge | null;
  onClose: () => void;
}

function useCountUp(target: number, duration: number, isActive: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, isActive]);

  return count;
}

export function SuccessDialog({
  isOpen,
  dayId,
  xpEarned,
  newStreak,
  tomorrowChallenge,
  onClose,
}: SuccessDialogProps) {
  const xp = useCountUp(xpEarned, 1200, isOpen);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0, 0, 0, 0.75)",
              backdropFilter: "blur(8px)",
              zIndex: 100,
            }}
            aria-hidden="true"
          />

          {/* Dialog Container */}
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 101,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "16px",
              pointerEvents: "none",
            }}
          >
            <motion.div
              key="dialog"
              role="dialog"
              aria-modal="true"
              aria-labelledby="success-title"
              initial={{ opacity: 0, scale: 0.9, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
              style={{
                pointerEvents: "auto",
                width: "100%",
                maxWidth: "480px",
              }}
            >
              <div
                className="card p-6 relative overflow-hidden glass-modal"
                style={{
                  borderRadius: "24px",
                  background: "linear-gradient(170deg, var(--card) 0%, var(--primary-glow) 100%)",
                  borderColor: "var(--primary)",
                  boxShadow: "0 20px 50px rgba(0, 0, 0, 0.3)",
                }}
              >
                {/* Close button */}
                <button
                  type="button"
                  onClick={onClose}
                  className="absolute top-4 right-4 w-8 h-8 rounded-xl flex items-center justify-center transition-colors hover:bg-[var(--surface-fill)]"
                  style={{
                    background: "var(--surface-fill)",
                    border: "1px solid var(--border)",
                    cursor: "pointer",
                  }}
                  aria-label="Close"
                >
                  <X size={15} style={{ color: "var(--muted-foreground)" }} />
                </button>

                {/* Check icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                  className="flex justify-center mb-4"
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{
                      background: "rgba(34, 197, 94, 0.15)",
                      border: "2px solid rgba(34, 197, 94, 0.4)",
                      boxShadow: "0 0 32px rgba(34, 197, 94, 0.25)",
                    }}
                  >
                    <CheckCircle2 size={28} style={{ color: "#22c55e" }} />
                  </div>
                </motion.div>

                {/* Title */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.25 }}
                  className="text-center mb-6"
                >
                  <h2
                    id="success-title"
                    className="text-xl font-black mb-1"
                    style={{ color: "var(--foreground)" }}
                  >
                    Day {dayId} Complete! 🎉
                  </h2>
                  <p className="text-sm font-medium" style={{ color: "var(--primary)" }}>
                    You&apos;re building momentum.
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>
                    Your proof of work is verified and submitted.
                  </p>
                </motion.div>

                {/* Stats row */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.25 }}
                  className="grid grid-cols-2 gap-3 mb-5"
                >
                  {/* XP earned */}
                  <div
                    className="rounded-2xl p-4 text-center"
                    style={{
                      background: "var(--primary-glow)",
                      border: "1px solid var(--primary)",
                    }}
                  >
                    <Zap
                      size={20}
                      fill="currentColor"
                      className="mx-auto mb-1"
                      style={{ color: "var(--primary)" }}
                    />
                    <p
                      className="text-2xl font-black xp-appear"
                      style={{ color: "var(--foreground)" }}
                    >
                      +{xp}
                    </p>
                    <p className="text-xs" style={{ color: "var(--primary)" }}>
                      XP Earned
                    </p>
                  </div>

                  {/* Streak */}
                  <div
                    className="rounded-2xl p-4 text-center"
                    style={{
                      background: "rgba(245, 158, 11, 0.1)",
                      border: "1px solid rgba(245, 158, 11, 0.25)",
                    }}
                  >
                    <span className="text-xl streak-fire block mb-1">🔥</span>
                    <p className="text-2xl font-black" style={{ color: "#fde68a" }}>
                      {newStreak}
                    </p>
                    <p className="text-xs" style={{ color: "#fbbf24" }}>
                      Day Streak
                    </p>
                  </div>
                </motion.div>

                {/* Tomorrow preview */}
                {tomorrowChallenge && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.25 }}
                    className="rounded-2xl p-4 mb-5"
                    style={{
                      background: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs font-semibold" style={{ color: "var(--muted-foreground)" }}>
                        Next Challenge → Day {tomorrowChallenge.id}
                      </p>
                      <span className="text-[0.65rem] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-medium">
                        Available tomorrow
                      </span>
                    </div>
                    <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                      {tomorrowChallenge.title}
                    </p>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="badge badge-warning" style={{ fontSize: "0.65rem" }}>
                        {tomorrowChallenge.difficulty}
                      </span>
                      <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                        {tomorrowChallenge.estimatedTime}
                      </span>
                    </div>
                  </motion.div>
                )}

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35, duration: 0.25 }}
                  className="space-y-2"
                >
                  <Link
                    href="/dashboard"
                    className="btn btn-primary w-full flex items-center justify-center gap-2"
                    id="go-to-dashboard-btn"
                  >
                    Back to Dashboard
                    <ArrowRight size={16} />
                  </Link>

                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full py-2.5 text-xs text-center font-medium rounded-xl flex items-center justify-center gap-1.5 hover:bg-white/5 transition-colors"
                    style={{ color: "var(--muted-foreground)", background: "transparent", border: "none", cursor: "pointer" }}
                  >
                    <Eye size={13} />
                    Review today&apos;s work
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
