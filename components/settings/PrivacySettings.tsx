"use client";

import { UserPreferences } from "@/lib/preferences";
import { ShieldCheck } from "lucide-react";
import { toast } from "sonner";

interface PrivacySettingsProps {
  preferences: UserPreferences;
  onUpdate: (updater: Partial<UserPreferences>) => void;
}

export function PrivacySettings({ preferences, onUpdate }: PrivacySettingsProps) {
  const priv = preferences.privacy;

  const togglePriv = (key: keyof typeof priv, label: string) => {
    const nextVal = !priv[key];
    onUpdate({
      privacy: {
        ...priv,
        [key]: nextVal,
      },
    });
    toast.success(`${label} ${nextVal ? "made public" : "hidden"}`);
  };

  const ITEMS: { key: keyof typeof priv; label: string; desc: string }[] = [
    { key: "publicProfile", label: "Public Learning Profile", desc: "Allow recruiters and community members to view your 60-day profile." },
    { key: "publicStreak", label: "Public Streak Badge", desc: "Display your active day streak counter on your public card." },
    { key: "publicAchievements", label: "Public Badges & Level", desc: "Show earned achievement badges and total XP." },
    { key: "publicLeaderboard", label: "Show on Public Leaderboard", desc: "Include your profile in the top student rankings." },
    { key: "publicGithub", label: "Display GitHub Activity Link", desc: "Show link to your GitHub repository proof." },
    { key: "publicLinkedin", label: "Display LinkedIn Post Link", desc: "Show link to your published daily learning posts." },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-base font-bold mb-1" style={{ color: "var(--foreground)" }}>
          Privacy & Recruiter Visibility
        </h3>
        <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
          Control what proof of work and streak metrics are visible to recruiters and the public. (Mocked local state)
        </p>
      </div>

      <div className="space-y-2.5">
        {ITEMS.map((item) => {
          const isEnabled = priv[item.key];

          return (
            <div
              key={item.key}
              className="flex items-center justify-between p-3.5 rounded-xl border border-[var(--border)] bg-white/[0.02]"
            >
              <div className="pr-4">
                <p className="text-xs font-semibold" style={{ color: "var(--foreground)" }}>
                  {item.label}
                </p>
                <p className="text-[0.68rem] leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                  {item.desc}
                </p>
              </div>

              <input
                type="checkbox"
                checked={isEnabled}
                onChange={() => togglePriv(item.key, item.label)}
                className="w-4 h-4 accent-emerald-500 rounded cursor-pointer flex-shrink-0"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
