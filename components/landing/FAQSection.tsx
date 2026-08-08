"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Accordion } from "@/components/ui/accordion";

export function FAQSection() {
  const faqItems = [
    {
      id: "faq-1",
      question: "What is the 60-day challenge?",
      answer:
        "ABTalks 60-Day Challenge is a structured build-in-public program for college students. You select a track (Frontend, Fullstack, AI, DevOps), build a small project feature daily, commit your code to GitHub, and share your progress on LinkedIn.",
    },
    {
      id: "faq-2",
      question: "What happens each day?",
      answer:
        "Every day at 00:00, a new bite-sized challenge prompt unlocks. You spend 30–45 minutes coding, push your commit to your public GitHub repo, and paste your submission link to maintain your streak.",
    },
    {
      id: "faq-3",
      question: "Do I need to be an experienced developer?",
      answer:
        "Not at all! The prompts are designed for beginners and intermediate students. Day 1 starts with basic environment setup and Git concepts, building up step-by-step to production REST APIs and fullstack apps.",
    },
    {
      id: "faq-4",
      question: "How much time does a day take?",
      answer:
        "Daily challenges are calibrated for 30–45 minutes of focused building — easy to fit into a busy college schedule after classes or late at night.",
    },
    {
      id: "faq-5",
      question: "Why GitHub?",
      answer:
        "GitHub commits are the ultimate proof of work in software engineering. Recruiters trust verified GitHub commit logs over unverified resume claims.",
    },
    {
      id: "faq-6",
      question: "Why LinkedIn?",
      answer:
        "Sharing your daily progress under #ABTalks60Days builds your public personal brand and puts your work directly on the feeds of engineering managers and recruiters.",
    },
    {
      id: "faq-7",
      question: "What happens if I miss a day?",
      answer:
        "Don't panic! Every student gets 2 automatic Freeze Shields per 60-day cycle to protect their streak during exams or emergencies. Your code and progress are never lost.",
    },
    {
      id: "faq-8",
      question: "What happens after Day 60?",
      answer:
        "Completing 60 days unlocks your official ABTalks 60-Day Verified Developer Badge, your verified 60-commit portfolio, and direct listing in our recruiter talent directory.",
    },
  ];

  return (
    <section id="faq" className="py-20 bg-[#09090B] border-t border-[#27272A]/50 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <Badge variant="primary">Clear Answers</Badge>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#FAFAFA] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
            Everything you need to know before starting your Day 1 journey.
          </p>
        </div>

        <Accordion items={faqItems} />

      </div>
    </section>
  );
}
