"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export interface StudentProfile {
  name: string;
  username: string;
  college: string;
  track: string;
  bio: string;
  avatar: string;
  streak: number;
  longestStreak: number;
  totalXp: number;
  level: number;
  currentDay: number;
  completedDays: number[];
  missedDays: number[];
  enrolledAt: string;
}

export const DEFAULT_STUDENT_PROFILE: StudentProfile = {
  name: "Arjun Menon",
  username: "@arjunmenon",
  college: "IIT Bombay — CS '26",
  track: "Full Stack Development",
  bio: "Building everyday to become impossible to ignore.",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ArjunMenon",
  streak: 11,
  longestStreak: 18,
  totalXp: 1650,
  level: 4,
  currentDay: 12,
  completedDays: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  missedDays: [],
  enrolledAt: "2025-07-27",
};

const STORAGE_KEY = "abtalks_canonical_profile_v1";

interface ProfileContextType {
  profile: StudentProfile;
  updateProfile: (updates: Partial<StudentProfile>) => void;
  setAvatar: (avatarUrl: string) => void;
  resetDemoProfile: () => void;
  isLoaded: boolean;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<StudentProfile>(() => {
    if (typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          return { ...DEFAULT_STUDENT_PROFILE, ...JSON.parse(raw) };
        }
      } catch (e) {
        console.error("Failed to load canonical profile from localStorage", e);
      }
    }
    return DEFAULT_STUDENT_PROFILE;
  });
  const [isLoaded] = useState(() => typeof window !== "undefined");

  const updateProfile = useCallback((updates: Partial<StudentProfile>) => {
    setProfile((prev) => {
      const next = { ...prev, ...updates };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch (e) {
        console.error("Failed to save profile to localStorage", e);
      }
      return next;
    });
  }, []);

  const setAvatar = useCallback((avatarUrl: string) => {
    updateProfile({ avatar: avatarUrl });
  }, [updateProfile]);

  const resetDemoProfile = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_STUDENT_PROFILE));
    } catch (e) {
      console.error("Failed to reset profile in localStorage", e);
    }
    setProfile(DEFAULT_STUDENT_PROFILE);
  }, []);

  return (
    <ProfileContext.Provider
      value={{
        profile,
        updateProfile,
        setAvatar,
        resetDemoProfile,
        isLoaded,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useStudentProfile() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useStudentProfile must be used within a ProfileProvider");
  }
  return context;
}
