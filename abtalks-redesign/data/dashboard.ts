// Dashboard mock data — all mocked, no backend

export type EdgeCase = "normal" | "firstDay" | "missedDay" | "emptyProfile";

export interface DashboardUser {
  id: string;
  name: string;
  avatar: string;
  streak: number;
  longestStreak: number;
  totalXp: number;
  level: number;
  track: string;
  enrolledAt: string;
  currentDay: number;
  completedDays: number[];
  missedDays: number[];
  todaySubmitted: boolean;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  avatar: string;
  streak: number;
  xp: number;
  isCurrentUser?: boolean;
}

export interface TodayChallenge {
  dayNumber: number;
  title: string;
  estimatedTime: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
}

// ── Normal state (Day 12, 11-day streak) ─────────────────────────────────────
export const normalUser: DashboardUser = {
  id: "user_001",
  name: "Arjun Menon",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ArjunMenon",
  streak: 11,
  longestStreak: 18,
  totalXp: 1650,
  level: 3,
  track: "Full Stack Development",
  enrolledAt: "2025-07-27",
  currentDay: 12,
  completedDays: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  missedDays: [],
  todaySubmitted: false,
};

// ── First Day state ───────────────────────────────────────────────────────────
export const firstDayUser: DashboardUser = {
  id: "user_002",
  name: "Priya Sharma",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=PriyaSharma",
  streak: 0,
  longestStreak: 0,
  totalXp: 0,
  level: 1,
  track: "Frontend Development",
  enrolledAt: new Date().toISOString().split("T")[0], // today
  currentDay: 1,
  completedDays: [],
  missedDays: [],
  todaySubmitted: false,
};

// ── Missed Day state ──────────────────────────────────────────────────────────
export const missedDayUser: DashboardUser = {
  id: "user_003",
  name: "Rohan Verma",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=RohanVerma",
  streak: 0, // broken
  longestStreak: 8,
  totalXp: 1100,
  level: 2,
  track: "Data Science",
  enrolledAt: "2025-07-27",
  currentDay: 12,
  completedDays: [1, 2, 3, 4, 5, 6, 7, 8],
  missedDays: [9, 10, 11],
  todaySubmitted: false,
};

// ── Empty Profile state ───────────────────────────────────────────────────────
export const emptyProfileUser: DashboardUser = {
  id: "user_004",
  name: "Student",
  avatar: "",
  streak: 0,
  longestStreak: 0,
  totalXp: 0,
  level: 1,
  track: "",
  enrolledAt: new Date().toISOString().split("T")[0],
  currentDay: 1,
  completedDays: [],
  missedDays: [],
  todaySubmitted: false,
};

// ── Leaderboard ───────────────────────────────────────────────────────────────
export const leaderboardData: LeaderboardEntry[] = [
  {
    rank: 1,
    name: "Kavya Nair",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=KavyaNair",
    streak: 18,
    xp: 2700,
  },
  {
    rank: 2,
    name: "Dev Joshi",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DevJoshi",
    streak: 15,
    xp: 2250,
  },
  {
    rank: 3,
    name: "Arjun Menon",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ArjunMenon",
    streak: 11,
    xp: 1650,
    isCurrentUser: true,
  },
  {
    rank: 4,
    name: "Sneha R.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SnehaR",
    streak: 10,
    xp: 1500,
  },
  {
    rank: 5,
    name: "Ankit P.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AnkitP",
    streak: 9,
    xp: 1350,
  },
];

// ── Today's Challenge ─────────────────────────────────────────────────────────
export const todayChallenge: TodayChallenge = {
  dayNumber: 12,
  title: "Build a REST API with Express & MongoDB",
  estimatedTime: "4-5 hours",
  difficulty: "Intermediate",
};

// ── Edge case selector ────────────────────────────────────────────────────────
export function getDashboardData(edgeCase: EdgeCase = "normal") {
  switch (edgeCase) {
    case "firstDay":
      return { user: firstDayUser, leaderboard: [], isFirstDay: true, isMissedDay: false, isEmptyProfile: false };
    case "missedDay":
      return { user: missedDayUser, leaderboard: leaderboardData, isFirstDay: false, isMissedDay: true, isEmptyProfile: false };
    case "emptyProfile":
      return { user: emptyProfileUser, leaderboard: [], isFirstDay: true, isMissedDay: false, isEmptyProfile: true };
    default:
      return { user: normalUser, leaderboard: leaderboardData, isFirstDay: false, isMissedDay: false, isEmptyProfile: false };
  }
}
