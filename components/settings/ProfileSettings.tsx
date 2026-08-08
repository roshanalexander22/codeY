"use client";

import { useState } from "react";
import { UserPreferences } from "@/lib/preferences";
import { Save, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface ProfileSettingsProps {
  preferences: UserPreferences;
  onUpdate: (updater: Partial<UserPreferences>) => void;
}

const AVATAR_SELECTIONS = [
  "https://api.dicebear.com/7.x/avataaars/svg?seed=ArjunMenon",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=RiyaSharma",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=SnehaRao",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=KiranKumar",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=DevPatel",
];

export function ProfileSettings({ preferences, onUpdate }: ProfileSettingsProps) {
  const [form, setForm] = useState(preferences.profile);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({ profile: form });
    toast.success("Profile settings updated!");
  };

  return (
    <form onSubmit={handleSave} className="space-y-5">
      <div>
        <h3 className="text-base font-bold mb-1" style={{ color: "var(--foreground)" }}>
          Student Profile Settings
        </h3>
        <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
          Manage your public identity, college, track, and avatar. (Mocked local state)
        </p>
      </div>

      {/* Avatar Selection */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--muted-foreground)" }}>
          Choose Avatar
        </label>
        <div className="flex items-center gap-3">
          {AVATAR_SELECTIONS.map((url) => {
            const isSelected = form.avatar === url;
            return (
              <button
                key={url}
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, avatar: url }))}
                className="w-10 h-10 rounded-full overflow-hidden transition-all"
                style={{
                  border: isSelected ? "2px solid var(--primary)" : "2px solid transparent",
                  transform: isSelected ? "scale(1.1)" : "scale(1)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt="avatar option" className="w-full h-full object-cover" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--foreground)" }}>
            Display Name
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
            className="w-full px-3.5 py-2 rounded-xl text-sm"
            style={{ background: "rgba(255, 255, 255, 0.04)", border: "1px solid var(--border)", color: "var(--foreground)" }}
            required
          />
        </div>

        <div>
          <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--foreground)" }}>
            Username
          </label>
          <input
            type="text"
            value={form.username}
            onChange={(e) => setForm((prev) => ({ ...prev, username: e.target.value }))}
            className="w-full px-3.5 py-2 rounded-xl text-sm"
            style={{ background: "rgba(255, 255, 255, 0.04)", border: "1px solid var(--border)", color: "var(--foreground)" }}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--foreground)" }}>
            College / Institute
          </label>
          <input
            type="text"
            value={form.college}
            onChange={(e) => setForm((prev) => ({ ...prev, college: e.target.value }))}
            className="w-full px-3.5 py-2 rounded-xl text-sm"
            style={{ background: "rgba(255, 255, 255, 0.04)", border: "1px solid var(--border)", color: "var(--foreground)" }}
          />
        </div>

        <div>
          <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--foreground)" }}>
            Enrolled Track
          </label>
          <select
            value={form.track}
            onChange={(e) => setForm((prev) => ({ ...prev, track: e.target.value }))}
            className="w-full px-3.5 py-2 rounded-xl text-sm"
            style={{ background: "rgba(255, 255, 255, 0.04)", border: "1px solid var(--border)", color: "var(--foreground)" }}
          >
            <option value="Full Stack Development">Full Stack Development</option>
            <option value="Frontend Development">Frontend Development</option>
            <option value="Backend Development">Backend Development</option>
            <option value="AI & Data Engineering">AI & Data Engineering</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--foreground)" }}>
          Short Bio
        </label>
        <textarea
          value={form.bio}
          onChange={(e) => setForm((prev) => ({ ...prev, bio: e.target.value }))}
          rows={3}
          className="w-full px-3.5 py-2 rounded-xl text-sm"
          style={{ background: "rgba(255, 255, 255, 0.04)", border: "1px solid var(--border)", color: "var(--foreground)", resize: "vertical" }}
        />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          className="btn btn-primary px-5 py-2.5 text-xs font-semibold inline-flex items-center gap-2"
        >
          <Save size={14} />
          Save Profile Changes
        </button>
      </div>
    </form>
  );
}
