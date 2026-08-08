"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { Code2, Flame, FolderGit2, CheckCircle2, ArrowRight } from "lucide-react";

export function ProofOfWork() {
  const steps = [
    {
      num: "01",
      title: "Build Daily",
      detail: "Write clean feature code for 30–45 mins",
      icon: Code2,
      color: "text-[var(--primary)]",
      bgColor: "bg-[var(--primary-glow)]",
    },
    {
      num: "02",
      title: "GitHub Commit",
      detail: "Push your daily code directly to public repo",
      icon: GithubIcon,
      color: "text-[var(--foreground)]",
      bgColor: "bg-white/10",
    },
    {
      num: "03",
      title: "LinkedIn Post",
      detail: "Share quick screenshot & lesson learned",
      icon: LinkedinIcon,
      color: "text-[#0A66C2]",
      bgColor: "bg-[#0A66C2]/10",
    },
    {
      num: "04",
      title: "Public Proof",
      detail: "Automated streak bot verifies commit log",
      icon: CheckCircle2,
      color: "text-[#22C55E]",
      bgColor: "bg-[#22C55E]/10",
    },
    {
      num: "05",
      title: "Streak Grows",
      detail: "Earn badges & protect your streak record",
      icon: Flame,
      color: "text-[#F59E0B]",
      bgColor: "bg-[#F59E0B]/10",
    },
    {
      num: "06",
      title: "60-Build Portfolio",
      detail: "Complete body of work hiring managers love",
      icon: FolderGit2,
      color: "text-[var(--primary)]",
      bgColor: "bg-[var(--primary-glow)]",
    },
  ];

  return (
    <section className="py-20 bg-[var(--background)] border-t border-[var(--border)] text-[var(--foreground)] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <Badge variant="primary">The Proof-of-Work Loop</Badge>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[var(--foreground)] tracking-tight">
            Why Public Proof Works
          </h2>
          <p className="text-sm sm:text-base text-[var(--muted-foreground)] leading-relaxed">
            Recruiters ignore resume claims. They hire developers with verified commit logs and active public building habits.
          </p>
        </div>

        {/* 6-Step Loop Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3.5">
          {steps.map((step, idx) => {
            const IconComp = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.06, ease: "easeOut" }}
              >
                <Card className="bg-[var(--card)] border-[var(--border)] text-[var(--foreground)] p-4 h-full flex flex-col justify-between hover:border-[var(--primary)] transition-all group glass-card">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className={`h-10 w-10 rounded-[12px] ${step.bgColor} border border-[var(--border)] flex items-center justify-center`}>
                        <IconComp className={`h-5 w-5 ${step.color}`} />
                      </div>
                      <span className="font-mono text-xs text-[var(--muted-foreground)] font-bold">
                        {step.num}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-[11px] text-[var(--muted-foreground)] leading-relaxed mt-1">
                        {step.detail}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 text-right">
                    <ArrowRight className="h-3.5 w-3.5 text-[var(--muted-foreground)] group-hover:text-[var(--primary)] inline-block transition-colors" />
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
