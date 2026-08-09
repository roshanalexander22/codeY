"use client";

import { UserPreferences } from "@/lib/preferences";
import { Bell } from "lucide-react";
import { toast } from "sonner";

interface NotificationSettingsProps {
  preferences: UserPreferences;
  onUpdate: (updater: Partial<UserPreferences>) => void;
}

export function NotificationSettings({ preferences, onUpdate }: NotificationSettingsProps) {
  const notifs = preferences.notifications;

  const toggleNotif = (key: keyof typeof notifs, label: string) => {
    const nextVal = !notifs[key];
    onUpdate({
      notifications: {
        ...notifs,
        [key]: nextVal,
      },
    });
    toast.success(`${label} ${nextVal ? "enabled" : "disabled"}`);
  };

  const ITEMS: { key: keyof typeof notifs; label: string; desc: string }[] = [
    { key: "dailyChallenge", label: "Daily Challenge Reminder", desc: "Remind me when today's new challenge releases." },
    { key: "streakReminder", label: "Streak Risk Warning", desc: "Alert me late at night if my streak is at risk of resetting." },
    { key: "submissionReminder", label: "Proof of Work Reminder", desc: "Remind me before midnight to submit my GitHub & LinkedIn proof." },
    { key: "achievements", label: "Achievement & XP Unlocks", desc: "Notify me when I earn new badges or level up." },
    { key: "leaderboard", label: "Leaderboard Movement", desc: "Alert me when another student passes my rank." },
    { key: "community", label: "Mentor Feedback & Community", desc: "Notify me when mentors leave tips on my submissions." },
    { key: "marketing", label: "Challenge Updates & Announcements", desc: "Receive email digests and 60-day challenge milestones." },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-base font-bold mb-1" style={{ color: "var(--foreground)" }}>
          Notification Preferences
        </h3>
        <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
          Choose what alerts you want to receive during your 60-day challenge. (Mocked local state)
        </p>
      </div>

      <div className="space-y-2.5">
        {ITEMS.map((item) => {
          const isEnabled = notifs[item.key];

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
                onChange={() => toggleNotif(item.key, item.label)}
                className="w-4 h-4 accent-amber-500 rounded cursor-pointer flex-shrink-0"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
