"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Users, Calendar, GitCommit, Award } from "lucide-react";

export function StatsSection() {
  const stats = [
    {
      value: "5,000+",
      label: "Active Students",
      sublabel: "Committed across 40+ countries",
      icon: Users,
      color: "text-[var(--primary)]",
    },
    {
      value: "60",
      label: "Days Target",
      sublabel: "Consecutive daily code building",
      icon: Calendar,
      color: "text-[var(--primary)]",
    },
    {
      value: "1M+",
      label: "GitHub Commits",
      sublabel: "Pushed to open public repositories",
      icon: GitCommit,
      color: "text-[#22C55E]",
    },
    {
      value: "94%",
      label: "Hiring Rate",
      sublabel: "Of 60-day finishers land interviews",
      icon: Award,
      color: "text-[#F59E0B]",
    },
  ];

  return (
    <section id="stats" className="py-20 bg-[var(--background)] border-t border-[var(--border)] text-[var(--foreground)] relative overflow-hidden">
      {/* Background Accent glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary-glow)] via-transparent to-[#22C55E]/5 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, idx) => {
            const IconComp = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1, ease: "easeOut" }}
                className="bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] rounded-[24px] p-6 text-center hover:border-[var(--primary)] transition-all group glass-card"
              >
                <div className="h-10 w-10 mx-auto mb-3 rounded-full bg-white/5 border border-[var(--border)] flex items-center justify-center">
                  <IconComp className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div className="text-3xl sm:text-4xl font-black text-[var(--foreground)] tracking-tight group-hover:scale-105 transition-transform duration-200">
                  {stat.value}
                </div>
                <div className="text-sm font-bold text-[var(--primary)] mt-1">
                  {stat.label}
                </div>
                <div className="text-xs text-[var(--muted-foreground)] mt-1 leading-snug">
                  {stat.sublabel}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
