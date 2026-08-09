"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Trophy, Clock } from "lucide-react";

export function RecentLearningTimeline() {
  const events = [
    {
      date: "Today",
      title: "Completed REST API Challenge",
      subtitle: "Day 11 · Express & Node.js",
      xp: "+150 XP",
      icon: CheckCircle2,
      color: "#22c55e",
      bg: "rgba(34, 197, 94, 0.1)",
    },
    {
      date: "Yesterday",
      title: "Unlocked 7 Day Streak",
      subtitle: "Achievement · Week One",
      xp: "+100 XP",
      icon: Trophy,
      color: "#f59e0b",
      bg: "rgba(245, 158, 11, 0.1)",
    },
    {
      date: "Aug 5",
      title: "Completed MongoDB Challenge",
      subtitle: "Day 10 · Database Design",
      xp: "+120 XP",
      icon: CheckCircle2,
      color: "#22c55e",
      bg: "rgba(34, 197, 94, 0.1)",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut", delay: 0.6 }}
      className="rounded-3xl p-5 bg-[var(--card)] border border-[var(--border)] flex flex-col justify-between h-full glass-card"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock size={16} style={{ color: "var(--primary)" }} />
          <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">
            Recent Learning
          </h3>
        </div>
        <span className="text-[11px] text-[var(--muted-foreground)] font-medium">Timeline</span>
      </div>

      <div className="relative pl-3 space-y-4 before:absolute before:left-1.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[var(--border)]">
        {events.map((ev, idx) => {
          const Icon = ev.icon;
          return (
            <div key={idx} className="relative flex items-start gap-3 pl-2">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 relative z-10 -ml-5"
                style={{ background: ev.bg, border: `1px solid ${ev.color}40` }}
              >
                <Icon size={12} color={ev.color} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <p className="text-xs font-bold text-[var(--foreground)] truncate">
                    {ev.title}
                  </p>
                  <span className="text-[10px] font-bold text-emerald-500 tabular-nums">
                    {ev.xp}
                  </span>
                </div>
                <p className="text-[11px] text-[var(--muted-foreground)] mt-0.5">
                  <span className="text-[var(--primary)] font-semibold">{ev.date}</span> · {ev.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
