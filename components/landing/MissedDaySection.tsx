"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Flame } from "lucide-react";

export function MissedDaySection() {
  return (
    <section className="py-16 bg-[#09090B] border-t border-[#27272A]/50 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <Card className="bg-[#18181B] border-[#27272A] p-6 sm:p-8 hover:border-[#3F3F46] transition-all relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            
            {/* Left Icon Badge */}
            <div className="h-14 w-14 rounded-[20px] bg-[#F59E0B]/15 border border-[#F59E0B]/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="h-7 w-7 text-[#F59E0B]" />
            </div>

            {/* Right Text Content */}
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <Badge variant="warning" className="text-xs gap-1">
                  <Flame className="h-3.5 w-3.5 text-[#F59E0B]" /> STREAK PROTECTION
                </Badge>
                <span className="text-xs text-[#A1A1AA] font-mono">2 Freeze Shields Included</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-[#FAFAFA] tracking-tight">
                Missed a Day? Your Streak Might Reset — Your Growth Doesn&apos;t.
              </h3>

              <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
                College exams, emergencies, or tough days happen. Every student gets 2 automatic Freeze Shields to protect their streak. Even if a streak resets, your written code and GitHub commits stay in your portfolio forever.
              </p>
            </div>

          </div>
        </Card>
      </div>
    </section>
  );
}
