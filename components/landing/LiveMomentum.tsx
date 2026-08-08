"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Users, GitCommit } from "lucide-react";

export function LiveMomentum() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-3.5 py-1.5 rounded-full bg-[#18181B] border border-[#27272A] shadow-[0_0_20px_rgba(79,70,229,0.15)] text-xs text-[#FAFAFA]"
    >
      {/* Pulse Dot */}
      <span className="flex items-center gap-1.5 font-semibold text-[#22C55E]">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#22C55E]"></span>
        </span>
        LIVE CHALLENGE
      </span>

      <span className="text-[#3F3F46] hidden xs:inline">•</span>

      {/* Building today count */}
      <span className="text-[#A1A1AA] flex items-center gap-1">
        <Users className="h-3.5 w-3.5 text-[#818CF8]" />
        <strong className="text-[#FAFAFA] font-mono">1,420</strong> students building today
      </span>

      <span className="text-[#3F3F46] hidden sm:inline">•</span>

      {/* Commits count */}
      <span className="text-[#A1A1AA] hidden sm:flex items-center gap-1">
        <GitCommit className="h-3.5 w-3.5 text-[#22C55E]" />
        <strong className="text-[#FAFAFA] font-mono">12,480+</strong> commits this week
      </span>
    </motion.div>
  );
}
