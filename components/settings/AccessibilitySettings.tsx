"use client";

import { UserPreferences } from "@/lib/preferences";
import { Eye, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface AccessibilitySettingsProps {
  preferences: UserPreferences;
  onUpdate: (updater: Partial<UserPreferences>) => void;
}

export function AccessibilitySettings({ preferences, onUpdate }: AccessibilitySettingsProps) {
  const handleToggle = (key: keyof UserPreferences, label: string, value: boolean) => {
    onUpdate({ [key]: value });
    toast.success(`${label} ${value ? "enabled" : "disabled"}`);
  };

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-base font-bold mb-1" style={{ color: "var(--foreground)" }}>
          Accessibility & Inclusivity
        </h3>
        <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
          Real contrast, text scaling, and motion controls. Changes apply globally to all pages.
        </p>
      </div>

      <div className="space-y-3">
        {/* Larger Text */}
        <div className="flex items-center justify-between p-4 rounded-xl border border-[var(--border)] bg-white/[0.02]">
          <div className="pr-4">
            <p className="text-xs font-semibold" style={{ color: "var(--foreground)" }}>
              Larger Base Text Scale (+8%)
            </p>
            <p className="text-[0.68rem] leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
              Modestly increase font scale across cards, inputs, and headings without breaking grid layouts.
            </p>
          </div>
          <input
            type="checkbox"
            checked={preferences.largerText}
            onChange={(e) => handleToggle("largerText", "Larger text", e.target.checked)}
            className="w-4 h-4 accent-emerald-500 rounded cursor-pointer flex-shrink-0"
          />
        </div>

        {/* High Contrast */}
        <div className="flex items-center justify-between p-4 rounded-xl border border-[var(--border)] bg-white/[0.02]">
          <div className="pr-4">
            <p className="text-xs font-semibold" style={{ color: "var(--foreground)" }}>
              High Contrast Borders & Text
            </p>
            <p className="text-[0.68rem] leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
              Sharpen card outlines and elevate secondary text contrast for late-night reading.
            </p>
          </div>
          <input
            type="checkbox"
            checked={preferences.highContrast}
            onChange={(e) => handleToggle("highContrast", "High contrast", e.target.checked)}
            className="w-4 h-4 accent-emerald-500 rounded cursor-pointer flex-shrink-0"
          />
        </div>

        {/* Reduce Motion */}
        <div className="flex items-center justify-between p-4 rounded-xl border border-[var(--border)] bg-white/[0.02]">
          <div className="pr-4">
            <p className="text-xs font-semibold" style={{ color: "var(--foreground)" }}>
              Reduce Non-Essential Motion
            </p>
            <p className="text-[0.68rem] leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
              Disable Framer Motion entrance animations and background particle effects.
            </p>
          </div>
          <input
            type="checkbox"
            checked={preferences.reducedMotion}
            onChange={(e) => handleToggle("reducedMotion", "Reduced motion", e.target.checked)}
            className="w-4 h-4 accent-emerald-500 rounded cursor-pointer flex-shrink-0"
          />
        </div>

        {/* Visible Focus Indicators */}
        <div className="flex items-center justify-between p-4 rounded-xl border border-[var(--border)] bg-white/[0.02]">
          <div className="pr-4">
            <p className="text-xs font-semibold" style={{ color: "var(--foreground)" }}>
              Always Show Focus Indicators
            </p>
            <p className="text-[0.68rem] leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
              Enforce a prominent 2px indigo outline around all interactive elements during keyboard navigation.
            </p>
          </div>
          <input
            type="checkbox"
            checked={preferences.focusIndicators}
            onChange={(e) => handleToggle("focusIndicators", "Focus indicators", e.target.checked)}
            className="w-4 h-4 accent-emerald-500 rounded cursor-pointer flex-shrink-0"
          />
        </div>
      </div>
    </div>
  );
}
