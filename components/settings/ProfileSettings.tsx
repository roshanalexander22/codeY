"use client";

import { useState } from "react";
import { UserPreferences } from "@/lib/preferences";
import { useStudentProfile } from "@/context/ProfileContext";
import { Save } from "lucide-react";
import { toast } from "sonner";
import { Avatar } from "@/components/ui/avatar";

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
  const { profile, updateProfile, setAvatar } = useStudentProfile();
  const [form, setForm] = useState({
    name: profile.name,
    username: profile.username,
    college: profile.college,
    track: profile.track,
    bio: profile.bio,
    avatar: profile.avatar,
  });

  const handleSelectAvatar = (url: string) => {
    setForm((prev) => ({ ...prev, avatar: url }));
    setAvatar(url);
    onUpdate({ profile: { ...preferences.profile, avatar: url } });
    toast.success("Avatar updated globally!");
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(form);
    onUpdate({ profile: { ...preferences.profile, ...form } });
    toast.success("Student profile saved globally!");
  };

  return (
    <form onSubmit={handleSave} className="space-y-5">
      <div>
        <h3 className="text-base font-bold mb-1 text-[var(--foreground)]">
          Student Profile Settings
        </h3>
        <p className="text-xs text-[var(--muted-foreground)]">
          Manage your public identity, college, track, and avatar. Changes update across all pages instantly.
        </p>
      </div>

      {/* Avatar Selection */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider mb-2.5 text-[var(--muted-foreground)]">
          Choose Avatar
        </label>
        <div className="flex items-center gap-3">
          {AVATAR_SELECTIONS.map((url) => {
            const isSelected = form.avatar === url || profile.avatar === url;
            return (
              <button
                key={url}
                type="button"
                onClick={() => handleSelectAvatar(url)}
                className="transition-transform active:scale-95"
              >
                <Avatar
                  src={url}
                  size="lg"
                  border={isSelected}
                  className={isSelected ? "ring-2 ring-indigo-500 scale-105" : "opacity-80 hover:opacity-100"}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium mb-1.5 text-[var(--foreground)]">
            Display Name
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
            className="w-full px-3.5 py-2 rounded-xl text-sm bg-white/[0.04] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)]"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-medium mb-1.5 text-[var(--foreground)]">
            Username
          </label>
          <input
            type="text"
            value={form.username}
            onChange={(e) => setForm((prev) => ({ ...prev, username: e.target.value }))}
            className="w-full px-3.5 py-2 rounded-xl text-sm bg-white/[0.04] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)]"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium mb-1.5 text-[var(--foreground)]">
            College / Institute
          </label>
          <input
            type="text"
            value={form.college}
            onChange={(e) => setForm((prev) => ({ ...prev, college: e.target.value }))}
            className="w-full px-3.5 py-2 rounded-xl text-sm bg-white/[0.04] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)]"
          />
        </div>

        <div>
          <label className="block text-xs font-medium mb-1.5 text-[var(--foreground)]">
            Enrolled Track
          </label>
          <select
            value={form.track}
            onChange={(e) => setForm((prev) => ({ ...prev, track: e.target.value }))}
            className="w-full px-3.5 py-2 rounded-xl text-sm bg-white/[0.04] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)]"
          >
            <option value="Full Stack Development">Full Stack Development</option>
            <option value="Frontend Development">Frontend Development</option>
            <option value="Backend Development">Backend Development</option>
            <option value="AI & Data Engineering">AI & Data Engineering</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium mb-1.5 text-[var(--foreground)]">
          Short Bio
        </label>
        <textarea
          value={form.bio}
          onChange={(e) => setForm((prev) => ({ ...prev, bio: e.target.value }))}
          rows={3}
          className="w-full px-3.5 py-2 rounded-xl text-sm bg-white/[0.04] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)] resize-vertical"
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
