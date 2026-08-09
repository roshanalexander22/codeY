"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Rocket, Zap, Award, CheckCircle2, ShieldCheck } from "lucide-react";

export function JourneyTimeline() {
  const milestones = [
    {
      day: "DAY 01",
      phase: "START",
      title: "Your First Commit",
      description: "Set up your environment, write your initial code, and push Day 1 proof to GitHub & LinkedIn.",
      icon: Rocket,
      color: "text-[var(--primary)]",
      bgColor: "bg-[var(--primary-glow)]",
      borderColor: "border-[var(--primary)]",
      badge: "Day 1",
    },
    {
      day: "DAY 15",
      phase: "RHYTHM",
      title: "Building the Habit",
      description: "No more post-college tutorial paralysis. 45 minutes of daily coding becomes automatic.",
      icon: Zap,
      color: "text-[var(--primary)]",
      bgColor: "bg-[var(--primary-glow)]",
      borderColor: "border-[var(--primary)]",
      badge: "Week 2",
    },
    {
      day: "DAY 30",
      phase: "MOMENTUM",
      title: "30-Day Milestone",
      description: "Halfway mark with 30 real GitHub commits. Your public profile starts attracting recruiter views.",
      icon: CheckCircle2,
      color: "text-[#F59E0B]",
      bgColor: "bg-[#F59E0B]/15",
      borderColor: "border-[#F59E0B]/40",
      badge: "Halfway Mark",
    },
    {
      day: "DAY 45",
      phase: "PROOF",
      title: "Verified Portfolio",
      description: "Multiple fullstack features built and documented publicly. Proof beats resume claims every time.",
      icon: ShieldCheck,
      color: "text-[#22C55E]",
      bgColor: "bg-[#22C55E]/15",
      borderColor: "border-[#22C55E]/40",
      badge: "Proof Stage",
    },
    {
      day: "DAY 60",
      phase: "SHIP",
      title: "Completed & Verified",
      description: "Earn your official 60-Day Verified Developer Badge and unlock direct hiring opportunities.",
      icon: Award,
      color: "text-emerald-400",
      bgColor: "bg-gradient-to-br from-[var(--primary)] to-[#22C55E]",
      borderColor: "border-[#22C55E]",
      badge: "Finish Line",
    },
  ];

  return (
    <section className="py-20 bg-[var(--background)] border-t border-[var(--border)] text-[var(--foreground)] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <Badge variant="primary">The 60-Day Path</Badge>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[var(--foreground)] tracking-tight">
            How 60 Days Unfold
          </h2>
          <p className="text-sm sm:text-base text-[var(--muted-foreground)] leading-relaxed">
            Not an intimidating mountain — a structured, day-by-day progression designed to guarantee your success.
          </p>
        </div>

        {/* Vertical Timeline Container */}
        <div className="relative pl-6 sm:pl-10 space-y-6 sm:space-y-8 before:absolute before:left-[15px] sm:before:left-[23px] before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-[var(--primary)] before:via-[#F59E0B] before:to-[#22C55E]">
          {milestones.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.day}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.08, ease: "easeOut" }}
                className="relative flex items-start"
              >
                {/* Node Icon on Timeline Line */}
                <div
                  className={`absolute -left-[31px] sm:-left-[43px] top-1 h-8 w-8 sm:h-10 sm:w-10 rounded-full ${item.bgColor} border-2 ${item.borderColor} flex items-center justify-center shadow-md z-10`}
                >
                  <IconComponent className={`h-4 w-4 sm:h-5 sm:w-5 ${item.day === "DAY 60" ? "text-white" : item.color}`} />
                </div>

                {/* Content Card */}
                <Card className="glass-card bg-[var(--card)] text-[var(--foreground)] border border-[var(--border)] p-5 sm:p-6 w-full">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[var(--primary)] px-2 py-0.5 rounded bg-[var(--primary-glow)] border border-[var(--primary)]">
                        {item.day}
                      </span>
                      <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
                        {item.phase}
                      </span>
                    </div>
                    <Badge variant="secondary" className="text-[10px] px-2 py-0.5">
                      {item.badge}
                    </Badge>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[var(--foreground)]">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[var(--muted-foreground)] leading-relaxed mt-1">
                    {item.description}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
