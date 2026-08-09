"use client";

import { UserPreferences, PaceOption, IntensityOption } from "@/lib/preferences";
import { Target, Clock, Zap } from "lucide-react";
import { toast } from "sonner";

interface ChallengeSettingsProps {
  preferences: UserPreferences;
  onUpdate: (updater: Partial<UserPreferences>) => void;
}

export function ChallengeSettings({ preferences, onUpdate }: ChallengeSettingsProps) {
  const chal = preferences.challenge;

  const updateChal = (fields: Partial<typeof chal>) => {
    onUpdate({
      challenge: {
        ...chal,
        ...fields,
      },
    });
    toast.success("Challenge preferences updated!");
  };

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-base font-bold mb-1" style={{ color: "var(--foreground)" }}>
          Challenge Preferences
        </h3>
        <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
          Configure your daily reminder times, learning pace, and challenge intensity.
        </p>
      </div>

      {/* Reminder Time */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--muted-foreground)" }}>
          Preferred Daily Reminder Time
        </label>
        <select
          value={chal.reminderTime}
          onChange={(e) => updateChal({ reminderTime: e.target.value })}
          className="w-full px-3.5 py-2.5 rounded-xl text-sm"
          style={{ background: "rgba(255, 255, 255, 0.04)", border: "1px solid var(--border)", color: "var(--foreground)" }}
        >
          <option value="18:00">6:00 PM — Evening prep</option>
          <option value="20:00">8:00 PM — Prime coding hours</option>
          <option value="22:00">10:00 PM — Night owl (Default)</option>
          <option value="23:30">11:30 PM — Last call before midnight</option>
        </select>
      </div>

      {/* Learning Pace */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--muted-foreground)" }}>
          Learning Pace
        </label>
        <div className="grid grid-cols-3 gap-2.5">
          {[
            { id: "normal", label: "Normal", desc: "1 challenge per day" },
            { id: "flexible", label: "Flexible", desc: "Catch up weekends" },
            { id: "focused", label: "Focused", desc: "Strict daily discipline" },
          ].map((pace) => {
            const isSelected = chal.pace === pace.id;
            return (
              <button
                key={pace.id}
                type="button"
                onClick={() => updateChal({ pace: pace.id as PaceOption })}
                className="p-3 rounded-xl text-left transition-all"
                style={{
                  background: isSelected ? "var(--primary-glow)" : "rgba(255,255,255,0.03)",
                  border: `1.5px solid ${isSelected ? "var(--primary)" : "var(--border)"}`,
                }}
              >
                <p className="text-xs font-bold" style={{ color: isSelected ? "var(--primary)" : "var(--foreground)" }}>
                  {pace.label}
                </p>
                <p className="text-[0.65rem] mt-0.5" style={{ color: "var(--muted-foreground)" }}>
                  {pace.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Challenge Intensity */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--muted-foreground)" }}>
          Daily Challenge Intensity
        </label>
        <div className="grid grid-cols-3 gap-2.5">
          {[
            { id: "light", label: "Light", desc: "15-30 min/day" },
            { id: "standard", label: "Standard", desc: "45-60 min/day" },
            { id: "deepwork", label: "Deep Work", desc: "90+ min/day" },
          ].map((item) => {
            const isSelected = chal.intensity === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => updateChal({ intensity: item.id as IntensityOption })}
                className="p-3 rounded-xl text-left transition-all"
                style={{
                  background: isSelected ? "var(--primary-glow)" : "rgba(255,255,255,0.03)",
                  border: `1.5px solid ${isSelected ? "var(--primary)" : "var(--border)"}`,
                }}
              >
                <p className="text-xs font-bold" style={{ color: isSelected ? "var(--primary)" : "var(--foreground)" }}>
                  {item.label}
                </p>
                <p className="text-[0.65rem] mt-0.5" style={{ color: "var(--muted-foreground)" }}>
                  {item.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Visual Toggles */}
      <div className="space-y-2.5 pt-2">
        <div className="flex items-center justify-between p-3.5 rounded-xl border border-[var(--border)] bg-white/[0.02]">
          <span className="text-xs font-semibold" style={{ color: "var(--foreground)" }}>
            Show XP Rewards & Gamification
          </span>
          <input
            type="checkbox"
            checked={chal.showXP}
            onChange={(e) => updateChal({ showXP: e.target.checked })}
            className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-between p-3.5 rounded-xl border border-[var(--border)] bg-white/[0.02]">
          <span className="text-xs font-semibold" style={{ color: "var(--foreground)" }}>
            Show Streak Risk Warnings
          </span>
          <input
            type="checkbox"
            checked={chal.showStreakWarnings}
            onChange={(e) => updateChal({ showStreakWarnings: e.target.checked })}
            className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
