"use client";

import { motion } from "framer-motion";
import { Search, Flame, Zap, User } from "lucide-react";

interface SettingsHeaderProps {
  name: string;
  track: string;
  streak: number;
  xp: number;
  avatar: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function SettingsHeader({
  name,
  track,
  streak,
  xp,
  avatar,
  searchQuery,
  onSearchChange,
}: SettingsHeaderProps) {
  return (
    <div className="space-y-4 mb-6">
      {/* Personalized Profile Summary Banner */}
      <div
        className="rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        style={{
          background: "linear-gradient(135deg, rgba(79, 70, 229, 0.12) 0%, rgba(245, 158, 11, 0.05) 100%)",
          border: "1px solid rgba(79, 70, 229, 0.25)",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center"
            style={{ background: "rgba(255, 255, 255, 0.1)", border: "2px solid var(--primary)" }}
          >
            {avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={avatar} alt={name} className="w-full h-full object-cover" />
            ) : (
              <User size={24} style={{ color: "var(--foreground)" }} />
            )}
          </div>
          <div>
            <h3 className="text-base font-bold" style={{ color: "var(--foreground)" }}>
              {name}
            </h3>
            <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
              {track}
            </p>
          </div>
        </div>

        {/* Stats Pill Badges */}
        <div className="flex items-center gap-2 self-stretch sm:self-auto justify-between sm:justify-end">
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
            style={{ background: "rgba(245, 158, 11, 0.12)", border: "1px solid rgba(245, 158, 11, 0.3)" }}
          >
            <span className="text-sm streak-fire">🔥</span>
            <span className="text-xs font-bold text-amber-400">{streak} Day Streak</span>
          </div>

          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
            style={{ background: "var(--primary-glow)", border: "1px solid rgba(79, 70, 229, 0.3)" }}
          >
            <Zap size={14} fill="currentColor" style={{ color: "#818cf8" }} />
            <span className="text-xs font-bold" style={{ color: "#818cf8" }}>{xp} XP</span>
          </div>
        </div>
      </div>

      {/* Lightweight Search Settings Input */}
      <div className="relative">
        <Search
          size={16}
          className="absolute left-3.5 top-1/2 -translate-y-1/2"
          style={{ color: "var(--muted-foreground)" }}
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search settings (e.g. theme, streak, notifications, profile)..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm transition-all focus:outline-none"
          style={{
            background: "rgba(255, 255, 255, 0.04)",
            border: "1px solid var(--border)",
            color: "var(--foreground)",
          }}
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs hover:underline"
            style={{ color: "var(--muted-foreground)" }}
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
