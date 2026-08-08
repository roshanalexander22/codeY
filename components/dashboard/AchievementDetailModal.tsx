"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Star, Zap, Shield, Flame, Code2, CheckCircle2, Lock, X } from "lucide-react";
import { AchievementDetail } from "@/data/dashboard";

interface AchievementDetailModalProps {
  achievement: AchievementDetail | null;
  isOpen: boolean;
  onClose: () => void;
}

const iconComponentMap: Record<string, React.ElementType> = {
  Zap,
  Flame,
  Star,
  Code2,
  Shield,
  Trophy,
};

export function AchievementDetailModal({
  achievement,
  isOpen,
  onClose,
}: AchievementDetailModalProps) {
  if (!achievement) return null;

  const Icon = iconComponentMap[achievement.iconName] || Trophy;

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
              className="w-full max-w-xs bg-[#18181B] border border-zinc-800 rounded-3xl p-6 shadow-2xl overflow-hidden relative text-center"
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-1.5 rounded-xl hover:bg-zinc-800 text-zinc-400 transition-colors"
                aria-label="Close achievement detail"
              >
                <X size={18} />
              </button>

              {/* Icon badge */}
              <div
                className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-3 relative"
                style={{
                  background: achievement.earned ? achievement.bg : "rgba(255,255,255,0.04)",
                  border: `1.5px solid ${achievement.earned ? achievement.border : "#27272a"}`,
                }}
              >
                <Icon
                  size={32}
                  color={achievement.earned ? achievement.color : "#6b7280"}
                />
                {!achievement.earned && (
                  <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-400">
                    <Lock size={12} />
                  </div>
                )}
              </div>

              <h3 className="text-base font-bold text-zinc-100">{achievement.label}</h3>
              <p className="text-xs text-indigo-400 font-semibold mt-0.5">{achievement.description}</p>

              <div className="mt-3 p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800 text-left">
                <p className="text-xs text-zinc-300 leading-relaxed">{achievement.detailText}</p>
                {achievement.earned && achievement.earnedOn && (
                  <div className="mt-2.5 pt-2 border-t border-zinc-800 flex items-center gap-1 text-[11px] font-medium text-emerald-400">
                    <CheckCircle2 size={12} />
                    <span>Unlocked on {achievement.earnedOn}</span>
                  </div>
                )}
              </div>

              <button
                onClick={onClose}
                className="w-full mt-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-200 transition-colors"
              >
                Got it
              </button>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
