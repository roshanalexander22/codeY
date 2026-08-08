"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface DayProgressBarProps {
  currentDay: number;
  totalDays?: number;
  completedDays: number[];
}

export function DayProgressBar({
  currentDay,
  totalDays = 60,
  completedDays,
}: DayProgressBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });

  const progress = (completedDays.length / totalDays) * 100;
  const daysLeft = totalDays - completedDays.length;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut", delay: 0.1 }}
      className="px-4 pt-4 pb-2"
    >
      {/* Labels row */}
      <div className="flex items-center justify-between mb-2">
        <span
          className="text-sm font-semibold"
          style={{ color: "var(--foreground)" }}
        >
          {completedDays.length} days done
        </span>
        <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
          {daysLeft} remaining
        </span>
      </div>

      {/* Progress track */}
      <div
        className="progress-track w-full bg-white/10 rounded-full h-2 overflow-hidden"
        role="progressbar"
        aria-valuenow={completedDays.length}
        aria-valuemin={0}
        aria-valuemax={totalDays}
        aria-label={`${completedDays.length} of ${totalDays} days completed`}
      >
        <motion.div
          className="progress-fill h-full rounded-full bg-gradient-to-r from-[var(--primary)] to-emerald-400"
          initial={{ width: 0 }}
          animate={{ width: inView ? `${progress}%` : 0 }}
          transition={{
            duration: 0.8,
            ease: [0.34, 1.56, 0.64, 1],
            delay: 0.2,
          }}
        />
      </div>

      {/* Day dots — mini calendar view */}
      <div className="mt-3 flex flex-wrap gap-1">
        {Array.from({ length: totalDays }, (_, i) => {
          const day = i + 1;
          const isCompleted = completedDays.includes(day);
          const isCurrent = day === currentDay;
          const isPast = day < currentDay && !isCompleted;

          return (
            <div
              key={day}
              className={cn(
                "rounded-sm transition-all duration-150",
                isCurrent ? "w-3 h-3" : "w-2 h-2"
              )}
              title={`Day ${day}`}
              style={{
                background: isCurrent
                  ? "var(--primary)"
                  : isCompleted
                    ? "#22c55e"
                    : isPast
                      ? "#ef4444"
                      : "var(--border)",
                opacity: isCurrent ? 1 : isCompleted ? 0.9 : isPast ? 0.7 : 0.35,
                boxShadow: isCurrent ? "0 0 8px var(--primary)" : undefined,
              }}
            />
          );
        })}
      </div>
      <p className="mt-1.5 text-xs" style={{ color: "var(--muted-foreground)" }}>
        <span style={{ color: "var(--primary)" }}>■</span> Today &nbsp;
        <span style={{ color: "#22c55e" }}>■</span> Done &nbsp;
        <span style={{ color: "#ef4444" }}>■</span> Missed
      </p>
    </motion.div>
  );
}
