"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Circle } from "lucide-react";

interface ReadinessField {
  key: string;
  label: string;
  filled: boolean;
}

interface SubmissionReadinessProps {
  fields: ReadinessField[];
}

export function SubmissionReadiness({ fields }: SubmissionReadinessProps) {
  const filled = fields.filter((f) => f.filled).length;
  const total = fields.length;
  const score = total > 0 ? Math.round((filled / total) * 100) : 0;

  const scoreColor =
    score === 100
      ? "#4ade80"
      : score >= 66
        ? "#fbbf24"
        : score >= 33
          ? "#818cf8"
          : "var(--muted-foreground)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut", delay: 0.22 }}
      className="px-4 py-2"
    >
      <div
        className="card p-5"
        style={{
          borderColor:
            score === 100 ? "rgba(34, 197, 94, 0.3)" : "var(--border)",
          transition: "border-color 0.3s ease",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "var(--muted-foreground)", letterSpacing: "0.1em" }}
          >
            Submission Readiness
          </span>
          <motion.span
            key={score}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-lg font-black"
            style={{ color: scoreColor }}
          >
            {score}%
          </motion.span>
        </div>

        {/* Progress track */}
        <div
          className="w-full rounded-full mb-4"
          style={{ height: "6px", background: "rgba(255,255,255,0.06)" }}
          role="progressbar"
          aria-valuenow={score}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Submission readiness: ${score}%`}
        >
          <motion.div
            className="rounded-full h-full"
            animate={{ width: `${score}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{
              background:
                score === 100
                  ? "#4ade80"
                  : `linear-gradient(90deg, #4F46E5, ${scoreColor})`,
            }}
          />
        </div>

        {/* Field status */}
        <div className="space-y-1.5">
          {fields.map((field) => (
            <div key={field.key} className="flex items-center gap-2">
              {field.filled ? (
                <CheckCircle2 size={13} style={{ color: "#4ade80", flexShrink: 0 }} />
              ) : (
                <Circle size={13} style={{ color: "var(--border)", flexShrink: 0 }} />
              )}
              <span
                className="text-xs"
                style={{
                  color: field.filled ? "var(--foreground)" : "var(--muted-foreground)",
                }}
              >
                {field.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
