"use client";

import { motion } from "framer-motion";
import { BookOpen, ArrowDown } from "lucide-react";

interface ChallengeCardProps {
  title: string;
  description: string;
  context: string;
  skills?: string[];
  isAlreadySubmitted?: boolean;
}

export function ChallengeCard({
  title,
  description,
  context,
  skills = [],
  isAlreadySubmitted = false,
}: ChallengeCardProps) {
  const handleStartClick = () => {
    const el = document.getElementById("submission-section");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
      className="px-4 py-2"
    >
      <div
        className="card p-6"
        style={{
          background: "linear-gradient(135deg, var(--card) 0%, rgba(79, 70, 229, 0.08) 100%)",
          borderColor: "rgba(79, 70, 229, 0.25)",
        }}
      >
        {/* Section label */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
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
              Today&apos;s Challenge
            </span>
          </div>

          {skills.length > 0 && (
            <div className="hidden sm:flex items-center gap-1.5 flex-wrap">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="text-[0.65rem] font-medium px-2 py-0.5 rounded-full"
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid var(--border)",
                    color: "var(--muted-foreground)",
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Title */}
        <h1
          className="text-xl sm:text-2xl font-black leading-tight mb-3"
          style={{ color: "var(--foreground)" }}
        >
          {title}
        </h1>

        {/* Description */}
        <p
          className="text-sm sm:text-base leading-relaxed mb-4"
          style={{ color: "var(--foreground)", opacity: 0.85 }}
        >
          {description}
        </p>

        {/* Mobile Skills tags if present */}
        {skills.length > 0 && (
          <div className="flex sm:hidden items-center gap-1.5 flex-wrap mb-4">
            {skills.map((skill) => (
              <span
                key={skill}
                className="text-[0.65rem] font-medium px-2 py-0.5 rounded-full"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid var(--border)",
                  color: "var(--muted-foreground)",
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        {/* Divider */}
        <hr className="divider mb-4" />

        {/* Context / Mentor note */}
        <div
          className="rounded-2xl p-4 mb-4"
          style={{
            background: "rgba(255, 255, 255, 0.03)",
            border: "1px solid var(--border)",
          }}
        >
          <p className="text-xs font-semibold mb-1" style={{ color: "#818cf8" }}>
            💬 Why this matters today
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
            {context}
          </p>
        </div>

        {/* CTA Button */}
        {!isAlreadySubmitted && (
          <button
            type="button"
            onClick={handleStartClick}
            className="btn btn-primary w-full sm:w-auto px-6 py-3 flex items-center justify-center gap-2 text-sm font-semibold"
          >
            Start Challenge
            <ArrowDown size={15} />
          </button>
        )}
      </div>
    </motion.div>
  );
}
