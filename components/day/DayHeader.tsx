"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Settings as SettingsIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useStudentProfile } from "@/context/ProfileContext";
import { Avatar } from "@/components/ui/avatar";

interface DayHeaderProps {
  streak: number;
  dayId: number;
  track?: string;
  onOpenSettings?: () => void;
  onOpenProfile?: () => void;
}

export function DayHeader({
  streak,
  dayId,
  track = "Full Stack Development",
  onOpenSettings,
  onOpenProfile,
}: DayHeaderProps) {
  const { profile } = useStudentProfile();
  const activeStreak = profile.streak || streak;

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full border-b bg-[var(--background)]/85 backdrop-blur-md border-[var(--border)]"
    >
      <div className="max-w-[1280px] mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
        {/* Left: Back button & track info */}
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className={cn(
              "touch-target flex items-center justify-center",
              "w-10 h-10 rounded-2xl",
              "transition-colors duration-200 hover:bg-white/10"
            )}
            style={{
              background: "var(--surface-fill, rgba(255,255,255,0.06))",
              border: "1px solid var(--border)",
            }}
            aria-label="Back to dashboard"
          >
            <ArrowLeft size={18} style={{ color: "var(--foreground)" }} />
          </Link>

          <div className="hidden sm:flex flex-col">
            <span className="text-xs font-semibold text-[var(--primary)] uppercase tracking-wider">
              {profile.track || track}
            </span>
            <span className="text-xs text-[var(--muted-foreground)]">
              ABTalks 60-Day Challenge
            </span>
          </div>
        </div>

        {/* Center: Title / Day indicator */}
        <div className="flex flex-col items-center">
          <span
            className="text-xs sm:text-sm font-black tracking-widest uppercase"
            style={{ color: "var(--foreground)", letterSpacing: "0.14em" }}
          >
            ABTalks
          </span>
          <span className="text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>
            Day {dayId} of 60
          </span>
        </div>

        {/* Right: Streak badge, Avatar profile, & Settings trigger */}
        <div className="flex items-center gap-2">
          {/* Streak pill */}
          <div
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-2xl"
            style={{
              background:
                activeStreak > 0
                  ? "rgba(245, 158, 11, 0.12)"
                  : "rgba(255,255,255,0.06)",
              border: `1px solid ${activeStreak > 0 ? "rgba(245, 158, 11, 0.3)" : "var(--border)"}`,
            }}
          >
            <span
              className={cn("text-sm sm:text-base", activeStreak > 0 && "streak-fire")}
              role="img"
              aria-label="streak"
            >
              {activeStreak > 0 ? "🔥" : "💤"}
            </span>
            <span
              className="text-xs sm:text-sm font-bold"
              style={{ color: activeStreak > 0 ? "#fbbf24" : "var(--muted-foreground)" }}
            >
              {activeStreak > 0 ? `${activeStreak} day streak` : "0 streak"}
            </span>
          </div>

          {/* Profile Avatar Control */}
          <button
            type="button"
            onClick={onOpenProfile || onOpenSettings}
            className="flex items-center gap-1.5 p-1 rounded-2xl transition-transform active:scale-95 cursor-pointer"
            aria-label="Open profile menu"
            title="Profile Menu"
          >
            <Avatar src={profile.avatar} name={profile.name} size="sm" border={false} />
          </button>

          {/* Settings Trigger Button */}
          {onOpenSettings && (
            <button
              type="button"
              onClick={onOpenSettings}
              className="w-9 h-9 rounded-2xl flex items-center justify-center transition-colors hover:bg-white/10"
              style={{
                background: "var(--surface-fill, rgba(255,255,255,0.06))",
                border: "1px solid var(--border)",
              }}
              aria-label="Open Settings"
              title="Open Settings"
            >
              <SettingsIcon size={16} style={{ color: "var(--foreground)" }} />
            </button>
          )}
        </div>
      </div>
    </motion.header>
  );
}
