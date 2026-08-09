"use client";

import { useState } from "react";
import { UserPreferences, exportPreferencesAsJSON } from "@/lib/preferences";
import { useStudentProfile } from "@/context/ProfileContext";
import { Download, RotateCcw, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

interface DataSettingsProps {
  preferences: UserPreferences;
  onReset: () => void;
}

export function DataSettings({ preferences, onReset }: DataSettingsProps) {
  const { resetDemoProfile } = useStudentProfile();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleReset = () => {
    onReset();
    resetDemoProfile();
    setShowConfirm(false);
    toast.success("Preferences and student profile reset to initial demo state!");
  };

  const handleExport = () => {
    exportPreferencesAsJSON(preferences);
    toast.success("Preferences exported to JSON!");
  };

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-base font-bold mb-1 text-[var(--foreground)]">
          Data & Local Storage
        </h3>
        <p className="text-xs text-[var(--muted-foreground)]">
          Export your settings or reset mocked demo state stored in your browser&apos;s localStorage.
        </p>
      </div>

      <div className="space-y-3">
        {/* Export Preferences */}
        <div className="flex items-center justify-between p-4 rounded-xl border border-[var(--border)] bg-white/[0.02]">
          <div>
            <p className="text-xs font-semibold text-[var(--foreground)]">
              Export Preferences (JSON)
            </p>
            <p className="text-[0.68rem] text-[var(--muted-foreground)]">
              Download a backup file of your local theme, notifications, and profile preferences.
            </p>
          </div>
          <button
            type="button"
            onClick={handleExport}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            style={{ background: "var(--primary-glow)", border: "1px solid rgba(79, 70, 229, 0.3)", color: "var(--primary)" }}
          >
            <Download size={14} />
            Export JSON
          </button>
        </div>

        {/* Reset Preferences */}
        <div className="flex items-center justify-between p-4 rounded-xl border border-[var(--border)] bg-white/[0.02]">
          <div>
            <p className="text-xs font-semibold text-[var(--foreground)]">
              Reset Local Preferences & Profile
            </p>
            <p className="text-[0.68rem] text-[var(--muted-foreground)]">
              Restore default theme, accent color, avatar, and profile state.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowConfirm(true)}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            style={{ background: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.3)", color: "#f87171" }}
          >
            <RotateCcw size={14} />
            Reset Defaults
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="rounded-2xl p-4 border border-rose-500/30 bg-rose-500/10 space-y-3">
          <div className="flex items-start gap-2.5">
            <AlertTriangle size={18} className="text-rose-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-rose-300">
                Confirm Reset Preferences & Profile?
              </p>
              <p className="text-[0.7rem] text-zinc-300 leading-relaxed mt-0.5">
                This will reset your local theme, accent colors, avatar, and student profile back to initial default demo state.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 justify-end">
            <button
              type="button"
              onClick={() => setShowConfirm(false)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-400 bg-white/5 hover:bg-white/10 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 cursor-pointer"
            >
              Yes, Reset Everything
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
