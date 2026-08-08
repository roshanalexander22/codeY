"use client";

import { useState } from "react";
import { toast } from "sonner";
import { DayHeader } from "@/components/day/DayHeader";
import { DayProgressBar } from "@/components/day/DayProgressBar";
import { DayBadge } from "@/components/day/DayBadge";
import { ChallengeCard } from "@/components/day/ChallengeCard";
import { ObjectivesList } from "@/components/day/ObjectivesList";
import { DeliverablesCard } from "@/components/day/DeliverablesCard";
import { ResourcesCard } from "@/components/day/ResourcesCard";
import { TipsCard } from "@/components/day/TipsCard";
import { SubmissionForm } from "@/components/day/SubmissionForm";
import { SuccessDialog } from "@/components/day/SuccessDialog";
import { EdgeCaseBanner } from "@/components/day/EdgeCaseBanner";
import { type SubmissionFormData } from "@/lib/validators";

interface Challenge {
  id: number;
  title: string;
  description: string;
  context: string;
  track: string;
  difficulty: string;
  estimatedTime: string;
  xpReward: number;
  objectives: string[];
  deliverables: { type: string; label: string; icon: string }[];
  resources: { type: string; title: string; url: string; duration: string }[];
  tips: { text: string; mentor: string }[];
}

interface User {
  name: string;
  avatar: string;
  streak: number;
  totalXp: number;
  track: string;
  completedDays: number[];
  missedDays: number[];
}

interface NextChallenge {
  id: number;
  title: string;
  difficulty: string;
  estimatedTime: string;
}

interface DayPageClientProps {
  challenge: Challenge;
  user: User;
  dayId: number;
  isAlreadySubmitted: boolean;
  nextChallenge: NextChallenge | null;
}

export function DayPageClient({
  challenge,
  user,
  dayId,
  isAlreadySubmitted,
  nextChallenge,
}: DayPageClientProps) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [newStreak, setNewStreak] = useState(user.streak);
  const [submitted, setSubmitted] = useState(isAlreadySubmitted);

  const isFirstDay = user.streak === 0 && user.completedDays.length === 0;
  const missedYesterday =
    user.missedDays.includes(dayId - 1) ||
    (dayId > 1 &&
      !user.completedDays.includes(dayId - 1) &&
      !user.completedDays.includes(dayId) &&
      user.streak === 0 &&
      user.completedDays.length > 0);
  const challengeComplete = dayId > 60;

  const handleSubmitSuccess = (data: SubmissionFormData) => {
    setNewStreak((prev) => prev + 1);
    setSubmitted(true);
    setShowSuccess(true);
    toast.success("Day " + dayId + " submitted!", {
      description: "+" + challenge.xpReward + " XP earned. Keep going!",
    });
  };

  const handleViewSubmission = () => {
    const formSection = document.getElementById("submission-section");
    formSection?.scrollIntoView({ behavior: "smooth" });
  };

  // Determine edge case to show
  const edgeCaseType = submitted
    ? "already-submitted"
    : challengeComplete
      ? "challenge-complete"
      : missedYesterday
        ? "missed-yesterday"
        : isFirstDay
          ? "no-streak"
          : null;

  return (
    <main
      className="min-h-dvh"
      style={{ background: "var(--background)", maxWidth: "480px", margin: "0 auto" }}
    >
      {/* Sticky Header */}
      <DayHeader streak={newStreak} dayId={dayId} />

      {/* Edge case banners */}
      {edgeCaseType && (
        <EdgeCaseBanner
          type={edgeCaseType}
          onViewSubmission={edgeCaseType === "already-submitted" ? handleViewSubmission : undefined}
        />
      )}

      {/* Progress bar */}
      <DayProgressBar
        currentDay={dayId}
        totalDays={60}
        completedDays={submitted ? [...user.completedDays, dayId] : user.completedDays}
      />

      {/* Day badge */}
      <DayBadge
        dayId={dayId}
        track={challenge.track}
        difficulty={challenge.difficulty}
        estimatedTime={challenge.estimatedTime}
        xpReward={challenge.xpReward}
      />

      {/* Challenge content */}
      <ChallengeCard
        title={challenge.title}
        description={challenge.description}
        context={challenge.context}
      />

      <ObjectivesList objectives={challenge.objectives} />

      <DeliverablesCard deliverables={challenge.deliverables} />

      <ResourcesCard resources={challenge.resources} />

      <TipsCard tips={challenge.tips} />

      {/* Submission form */}
      <section id="submission-section" aria-label="Proof of work submission">
        <SubmissionForm
          dayId={dayId}
          onSuccess={handleSubmitSuccess}
          isAlreadySubmitted={submitted}
        />
      </section>

      {/* Success dialog */}
      <SuccessDialog
        isOpen={showSuccess}
        dayId={dayId}
        xpEarned={challenge.xpReward}
        newStreak={newStreak}
        tomorrowChallenge={nextChallenge}
        onClose={() => setShowSuccess(false)}
      />
    </main>
  );
}
