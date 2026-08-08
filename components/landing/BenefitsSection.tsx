"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Flame, FolderGit2, Eye, Users, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function BenefitsSection() {
  const benefits = [
    {
      title: "Unbreakable Consistency",
      subtitle: "Turn coding into an automatic daily habit",
      description:
        "Consistency beats intensity. By showing up every single day, you develop muscle memory, deep problem-solving focus, and momentum that stays with you forever.",
      icon: Flame,
      color: "text-[#F59E0B]",
      bgColor: "bg-[#F59E0B]/10",
      badge: "Habit Building",
      colSpan: "lg:col-span-2",
    },
    {
      title: "60-Commit Real Portfolio",
      subtitle: "No more basic tutorial clones",
      description:
        "Build 60 days worth of production code. From full-stack APIs to UI micro-interactions and AI SDK implementations, showcase real proof of skill.",
      icon: FolderGit2,
      color: "text-[#4F46E5]",
      bgColor: "bg-[#4F46E5]/10",
      badge: "Proof of Skill",
      colSpan: "lg:col-span-1",
    },
    {
      title: "Direct Recruiter Visibility",
      subtitle: "Get headhunted on the ABTalks directory",
      description:
        "Students who achieve a 60-day streak earn the Verified Developer badge. Partner recruiters and engineering leaders search our talent pool directly.",
      icon: Eye,
      color: "text-[#22C55E]",
      bgColor: "bg-[#22C55E]/10",
      badge: "Get Hired",
      colSpan: "lg:col-span-1",
    },
    {
      title: "Vibrant Peer Community",
      subtitle: "Never code alone again",
      description:
        "Join 5,000+ ambitious developers in our Discord squad. Get instant code reviews, post daily updates, swap feedback, and celebrate milestone streaks together.",
      icon: Users,
      color: "text-[#818CF8]",
      bgColor: "bg-[#818CF8]/10",
      badge: "Discord Squad",
      colSpan: "lg:col-span-2",
    },
  ];

  return (
    <section id="benefits" className="py-20 bg-[#09090B] border-t border-[#27272A]/50 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <Badge variant="primary">Why ABTalks?</Badge>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#FAFAFA] tracking-tight">
            Why 60 Days Will Change Your Career
          </h2>
          <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
            Stop starting and stopping. Experience the compound interest of consistency and public building.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {benefits.map((benefit, idx) => {
            const IconComp = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.08, ease: "easeOut" }}
                className={benefit.colSpan}
              >
                <Card className="bg-[#18181B] border-[#27272A] p-6 sm:p-8 h-full flex flex-col justify-between hover:border-[#3F3F46] transition-all group">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`h-12 w-12 rounded-[16px] ${benefit.bgColor} flex items-center justify-center`}>
                        <IconComp className={`h-6 w-6 ${benefit.color}`} />
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {benefit.badge}
                      </Badge>
                    </div>

                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-[#FAFAFA] group-hover:text-[#818CF8] transition-colors">
                        {benefit.title}
                      </h3>
                      <p className="text-xs font-semibold text-[#818CF8] mt-1">
                        {benefit.subtitle}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#27272A]/50 mt-5 flex items-center text-xs text-[#FAFAFA] font-medium gap-2">
                    <CheckCircle className="h-4 w-4 text-[#22C55E]" />
                    <span>Included in 60-Day Challenge</span>
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
