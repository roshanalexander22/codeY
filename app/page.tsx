"use client";

import * as React from "react";
import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { BenefitsSection } from "@/components/landing/BenefitsSection";
import { StatsSection } from "@/components/landing/StatsSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { Footer } from "@/components/landing/Footer";
import { JoinModal } from "@/components/landing/JoinModal";

export default function LandingPage() {
  const [isJoinModalOpen, setIsJoinModalOpen] = React.useState(false);

  const handleOpenJoinModal = () => setIsJoinModalOpen(true);
  const handleCloseJoinModal = () => setIsJoinModalOpen(false);

  return (
    <div className="min-h-screen bg-[#09090B] text-[#FAFAFA] selection:bg-[#4F46E5] selection:text-white flex flex-col font-sans">
      {/* Top Navbar */}
      <Navbar onOpenJoinModal={handleOpenJoinModal} />

      {/* Main Landing Sections */}
      <main className="flex-1">
        {/* Hero Section with interactive streak simulator */}
        <HeroSection onOpenJoinModal={handleOpenJoinModal} />

        {/* Section 2: How it Works (5 steps) */}
        <HowItWorksSection />

        {/* Section 3: Benefits (Bento grid) */}
        <BenefitsSection />

        {/* Section 4: Stats Counters */}
        <StatsSection />

        {/* Section 5: Student Testimonials */}
        <TestimonialsSection />

        {/* Section 6: FAQ Accordion */}
        <FAQSection />
      </main>

      {/* Section 7: Footer */}
      <Footer />

      {/* Join Challenge Dialog Modal */}
      <JoinModal isOpen={isJoinModalOpen} onClose={handleCloseJoinModal} />
    </div>
  );
}
