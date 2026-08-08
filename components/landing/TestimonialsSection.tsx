"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Flame, CheckCircle2 } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Frontend Track • 60-Day Finisher",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      fallback: "SC",
      streak: 60,
      timeline: [
        { day: "Day 01", text: "Stuck in tutorial paralysis with 0 public repos." },
        { day: "Day 30", text: "30 commits & 4 responsive apps pushed to GitHub." },
        { day: "Day 60", text: "Landed 3 interview calls directly from LinkedIn posts." },
      ],
      outcome: "Landed Frontend Dev Role",
    },
    {
      name: "Alex Rivera",
      role: "Fullstack Track • 60-Day Finisher",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      fallback: "AR",
      streak: 60,
      timeline: [
        { day: "Day 01", text: "No backend API experience beyond basic YouTube guides." },
        { day: "Day 30", text: "Built REST APIs, JWT Auth, & MongoDB integrations." },
        { day: "Day 60", text: "Verified 60-day commit log proved my skills to recruiters." },
      ],
      outcome: "Fullstack Portfolio & Hire Ready",
    },
    {
      name: "David Park",
      role: "AI Track • 58-Day Finisher",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      fallback: "DP",
      streak: 58,
      timeline: [
        { day: "Day 01", text: "Unsure how to integrate LLM SDKs into real apps." },
        { day: "Day 30", text: "Shipped 4 open-source AI tools with clear documentation." },
        { day: "Day 60", text: "Earned 2.4k GitHub stars on open-source challenge repo." },
      ],
      outcome: "2.4k GitHub Stars & Top Creator",
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-[#09090B] border-t border-[#27272A]/50 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <Badge variant="primary">Progression Stories</Badge>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#FAFAFA] tracking-tight">
            Real Student Transformations
          </h2>
          <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
            Not empty reviews — real timelines showing how 60 consecutive days of public building changes careers.
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, idx) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.08, ease: "easeOut" }}
            >
              <Card className="bg-[#18181B] border-[#27272A] p-6 h-full flex flex-col justify-between hover:border-[#3F3F46] transition-all">
                <div className="space-y-5">
                  {/* Top Row: Avatar & Streak Badge */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar src={item.avatar} fallback={item.fallback} size="lg" />
                      <div>
                        <h3 className="font-bold text-[#FAFAFA] text-base">{item.name}</h3>
                        <p className="text-xs text-[#A1A1AA]">{item.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/30 text-xs font-bold font-mono">
                      <Flame className="h-3.5 w-3.5 fill-current" />
                      <span>{item.streak}d</span>
                    </div>
                  </div>

                  {/* Progression Mini-Timeline */}
                  <div className="space-y-2.5 pt-2 border-t border-[#27272A]/50">
                    {item.timeline.map((t, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs">
                        <span className="font-mono font-bold text-[#818CF8] bg-[#4F46E5]/10 px-1.5 py-0.5 rounded shrink-0">
                          {t.day}
                        </span>
                        <span className="text-[#FAFAFA] leading-snug">{t.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Outcome Footer */}
                <div className="pt-4 border-t border-[#27272A] mt-5 flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#4ADE80] flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-[#22C55E]" />
                    {item.outcome}
                  </span>
                  <div className="flex items-center gap-2 text-[#A1A1AA]">
                    <GithubIcon className="h-4 w-4 hover:text-white cursor-pointer transition-colors" />
                    <LinkedinIcon className="h-4 w-4 hover:text-[#0A66C2] cursor-pointer transition-colors" />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
