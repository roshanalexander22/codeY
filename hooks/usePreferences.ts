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
  const { setTheme } = useTheme();

  // Load from localStorage on mount & sync theme with DOM & next-themes
  useEffect(() => {
    const loaded = loadStoredPreferences();
    setPreferences(loaded);
    applyPreferencesToDOM(loaded);
    if (loaded.theme) {
      setTheme(loaded.theme);
    }
    setIsLoaded(true);
  }, [setTheme]);

  // Sync state update with DOM & Storage
  const updatePreferences = useCallback(
    (updater: Partial<UserPreferences> | ((prev: UserPreferences) => UserPreferences)) => {
      setPreferences((prev) => {
        const next = typeof updater === "function" ? updater(prev) : { ...prev, ...updater };
        saveStoredPreferences(next);
        applyPreferencesToDOM(next);
        return next;
      });
    },
    []
  );

  // Instant Theme Switcher — direct 1-click execution
  const changeTheme = useCallback(
    (newTheme: "dark" | "light" | "system") => {
      setTheme(newTheme);
      updatePreferences({ theme: newTheme });
    },
    [setTheme, updatePreferences]
  );

  // Reset to default
  const resetAll = useCallback(() => {
    const defaults = resetPreferencesToDefault();
    setPreferences(defaults);
    setTheme("dark");
    applyPreferencesToDOM(defaults);
  }, [setTheme]);

  return {
    preferences,
    updatePreferences,
    changeTheme,
    currentTheme: preferences.theme,
    resetAll,
    isLoaded,
  };
}
