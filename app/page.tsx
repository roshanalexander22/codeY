"use client";

import * as React from "react";
import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { JourneyTimeline } from "@/components/landing/JourneyTimeline";
import { DayOnePreview } from "@/components/landing/DayOnePreview";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { ProofOfWork } from "@/components/landing/ProofOfWork";
import { TransformationSection } from "@/components/landing/TransformationSection";
import { BenefitsSection } from "@/components/landing/BenefitsSection";
import { StatsSection } from "@/components/landing/StatsSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { MissedDaySection } from "@/components/landing/MissedDaySection";
import { FAQSection } from "@/components/landing/FAQSection";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";
import { JoinModal } from "@/components/landing/JoinModal";
import { SettingsModal } from "@/components/settings/SettingsModal";

export default function LandingPage() {
  const [isJoinModalOpen, setIsJoinModalOpen] = React.useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);

  const handleOpenJoinModal = () => setIsJoinModalOpen(true);
  const handleCloseJoinModal = () => setIsJoinModalOpen(false);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--primary)] selection:text-white flex flex-col font-sans overflow-x-hidden">
      {/* Top Navbar */}
      <Navbar
        onOpenJoinModal={handleOpenJoinModal}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main Landing Page Experience */}
      <main className="flex-1">
        {/* 1. Hero Section with Live Momentum & Streak Simulator */}
        <HeroSection onOpenJoinModal={handleOpenJoinModal} />

        {/* 2. 60-Day Journey Timeline (Day 01 -> Day 60) */}
        <JourneyTimeline />

        {/* 3. Interactive Day 1 & Tonight's Build Preview */}
        <DayOnePreview />

        {/* 4. How It Works (5-Step System) */}
        <HowItWorksSection />

        {/* 5. Proof-of-Work Loop (Build -> Commit -> Post -> Proof -> Streak -> Portfolio) */}
        <ProofOfWork />

        {/* 6. Mindset Shift & Transformation (Before vs After) */}
        <TransformationSection />

        {/* 7. Bento Grid Benefits */}
        <BenefitsSection />

        {/* 8. Trust Metrics & Stats */}
        <StatsSection />

        {/* 9. Progression Student Stories */}
        <TestimonialsSection />

        {/* 10. Missed Day Reassurance */}
        <MissedDaySection />

        {/* 11. Accessible FAQ Accordion */}
        <FAQSection />

        {/* 12. Final High-Conversion CTA */}
        <FinalCTA onOpenJoinModal={handleOpenJoinModal} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Join Challenge Dialog Modal */}
      <JoinModal isOpen={isJoinModalOpen} onClose={handleCloseJoinModal} />

      {/* Global Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
}
