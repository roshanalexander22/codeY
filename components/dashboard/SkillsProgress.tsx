"use client";

import { motion } from "framer-motion";
import { Code2 } from "lucide-react";

export function SkillsProgress() {
  const skills = [
    { name: "JavaScript", level: 80, color: "#f59e0b" },
    { name: "Node.js", level: 70, color: "#22c55e" },
    { name: "React", level: 60, color: "#38bdf8" },
    { name: "MongoDB", level: 50, color: "var(--primary)" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut", delay: 0.55 }}
      className="rounded-3xl p-5 bg-[var(--card)] border border-[var(--border)] flex flex-col justify-between h-full glass-card"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Code2 size={16} style={{ color: "var(--primary)" }} />
          <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">
            Skills Progress
          </h3>
        </div>
        <span className="text-[11px] text-[var(--muted-foreground)] font-medium">
          4 tracked
        </span>
      </div>

      <div className="space-y-3">
        {skills.map((s) => (
          <div key={s.name} className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-[var(--foreground)]">{s.name}</span>
              <span className="font-bold text-[var(--muted-foreground)] tabular-nums">{s.level}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${s.level}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{ background: s.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
