"use client";

import { motion } from "framer-motion";
import { Bell, Settings } from "lucide-react";
import { useStudentProfile } from "@/context/ProfileContext";
import { Avatar } from "@/components/ui/avatar";

interface TopAppBarProps {
  name?: string;
  avatar?: string;
  track?: string;
  notificationCount?: number;
  isEmptyProfile?: boolean;
  onOpenNotifications?: () => void;
  onOpenSettings?: () => void;
  onOpenProfile?: () => void;
}

export function TopAppBar({
  name: propName,
  avatar: propAvatar,
  track: propTrack,
  notificationCount = 0,
  isEmptyProfile,
  onOpenNotifications,
  onOpenSettings,
  onOpenProfile,
}: TopAppBarProps) {
  const { profile } = useStudentProfile();
  const displayName = propName || profile.name;
  const displayAvatar = propAvatar || profile.avatar;
  const displayTrack = propTrack || profile.track;

  const firstName = displayName.split(" ")[0];
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="md:hidden flex items-center justify-between px-5 pt-safe-top pb-2 sticky top-0 z-40 bg-[var(--background)]/90 backdrop-blur-md border-b border-[var(--border)]"
      style={{
        paddingTop: "env(safe-area-inset-top, 12px)",
      }}
    >
      {/* Avatar + greeting (Clickable for profile) */}
      <button
        onClick={onOpenProfile}
        className="flex items-center gap-3 text-left group transition-transform active:scale-95 cursor-pointer"
        aria-label="Open profile menu"
      >
        <Avatar src={isEmptyProfile ? "" : displayAvatar} name={displayName} size="md" onlineDot />

        <div>
          <p className="text-xs text-[var(--muted-foreground)]">
            {greeting},
          </p>
          <p className="text-sm font-bold leading-tight text-[var(--foreground)]">
            {isEmptyProfile ? "Set up profile" : firstName} 👋
          </p>
        </div>
      </button>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        {/* Track badge */}
        {!isEmptyProfile && displayTrack && (
          <div
            className="hidden sm:flex items-center px-2.5 py-1 rounded-full"
            style={{
              background: "var(--primary-glow)",
              border: "1px solid rgba(79, 70, 229, 0.2)",
            }}
          >
            <span className="text-xs font-medium" style={{ color: "var(--primary)" }}>
              {displayTrack.split(" ").slice(0, 2).join(" ")}
            </span>
          </div>
        )}

        {/* Notification bell */}
        <button
          id="notification-bell"
          onClick={onOpenNotifications}
          className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-colors duration-200 hover:bg-white/10"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid var(--border)",
          }}
          aria-label="Open notifications"
        >
          <Bell size={16} className="text-[var(--muted-foreground)]" />
          {notificationCount > 0 && (
            <div
              className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center"
              style={{ background: "var(--primary)" }}
            >
              <span className="text-xs font-bold text-white" style={{ fontSize: "9px" }}>
                {notificationCount}
              </span>
            </div>
          )}
        </button>

        {/* Settings */}
        <button
          id="settings-button"
          onClick={onOpenSettings}
          className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors duration-200 hover:bg-white/10"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid var(--border)",
          }}
          aria-label="Open settings"
        >
          <Settings size={16} className="text-[var(--muted-foreground)]" />
        </button>
      </div>
    </motion.header>
  );
}
