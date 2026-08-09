"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Flame, Zap, Trophy, Award, ExternalLink, Edit3, X } from "lucide-react";
import { toast } from "sonner";
import { DashboardUser } from "@/data/dashboard";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: DashboardUser;
  onEditClick: () => void;
}

export function ProfileModal({
  isOpen,
  onClose,
  user,
  onEditClick,
}: ProfileModalProps) {
  const handleViewPublicProfile = () => {
    toast.info("Public Profile Link Copied!", {
      description: "Recruiter share link copied to clipboard.",
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-4"
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm bg-[var(--card)] border border-[var(--border)] rounded-3xl p-6 shadow-2xl overflow-hidden relative glass-card"
            >
              {/* Close */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-1.5 rounded-xl hover:bg-zinc-800 text-zinc-400 transition-colors"
                aria-label="Close profile modal"
              >
                <X size={18} />
              </button>

              {/* Avatar & Header */}
              <div className="text-center pt-2 pb-4 border-b border-[var(--border)]">
                <div className="relative w-20 h-20 mx-auto mb-3">
                  {user.avatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-full h-full rounded-full object-cover border-2 border-indigo-500/50 p-0.5"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-indigo-600/20 border-2 border-indigo-500/40 flex items-center justify-center text-2xl font-black text-indigo-400">
                      {user.name.charAt(0)}
                    </div>
                  )}
                  <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#18181B]" />
                </div>

                <h2 className="text-lg font-bold text-[var(--foreground)]">{user.name}</h2>
                <p className="text-xs text-[var(--primary)] font-semibold mt-0.5">{user.track || "Student Challenger"}</p>
                <p className="text-[11px] text-[var(--muted-foreground)] mt-0.5">{user.college || "College Student"}</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-2.5 py-4">
                <div className="p-3 rounded-2xl bg-[var(--card)] border border-[var(--border)]">
                  <div className="flex items-center gap-1.5 text-[var(--muted-foreground)] text-xs mb-1">
                    <Flame size={14} className="text-orange-500" />
                    <span>Streak</span>
                  </div>
                  <p className="text-base font-black text-[var(--foreground)]">{user.streak} Days</p>
                </div>

                <div className="p-3 rounded-2xl bg-[var(--card)] border border-[var(--border)]">
                  <div className="flex items-center gap-1.5 text-[var(--muted-foreground)] text-xs mb-1">
                    <Zap size={14} className="text-indigo-400" />
                    <span>Progress</span>
                  </div>
                  <p className="text-base font-black text-[var(--foreground)]">Day {user.currentDay} / 60</p>
                </div>

                <div className="p-3 rounded-2xl bg-[var(--card)] border border-[var(--border)]">
                  <div className="flex items-center gap-1.5 text-[var(--muted-foreground)] text-xs mb-1">
                    <Trophy size={14} className="text-amber-400" />
                    <span>Total XP</span>
                  </div>
                  <p className="text-base font-black text-[var(--foreground)]">{user.totalXp.toLocaleString()} XP</p>
                </div>

                <div className="p-3 rounded-2xl bg-[var(--card)] border border-[var(--border)]">
                  <div className="flex items-center gap-1.5 text-[var(--muted-foreground)] text-xs mb-1">
                    <Award size={14} className="text-purple-400" />
                    <span>Level</span>
                  </div>
                  <p className="text-base font-black text-[var(--foreground)]">Level {user.level}</p>
                </div>
              </div>

              {/* Profile Completion Bar */}
              <div className="pb-4">
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-zinc-400 font-semibold">Profile Completion</span>
                  <span className="text-indigo-400 font-bold">{user.profileCompletion}%</span>
                </div>
                <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "var(--surface-fill, rgba(161,161,170,0.2))" }}>
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-purple-500 transition-all duration-500"
                    style={{ width: `${user.profileCompletion}%` }}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2 border-t border-[var(--border)]">
                <button
                  type="button"
                  onClick={handleViewPublicProfile}
                  className="flex-1 py-2.5 px-3 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:opacity-80 text-xs font-semibold text-[var(--foreground)] transition-colors flex items-center justify-center gap-1.5"
                >
                  <ExternalLink size={14} />
                  View Profile
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onEditClick();
                  }}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition-all flex items-center justify-center gap-1.5"
                >
                  <Edit3 size={14} />
                  Edit Profile
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
