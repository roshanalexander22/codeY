"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, UserCircle2, Sparkles } from "lucide-react";
import { TopAppBar } from "@/components/dashboard/TopAppBar";
import { DesktopHeader } from "@/components/dashboard/DesktopHeader";
import { StreakCard } from "@/components/dashboard/StreakCard";
import { MomentumCard } from "@/components/dashboard/MomentumCard";
import { ProgressCard } from "@/components/dashboard/ProgressCard";
import { TodayChallengeCard } from "@/components/dashboard/TodayChallengeCard";
import { AchievementsPanel } from "@/components/dashboard/AchievementsPanel";
import { WeeklyHeatmap } from "@/components/dashboard/WeeklyHeatmap";
import { LeaderboardPreview } from "@/components/dashboard/LeaderboardPreview";
import { BottomNav } from "@/components/dashboard/BottomNav";
import { StateSwitcher } from "@/components/dashboard/StateSwitcher";
import { NotificationPanel } from "@/components/dashboard/NotificationPanel";
import { SettingsModal } from "@/components/settings/SettingsModal";
import { ProfileModal } from "@/components/dashboard/ProfileModal";
import { ProfileMenu } from "@/components/profile/ProfileMenu";
import { ProgressDetailModal } from "@/components/dashboard/ProgressDetailModal";
import { AchievementDetailModal } from "@/components/dashboard/AchievementDetailModal";

import { QuickActions } from "@/components/dashboard/QuickActions";
import { WeeklyGoals } from "@/components/dashboard/WeeklyGoals";
import { LearningInsights } from "@/components/dashboard/LearningInsights";
import { NextMilestoneCard } from "@/components/dashboard/NextMilestoneCard";
import { SkillsProgress } from "@/components/dashboard/SkillsProgress";
import { RecentLearningTimeline } from "@/components/dashboard/RecentLearningTimeline";
import { MotivationalCTA } from "@/components/dashboard/MotivationalCTA";
import {
  getDashboardData,
  todayChallenge,
  initialNotifications,
  defaultSettings,
  EdgeCase,
  NotificationItem,
  UserSettings,
  AchievementDetail,
} from "@/data/dashboard";

import { useStudentProfile } from "@/context/ProfileContext";

export default function DashboardPage() {
  const { profile } = useStudentProfile();

  // Edge Case Switcher State
  const [activeEdgeCase, setActiveEdgeCase] = useState<EdgeCase>("normal");

  // Notifications State
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Settings State
  const [settings, setSettings] = useState<UserSettings>(defaultSettings);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Profile Modal State
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  // Progress Detail Modal State
  const [isProgressDetailOpen, setIsProgressDetailOpen] = useState(false);

  // Achievement Detail Modal State
  const [selectedAchievement, setSelectedAchievement] = useState<AchievementDetail | null>(null);

  // Resolve current state data
  const { user, leaderboard, isFirstDay, isMissedDay, isEmptyProfile } =
    getDashboardData(activeEdgeCase);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const handleMarkNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col selection:bg-indigo-500/20">

      {/* 0. Preview Edge Case Switcher Bar */}
      <StateSwitcher currentCase={activeEdgeCase} onChange={setActiveEdgeCase} />

      {/* 1. Mobile App Header (< md) */}
      <TopAppBar
        name={user.name}
        avatar={user.avatar}
        track={user.track}
        notificationCount={unreadCount}
        isEmptyProfile={isEmptyProfile}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenProfile={() => setIsProfileMenuOpen(true)}
      />

      {/* 2. Desktop Responsive Header (>= md) */}
      <DesktopHeader
        user={user}
        unreadCount={unreadCount}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenProfile={() => setIsProfileMenuOpen(true)}
      />

      {/* 3. Main Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 pb-28 md:pb-12">

        {/* ── Empty Profile Banner ───────────────────────────────── */}
        {isEmptyProfile && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="flex items-start justify-between gap-4 p-4 sm:p-5 rounded-3xl bg-amber-500/10 border border-amber-500/30">
              <div className="flex items-start gap-3">
                <UserCircle2 size={22} className="text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-[var(--foreground)]">Complete your challenger profile</h3>
                  <p className="text-xs text-[var(--muted-foreground)] mt-1 leading-relaxed">
                    Set up your full name, college name, and active track to start recording your 60-day learning streak.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-white font-bold text-xs flex-shrink-0 transition-colors shadow-md shadow-amber-500/20"
              >
                Setup Profile
              </button>
            </div>
          </motion.div>
        )}

        {/* ── Missed Day Recovery Banner ─────────────────────────── */}
        {isMissedDay && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="flex items-start justify-between gap-4 p-4 sm:p-5 rounded-3xl bg-rose-500/10 border border-rose-500/30">
              <div className="flex items-start gap-3">
                <AlertTriangle size={22} className="text-rose-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-[var(--foreground)]">
                    Streak broken — You missed yesterday
                  </h3>
                  <p className="text-xs text-[var(--muted-foreground)] mt-1 leading-relaxed">
                    Your journey isn&apos;t over! Submit today&apos;s Day 12 challenge before midnight to restart your momentum.
                  </p>
                </div>
              </div>
              <a
                href="#today-challenge"
                className="px-3.5 py-2 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-bold text-xs flex-shrink-0 transition-colors shadow-md shadow-rose-500/20"
              >
                Start Today
              </a>
            </div>
          </motion.div>
        )}

        {/* ── First Day Welcome Banner ───────────────────────────── */}
        {isFirstDay && !isEmptyProfile && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="flex items-start justify-between gap-4 p-4 sm:p-5 rounded-3xl bg-emerald-500/10 border border-emerald-500/30">
              <div className="flex items-start gap-3">
                <Sparkles size={22} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-[var(--foreground)]">Welcome to Day 1 of ABTalks! 🎉</h3>
                  <p className="text-xs text-[var(--muted-foreground)] mt-1 leading-relaxed">
                    Your first streak starts today. Complete Day 1 objectives and post your public proof of work to kick off your streak!
                  </p>
                </div>
              </div>
              <a
                href={`/day/${user.currentDay}`}
                className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs flex-shrink-0 transition-colors shadow-md shadow-emerald-500/20"
              >
                Start Day 1
              </a>
            </div>
          </motion.div>
        )}

        {/* ── RESPONSIVE DASHBOARD GRID ───────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6">

          {/* Row 1: Quick Actions (12 cols) */}
          <div className="md:col-span-12">
            <QuickActions
              currentDay={user.currentDay}
              onOpenProgress={() => setIsProgressDetailOpen(true)}
              onOpenAchievements={() => {
                const el = document.getElementById("achievements");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
            />
          </div>

          {/* Row 2: Streak (4 cols) + Momentum (4 cols) + Progress (4 cols) */}
          <div className="md:col-span-4">
            <StreakCard
              streak={profile.streak || user.streak}
              longestStreak={profile.longestStreak || user.longestStreak}
              isMissedDay={isMissedDay}
              isFirstDay={isFirstDay}
            />
          </div>

          <div className="md:col-span-4">
            <MomentumCard
              score={user.momentumScore}
              label={user.momentumLabel}
            />
          </div>

          <div className="md:col-span-4">
            <ProgressCard
              currentDay={user.currentDay}
              totalDays={60}
              completedDays={profile.completedDays.length > 0 ? profile.completedDays : user.completedDays}
              onClick={() => setIsProgressDetailOpen(true)}
            />
          </div>

          {/* Row 3: Learning Insights (12 cols) */}
          <div className="md:col-span-12">
            <LearningInsights
              streak={profile.streak || user.streak}
              completedCount={profile.completedDays.length > 0 ? profile.completedDays.length : user.completedDays.length}
              totalXp={profile.totalXp || user.totalXp}
            />
          </div>

          {/* Row 4: Today's Challenge (8 cols) + Achievements (4 cols) */}
          <div className="md:col-span-8" id="today-challenge">
            <TodayChallengeCard
              currentDay={user.currentDay}
              title={
                isEmptyProfile
                  ? "Pick a track to unlock your daily challenge"
                  : todayChallenge.title
              }
              estimatedTime={todayChallenge.estimatedTime}
              difficulty={todayChallenge.difficulty}
              isCompleted={user.todaySubmitted || profile.completedDays.includes(12)}
              isMissedDay={isMissedDay}
              isFirstDay={isFirstDay}
            />
          </div>

          <div className="md:col-span-4" id="achievements">
            <AchievementsPanel
              completedDays={profile.completedDays.length > 0 ? profile.completedDays.length : user.completedDays.length}
              streak={profile.streak || user.streak}
              xp={profile.totalXp || user.totalXp}
              level={profile.level || user.level}
              isFirstDay={isFirstDay}
              onSelectAchievement={(ach) => setSelectedAchievement(ach)}
            />
          </div>

          {/* Row 5: Weekly Goals (6 cols) + Next Milestone (6 cols) */}
          <div className="md:col-span-6">
            <WeeklyGoals
              completedThisWeek={profile.completedDays.length > 0 ? profile.completedDays.length : 4}
              streakThisWeek={profile.streak || user.streak}
              xpThisWeek={profile.totalXp || 320}
            />
          </div>

          <div className="md:col-span-6">
            <NextMilestoneCard
              currentDay={user.currentDay}
              milestoneDay={14}
              rewardXp={250}
            />
          </div>

          {/* Row 6: Skills Progress (6 cols) + Recent Learning Timeline (6 cols) */}
          <div className="md:col-span-6">
            <SkillsProgress />
          </div>

          <div className="md:col-span-6">
            <RecentLearningTimeline />
          </div>

          {/* Row 7: Activity Heatmap (7 cols) + Leaderboard (5 cols) */}
          <div className="md:col-span-7" id="activity">
            <WeeklyHeatmap
              completedDays={profile.completedDays.length > 0 ? profile.completedDays : user.completedDays}
              missedDays={user.missedDays}
              enrolledAt={user.enrolledAt}
            />
          </div>

          <div className="md:col-span-5">
            <LeaderboardPreview
              entries={leaderboard}
              isFirstDay={isFirstDay || isEmptyProfile}
            />
          </div>

          {/* Row 8: Motivational CTA Banner (12 cols) */}
          <div className="md:col-span-12">
            <MotivationalCTA
              streak={profile.streak || user.streak}
              currentDay={user.currentDay}
            />
          </div>

        </div>

      </main>

      {/* 4. Mobile Bottom Navigation (hidden on desktop) */}
      <BottomNav
        currentDay={user.currentDay}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      {/* 5. Interactive Modals & Panels */}
      <NotificationPanel
        notifications={notifications}
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onMarkRead={handleMarkNotificationRead}
        onMarkAllRead={handleMarkAllNotificationsRead}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        initialSettings={settings}
        onSave={(newSettings) => setSettings(newSettings as UserSettings)}
      />

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={user}
        onEditClick={() => setIsSettingsOpen(true)}
      />

      <ProgressDetailModal
        isOpen={isProgressDetailOpen}
        onClose={() => setIsProgressDetailOpen(false)}
        user={user}
      />

      <AchievementDetailModal
        achievement={selectedAchievement}
        isOpen={selectedAchievement !== null}
        onClose={() => setSelectedAchievement(null)}
      />

      <ProfileMenu
        isOpen={isProfileMenuOpen}
        onClose={() => setIsProfileMenuOpen(false)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenProfileModal={() => setIsProfileOpen(true)}
      />
    </div>
  );
}
