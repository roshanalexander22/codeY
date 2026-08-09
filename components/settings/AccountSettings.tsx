"use client";

import { UserPreferences } from "@/lib/preferences";
import { UserCheck, ShieldAlert, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface AccountSettingsProps {
  preferences: UserPreferences;
}

export function AccountSettings({ preferences }: AccountSettingsProps) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-base font-bold mb-1" style={{ color: "var(--foreground)" }}>
          Account & Prototype Context
        </h3>
        <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
          Authentication & production databases are out of scope. This app operates in Prototype Demo Mode.
        </p>
      </div>

      {/* Demo Badge Banner */}
      <div
        className="rounded-2xl p-4 flex items-start gap-3"
        style={{ background: "rgba(34, 197, 94, 0.08)", border: "1px solid rgba(34, 197, 94, 0.25)" }}
      >
        <UserCheck size={20} style={{ color: "#4ade80" }} className="flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-[var(--foreground)]">
            Active Prototype Account — {preferences.profile.name}
          </p>
          <p className="text-xs mt-1 leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
            You are exploring ABTalks using mocked student data. All challenge submissions, streaks, and reflections run locally in your browser.
          </p>
        </div>
      </div>

      <div className="rounded-xl p-4 border border-[var(--border)] bg-white/[0.02] space-y-2">
        <p className="text-xs font-semibold" style={{ color: "var(--foreground)" }}>Account Details</p>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="text-[var(--muted-foreground)] block">Username</span>
            <span className="font-medium" style={{ color: "var(--foreground)" }}>{preferences.profile.username}</span>
          </div>
          <div>
            <span className="text-[var(--muted-foreground)] block">Enrolled Track</span>
            <span className="font-medium" style={{ color: "var(--foreground)" }}>{preferences.profile.track}</span>
          </div>
          <div>
            <span className="text-[var(--muted-foreground)] block">College</span>
            <span className="font-medium" style={{ color: "var(--foreground)" }}>{preferences.profile.college}</span>
          </div>
          <div>
            <span className="text-[var(--muted-foreground)] block">Status</span>
            <span className="text-emerald-500 font-medium">Demo Mode (No Auth Required)</span>
          </div>
        </div>
      </div>

      <div className="pt-2">
        <button
          type="button"
          onClick={() => toast.info("Demo account active. No backend authentication required.")}
          className="px-4 py-2 rounded-xl text-xs font-medium text-zinc-400 bg-white/5 hover:bg-white/10"
        >
          View Demo Credentials
        </button>
      </div>
    </div>
  );
}
