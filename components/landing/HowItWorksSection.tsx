"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Layers, Code, GitPullRequest, Share2, Flame, ArrowDown } from "lucide-react";
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
    <section id="how-it-works" className="py-24 bg-[#09090B] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <Badge variant="primary">Simple 5-Step System</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FAFAFA] tracking-tight">
            How ABTalks Works
          </h2>
          <p className="text-[#A1A1AA] text-base leading-relaxed">
            A battle-tested routine designed to turn passive tutorial watching into active, job-ready building habits.
          </p>
        </div>

        {/* Steps Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {steps.map((step, idx) => {
            const IconComponent = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1, ease: "easeOut" }}
                className="relative flex flex-col h-full"
              >
                <Card className="flex-1 bg-[#18181B] border-[#27272A] p-6 flex flex-col justify-between hover:border-[#3F3F46] group transition-all duration-300">
                  <div className="space-y-4">
                    {/* Step Icon & Number */}
                    <div className="flex items-center justify-between">
                      <div className={`h-12 w-12 rounded-[16px] ${step.bgColor} border ${step.borderColor} flex items-center justify-center`}>
                        <IconComponent className={`h-6 w-6 ${step.color}`} />
                      </div>
                      <span className="font-mono text-2xl font-black text-[#A1A1AA]/30 group-hover:text-[#FAFAFA]/50 transition-colors">
                        {step.num}
                      </span>
                    </div>

                    {/* Step Title */}
                    <h3 className="text-lg font-bold text-[#FAFAFA] group-hover:text-[#818CF8] transition-colors">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-2">
                    <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-[#09090B] border border-[#27272A] text-[#A1A1AA]">
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
