import { notFound } from "next/navigation";
import type { Metadata } from "next";
import challengeData from "@/data/challenges.json";
import { DayPageClient } from "./DayPageClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const dayId = parseInt(id, 10);
  const challenge = challengeData.challenges.find((c) => c.id === dayId);

  if (!challenge) {
    return { title: "Day Not Found — ABTalks" };
  }

  return {
    title: `Day ${dayId}: ${challenge.title} — ABTalks Challenge`,
    description: challenge.description,
  };
}

export default async function DayPage({ params }: PageProps) {
  const { id } = await params;
  const dayId = parseInt(id, 10);

  // Validate day range
  if (isNaN(dayId) || dayId < 1 || dayId > 60) {
    notFound();
  }

  const challenge = challengeData.challenges.find((c) => c.id === dayId);

  if (!challenge) {
    // Day exists in range but no mock data — generate a stub
    const stubChallenge = {
      id: dayId,
      title: `Day ${dayId} Challenge`,
      description: "This challenge is coming soon. Check back later!",
      context: "Stay consistent. Every day counts.",
      track: "Full Stack Development",
      difficulty: "Intermediate",
      estimatedTime: "3-4 hours",
      xpReward: 150,
      objectives: ["Complete today's task", "Submit your proof of work"],
      deliverables: [
        { type: "repo", label: "GitHub repository", icon: "Github" },
        { type: "commit", label: "Today's commit", icon: "GitCommit" },
        { type: "post", label: "LinkedIn post", icon: "Linkedin" },
      ],
      resources: [],
      tips: [],
    };

    const user = challengeData.currentUser;
    const nextChallenge = challengeData.challenges.find((c) => c.id === dayId + 1) ?? null;

    return (
      <DayPageClient
        challenge={stubChallenge}
        user={user}
        dayId={dayId}
        isAlreadySubmitted={user.completedDays.includes(dayId)}
        nextChallenge={
          nextChallenge
            ? {
                id: nextChallenge.id,
                title: nextChallenge.title,
                difficulty: nextChallenge.difficulty,
                estimatedTime: nextChallenge.estimatedTime,
              }
            : null
        }
      />
    );
  }

  const user = challengeData.currentUser;
  const isAlreadySubmitted = user.completedDays.includes(dayId);
  const nextChallenge = challengeData.challenges.find((c) => c.id === dayId + 1) ?? null;

  return (
    <DayPageClient
      challenge={challenge}
      user={user}
      dayId={dayId}
      isAlreadySubmitted={isAlreadySubmitted}
      nextChallenge={
        nextChallenge
          ? {
              id: nextChallenge.id,
              title: nextChallenge.title,
              difficulty: nextChallenge.difficulty,
              estimatedTime: nextChallenge.estimatedTime,
            }
          : null
      }
    />
  );
}
