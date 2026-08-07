"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Flame, GitCommit, Play, ArrowRight, CheckCircle2, Sparkles, Trophy, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface HeroSectionProps {
  onOpenJoinModal: () => void;
}

export function HeroSection({ onOpenJoinModal }: HeroSectionProps) {
  // Live Streak Simulator state
  const [currentStreak, setCurrentStreak] = React.useState(42);
  const [simulatedCommits, setSimulatedCommits] = React.useState(184);
  const [hasCommittedToday, setHasCommittedToday] = React.useState(false);

  const handleSimulateCommit = () => {
    if (!hasCommittedToday) {
      setCurrentStreak((prev) => prev + 1);
      setSimulatedCommits((prev) => prev + 5);
      setHasCommittedToday(true);
    }
  };

  // Generate 60 days commit activity grid (10 columns x 6 rows)
  const commitGrid = React.useMemo(() => {
    return Array.from({ length: 60 }, (_, i) => {
      const day = i + 1;
      let intensity = "bg-[#27272A]"; // default uncommitted
      if (day <= currentStreak) {
        if (day % 7 === 0) intensity = "bg-[#4F46E5] shadow-[0_0_8px_#4F46E5]"; // max level
        else if (day % 3 === 0) intensity = "bg-[#6366F1]";
        else intensity = "bg-[#818CF8]/80";
      } else if (day === currentStreak + 1 && hasCommittedToday) {
        intensity = "bg-[#22C55E] shadow-[0_0_8px_#22C55E]";
      }
      return { day, intensity };
    });
  }, [currentStreak, hasCommittedToday]);

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-[#4F46E5]/15 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Left Text & CTA Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex-1 text-center lg:text-left space-y-6 max-w-[390px] sm:max-w-xl mx-auto lg:mx-0"
          >
            {/* Top Pill Tag */}
            <div className="inline-flex items-center gap-2">
              <Badge variant="primary" className="gap-1.5 py-1 px-3.5 text-xs font-semibold">
                <Sparkles className="h-3.5 w-3.5 text-[#818CF8]" />
                60-Day Build In Public Challenge
              </Badge>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#FAFAFA] leading-[1.1]">
              Build in Public. <br />
              <span className="bg-gradient-to-r from-[#4F46E5] via-[#818CF8] to-[#22C55E] bg-clip-text text-transparent">
                Become Impossible to Ignore.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed max-w-lg mx-auto lg:mx-0">
              Commit code daily for 60 consecutive days. Share your progress on GitHub & LinkedIn, build a stellar portfolio, and get discovered by top tech recruiters.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Button
                onClick={onOpenJoinModal}
                variant="primary"
                size="lg"
                className="w-full sm:w-auto gap-2.5 text-base h-13 shadow-[0_0_30px_rgba(79,70,229,0.5)]"
              >
                Start Challenge
                <ArrowRight className="h-5 w-5" />
              </Button>

              <a href="#how-it-works" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto gap-2 text-base h-13"
                >
                  <Play className="h-4 w-4 fill-current" />
                  View Demo
                </Button>
              </a>
            </div>

            {/* Key Perks Micro-list */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs text-[#A1A1AA]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#22C55E]" /> No credit card
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#22C55E]" /> Verified certificate
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#22C55E]" /> Talent pool
              </span>
            </div>
          </motion.div>

          {/* Right Interactive Animated Coding Streak Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
            className="flex-1 w-full max-w-[390px] sm:max-w-md lg:max-w-none"
          >
            <Card hoverGlow={true} className="bg-[#18181B] border-[#27272A] p-6 sm:p-8 space-y-6 shadow-2xl relative">
              
              {/* Header card info */}
              <div className="flex items-center justify-between pb-4 border-b border-[#27272A]">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 flex items-center justify-center">
                    <Flame className="h-5 w-5 text-[#22C55E] animate-bounce" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#FAFAFA] text-base sm:text-lg flex items-center gap-2">
                      Active Streak
                    </h3>
                    <p className="text-xs text-[#A1A1AA]">60-Day Challenge Matrix</p>
                  </div>
                </div>

                {/* Duolingo style Flame Badge */}
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F59E0B]/15 border border-[#F59E0B]/40 text-[#F59E0B] font-bold text-sm">
                  <Flame className="h-4 w-4 fill-current" />
                  <span>{currentStreak} Days</span>
                </div>
              </div>

              {/* Stats overview row inside Card */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#09090B] p-4 rounded-[16px] border border-[#27272A]">
                  <span className="text-xs text-[#A1A1AA] flex items-center gap-1 mb-1">
                    <GitCommit className="h-3.5 w-3.5 text-[#4F46E5]" /> Total Commits
                  </span>
                  <span className="text-2xl font-extrabold text-[#FAFAFA]">{simulatedCommits}</span>
                </div>
                <div className="bg-[#09090B] p-4 rounded-[16px] border border-[#27272A]">
                  <span className="text-xs text-[#A1A1AA] flex items-center gap-1 mb-1">
                    <Trophy className="h-3.5 w-3.5 text-[#F59E0B]" /> Milestone
                  </span>
                  <span className="text-2xl font-extrabold text-[#22C55E]">{Math.round((currentStreak/60)*100)}%</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-[#A1A1AA]">
                  <span>Day {currentStreak} of 60 Goal</span>
                  <span className="font-semibold text-[#818CF8]">{60 - currentStreak} days remaining</span>
                </div>
                <Progress value={currentStreak} max={60} indicatorColor="bg-gradient-to-r from-[#4F46E5] to-[#22C55E]" />
              </div>

              {/* 60-Day Commit Grid Matrix (GitHub / Linear Style) */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs text-[#A1A1AA]">
                  <span>GitHub Streak Map</span>
                  <span className="text-[10px] text-[#A1A1AA]/80">Level 4 Master</span>
                </div>
                <div className="grid grid-cols-10 gap-1.5 p-3 rounded-[16px] bg-[#09090B] border border-[#27272A]">
                  {commitGrid.map((item) => (
                    <div
                      key={item.day}
                      title={`Day ${item.day}`}
                      className={`h-4 w-full rounded-[4px] transition-all duration-300 ${item.intensity}`}
                    />
                  ))}
                </div>
              </div>

              {/* Live Interactive Simulator Button */}
              <div className="pt-2">
                <Button
                  onClick={handleSimulateCommit}
                  disabled={hasCommittedToday}
                  variant={hasCommittedToday ? "secondary" : "success"}
                  size="md"
                  className="w-full gap-2 text-xs sm:text-sm h-11"
                >
                  {hasCommittedToday ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 text-[#22C55E]" />
                      Today&apos;s Commit Verified! (+1 Streak)
                    </>
                  ) : (
                    <>
                      <GitCommit className="h-4 w-4" />
                      Simulate Push Commit (+1 Day Streak)
                    </>
                  )}
                </Button>
              </div>
            </Card>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
