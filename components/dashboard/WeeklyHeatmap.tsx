"use client";

import { motion } from "framer-motion";
import { subDays, format, isToday, addDays } from "date-fns";

interface WeeklyHeatmapProps {
  completedDays: number[];
  missedDays: number[];
  enrolledAt: string;
}

interface DayCell {
  label: string;
  dayIndex: number;
  status: "completed" | "missed" | "future" | "today";
  date: Date;
}

export function WeeklyHeatmap({
  completedDays,
  missedDays,
  enrolledAt,
}: WeeklyHeatmapProps) {
  const today = new Date();
  const enrolled = new Date(enrolledAt);

  // Build a 4-week grid (28 days) for a compact height matching leaderboard
  const weeks: DayCell[][] = [];
  const startDate = subDays(today, 21); // 3 weeks back from today

  for (let week = 0; week < 4; week++) {
    const weekCells: DayCell[] = [];
    for (let day = 0; day < 7; day++) {
      const date = addDays(startDate, week * 7 + day);
      const diffFromEnroll = Math.floor(
        (date.getTime() - enrolled.getTime()) / (1000 * 60 * 60 * 24)
      ) + 1;

      let status: DayCell["status"] = "future";
      if (date < enrolled) {
        status = "future"; // before enrollment
      } else if (date > today) {
        status = "future";
      } else if (isToday(date)) {
        status = "today";
      } else if (completedDays.includes(diffFromEnroll)) {
        status = "completed";
      } else if (missedDays.includes(diffFromEnroll)) {
        status = "missed";
      } else if (date < today && date >= enrolled) {
        status = "missed"; // past day not submitted
      }

      weekCells.push({
        label: format(date, "EEE"),
        dayIndex: diffFromEnroll,
        status,
        date,
      });
    }
    weeks.push(weekCells);
  }

  const statusStyles: Record<DayCell["status"], { bg: string; border: string }> = {
    completed: {
      bg: "#22c55e",
      border: "rgba(34, 197, 94, 0.4)",
    },
    missed: {
      bg: "rgba(239, 68, 68, 0.25)",
      border: "rgba(239, 68, 68, 0.3)",
    },
    today: {
      bg: "var(--primary-glow)",
      border: "var(--primary)",
    },
    future: {
      bg: "rgba(161, 161, 170, 0.08)",
      border: "var(--border)",
    },
  };

  const completedCount = completedDays.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut", delay: 0.55 }}
      className="rounded-3xl p-5 bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] glass-card"
    >
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-sm font-semibold text-[var(--foreground)]">
            Activity Heatmap
          </h3>
          <p className="text-xs text-[var(--muted-foreground)]">
            {completedCount} submissions total
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div
              className="w-2.5 h-2.5 rounded-sm"
              style={{ background: "#22c55e" }}
            />
            <span className="text-xs text-[var(--muted-foreground)]">
              Done
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div
              className="w-2.5 h-2.5 rounded-sm"
              style={{ background: "rgba(239,68,68,0.25)", border: "1px solid rgba(239,68,68,0.3)" }}
            />
            <span className="text-xs text-[var(--muted-foreground)]">
              Missed
            </span>
          </div>
        </div>
      </div>

      {/* Day-of-week labels */}
      <div className="flex gap-1 mb-1.5">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <div
            key={i}
            className="flex-1 text-center text-[10px] text-[var(--muted-foreground)] font-mono"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Heatmap grid - 7 cols (days) x 5 rows (weeks) */}
      <div className="space-y-1">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex gap-1">
            {week.map((cell, di) => {
              const style = statusStyles[cell.status];
              return (
                <motion.div
                  key={di}
                  className="flex-1 rounded-sm h-5"
                  style={{
                    background: style.bg,
                    border: `1px solid ${style.border}`,
                  }}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 0.6 + (wi * 7 + di) * 0.005,
                    duration: 0.2,
                  }}
                  title={`${format(cell.date, "MMM d")} — ${cell.status}`}
                />
              );
            })}
          </div>
        ))}
      </div>

      {/* Month labels */}
      <div className="flex justify-between mt-2 pt-1 border-t border-[var(--border)] text-[10px] text-[var(--muted-foreground)]">
        <span>4 weeks ago</span>
        <span>Today</span>
      </div>
    </motion.div>
  );
}
