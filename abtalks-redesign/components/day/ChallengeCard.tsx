"use client";

import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

interface ChallengeCardProps {
  title: string;
  description: string;
  context: string;
}

export function ChallengeCard({ title, description, context }: ChallengeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
      className="px-4 py-2"
    >
      <div
        className="card p-5"
        style={{
          background: "linear-gradient(135deg, var(--card) 0%, rgba(79, 70, 229, 0.06) 100%)",
          borderColor: "rgba(79, 70, 229, 0.2)",
        }}
      >
        {/* Section label */}
        <div className="flex items-center gap-2 mb-3">
          <div
            className="w-7 h-7 rounded-xl flex items-center justify-center"
            style={{ background: "var(--primary-glow)", border: "1px solid rgba(79, 70, 229, 0.3)" }}
          >
            <BookOpen size={14} style={{ color: "#818cf8" }} />
          </div>
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "#818cf8", letterSpacing: "0.1em" }}
          >
            Today's Challenge
          </span>
        </div>

        {/* Title */}
        <h1
          className="text-xl font-black leading-tight mb-3"
          style={{ color: "var(--foreground)" }}
        >
          {title}
        </h1>

        {/* Description */}
        <p
          className="text-sm leading-relaxed mb-4"
          style={{ color: "var(--foreground)", opacity: 0.85 }}
        >
          {description}
        </p>

        {/* Divider */}
        <hr className="divider mb-4" />

        {/* Context / Mentor note */}
        <div
          className="rounded-2xl p-3"
          style={{
            background: "rgba(255, 255, 255, 0.03)",
            border: "1px solid var(--border)",
          }}
        >
          <p className="text-xs font-semibold mb-1" style={{ color: "var(--muted)" }}>
            💬 Why this matters today
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            {context}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
