"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, Moon, Sun, Monitor, Bell, Eye, User, X, Check } from "lucide-react";
import { toast } from "sonner";
import { UserSettings } from "@/data/dashboard";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSettings: UserSettings;
  onSave: (newSettings: UserSettings) => void;
}

export function SettingsModal({
  isOpen,
  onClose,
  initialSettings,
  onSave,
}: SettingsModalProps) {
  const [settings, setSettings] = useState<UserSettings>(initialSettings);

  const handleSave = () => {
    onSave(settings);
    toast.success("Settings updated", {
      description: "Your dashboard preferences have been saved successfully.",
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-4"
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-[var(--card)] border border-[var(--border)] rounded-3xl p-6 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col glass-modal"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[var(--border)]">
                <div className="flex items-center gap-2">
                  <Settings size={18} className="text-[var(--primary)]" />
                  <h2 className="text-base font-bold text-[var(--foreground)]">Dashboard Settings</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-xl hover:bg-[var(--surface-fill)] text-[var(--muted-foreground)] transition-colors"
                  aria-label="Close settings"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Scrollable Form */}
              <div className="flex-1 overflow-y-auto py-4 space-y-6 pr-1 no-scrollbar">

                {/* 1. Appearance */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)] mb-2.5 flex items-center gap-1.5">
                    <Moon size={14} className="text-[var(--primary)]" />
                    Appearance Theme
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "dark" as const, label: "Dark", icon: Moon },
                      { id: "light" as const, label: "Light", icon: Sun },
                      { id: "system" as const, label: "System", icon: Monitor },
                    ].map((th) => {
                      const Icon = th.icon;
                      const active = settings.theme === th.id;
                      return (
                        <button
                          key={th.id}
                          type="button"
                          onClick={() => setSettings({ ...settings, theme: th.id })}
                          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl border text-xs font-semibold transition-all ${
                            active
                              ? "bg-[var(--primary-glow)] border-[var(--primary)] text-[var(--primary)] shadow-sm"
                              : "bg-[var(--card)] border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                          }`}
                        >
                          <Icon size={14} />
                          {th.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Notification Preferences */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)] mb-2.5 flex items-center gap-1.5">
                    <Bell size={14} className="text-[var(--primary)]" />
                    Notification Preferences
                  </label>
                  <div className="space-y-2 bg-[var(--card)] border border-[var(--border)] rounded-2xl p-3">
                    {[
                      { key: "reminders" as const, label: "Daily Challenge Reminders", desc: "Get notified before midnight cutoff" },
                      { key: "achievementAlerts" as const, label: "Achievement Notifications", desc: "Alerts when you unlock badges & XP" },
                      { key: "communityUpdates" as const, label: "Community & Mentors", desc: "Weekly leaderboard updates & tips" },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between py-1.5">
                        <div>
                          <p className="text-xs font-bold text-[var(--foreground)]">{item.label}</p>
                          <p className="text-[11px] text-[var(--muted-foreground)]">{item.desc}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            setSettings({ ...settings, [item.key]: !settings[item.key] })
                          }
                          className={`w-11 h-6 rounded-full p-0.5 transition-colors ${
                            settings[item.key] ? "bg-[var(--primary)]" : "bg-[var(--muted)]"
                          }`}
                        >
                          <div
                            className={`w-5 h-5 rounded-full bg-white transition-transform ${
                              settings[item.key] ? "translate-x-5" : "translate-x-0"
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Dashboard Preferences */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)] mb-2.5 flex items-center gap-1.5">
                    <Eye size={14} className="text-[var(--primary)]" />
                    Dashboard Preferences
                  </label>
                  <div className="space-y-2 bg-[var(--card)] border border-[var(--border)] rounded-2xl p-3">
                    {[
                      { key: "showHeatmap" as const, label: "Show Weekly Activity Matrix", desc: "Display GitHub-style heatmap" },
                      { key: "showLeaderboard" as const, label: "Show Leaderboard Preview", desc: "Display top cohort ranking" },
                      { key: "showMotivational" as const, label: "Motivational Streak Messaging", desc: "Show encouraging streak text" },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between py-1.5">
                        <div>
                          <p className="text-xs font-bold text-[var(--foreground)]">{item.label}</p>
                          <p className="text-[11px] text-[var(--muted-foreground)]">{item.desc}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            setSettings({ ...settings, [item.key]: !settings[item.key] })
                          }
                          className={`w-11 h-6 rounded-full p-0.5 transition-colors ${
                            settings[item.key] ? "bg-[var(--primary)]" : "bg-[var(--muted)]"
                          }`}
                        >
                          <div
                            className={`w-5 h-5 rounded-full bg-white transition-transform ${
                              settings[item.key] ? "translate-x-5" : "translate-x-0"
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Account Details */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)] mb-2.5 flex items-center gap-1.5">
                    <User size={14} className="text-[var(--primary)]" />
                    Account Overview
                  </label>
                  <div className="space-y-3 bg-[var(--card)] border border-[var(--border)] rounded-2xl p-3">
                    <div>
                      <label className="text-[11px] font-semibold text-[var(--muted-foreground)]">Full Name</label>
                      <input
                        type="text"
                        value={settings.name}
                        onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                        className="w-full mt-1 px-3 py-2 bg-[var(--background)] border border-[var(--border)] rounded-xl text-xs text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-[var(--muted-foreground)]">College / University</label>
                      <input
                        type="text"
                        value={settings.college}
                        onChange={(e) => setSettings({ ...settings, college: e.target.value })}
                        className="w-full mt-1 px-3 py-2 bg-[var(--background)] border border-[var(--border)] rounded-xl text-xs text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-[var(--muted-foreground)]">Active Track</label>
                      <select
                        value={settings.track}
                        onChange={(e) => setSettings({ ...settings, track: e.target.value })}
                        className="w-full mt-1 px-3 py-2 bg-[var(--background)] border border-[var(--border)] rounded-xl text-xs text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)]"
                      >
                        <option value="Full Stack Development">Full Stack Development</option>
                        <option value="Frontend Development">Frontend Development</option>
                        <option value="Backend Development">Backend Development</option>
                        <option value="Data Science & AI">Data Science & AI</option>
                      </select>
                    </div>
                  </div>
                </div>

              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-[var(--border)] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl border border-[var(--border)] text-xs font-semibold text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--surface-fill)] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-5 py-2.5 rounded-xl bg-[var(--primary)] hover:opacity-90 text-white text-xs font-semibold shadow-lg shadow-[var(--primary-glow)] transition-all flex items-center gap-1.5"
                >
                  <Check size={14} />
                  Save changes
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
