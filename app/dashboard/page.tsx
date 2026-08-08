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

export default function DashboardPage() {
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
    <div className="min-h-screen bg-[#09090B] text-zinc-100 flex flex-col selection:bg-indigo-500/20">

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
            <div className="flex items-start justify-between gap-4 p-4 sm:p-5 rounded-3xl bg-amber-500/10 border border-amber-500/30 text-amber-200">
              <div className="flex items-start gap-3">
                <UserCircle2 size={22} className="text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-amber-200">Complete your challenger profile</h3>
                  <p className="text-xs text-amber-300/80 mt-1 leading-relaxed">
                    Set up your full name, college name, and active track to start recording your 60-day learning streak.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs flex-shrink-0 transition-colors shadow-md shadow-amber-500/20"
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
            <div className="flex items-start justify-between gap-4 p-4 sm:p-5 rounded-3xl bg-rose-500/10 border border-rose-500/30 text-rose-200">
              <div className="flex items-start gap-3">
                <AlertTriangle size={22} className="text-rose-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-rose-200">
                    Streak broken — You missed yesterday
                  </h3>
                  <p className="text-xs text-rose-300/80 mt-1 leading-relaxed">
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
            <div className="flex items-start justify-between gap-4 p-4 sm:p-5 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-200">
              <div className="flex items-start gap-3">
                <Sparkles size={22} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-emerald-200">Welcome to Day 1 of ABTalks! 🎉</h3>
                  <p className="text-xs text-emerald-300/80 mt-1 leading-relaxed">
                    Your first streak starts today. Complete Day 1 objectives and post your public proof of work to kick off your streak!
                  </p>
                </div>
              </div>
              <a
                href={`/day/${user.currentDay}`}
                className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs flex-shrink-0 transition-colors shadow-md shadow-emerald-500/20"
              >
                Start Day 1
              </a>
            </div>
          </motion.div>
        )}

        {/* ── RESPONSIVE DASHBOARD GRID ───────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6">

          {/* Row 1: Streak (4 cols) + Momentum (4 cols) + Progress (4 cols) */}
          <div className="md:col-span-4">
            <StreakCard
              streak={user.streak}
              longestStreak={user.longestStreak}
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
              completedDays={user.completedDays}
              onClick={() => setIsProgressDetailOpen(true)}
            />
          </div>

          {/* Row 2: Today's Challenge (8 cols) + Achievements (4 cols) */}
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
              isCompleted={user.todaySubmitted}
              isMissedDay={isMissedDay}
              isFirstDay={isFirstDay}
            />
          </div>

          <div className="md:col-span-4">
            <AchievementsPanel
              completedDays={user.completedDays.length}
              streak={user.streak}
              xp={user.totalXp}
              level={user.level}
              isFirstDay={isFirstDay}
              onSelectAchievement={(ach) => setSelectedAchievement(ach)}
            />
          </div>

          {/* Row 3: Activity Heatmap (7 cols) + Leaderboard (5 cols) */}
          <div className="md:col-span-7" id="activity">
            <WeeklyHeatmap
              completedDays={user.completedDays}
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
        onSave={(newSettings: any) => setSettings(newSettings)}
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
