"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Flame, Play, ChevronRight } from "lucide-react";

interface MotivationalCTAProps {
  streak?: number;
  currentDay?: number;
}

export function MotivationalCTA({
  streak = 11,
  currentDay = 12,
}: MotivationalCTAProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut", delay: 0.65 }}
      className="rounded-3xl p-5 sm:p-6 w-full relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-card"
      style={{
        background: "var(--card)",
        border: "1px solid var(--primary)",
        boxShadow: "0 0 40px var(--primary-glow)",
      }}
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center flex-shrink-0">
          <Flame size={24} className="text-amber-500 fill-amber-500/30" />
        </div>
        <div>
          <h3 className="text-base font-black text-[var(--foreground)] flex items-center gap-2">
            🔥 You&apos;re on an {streak}-day streak!
          </h3>
          <p className="text-xs text-[var(--muted-foreground)] mt-1 leading-relaxed">
            Complete one more challenge today to keep your momentum going and stay visible to recruiters.
          </p>
        </div>
      </div>

      <Link
        href={`/day/${currentDay}`}
        className="px-5 py-3 rounded-2xl bg-[var(--primary)] hover:opacity-90 text-white font-bold text-xs flex items-center gap-2 transition-all flex-shrink-0 active:scale-95 shadow-lg shadow-[var(--primary-glow)] w-full sm:w-auto justify-center"
      >
        <Play size={14} className="fill-white" />
        <span>Continue Challenge</span>
        <ChevronRight size={14} />
      </Link>
    </motion.div>
  );
}
