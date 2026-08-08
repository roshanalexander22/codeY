"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Layers, Code, GitPullRequest, Share2, Flame } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function HowItWorksSection() {
  const steps = [
    {
      num: "01",
      icon: Layers,
      title: "Choose Track",
      description: "Select your preferred tech path: Frontend, Fullstack, AI Engineering, or DevOps. Get curated 60-day project prompts.",
      badge: "Step 1",
      color: "text-[#4F46E5]",
      bgColor: "bg-[#4F46E5]/10",
      borderColor: "border-[#4F46E5]/30",
    },
    {
      num: "02",
      icon: Code,
      title: "Build Daily",
      description: "Spend 45–90 minutes each day writing clean code, solving real features, or refactoring production-grade modules.",
      badge: "Step 2",
      color: "text-[#818CF8]",
      bgColor: "bg-[#818CF8]/10",
      borderColor: "border-[#818CF8]/30",
    },
    {
      num: "03",
      icon: GitPullRequest,
      title: "Submit GitHub",
      description: "Push your code commits to your public GitHub repository. Our automated bot verifies your daily activity.",
      badge: "Step 3",
      color: "text-[#22C55E]",
      bgColor: "bg-[#22C55E]/10",
      borderColor: "border-[#22C55E]/30",
    },
    {
      num: "04",
      icon: Share2,
      title: "Post LinkedIn",
      description: "Share a brief update on LinkedIn using #ABTalks60Days. Build your personal brand and attract hiring managers.",
      badge: "Step 4",
      color: "text-[#F59E0B]",
      bgColor: "bg-[#F59E0B]/10",
      borderColor: "border-[#F59E0B]/30",
    },
    {
      num: "05",
      icon: Flame,
      title: "Grow Streak",
      description: "Watch your streak flame increase daily! Reach Day 60 to earn your verified badge and get listed in recruiter talent pools.",
      badge: "Step 5",
      color: "text-[#EF4444]",
      bgColor: "bg-[#EF4444]/10",
      borderColor: "border-[#EF4444]/30",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-[#09090B] border-t border-[#27272A]/50 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <Badge variant="primary">Simple 5-Step System</Badge>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#FAFAFA] tracking-tight">
            How ABTalks Works
          </h2>
          <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
            A battle-tested routine designed to turn passive tutorial watching into active, job-ready building habits.
          </p>
        </div>

        {/* Steps Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3.5 relative">
          {steps.map((step, idx) => {
            const IconComponent = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.08, ease: "easeOut" }}
                className="relative flex flex-col h-full"
              >
                <Card className="flex-1 bg-[#18181B] border-[#27272A] p-5 flex flex-col justify-between hover:border-[#3F3F46] group transition-all duration-300">
                  <div className="space-y-3.5">
                    {/* Step Icon & Number */}
                    <div className="flex items-center justify-between">
                      <div className={`h-11 w-11 rounded-[14px] ${step.bgColor} border ${step.borderColor} flex items-center justify-center`}>
                        <IconComponent className={`h-5 w-5 ${step.color}`} />
                      </div>
                      <span className="font-mono text-xl font-black text-[#A1A1AA]/30 group-hover:text-[#FAFAFA]/50 transition-colors">
                        {step.num}
                      </span>
                    </div>

                    {/* Step Title */}
                    <h3 className="text-base font-bold text-[#FAFAFA] group-hover:text-[#818CF8] transition-colors">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-[#A1A1AA] leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  <div className="pt-3 mt-1">
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-[#09090B] border border-[#27272A] text-[#A1A1AA]">
                      {step.badge}
                    </span>
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
