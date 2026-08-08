"use client";

import { motion, type Variants } from "framer-motion";
import { CheckCircle2, Target, Circle } from "lucide-react";
import { useState } from "react";

interface ObjectivesListProps {
  objectives: string[];
  onCompletionChange?: (completedCount: number) => void;
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -8 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.2, ease: "easeOut" },
  },
};

export function ObjectivesList({ objectives, onCompletionChange }: ObjectivesListProps) {
  const [completed, setCompleted] = useState<Record<number, boolean>>({});

  const toggleObjective = (index: number) => {
    setCompleted((prev) => {
      const updated = { ...prev, [index]: !prev[index] };
      const count = Object.values(updated).filter(Boolean).length;
      if (onCompletionChange) {
        onCompletionChange(count);
      }
      return updated;
    });
  };

  const completedCount = Object.values(completed).filter(Boolean).length;
  const totalCount = objectives.length;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut", delay: 0.15 }}
      className="px-4 py-2"
    >
      <div className="card p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(34, 197, 94, 0.12)", border: "1px solid rgba(34, 197, 94, 0.3)" }}
            >
              <Target size={14} style={{ color: "#4ade80" }} />
            </div>
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "#4ade80", letterSpacing: "0.1em" }}
            >
              Learning Objectives
            </span>
          </div>

          <span className="text-xs font-semibold" style={{ color: "var(--muted-foreground)" }}>
            <span style={{ color: completedCount > 0 ? "#4ade80" : "inherit" }}>{completedCount}</span> / {totalCount} completed
          </span>
        </div>

        {/* Small Progress Line */}
        <div className="w-full bg-white/5 rounded-full h-1.5 mb-4 overflow-hidden">
          <motion.div
            className="bg-emerald-500 h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>

        {/* Objectives list */}
        <motion.ul
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-30px" }}
          className="space-y-2.5"
        >
          {objectives.map((objective, index) => {
            const isChecked = !!completed[index];

            return (
              <motion.li key={index} variants={itemVariants}>
                <button
                  type="button"
                  onClick={() => toggleObjective(index)}
                  className="w-full flex items-start gap-3 p-2.5 rounded-xl text-left transition-colors duration-150 hover:bg-white/[0.03]"
                  style={{
                    background: isChecked ? "rgba(34, 197, 94, 0.05)" : "transparent",
                    border: `1px solid ${isChecked ? "rgba(34, 197, 94, 0.2)" : "transparent"}`,
                  }}
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {isChecked ? (
                      <CheckCircle2 size={18} style={{ color: "#4ade80" }} />
                    ) : (
                      <Circle size={18} style={{ color: "var(--muted-foreground)" }} />
                    )}
                  </div>
                  <span
                    className="text-sm leading-relaxed transition-opacity"
                    style={{
                      color: isChecked ? "var(--foreground)" : "var(--foreground)",
                      opacity: isChecked ? 0.75 : 0.9,
                      textDecoration: isChecked ? "line-through" : "none",
                    }}
                  >
                    {objective}
                  </span>
                </button>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </motion.div>
  );
}
