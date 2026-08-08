"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { Clock, Terminal, ChevronRight, CheckCircle2, Sparkles, Moon, Flame } from "lucide-react";

export function DayOnePreview() {
  const [isPreviewOpen, setIsPreviewOpen] = React.useState(false);

  const day1Data = {
    title: "Day 01: Hello, World — Your Dev Environment",
    estimatedTime: "30–45 min",
    difficulty: "Beginner",
    xp: 100,
    description:
      "Set up Node.js 20+, VS Code extensions, and Git. Push your first commit to a new public GitHub repository and post your Day 1 update.",
    objectives: [
      "Install Node.js 20+ and verify node --version",
      "Configure Git user name and email",
      "Create your public challenge repository on GitHub",
      "Push your first commit and share on LinkedIn with #ABTalks60Days",
    ],
    deliverables: [
      { label: "Public GitHub Repository link", icon: GithubIcon },
      { label: "Terminal version verification screenshot", icon: Terminal },
      { label: "LinkedIn post link with hashtag", icon: LinkedinIcon },
    ],
    mentorTip:
      "Don't spend hours tweaking your VS Code theme today! Just complete the 4 steps and push your first commit.",
  };

  return (
    <section id="day1-preview" className="py-20 bg-[var(--background)] border-t border-[var(--border)] text-[var(--foreground)] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <Badge variant="primary">Zero Uncertainty</Badge>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[var(--foreground)] tracking-tight">
            See Exactly What You&apos;ll Build
          </h2>
          <p className="text-sm sm:text-base text-[var(--muted-foreground)] leading-relaxed">
            No mystery. Every day gives you a bite-sized, practical project with step-by-step objectives.
          </p>
        </div>

        {/* Two Preview Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1: Interactive Day 1 Preview */}
          <Card className="bg-[var(--card)] border-[var(--border)] text-[var(--foreground)] p-6 flex flex-col justify-between hover:border-[var(--primary)] transition-all relative overflow-hidden group glass-card">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="primary" className="font-mono text-xs">
                  DAY 01 PREVIEW
                </Badge>
                <span className="text-xs text-[#22C55E] font-semibold flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" /> 30–45 min
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                  {day1Data.title}
                </h3>
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed mt-2">
                  {day1Data.description}
                </p>
              </div>

              {/* Objectives bullet summary */}
              <div className="space-y-1.5 pt-1">
                {day1Data.objectives.slice(0, 2).map((obj, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-[var(--foreground)]">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#22C55E] shrink-0" />
                    <span className="truncate">{obj}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6">
              <Button
                onClick={() => setIsPreviewOpen(true)}
                variant="primary"
                size="md"
                className="w-full gap-2 text-xs sm:text-sm h-11 cursor-pointer"
              >
                <Sparkles className="h-4 w-4" />
                Preview Day 1 Challenge
              </Button>
            </div>
          </Card>

          {/* Card 2: Tonight's Build Card */}
          <Card className="bg-[var(--card)] border-[var(--border)] text-[var(--foreground)] p-6 flex flex-col justify-between hover:border-[#F59E0B]/60 transition-all relative overflow-hidden group glass-card">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="warning" className="font-mono text-xs gap-1">
                  <Moon className="h-3 w-3 text-[#F59E0B]" /> TONIGHT&apos;S BUILD
                </Badge>
                <span className="text-xs text-[#F59E0B] font-semibold flex items-center gap-1">
                  ● Medium • 45 min
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-[var(--foreground)] group-hover:text-[#FBBF24] transition-colors">
                  Build Something Small. Ship Something Real.
                </h3>
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed mt-2">
                  Designed for college students. Spend 45 minutes after class turning passive learning into visible proof.
                </p>
              </div>

              {/* Perks list */}
              <div className="space-y-1.5 pt-1 text-xs text-[var(--muted-foreground)]">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#F59E0B]" />
                  <span>Clear step-by-step deliverable prompt</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#F59E0B]" />
                  <span>Automated streak verification upon push</span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <Button
                onClick={() => setIsPreviewOpen(true)}
                variant="outline"
                size="md"
                className="w-full gap-2 text-xs sm:text-sm h-11 border-[#F59E0B]/40 hover:bg-[#F59E0B]/10 hover:text-[#FBBF24]"
              >
                Inspect Sample Challenge
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </Card>

        </div>

      </div>

      {/* Interactive Day 1 Modal */}
      <Dialog
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        title="Day 01 Challenge Preview"
        description="Here is exactly how a daily challenge looks inside ABTalks."
      >
        <div className="space-y-5 pt-2 text-left">
          
          {/* Header Metadata pill */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="px-2.5 py-1 rounded-full bg-[var(--primary-glow)] text-[var(--primary)] font-mono font-bold">
              {day1Data.estimatedTime}
            </span>
            <span className="px-2.5 py-1 rounded-full bg-[#22C55E]/15 text-[#4ADE80] font-semibold">
              {day1Data.difficulty}
            </span>
            <span className="px-2.5 py-1 rounded-full bg-[#F59E0B]/15 text-[#F59E0B] font-semibold font-mono">
              +{day1Data.xp} XP
            </span>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <h4 className="text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider">Overview</h4>
            <p className="text-sm text-[var(--foreground)] leading-relaxed">{day1Data.description}</p>
          </div>

          {/* Objectives */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider">Key Objectives</h4>
            <div className="space-y-1.5">
              {day1Data.objectives.map((obj, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-[var(--foreground)] bg-white/5 p-2.5 rounded-[12px] border border-[var(--border)]">
                  <CheckCircle2 className="h-4 w-4 text-[#22C55E] shrink-0 mt-0.5" />
                  <span>{obj}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Deliverables */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider">Required Deliverables</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {day1Data.deliverables.map((del, idx) => {
                const IconC = del.icon;
                return (
                  <div key={idx} className="p-2.5 rounded-[12px] bg-white/5 border border-[var(--border)] flex flex-col items-center text-center gap-1.5">
                    <IconC className="h-4 w-4 text-[var(--primary)]" />
                    <span className="text-[11px] text-[var(--muted-foreground)] font-medium leading-tight">{del.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mentor Tip */}
          <div className="p-3 rounded-[14px] bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-xs text-[#FBBF24] flex items-start gap-2.5">
            <Flame className="h-4 w-4 text-[#F59E0B] shrink-0 mt-0.5" />
            <span><strong>Mentor Tip:</strong> {day1Data.mentorTip}</span>
          </div>

          {/* Action button */}
          <div className="pt-2">
            <Button
              onClick={() => setIsPreviewOpen(false)}
              variant="primary"
              size="md"
              className="w-full h-11"
            >
              Got It — Close Preview
            </Button>
          </div>

        </div>
      </Dialog>
    </section>
  );
}
