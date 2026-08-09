"use client";

import { ReactNode, useEffect } from "react";
import { loadStoredPreferences, applyPreferencesToDOM } from "@/lib/preferences";

/**
 * ThemeProvider — pure DOM-based, no next-themes dependency.
 * Applies the stored theme immediately on mount to prevent FOUC.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const prefs = loadStoredPreferences();
    applyPreferencesToDOM(prefs);
  }, []);

  return <>{children}</>;
}
