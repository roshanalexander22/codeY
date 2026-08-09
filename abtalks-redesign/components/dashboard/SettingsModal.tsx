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
              className="w-full max-w-md bg-[#18181B] border border-zinc-800 rounded-3xl p-6 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <Settings size={18} className="text-indigo-400" />
                  <h2 className="text-base font-bold text-zinc-100">Dashboard Settings</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-xl hover:bg-zinc-800 text-zinc-400 transition-colors"
                  aria-label="Close settings"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Scrollable Form */}
              <div className="flex-1 overflow-y-auto py-4 space-y-6 pr-1 no-scrollbar">

                {/* 1. Appearance */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2.5 flex items-center gap-1.5">
                    <Moon size={14} className="text-indigo-400" />
                    Appearance Theme
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "dark", label: "Dark", icon: Moon },
                      { id: "light", label: "Light", icon: Sun },
                      { id: "system", label: "System", icon: Monitor },
                    ].map((th) => {
                      const Icon = th.icon;
                      const active = settings.theme === th.id;
                      return (
                        <button
                          key={th.id}
                          type="button"
                          onClick={() => setSettings({ ...settings, theme: th.id as any })}
                          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl border text-xs font-semibold transition-all ${
                            active
                              ? "bg-indigo-600/20 border-indigo-500 text-indigo-300 shadow-sm"
                              : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-zinc-200"
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
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2.5 flex items-center gap-1.5">
                    <Bell size={14} className="text-indigo-400" />
                    Notification Preferences
                  </label>
                  <div className="space-y-2 bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-3">
                    {[
                      { key: "reminders", label: "Daily Challenge Reminders", desc: "Get notified before midnight cutoff" },
                      { key: "achievementAlerts", label: "Achievement Notifications", desc: "Alerts when you unlock badges & XP" },
                      { key: "communityUpdates", label: "Community & Mentors", desc: "Weekly leaderboard updates & tips" },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between py-1.5">
                        <div>
                          <p className="text-xs font-bold text-zinc-200">{item.label}</p>
                          <p className="text-[11px] text-zinc-500">{item.desc}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            setSettings({ ...settings, [item.key]: !(settings as any)[item.key] })
                          }
                          className={`w-11 h-6 rounded-full p-0.5 transition-colors ${
                            (settings as any)[item.key] ? "bg-indigo-600" : "bg-zinc-700"
                          }`}
                        >
                          <div
                            className={`w-5 h-5 rounded-full bg-white transition-transform ${
                              (settings as any)[item.key] ? "translate-x-5" : "translate-x-0"
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Dashboard Preferences */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2.5 flex items-center gap-1.5">
                    <Eye size={14} className="text-indigo-400" />
                    Dashboard Preferences
                  </label>
                  <div className="space-y-2 bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-3">
                    {[
                      { key: "showHeatmap", label: "Show Weekly Activity Matrix", desc: "Display GitHub-style heatmap" },
                      { key: "showLeaderboard", label: "Show Leaderboard Preview", desc: "Display top cohort ranking" },
                      { key: "showMotivational", label: "Motivational Streak Messaging", desc: "Show encouraging streak text" },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between py-1.5">
                        <div>
                          <p className="text-xs font-bold text-zinc-200">{item.label}</p>
                          <p className="text-[11px] text-zinc-500">{item.desc}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            setSettings({ ...settings, [item.key]: !(settings as any)[item.key] })
                          }
                          className={`w-11 h-6 rounded-full p-0.5 transition-colors ${
                            (settings as any)[item.key] ? "bg-indigo-600" : "bg-zinc-700"
                          }`}
                        >
                          <div
                            className={`w-5 h-5 rounded-full bg-white transition-transform ${
                              (settings as any)[item.key] ? "translate-x-5" : "translate-x-0"
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Account Details */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2.5 flex items-center gap-1.5">
                    <User size={14} className="text-indigo-400" />
                    Account Overview
                  </label>
                  <div className="space-y-3 bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-3">
                    <div>
                      <label className="text-[11px] font-semibold text-zinc-400">Full Name</label>
                      <input
                        type="text"
                        value={settings.name}
                        onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                        className="w-full mt-1 px-3 py-2 bg-zinc-800/80 border border-zinc-700 rounded-xl text-xs text-zinc-100 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-zinc-400">College / University</label>
                      <input
                        type="text"
                        value={settings.college}
                        onChange={(e) => setSettings({ ...settings, college: e.target.value })}
                        className="w-full mt-1 px-3 py-2 bg-zinc-800/80 border border-zinc-700 rounded-xl text-xs text-zinc-100 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-zinc-400">Active Track</label>
                      <select
                        value={settings.track}
                        onChange={(e) => setSettings({ ...settings, track: e.target.value })}
                        className="w-full mt-1 px-3 py-2 bg-zinc-800/80 border border-zinc-700 rounded-xl text-xs text-zinc-100 focus:outline-none focus:border-indigo-500"
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
              <div className="pt-4 border-t border-zinc-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl border border-zinc-700 text-xs font-semibold text-zinc-300 hover:bg-zinc-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-1.5"
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
