"use client";

import { motion } from "framer-motion";
import { Bell, Settings } from "lucide-react";

interface TopAppBarProps {
  name: string;
  avatar: string;
  track: string;
  notificationCount?: number;
  isEmptyProfile?: boolean;
  onOpenNotifications?: () => void;
  onOpenSettings?: () => void;
  onOpenProfile?: () => void;
}

export function TopAppBar({
  name,
  avatar,
  track,
  notificationCount = 0,
  isEmptyProfile,
  onOpenNotifications,
  onOpenSettings,
  onOpenProfile,
}: TopAppBarProps) {
  const firstName = name.split(" ")[0];
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="md:hidden flex items-center justify-between px-5 pt-safe-top pb-2 sticky top-0 z-40"
      style={{
        background: "rgba(9, 9, 11, 0.92)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(39, 39, 42, 0.8)",
        paddingTop: "env(safe-area-inset-top, 12px)",
      }}
    >
      {/* Avatar + greeting (Clickable for profile) */}
      <button
        onClick={onOpenProfile}
        className="flex items-center gap-3 text-left group transition-transform active:scale-95"
        aria-label="Open profile menu"
      >
        <div className="relative">
          {isEmptyProfile || !avatar ? (
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                background: "rgba(79, 70, 229, 0.15)",
                border: "2px solid rgba(79, 70, 229, 0.3)",
              }}
            >
              <span className="text-sm font-bold" style={{ color: "#818cf8" }}>
                {name.charAt(0)}
              </span>
            </div>
          ) : (
            <div
              className="w-10 h-10 rounded-full overflow-hidden"
              style={{
                border: "2px solid rgba(79, 70, 229, 0.4)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={avatar}
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          {/* Online dot */}
          <div
            className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full"
            style={{
              background: "#22c55e",
              border: "2px solid #09090B",
            }}
          />
        </div>

        <div>
          <p className="text-xs" style={{ color: "#6b7280" }}>
            {greeting},
          </p>
          <p className="text-sm font-bold leading-tight" style={{ color: "#fafafa" }}>
            {isEmptyProfile ? "Set up profile" : firstName} 👋
          </p>
        </div>
      </button>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        {/* Track badge */}
        {!isEmptyProfile && track && (
          <div
            className="hidden sm:flex items-center px-2.5 py-1 rounded-full"
            style={{
              background: "rgba(79, 70, 229, 0.1)",
              border: "1px solid rgba(79, 70, 229, 0.2)",
            }}
          >
            <span className="text-xs font-medium" style={{ color: "#818cf8" }}>
              {track.split(" ").slice(0, 2).join(" ")}
            </span>
          </div>
        )}

        {/* Notification bell */}
        <button
          id="notification-bell"
          onClick={onOpenNotifications}
          className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-colors duration-200 hover:bg-zinc-800"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid #27272a",
          }}
          aria-label="Open notifications"
        >
          <Bell size={16} color="#a1a1aa" />
          {notificationCount > 0 && (
            <div
              className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center"
              style={{ background: "#4F46E5" }}
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
          className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors duration-200 hover:bg-zinc-800"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid #27272a",
          }}
          aria-label="Open settings"
        >
          <Settings size={16} color="#a1a1aa" />
        </button>
      </div>
    </motion.header>
  );
}
