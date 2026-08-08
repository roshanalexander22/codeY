"use client";

import { motion } from "framer-motion";
import { ListChecks, Clock } from "lucide-react";

interface BuildStep {
  step: number;
  title: string;
  description: string;
  time: string;
}

interface BuildPlanProps {
  steps: BuildStep[];
}

export function BuildPlan({ steps }: BuildPlanProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut", delay: 0.18 }}
      className="px-4 py-2"
    >
      <div className="card p-5">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <div
            className="w-7 h-7 rounded-xl flex items-center justify-center"
            style={{
              background: "rgba(34, 197, 94, 0.12)",
              border: "1px solid rgba(34, 197, 94, 0.3)",
            }}
          >
            <ListChecks size={14} style={{ color: "#4ade80" }} />
          </div>
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "#4ade80", letterSpacing: "0.1em" }}
          >
            Step-by-Step Plan
          </span>
        </div>

        {/* Steps */}
        <div className="space-y-0">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.2, ease: "easeOut", delay: index * 0.06 }}
              className="flex gap-4"
            >
              {/* Left: number + connector line */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0"
                  style={{
                    background: "rgba(34, 197, 94, 0.1)",
                    border: "1.5px solid rgba(34, 197, 94, 0.35)",
                    color: "#4ade80",
                  }}
                >
                  {String(step.step).padStart(2, "0")}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className="w-px flex-1 mt-1 mb-1"
                    style={{
                      background: "linear-gradient(to bottom, rgba(34,197,94,0.25), rgba(34,197,94,0.05))",
                      minHeight: "24px",
                    }}
                  />
                )}
              </div>

              {/* Right: content */}
              <div className={index < steps.length - 1 ? "pb-5" : "pb-0"}>
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                    {step.title}
                  </p>
                  <span className="flex items-center gap-1" style={{ color: "var(--muted-foreground)" }}>
                    <Clock size={11} />
                    <span className="text-xs">{step.time}</span>
                  </span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
