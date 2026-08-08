"use client";

import { Search, Zap, User } from "lucide-react";

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
          background: "var(--primary-glow)",
          border: "1px solid var(--primary)",
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
            <h3 className="text-base font-bold text-[var(--foreground)]">
              {name}
            </h3>
            <p className="text-xs text-[var(--muted-foreground)]">
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
            <span className="text-xs font-bold text-amber-500">{streak} Day Streak</span>
          </div>

          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
            style={{ background: "var(--primary-glow)", border: "1px solid var(--primary)" }}
          >
            <Zap size={14} fill="currentColor" style={{ color: "var(--primary)" }} />
            <span className="text-xs font-bold" style={{ color: "var(--primary)" }}>{xp} XP</span>
          </div>
        </div>
      </div>

      {/* Lightweight Search Settings Input */}
      <div className="relative">
        <Search
          size={16}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search settings (e.g. theme, streak, notifications, profile)..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm transition-all focus:outline-none border border-[var(--border)] text-[var(--foreground)] bg-white/[0.04]"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[var(--muted-foreground)] hover:underline"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
