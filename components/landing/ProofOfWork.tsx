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
      color: "text-[#4F46E5]",
      bgColor: "bg-[#4F46E5]/10",
    },
    {
      num: "02",
      title: "GitHub Commit",
      detail: "Push your daily code directly to public repo",
      icon: GithubIcon,
      color: "text-white",
      bgColor: "bg-[#27272A]",
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
      color: "text-[#818CF8]",
      bgColor: "bg-[#818CF8]/10",
    },
  ];

  return (
    <section className="py-20 bg-[#09090B] border-t border-[#27272A]/50 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <Badge variant="primary">The Proof-of-Work Loop</Badge>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#FAFAFA] tracking-tight">
            Why Public Proof Works
          </h2>
          <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
            Recruiters ignore resume claims. They hire developers with verified commit logs and active public building habits.
          </p>
        </div>

        {/* 6-Step Loop Grid (Mobile First 390px Stack -> 2 col -> 6 col) */}
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
                <Card className="bg-[#18181B] border-[#27272A] p-4 h-full flex flex-col justify-between hover:border-[#4F46E5]/60 transition-all group">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className={`h-10 w-10 rounded-[12px] ${step.bgColor} border border-[#27272A] flex items-center justify-center`}>
                        <IconComp className={`h-5 w-5 ${step.color}`} />
                      </div>
                      <span className="font-mono text-xs text-[#A1A1AA] font-bold">
                        {step.num}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-[#FAFAFA] group-hover:text-[#818CF8] transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-[11px] text-[#A1A1AA] leading-relaxed mt-1">
                        {step.detail}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 text-right">
                    <ArrowRight className="h-3.5 w-3.5 text-[#3F3F46] group-hover:text-[#4F46E5] inline-block transition-colors" />
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
