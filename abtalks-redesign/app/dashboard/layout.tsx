import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard — ABTalks Challenge",
  description:
    "Track your ABTalks 60-day challenge progress. View your streak, XP, achievements, activity heatmap, and leaderboard standing.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
