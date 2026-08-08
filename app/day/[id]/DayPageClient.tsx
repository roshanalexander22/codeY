"use client";

import { useState } from "react";
import { toast } from "sonner";
import { DayHeader } from "@/components/day/DayHeader";
import { DayProgressBar } from "@/components/day/DayProgressBar";
import { DayBadge } from "@/components/day/DayBadge";
import { ChallengeCard } from "@/components/day/ChallengeCard";
import { BuildPreview } from "@/components/day/BuildPreview";
import { BuildPlan } from "@/components/day/BuildPlan";
import { ObjectivesList } from "@/components/day/ObjectivesList";
import { DeliverablesCard } from "@/components/day/DeliverablesCard";
import { ResourcesCard } from "@/components/day/ResourcesCard";
import { TipsCard } from "@/components/day/TipsCard";
import { SubmissionChecklist } from "@/components/day/SubmissionChecklist";
import { SubmissionReadiness } from "@/components/day/SubmissionReadiness";
import { SubmissionForm } from "@/components/day/SubmissionForm";
import { SuccessDialog } from "@/components/day/SuccessDialog";
import { EdgeCaseBanner } from "@/components/day/EdgeCaseBanner";
import { type SubmissionFormData } from "@/lib/validators";

interface BuildStep {
  step: number;
  title: string;
  description: string;
  time: string;
}

interface Resource {
  type: string;
  category?: string;
  title: string;
  description?: string;
  url: string;
  duration: string;
}

interface Challenge {
  id: number;
  title: string;
  description: string;
  context: string;
  track: string;
  difficulty: string;
  estimatedTime: string;
  xpReward: number;
  skills?: string[];
  objectives: string[];
  buildSteps?: BuildStep[];
  deliverables: { type: string; label: string; icon: string }[];
  resources: Resource[];
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

import { SettingsModal } from "@/components/settings/SettingsModal";

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
  const [completedObjectivesCount, setCompletedObjectivesCount] = useState(0);

  // Form field completion states for SubmissionReadiness calculation
  const [formFieldsState, setFormFieldsState] = useState({
    githubRepo: false,
    commitUrl: false,
    linkedinUrl: false,
    reflection: false,
  });

  const isFirstDay = user.streak === 0 && user.completedDays.length === 0;
  const missedYesterday =
    user.missedDays.includes(dayId - 1) ||
    (dayId > 1 &&
      !user.completedDays.includes(dayId - 1) &&
      !user.completedDays.includes(dayId) &&
      user.streak === 0 &&
      user.completedDays.length > 0);
  const challengeComplete = dayId > 60;

  const handleSubmitSuccess = (_data: SubmissionFormData) => {
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

  // Determine edge case banner
  const edgeCaseType = submitted
    ? "already-submitted"
    : challengeComplete
      ? "challenge-complete"
      : missedYesterday
        ? "missed-yesterday"
        : isFirstDay
          ? "no-streak"
          : null;

  // Readiness checklist fields
  const readinessFields = [
    {
      key: "objectives",
      label: `Objectives (${completedObjectivesCount}/${challenge.objectives.length})`,
      filled: completedObjectivesCount === challenge.objectives.length && challenge.objectives.length > 0,
    },
    {
      key: "githubRepo",
      label: "GitHub Repository URL",
      filled: formFieldsState.githubRepo,
    },
    {
      key: "commitUrl",
      label: "Today's Commit URL",
      filled: formFieldsState.commitUrl,
    },
    {
      key: "linkedinUrl",
      label: "LinkedIn Post URL",
      filled: formFieldsState.linkedinUrl,
    },
    {
      key: "reflection",
      label: "Learning Reflection",
      filled: formFieldsState.reflection,
    },
  ];

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className="day-page-wrapper min-h-screen">
      {/* Sticky Header across full width */}
      <DayHeader
        streak={newStreak}
        dayId={dayId}
        track={challenge.track}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main Container - Mobile 1-col, Desktop 2-col */}
      <main className="day-layout-grid">
        {/* LEFT COLUMN: Challenge instructions & learning resources */}
        <div className="space-y-4">
          {/* Edge case banners */}
          {edgeCaseType && (
            <EdgeCaseBanner
              type={edgeCaseType}
              onViewSubmission={edgeCaseType === "already-submitted" ? handleViewSubmission : undefined}
            />
          )}

          {/* Hero Challenge Card */}
          <ChallengeCard
            title={challenge.title}
            description={challenge.description}
            context={challenge.context}
            skills={challenge.skills}
            isAlreadySubmitted={submitted}
          />

          {/* Visual Schematic Preview */}
          <BuildPreview />

          {/* Learning Objectives (Interactive) */}
          <ObjectivesList
            objectives={challenge.objectives}
            onCompletionChange={(count) => setCompletedObjectivesCount(count)}
          />

          {/* Step-by-Step Plan */}
          {challenge.buildSteps && challenge.buildSteps.length > 0 && (
            <BuildPlan steps={challenge.buildSteps} />
          )}

          {/* Deliverables Card */}
          <DeliverablesCard deliverables={challenge.deliverables} />

          {/* Resources */}
          <ResourcesCard resources={challenge.resources} />

          {/* Mentor Tips */}
          <TipsCard tips={challenge.tips} />
        </div>

        {/* RIGHT COLUMN: Progress & Proof of Work Submission (Sticky on Desktop) */}
        <div className="day-side-column-sticky space-y-4 mt-4 lg:mt-0">
          {/* Progress bar */}
          <DayProgressBar
            currentDay={dayId}
            totalDays={60}
            completedDays={submitted ? [...user.completedDays, dayId] : user.completedDays}
          />

          {/* Day metadata badge */}
          <DayBadge
            dayId={dayId}
            track={challenge.track}
            difficulty={challenge.difficulty}
            estimatedTime={challenge.estimatedTime}
            xpReward={challenge.xpReward}
          />

          {/* Pre-submission Checklist */}
          <SubmissionChecklist />

          {/* Submission Readiness Meter */}
          <SubmissionReadiness fields={readinessFields} />

          {/* Proof of Work Submission Form */}
          <section id="submission-section" aria-label="Proof of work submission">
            <SubmissionForm
              dayId={dayId}
              onSuccess={handleSubmitSuccess}
              isAlreadySubmitted={submitted}
            />
          </section>
        </div>
      </main>

      {/* Success Dialog */}
      <SuccessDialog
        isOpen={showSuccess}
        dayId={dayId}
        xpEarned={challenge.xpReward}
        newStreak={newStreak}
        tomorrowChallenge={nextChallenge}
        onClose={() => setShowSuccess(false)}
      />

      {/* Global Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
}
