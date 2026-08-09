"use client";

import { useState, useEffect, useCallback } from "react";
import {
  UserPreferences,
  DEFAULT_PREFERENCES,
  loadStoredPreferences,
  saveStoredPreferences,
  applyPreferencesToDOM,
  resetPreferencesToDefault,
} from "@/lib/preferences";

export function usePreferences() {
  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    if (typeof window !== "undefined") {
      const loaded = loadStoredPreferences();
      applyPreferencesToDOM(loaded);
      return loaded;
    }
    return DEFAULT_PREFERENCES;
  });
  const [isLoaded] = useState(() => typeof window !== "undefined");

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

  // Instant Theme Switcher — direct 1-click DOM manipulation, no async
  const changeTheme = useCallback(
    (newTheme: "dark" | "light" | "system") => {
      // Apply immediately to DOM — synchronous, no async
      const newPrefs = { ...preferences, theme: newTheme };
      applyPreferencesToDOM(newPrefs);
      saveStoredPreferences(newPrefs);
      setPreferences(newPrefs);
    },
    [preferences]
  );

  // Reset to default
  const resetAll = useCallback(() => {
    const defaults = resetPreferencesToDefault();
    setPreferences(defaults);
    applyPreferencesToDOM(defaults);
  }, []);

  return {
    preferences,
    updatePreferences,
    changeTheme,
    currentTheme: preferences.theme,
    resetAll,
    isLoaded,
  };
}
