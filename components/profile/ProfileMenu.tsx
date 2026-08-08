"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, User, Zap, Flame, RotateCcw, X, ExternalLink } from "lucide-react";
import { useStudentProfile } from "@/context/ProfileContext";
import { Avatar } from "@/components/ui/avatar";

interface ProfileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSettings: () => void;
  onOpenProfileModal?: () => void;
}

export function ProfileMenu({
  isOpen,
  onClose,
  onOpenSettings,
  onOpenProfileModal,
}: ProfileMenuProps) {
  const { profile, resetDemoProfile } = useStudentProfile();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[90] flex items-start justify-end p-4 pt-16 sm:p-6 sm:pt-20 pointer-events-none">
        {/* Backdrop click to close */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-xs pointer-events-auto"
          onClick={onClose}
        />

        {/* Menu Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="pointer-events-auto w-full max-w-sm rounded-2xl border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] p-5 shadow-2xl space-y-4 relative z-10 glass-modal"
        >
          {/* Header with Avatar & Student Info */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Avatar src={profile.avatar} name={profile.name} size="lg" onlineDot />
              <div>
                <h3 className="text-sm font-bold text-[var(--foreground)]">{profile.name}</h3>
                <p className="text-xs text-[var(--muted-foreground)]">{profile.username}</p>
                <span className="text-[0.65rem] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 mt-1 inline-block">
                  {profile.track}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-white/5 text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            >
              <X size={16} />
            </button>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-white/[0.03] border border-[var(--border)]">
            <div className="flex items-center gap-2">
              <span className="text-base streak-fire">🔥</span>
              <div>
                <p className="text-[0.65rem] text-[var(--muted-foreground)] uppercase font-semibold">Streak</p>
                <p className="text-xs font-bold text-amber-400">{profile.streak} Days</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Zap size={16} className="text-indigo-400" fill="currentColor" />
              <div>
                <p className="text-[0.65rem] text-[var(--muted-foreground)] uppercase font-semibold">Total XP</p>
                <p className="text-xs font-bold text-indigo-400">{profile.totalXp} XP</p>
              </div>
            </div>
          </div>

          {/* Menu Actions */}
          <div className="space-y-1 pt-1">
            {onOpenProfileModal && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenProfileModal();
                }}
                className="w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs font-medium hover:bg-white/5 transition-colors text-[var(--foreground)]"
              >
                <div className="flex items-center gap-2.5">
                  <User size={15} className="text-indigo-400" />
                  <span>View Student Profile</span>
                </div>
                <ExternalLink size={13} className="text-[var(--muted-foreground)]" />
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenSettings();
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs font-medium hover:bg-white/5 transition-colors text-[var(--foreground)]"
            >
              <div className="flex items-center gap-2.5">
                <Settings size={15} className="text-purple-400" />
                <span>Global Settings</span>
              </div>
              <span className="text-[0.65rem] text-[var(--muted-foreground)]">Preferences</span>
            </button>

            <button
              type="button"
              onClick={() => {
                resetDemoProfile();
                onClose();
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs font-medium hover:bg-rose-500/10 text-rose-400 transition-colors mt-2"
            >
              <div className="flex items-center gap-2.5">
                <RotateCcw size={15} />
                <span>Reset Demo Profile State</span>
              </div>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
