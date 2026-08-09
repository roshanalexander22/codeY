"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft, Settings as SettingsIcon } from "lucide-react";
import { usePreferences } from "@/hooks/usePreferences";
import { SettingsCategory, SettingsSidebar } from "./SettingsSidebar";
import { SettingsHeader } from "./SettingsHeader";
import { ProfileSettings } from "./ProfileSettings";
import { AppearanceSettings } from "./AppearanceSettings";
import { NotificationSettings } from "./NotificationSettings";
import { ChallengeSettings } from "./ChallengeSettings";
import { LearningSettings } from "./LearningSettings";
import { AccessibilitySettings } from "./AccessibilitySettings";
import { PrivacySettings } from "./PrivacySettings";
import { DataSettings } from "./DataSettings";
import { AccountSettings } from "./AccountSettings";
import { AboutSettings } from "./AboutSettings";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: SettingsCategory;
  initialSettings?: unknown;
  onSave?: (newSettings: unknown) => void;
}

export function SettingsModal({
  isOpen,
  onClose,
  initialCategory = "profile",
}: SettingsModalProps) {
  const [activeCategory, setActiveCategory] = useState<SettingsCategory>(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileSubPage, setMobileSubPage] = useState<boolean>(false);

  const { preferences, updatePreferences, changeTheme, currentTheme, resetAll } = usePreferences();

  // Handle search query change directly
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) return;
    const q = query.toLowerCase();
    if (q.includes("theme") || q.includes("dark") || q.includes("light") || q.includes("color") || q.includes("compact")) {
      setActiveCategory("appearance");
    } else if (q.includes("streak") || q.includes("reminder") || q.includes("pace") || q.includes("intensity")) {
      setActiveCategory("challenge");
    } else if (q.includes("notif") || q.includes("alert") || q.includes("email")) {
      setActiveCategory("notifications");
    } else if (q.includes("profile") || q.includes("name") || q.includes("avatar") || q.includes("college")) {
      setActiveCategory("profile");
    } else if (q.includes("data") || q.includes("export") || q.includes("clear") || q.includes("storage")) {
      setActiveCategory("data");
    } else if (q.includes("access") || q.includes("motion") || q.includes("contrast") || q.includes("scale")) {
      setActiveCategory("accessibility");
    }
  };

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Keyboard shortcut: Escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleSelectCategoryMobile = (cat: SettingsCategory) => {
    setActiveCategory(cat);
    setMobileSubPage(true);
  };

  const renderActiveCategoryContent = () => {
    switch (activeCategory) {
      case "profile":
        return <ProfileSettings preferences={preferences} onUpdate={updatePreferences} />;
      case "appearance":
        return (
          <AppearanceSettings
            preferences={preferences}
            onUpdate={updatePreferences}
            onChangeTheme={changeTheme}
            currentTheme={currentTheme}
          />
        );
      case "notifications":
        return <NotificationSettings preferences={preferences} onUpdate={updatePreferences} />;
      case "challenge":
        return <ChallengeSettings preferences={preferences} onUpdate={updatePreferences} />;
      case "learning":
        return <LearningSettings preferences={preferences} onUpdate={updatePreferences} />;
      case "accessibility":
        return <AccessibilitySettings preferences={preferences} onUpdate={updatePreferences} />;
      case "privacy":
        return <PrivacySettings preferences={preferences} onUpdate={updatePreferences} />;
      case "data":
        return <DataSettings preferences={preferences} onReset={resetAll} />;
      case "account":
        return <AccountSettings preferences={preferences} />;
      case "about":
        return <AboutSettings />;
      default:
        return <ProfileSettings preferences={preferences} onUpdate={updatePreferences} />;
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="settings-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Overlay Container */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-0 lg:p-6 pointer-events-none">
            <motion.div
              key="settings-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="settings-title"
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="pointer-events-auto w-full h-full lg:h-[85vh] lg:max-w-[1100px] lg:rounded-3xl border border-[var(--border)] overflow-hidden flex flex-col bg-[var(--card)] text-[var(--foreground)] shadow-2xl glass-modal"
            >
              {/* Modal Top Nav Bar */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  {mobileSubPage && (
                    <button
                      type="button"
                      onClick={() => setMobileSubPage(false)}
                      className="lg:hidden p-1.5 rounded-xl bg-white/5 text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                      aria-label="Back to settings menu"
                    >
                      <ArrowLeft size={18} />
                    </button>
                  )}
                  <div className="flex items-center gap-2">
                    <SettingsIcon size={18} style={{ color: "var(--primary)" }} />
                    <h2 id="settings-title" className="text-base font-bold text-[var(--foreground)]">
                      Global Settings & Preferences
                    </h2>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-8 h-8 rounded-xl flex items-center justify-center bg-white/5 border border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-white/10 transition-colors"
                  aria-label="Close Settings"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Modal Body Layout */}
              <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
                {/* DESKTOP VIEW (≥1024px): 2 Columns */}
                <div className="hidden lg:flex w-full h-full overflow-hidden">
                  {/* Left Sidebar (260px) */}
                  <div className="w-[260px] border-r border-[var(--border)] p-4 overflow-y-auto bg-[var(--background)]/40 flex-shrink-0">
                    <SettingsSidebar
                      activeCategory={activeCategory}
                      onSelectCategory={(cat) => setActiveCategory(cat)}
                    />
                  </div>

                  {/* Right Main Content Area */}
                  <div className="flex-1 overflow-y-auto p-6 bg-[var(--card)]/60">
                    <SettingsHeader
                      name={preferences.profile.name}
                      track={preferences.profile.track}
                      streak={11}
                      xp={1650}
                      avatar={preferences.profile.avatar}
                      searchQuery={searchQuery}
                      onSearchChange={handleSearchChange}
                    />

                    <div className="card p-6 border border-[var(--border)] bg-[var(--card)]">
                      {renderActiveCategoryContent()}
                    </div>
                  </div>
                </div>

                {/* MOBILE VIEW (<1024px): 1-Column Sheet */}
                <div className="lg:hidden flex-1 overflow-y-auto p-4 bg-[var(--background)]">
                  {!mobileSubPage ? (
                    <div className="space-y-4 pb-12">
                      <SettingsHeader
                        name={preferences.profile.name}
                        track={preferences.profile.track}
                        streak={11}
                        xp={1650}
                        avatar={preferences.profile.avatar}
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                      />
                      <SettingsSidebar
                        activeCategory={activeCategory}
                        onSelectCategory={handleSelectCategoryMobile}
                      />
                    </div>
                  ) : (
                    <div className="space-y-4 pb-12">
                      <div className="card p-4 border border-[var(--border)] bg-[var(--card)]">
                        {renderActiveCategoryContent()}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
