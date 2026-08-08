"use client";

import { useState, useEffect, useCallback } from "react";
import { useTheme } from "next-themes";
import {
  UserPreferences,
  DEFAULT_PREFERENCES,
  loadStoredPreferences,
  saveStoredPreferences,
  applyPreferencesToDOM,
  resetPreferencesToDefault,
} from "@/lib/preferences";

export function usePreferences() {
  const [preferences, setPreferences] = useState<UserPreferences>(DEFAULT_PREFERENCES);
  const [isLoaded, setIsLoaded] = useState(false);
  const { setTheme, theme } = useTheme();

  // Load from localStorage on mount
  useEffect(() => {
    const loaded = loadStoredPreferences();
    setPreferences(loaded);
    applyPreferencesToDOM(loaded);
    setIsLoaded(true);
  }, []);

  // Sync state update with DOM & Storage
  const updatePreferences = useCallback((updater: Partial<UserPreferences> | ((prev: UserPreferences) => UserPreferences)) => {
    setPreferences((prev) => {
      const next = typeof updater === "function" ? updater(prev) : { ...prev, ...updater };
      saveStoredPreferences(next);
      return next;
    });
  }, []);

  // Change theme wrapper for next-themes
  const changeTheme = useCallback((newTheme: "dark" | "light" | "system") => {
    setTheme(newTheme);
    updatePreferences({ theme: newTheme });
  }, [setTheme, updatePreferences]);

  // Reset to default
  const resetAll = useCallback(() => {
    const defaults = resetPreferencesToDefault();
    setPreferences(defaults);
    setTheme("dark");
  }, [setTheme]);

  return {
    preferences,
    updatePreferences,
    changeTheme,
    currentTheme: theme ?? preferences.theme,
    resetAll,
    isLoaded,
  };
}
