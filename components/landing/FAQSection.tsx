"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Accordion } from "@/components/ui/accordion";

export function FAQSection() {
  const faqItems = [
    {
      id: "faq-1",
      question: "What exactly is ABTalks 60-Day Challenge?",
      answer:
        "ABTalks is a structured 60-day build-in-public initiative. You select a track (Frontend, Fullstack, AI, DevOps), commit code daily to your GitHub repo, and post your daily learnings on LinkedIn. It turns isolated study into visible public proof of competence.",
    },
    {
      id: "faq-2",
      question: "Do I need to be an advanced programmer to participate?",
      answer:
        "Not at all! Whether you are a beginner learning TypeScript or an intermediate dev sharpening your React and Next.js skills, the prompts adapt to your skill level. The key goal is daily consistency.",
    },
    {
      id: "faq-3",
      question: "What happens if I miss a single day?",
      answer:
        "Life happens! You get 2 'Freeze Shields' per 60-day cycle to preserve your streak without penalty. However, to earn the Verified Developer badge, you must reach 60 active commit days.",
    },
    {
      id: "faq-4",
      question: "How do recruiters and hiring managers find my profile?",
      answer:
        "Finishing the 60 days unlocks your profile on the official ABTalks Talent Directory. Our partner recruiters filter candidates by track, verified GitHub commit logs, and streak consistency score.",
    },
    {
      id: "faq-5",
      question: "Is there any fee or paid subscription required?",
      answer:
        "No. ABTalks 60-Day Challenge is 100% free for developers. Our goal is to empower student builders to become impossible to ignore.",
    },
  ];

  return (
    <section id="faq" className="py-24 bg-[#09090B] border-t border-[#27272A]/50 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        <div className="text-center space-y-4 mb-16">
          <Badge variant="primary">Got Questions?</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FAFAFA] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-[#A1A1AA] text-base leading-relaxed">
            Everything you need to know about starting your 60-day journey.
          </p>
        </div>

        <Accordion items={faqItems} />

      </div>
    </section>
  );
}
