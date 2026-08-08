"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Target, Calendar, Flame, TrendingUp, CheckCircle2, X } from "lucide-react";
import { DashboardUser } from "@/data/dashboard";

interface ProgressDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: DashboardUser;
}

export function ProgressDetailModal({
  isOpen,
  onClose,
  user,
}: ProgressDetailModalProps) {
  const completedCount = user.completedDays.length;
  const totalDays = 60;
  const remainingDays = totalDays - completedCount;
  const percentage = Math.round((completedCount / totalDays) * 100);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm bg-[#18181B] border border-zinc-800 rounded-3xl p-6 shadow-2xl overflow-hidden relative"
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-1.5 rounded-xl hover:bg-zinc-800 text-zinc-400 transition-colors"
                aria-label="Close progress details"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-2 mb-4">
                <Target size={20} className="text-indigo-400" />
                <h3 className="text-base font-bold text-zinc-100">60-Day Progress Breakdown</h3>
              </div>

              {/* Main Gauge Stats */}
              <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/30 text-center mb-4">
                <p className="text-3xl font-black text-indigo-300">{percentage}%</p>
                <p className="text-xs text-zinc-400 mt-1 font-semibold">Challenge Overall Completion</p>
                <div className="w-full h-2.5 rounded-full bg-zinc-800 mt-3 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-indigo-400"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>

              {/* Detailed Breakdown Items */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                  <div className="flex items-center gap-2 text-xs text-zinc-300">
                    <CheckCircle2 size={16} className="text-emerald-400" />
                    <span>Completed Days</span>
                  </div>
                  <span className="text-sm font-bold text-zinc-100">{completedCount} of 60 days</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                  <div className="flex items-center gap-2 text-xs text-zinc-300">
                    <Calendar size={16} className="text-indigo-400" />
                    <span>Days Remaining</span>
                  </div>
                  <span className="text-sm font-bold text-zinc-100">{remainingDays} days</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                  <div className="flex items-center gap-2 text-xs text-zinc-300">
                    <Flame size={16} className="text-orange-400" />
                    <span>Current Streak</span>
                  </div>
                  <span className="text-sm font-bold text-zinc-100">{user.streak} days</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                  <div className="flex items-center gap-2 text-xs text-zinc-300">
                    <TrendingUp size={16} className="text-amber-400" />
                    <span>Best Streak Record</span>
                  </div>
                  <span className="text-sm font-bold text-zinc-100">{user.longestStreak} days</span>
                </div>
              </div>

              <div className="mt-5 text-center">
                <button
                  onClick={onClose}
                  className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-200 transition-colors"
                >
                  Close Summary
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
