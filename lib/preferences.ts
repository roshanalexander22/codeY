"use client";

export type ThemeOption = "dark" | "light" | "system";
export type AccentColorOption = "indigo" | "emerald" | "blue" | "amber";
export type PaceOption = "normal" | "flexible" | "focused";
export type IntensityOption = "standard" | "light" | "deepwork";
export type LearningStyleOption = "visual" | "handson" | "docs" | "video";
export type DifficultyPreferenceOption = "beginner" | "intermediate" | "advanced";

export interface UserPreferences {
  theme: ThemeOption;
  accentColor: AccentColorOption;
  reducedMotion: boolean;
  compactMode: boolean;
  largerText: boolean;
  highContrast: boolean;
  focusIndicators: boolean;
  screenReader: boolean;

  notifications: {
    dailyChallenge: boolean;
    streakReminder: boolean;
    submissionReminder: boolean;
    achievements: boolean;
    leaderboard: boolean;
    community: boolean;
    marketing: boolean;
  };

  challenge: {
    reminderTime: string;
    pace: PaceOption;
    intensity: IntensityOption;
    showXP: boolean;
    showStreakWarnings: boolean;
    showTime: boolean;
  };

  learning: {
    style: LearningStyleOption;
    difficulty: DifficultyPreferenceOption;
    showTips: boolean;
    showResources: boolean;
    enableReflections: boolean;
  };

  privacy: {
    publicProfile: boolean;
    publicStreak: boolean;
    publicAchievements: boolean;
    publicLeaderboard: boolean;
    publicGithub: boolean;
    publicLinkedin: boolean;
  };

  profile: {
    name: string;
    username: string;
    college: string;
    track: string;
    bio: string;
    avatar: string;
  };
}

export const DEFAULT_PREFERENCES: UserPreferences = {
  theme: "dark",
  accentColor: "indigo",
  reducedMotion: false,
  compactMode: false,
  largerText: false,
  highContrast: false,
  focusIndicators: true,
  screenReader: false,

  notifications: {
    dailyChallenge: true,
    streakReminder: true,
    submissionReminder: true,
    achievements: true,
    leaderboard: false,
    community: true,
    marketing: false,
  },

  challenge: {
    reminderTime: "22:00",
    pace: "normal",
    intensity: "standard",
    showXP: true,
    showStreakWarnings: true,
    showTime: true,
  },

  learning: {
    style: "handson",
    difficulty: "intermediate",
    showTips: true,
    showResources: true,
    enableReflections: true,
  },

  privacy: {
    publicProfile: true,
    publicStreak: true,
    publicAchievements: true,
    publicLeaderboard: true,
    publicGithub: true,
    publicLinkedin: true,
  },

  profile: {
    name: "Arjun Menon",
    username: "@arjunmenon",
    college: "IIT Bombay — CS '26",
    track: "Full Stack Development",
    bio: "Building everyday to become impossible to ignore.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ArjunMenon",
  },
};

const STORAGE_KEY = "abtalks_user_preferences_v1";

export function loadStoredPreferences(): UserPreferences {
  if (typeof window === "undefined") return DEFAULT_PREFERENCES;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PREFERENCES;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_PREFERENCES,
      ...parsed,
      notifications: { ...DEFAULT_PREFERENCES.notifications, ...parsed.notifications },
      challenge: { ...DEFAULT_PREFERENCES.challenge, ...parsed.challenge },
      learning: { ...DEFAULT_PREFERENCES.learning, ...parsed.learning },
      privacy: { ...DEFAULT_PREFERENCES.privacy, ...parsed.privacy },
      profile: { ...DEFAULT_PREFERENCES.profile, ...parsed.profile },
    };
  } catch {
    return DEFAULT_PREFERENCES;
  }
}

export function saveStoredPreferences(prefs: UserPreferences): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    applyPreferencesToDOM(prefs);
  } catch (e) {
    console.error("Failed to save preferences to localStorage", e);
  }
}

export function applyPreferencesToDOM(prefs: UserPreferences): void {
  if (typeof window === "undefined") return;
  const root = document.documentElement;

  // Accent color
  root.setAttribute("data-accent", prefs.accentColor);

  // High contrast
  if (prefs.highContrast) {
    root.setAttribute("data-contrast", "high");
  } else {
    root.removeAttribute("data-contrast");
  }

  // Larger text
  if (prefs.largerText) {
    root.setAttribute("data-text-scale", "large");
  } else {
    root.removeAttribute("data-text-scale");
  }

  // Reduced motion
  if (prefs.reducedMotion) {
    root.setAttribute("data-reduced-motion", "true");
  } else {
    root.removeAttribute("data-reduced-motion");
  }

  // Compact mode
  if (prefs.compactMode) {
    root.setAttribute("data-compact", "true");
  } else {
    root.removeAttribute("data-compact");
  }
}

export function resetPreferencesToDefault(): UserPreferences {
  saveStoredPreferences(DEFAULT_PREFERENCES);
  return DEFAULT_PREFERENCES;
}

export function exportPreferencesAsJSON(prefs: UserPreferences): void {
  if (typeof window === "undefined") return;
  const blob = new Blob([JSON.stringify(prefs, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `abtalks_preferences_${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}
