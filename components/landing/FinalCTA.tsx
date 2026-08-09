"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles } from "lucide-react";

interface FinalCTAProps {
  onOpenJoinModal: () => void;
}

export function FinalCTA({ onOpenJoinModal }: FinalCTAProps) {
  return (
    <section className="py-20 bg-[var(--background)] border-t border-[var(--border)] relative overflow-hidden text-center text-[var(--foreground)]">
      {/* Background Accent Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[550px] h-[320px] sm:h-[550px] bg-[var(--primary-glow)] blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-7">
        
        <div className="inline-flex items-center gap-2">
          <Badge variant="primary" className="py-1 px-3.5 text-xs font-semibold gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-[var(--primary)]" />
            Your 60-Day Decision
          </Badge>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-5xl font-extrabold text-[var(--foreground)] tracking-tight leading-[1.15]">
          60 Days From Now... <br />
          <span className="bg-gradient-to-r from-[var(--primary)] via-indigo-400 to-[#22C55E] bg-clip-text text-transparent">
            Who Will You Be?
          </span>
        </h2>

        {/* Contrast narrative */}
        <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 text-left pt-1">
          
          <div className="p-4 rounded-[16px] bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] space-y-2 glass-card">
            <span className="text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider">Option A</span>
            <p className="text-sm font-semibold text-[var(--foreground)]">Still saying &quot;I&apos;ll start building tomorrow.&quot;</p>
            <p className="text-xs text-[var(--muted-foreground)]">Same empty GitHub graph, same tutorial paralysis.</p>
          </div>

          <div className="p-4 rounded-[16px] bg-[var(--card)] border border-[var(--primary)] text-[var(--foreground)] space-y-2 glass-card shadow-[0_0_20px_var(--primary-glow)]">
            <span className="text-xs font-semibold text-[var(--primary)] uppercase tracking-wider">Option B (ABTalks)</span>
            <p className="text-sm font-semibold text-[var(--foreground)]">60 commits. 60 proof logs. 1 real portfolio.</p>
            <p className="text-xs text-[#22C55E] font-medium">Verified developer status hiring managers trust.</p>
          </div>

        </div>

        {/* Action Button */}
        <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            onClick={onOpenJoinModal}
            variant="primary"
            size="lg"
            className="w-full sm:w-auto gap-2.5 text-base h-13 px-9 shadow-[0_0_30px_var(--primary-glow)] cursor-pointer"
          >
            Start Day 1
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>

        <p className="text-xs text-[var(--muted-foreground)]">
          100% Free • No credit card • Instant streak setup
        </p>

      </div>
    </section>
  );
}
