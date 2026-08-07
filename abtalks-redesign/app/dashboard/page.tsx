"use client";

import { motion } from "framer-motion";
import { AlertTriangle, UserCircle2, Sparkles } from "lucide-react";
import { TopAppBar } from "@/components/dashboard/TopAppBar";
import { StreakCard } from "@/components/dashboard/StreakCard";
import { ProgressCard } from "@/components/dashboard/ProgressCard";
import { TodayChallengeCard } from "@/components/dashboard/TodayChallengeCard";
import { AchievementsPanel } from "@/components/dashboard/AchievementsPanel";
import { WeeklyHeatmap } from "@/components/dashboard/WeeklyHeatmap";
import { LeaderboardPreview } from "@/components/dashboard/LeaderboardPreview";
import { BottomNav } from "@/components/dashboard/BottomNav";
import { getDashboardData, todayChallenge } from "@/data/dashboard";

// ─── TOGGLE THIS TO SWITCH EDGE CASES ────────────────────────────────────────
// Options: "normal" | "firstDay" | "missedDay" | "emptyProfile"
const ACTIVE_EDGE_CASE = "normal" as const;
// ─────────────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const { user, leaderboard, isFirstDay, isMissedDay, isEmptyProfile } =
    getDashboardData(ACTIVE_EDGE_CASE);

  return (
    <>
      {/* Page */}
      <main
        className="min-h-dvh pb-28"
        style={{ background: "#09090B", maxWidth: "480px", margin: "0 auto" }}
      >
        {/* Top App Bar */}
        <TopAppBar
          name={user.name}
          avatar={user.avatar}
          track={user.track}
          notificationCount={isMissedDay ? 1 : isFirstDay ? 0 : 2}
          isEmptyProfile={isEmptyProfile}
        />

        {/* ── Empty profile banner ──────────────────────────── */}
        {isEmptyProfile && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
            className="mx-5 mt-4"
          >
            <div
              className="flex items-start gap-3 p-4 rounded-2xl"
              style={{
                background: "rgba(79, 70, 229, 0.08)",
                border: "1px solid rgba(79, 70, 229, 0.2)",
              }}
            >
              <UserCircle2 size={18} color="#818cf8" className="flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold" style={{ color: "#818cf8" }}>
                  Complete your profile
                </p>
                <p className="text-xs mt-0.5 leading-relaxed" style={{ color: "#a1a1aa" }}>
                  Add your name, avatar, and pick a track to start your 60-day journey.
                </p>
                <button
                  id="complete-profile-cta"
                  className="mt-3 text-xs font-semibold px-3 py-1.5 rounded-xl transition-colors"
                  style={{
                    background: "rgba(79, 70, 229, 0.2)",
                    border: "1px solid rgba(79, 70, 229, 0.3)",
                    color: "#818cf8",
                  }}
                >
                  Set up profile →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Missed day banner ────────────────────────────────── */}
        {isMissedDay && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
            className="mx-5 mt-4"
          >
            <div
              className="flex items-start gap-3 p-4 rounded-2xl"
              style={{
                background: "rgba(239, 68, 68, 0.07)",
                border: "1px solid rgba(239, 68, 68, 0.2)",
              }}
            >
              <AlertTriangle size={18} color="#f87171" className="flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold" style={{ color: "#f87171" }}>
                  Streak broken — {user.missedDays.length} days missed
                </p>
                <p className="text-xs mt-0.5 leading-relaxed" style={{ color: "#a1a1aa" }}>
                  Submit today&apos;s challenge to start a new streak. You got this.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── First day welcome ────────────────────────────────── */}
        {isFirstDay && !isEmptyProfile && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
            className="mx-5 mt-4"
          >
            <div
              className="flex items-start gap-3 p-4 rounded-2xl"
              style={{
                background: "rgba(34, 197, 94, 0.07)",
                border: "1px solid rgba(34, 197, 94, 0.2)",
              }}
            >
              <Sparkles size={18} color="#4ade80" className="flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold" style={{ color: "#4ade80" }}>
                  Welcome to ABTalks! 🎉
                </p>
                <p className="text-xs mt-0.5 leading-relaxed" style={{ color: "#a1a1aa" }}>
                  Day 1 begins today. Complete your first challenge to start your streak.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Scroll content ────────────────────────────────────── */}
        <div className="px-5 pt-4 space-y-4">

          {/* 1. Streak */}
          <StreakCard
            streak={user.streak}
            longestStreak={user.longestStreak}
            isMissedDay={isMissedDay}
            isFirstDay={isFirstDay}
          />

          {/* 2. Progress */}
          <ProgressCard
            currentDay={user.currentDay}
            totalDays={60}
            completedDays={user.completedDays}
          />

          {/* 3. Today's Challenge */}
          <TodayChallengeCard
            currentDay={user.currentDay}
            title={
              isEmptyProfile
                ? "Pick a track to see your challenge"
                : todayChallenge.title
            }
            estimatedTime={todayChallenge.estimatedTime}
            difficulty={todayChallenge.difficulty}
            isCompleted={user.todaySubmitted}
            isMissedDay={isMissedDay}
          />

          {/* 4. Achievements + XP */}
          <AchievementsPanel
            completedDays={user.completedDays.length}
            streak={user.streak}
            xp={user.totalXp}
            level={user.level}
            isFirstDay={isFirstDay}
          />

          {/* 5. Activity Heatmap */}
          <WeeklyHeatmap
            completedDays={user.completedDays}
            missedDays={user.missedDays}
            enrolledAt={user.enrolledAt}
          />

          {/* 6. Leaderboard Preview */}
          <LeaderboardPreview
            entries={leaderboard}
            isFirstDay={isFirstDay || isEmptyProfile}
          />

          {/* Bottom padding for nav */}
          <div className="h-4" />
        </div>
      </main>

      {/* Bottom navigation */}
      <BottomNav />
    </>
  );
}
