"use client";

import { motion, type Variants } from "framer-motion";
import { CheckCircle2, Target } from "lucide-react";

interface ObjectivesListProps {
  objectives: string[];
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.25, ease: "easeOut" as const },
  },
};

export function ObjectivesList({ objectives }: ObjectivesListProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut", delay: 0.15 }}
      className="px-4 py-2"
    >
      <div className="card p-5">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
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

        {/* Objectives list */}
        <motion.ul
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-30px" }}
          className="space-y-3"
        >
          {objectives.map((objective, index) => (
            <motion.li
              key={index}
              variants={itemVariants}
              className="flex items-start gap-3"
            >
              <div className="flex-shrink-0 mt-0.5">
                <CheckCircle2
                  size={16}
                  style={{ color: "rgba(34, 197, 94, 0.5)" }}
                />
              </div>
              <span
                className="text-sm leading-relaxed"
                style={{ color: "var(--foreground)", opacity: 0.85 }}
              >
                {objective}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </motion.div>
  );
}
