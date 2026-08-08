"use client";

import { UserPreferences, AccentColorOption } from "@/lib/preferences";
import { Sun, Moon, Monitor, Check } from "lucide-react";
import { toast } from "sonner";

interface AppearanceSettingsProps {
  preferences: UserPreferences;
  onUpdate: (updater: Partial<UserPreferences>) => void;
  onChangeTheme: (theme: "dark" | "light" | "system") => void;
  currentTheme: string;
}

const ACCENT_OPTIONS: { id: AccentColorOption; label: string; hex: string }[] = [
  { id: "indigo", label: "Indigo", hex: "#4F46E5" },
  { id: "emerald", label: "Emerald", hex: "#10B981" },
  { id: "blue", label: "Blue", hex: "#2563EB" },
  { id: "amber", label: "Amber", hex: "#F59E0B" },
];

export function AppearanceSettings({
  preferences,
  onUpdate,
  onChangeTheme,
  currentTheme,
}: AppearanceSettingsProps) {
  const handleThemeChange = (newTheme: "dark" | "light" | "system") => {
    onChangeTheme(newTheme);
    toast.success(`Theme updated to ${newTheme.toUpperCase()}`);
  };

  const handleAccentChange = (accent: AccentColorOption) => {
    onUpdate({ accentColor: accent });
    toast.success(`Accent color set to ${accent}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-bold mb-1" style={{ color: "var(--foreground)" }}>
          Appearance & Themes
        </h3>
        <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
          Customize how ABTalks looks across all pages. Changes take effect immediately.
        </p>
      </div>

      {/* Theme Picker */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider mb-2.5" style={{ color: "var(--muted-foreground)" }}>
          Color Theme
        </label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: "dark", label: "Dark", icon: Moon },
            { id: "light", label: "Light", icon: Sun },
            { id: "system", label: "System", icon: Monitor },
          ].map((item) => {
            const Icon = item.icon;
            const isSelected = currentTheme === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleThemeChange(item.id as "dark" | "light" | "system")}
                className="flex flex-col items-center gap-2 p-3.5 rounded-2xl transition-all"
                style={{
                  background: isSelected ? "var(--primary-glow)" : "rgba(255, 255, 255, 0.03)",
                  border: `1.5px solid ${isSelected ? "var(--primary)" : "var(--border)"}`,
                  color: isSelected ? "var(--foreground)" : "var(--muted-foreground)",
                }}
              >
                <Icon size={20} style={{ color: isSelected ? "var(--primary)" : "inherit" }} />
                <span className="text-xs font-semibold">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Accent Color Picker */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider mb-2.5" style={{ color: "var(--muted-foreground)" }}>
          Primary Accent Color
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {ACCENT_OPTIONS.map((accent) => {
            const isSelected = preferences.accentColor === accent.id;

            return (
              <button
                key={accent.id}
                type="button"
                onClick={() => handleAccentChange(accent.id)}
                className="flex items-center justify-between p-3 rounded-xl transition-all"
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  border: `1.5px solid ${isSelected ? accent.hex : "var(--border)"}`,
                }}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ background: accent.hex }}
                  />
                  <span className="text-xs font-medium" style={{ color: "var(--foreground)" }}>
                    {accent.label}
                  </span>
                </div>
                {isSelected && <Check size={14} style={{ color: accent.hex }} />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Layout Toggles */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between p-3.5 rounded-xl border border-[var(--border)] bg-white/[0.02]">
          <div>
            <p className="text-xs font-semibold" style={{ color: "var(--foreground)" }}>
              Compact Spacing Mode
            </p>
            <p className="text-[0.68rem]" style={{ color: "var(--muted-foreground)" }}>
              Reduce card padding and vertical margins for higher information density.
            </p>
          </div>
          <input
            type="checkbox"
            checked={preferences.compactMode}
            onChange={(e) => {
              onUpdate({ compactMode: e.target.checked });
              toast.success(`Compact mode ${e.target.checked ? "enabled" : "disabled"}`);
            }}
            className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-between p-3.5 rounded-xl border border-[var(--border)] bg-white/[0.02]">
          <div>
            <p className="text-xs font-semibold" style={{ color: "var(--foreground)" }}>
              Reduce Motion
            </p>
            <p className="text-[0.68rem]" style={{ color: "var(--muted-foreground)" }}>
              Minimize animations across page transitions and interactive elements.
            </p>
          </div>
          <input
            type="checkbox"
            checked={preferences.reducedMotion}
            onChange={(e) => {
              onUpdate({ reducedMotion: e.target.checked });
              toast.success(`Reduced motion ${e.target.checked ? "enabled" : "disabled"}`);
            }}
            className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
