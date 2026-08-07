"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Flame, Star, CheckCircle2 } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Frontend Engineer @ Vercel Partner",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      fallback: "SC",
      streak: 60,
      track: "Frontend Track",
      quote:
        "ABTalks completely forced me out of my tutorial paralysis. Posting my GitHub commits daily on LinkedIn got me noticed by engineering leads. I landed 3 interviews by Day 45!",
      outcome: "Landed Frontend Role in 45 Days",
    },
    {
      name: "Alex Rivera",
      role: "Fullstack Developer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      fallback: "AR",
      streak: 60,
      track: "Fullstack Track",
      quote:
        "Building in public for 60 consecutive days gave me 180+ real GitHub commits and 12 completed projects. Recruiters stopped asking for degree certificates and hired me based on proof.",
      outcome: "Built 12 Real Projects & Hire Ready",
    },
    {
      name: "David Park",
      role: "AI Engineer & Open Source",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      fallback: "DP",
      streak: 58,
      track: "AI Engineering Track",
      quote:
        "The accountability in the ABTalks Discord squad is unmatched. When you see others shipping code every single night, you refuse to break your streak. Best challenge I ever took.",
      outcome: "2.4k GitHub Stars on Open Source Repo",
    },
  ];

  return (
    <section id="testimonials" className="py-24 bg-[#09090B] border-t border-[#27272A]/50 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <Badge variant="primary">Student Success Stories</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FAFAFA] tracking-tight">
            Loved by 5,000+ Builders
          </h2>
          <p className="text-[#A1A1AA] text-base leading-relaxed">
            See how committing 60 days changed the career trajectories of real developers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, idx) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1, ease: "easeOut" }}
            >
              <Card className="bg-[#18181B] border-[#27272A] p-6 sm:p-8 h-full flex flex-col justify-between hover:border-[#3F3F46] transition-all">
                <div className="space-y-6">
                  {/* Top Row: Avatar & Streak Badge */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar src={item.avatar} fallback={item.fallback} size="lg" />
                      <div>
                        <h3 className="font-bold text-[#FAFAFA] text-base">{item.name}</h3>
                        <p className="text-xs text-[#A1A1AA]">{item.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/30 text-xs font-bold">
                      <Flame className="h-3.5 w-3.5 fill-current" />
                      <span>{item.streak}d</span>
                    </div>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 text-[#F59E0B]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                    <span className="text-xs text-[#A1A1AA] ml-2 font-mono">{item.track}</span>
                  </div>

                  {/* Quote */}
                  <p className="text-sm text-[#FAFAFA] leading-relaxed italic">
                    &quot;{item.quote}&quot;
                  </p>
                </div>

                {/* Outcome Footer */}
                <div className="pt-4 border-t border-[#27272A] mt-6 flex items-center justify-between">
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
