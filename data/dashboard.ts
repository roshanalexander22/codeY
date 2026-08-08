// Dashboard mock data — comprehensive state management and edge cases

export type EdgeCase = "normal" | "firstDay" | "missedDay" | "emptyProfile";

export interface DashboardUser {
  id: string;
  name: string;
  avatar: string;
  college: string;
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
  momentumScore: number;
  momentumLabel: string;
  profileCompletion: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  unread: boolean;
  type: "completion" | "challenge" | "milestone" | "achievement";
  iconName: "CheckCircle2" | "Zap" | "Flame" | "Trophy";
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  avatar: string;
  streak: number;
  xp: number;
  isCurrentUser?: boolean;
}

export interface AchievementDetail {
  id: string;
  label: string;
  description: string;
  detailText: string;
  earned: boolean;
  earnedOn?: string;
  iconName: string;
  color: string;
  bg: string;
  border: string;
}

export interface UserSettings {
  theme: "dark" | "light" | "system";
  reminders: boolean;
  achievementAlerts: boolean;
  communityUpdates: boolean;
  showHeatmap: boolean;
  showLeaderboard: boolean;
  showMotivational: boolean;
  name: string;
  college: string;
  track: string;
}

// ── Default Mock User States ──────────────────────────────────────────────────
export const normalUser: DashboardUser = {
  id: "user_001",
  name: "Arjun Menon",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ArjunMenon",
  college: "IIT Madras",
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
  momentumScore: 91,
  momentumLabel: "Strong momentum — You're on a great streak!",
  profileCompletion: 85,
};

export const firstDayUser: DashboardUser = {
  id: "user_002",
  name: "Priya Sharma",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=PriyaSharma",
  college: "BITS Pilani",
  streak: 0,
  longestStreak: 0,
  totalXp: 0,
  level: 1,
  track: "Frontend Development",
  enrolledAt: new Date().toISOString().split("T")[0],
  currentDay: 1,
  completedDays: [],
  missedDays: [],
  todaySubmitted: false,
  momentumScore: 50,
  momentumLabel: "Ready to launch — Submit Day 1 to ignite your momentum!",
  profileCompletion: 70,
};

export const missedDayUser: DashboardUser = {
  id: "user_003",
  name: "Rohan Verma",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=RohanVerma",
  college: "VIT Vellore",
  streak: 0,
  longestStreak: 8,
  totalXp: 1100,
  level: 2,
  track: "Data Science & AI",
  enrolledAt: "2025-07-27",
  currentDay: 12,
  completedDays: [1, 2, 3, 4, 5, 6, 7, 8],
  missedDays: [9, 10, 11],
  todaySubmitted: false,
  momentumScore: 35,
  momentumLabel: "Needs attention — Get back on track today!",
  profileCompletion: 80,
};

export const emptyProfileUser: DashboardUser = {
  id: "user_004",
  name: "Student",
  avatar: "",
  college: "Select College",
  streak: 0,
  longestStreak: 0,
  totalXp: 0,
  level: 1,
  track: "Select Track",
  enrolledAt: new Date().toISOString().split("T")[0],
  currentDay: 1,
  completedDays: [],
  missedDays: [],
  todaySubmitted: false,
  momentumScore: 0,
  momentumLabel: "Complete your profile to calculate momentum",
  profileCompletion: 20,
};

// ── Notifications Data ────────────────────────────────────────────────────────
export const initialNotifications: NotificationItem[] = [
  {
    id: "notif_1",
    title: "Day 11 completed!",
    description: "You maintained your streak for 11 days. Keep pushing!",
    time: "2 hours ago",
    unread: true,
    type: "completion",
    iconName: "CheckCircle2",
  },
  {
    id: "notif_2",
    title: "Day 12 is waiting",
    description: "Your next challenge: Express & MongoDB REST API is ready.",
    time: "5 hours ago",
    unread: true,
    type: "challenge",
    iconName: "Zap",
  },
  {
    id: "notif_3",
    title: "Milestone approaching",
    description: "You're 3 days away from the Day 14 milestone reward.",
    time: "1 day ago",
    unread: false,
    type: "milestone",
    iconName: "Flame",
  },
  {
    id: "notif_4",
    title: "New achievement unlocked!",
    description: "You unlocked 'Consistent Coder' for completing 7 consecutive days.",
    time: "2 days ago",
    unread: false,
    type: "achievement",
    iconName: "Trophy",
  },
];

// ── Leaderboard Data ──────────────────────────────────────────────────────────
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
    name: "Sneha Reddy",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SnehaReddy",
    streak: 10,
    xp: 1500,
  },
  {
    rank: 5,
    name: "Ankit Patel",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AnkitPatel",
    streak: 9,
    xp: 1350,
  },
];

// ── Achievement Details Data ──────────────────────────────────────────────────
export const achievementDetails: AchievementDetail[] = [
  {
    id: "first-blood",
    label: "First Blood",
    description: "Complete Day 1",
    detailText: "Awarded for submitting your very first proof of work on Day 1.",
    earned: true,
    earnedOn: "Jul 27, 2025",
    iconName: "Zap",
    color: "#818cf8",
    bg: "rgba(79, 70, 229, 0.12)",
    border: "rgba(79, 70, 229, 0.3)",
  },
  {
    id: "week-one",
    label: "Week One",
    description: "7-day streak",
    detailText: "Completed 7 consecutive days of building and sharing publicly.",
    earned: true,
    earnedOn: "Aug 2, 2025",
    iconName: "Flame",
    color: "#f59e0b",
    bg: "rgba(245, 158, 11, 0.12)",
    border: "rgba(245, 158, 11, 0.3)",
  },
  {
    id: "consistent",
    label: "Consistent Coder",
    description: "11-day streak",
    detailText: "Showed outstanding discipline with an active 11-day daily streak.",
    earned: true,
    earnedOn: "Aug 6, 2025",
    iconName: "Star",
    color: "#fbbf24",
    bg: "rgba(251, 191, 36, 0.12)",
    border: "rgba(251, 191, 36, 0.3)",
  },
  {
    id: "builder",
    label: "Master Builder",
    description: "12+ days done",
    detailText: "Crossed 12 full project submissions on your GitHub portfolio.",
    earned: true,
    earnedOn: "Aug 7, 2025",
    iconName: "Code2",
    color: "#a78bfa",
    bg: "rgba(167, 139, 250, 0.12)",
    border: "rgba(167, 139, 250, 0.3)",
  },
  {
    id: "halfway",
    label: "Halfway Hero",
    description: "30 days done",
    detailText: "Reach the halfway milestone of the 60-day challenge.",
    earned: false,
    iconName: "Shield",
    color: "#22c55e",
    bg: "rgba(34, 197, 94, 0.12)",
    border: "rgba(34, 197, 94, 0.3)",
  },
  {
    id: "champion",
    label: "ABTalks Champion",
    description: "60 days done",
    detailText: "Complete all 60 days and stand out to top recruiters in India.",
    earned: false,
    iconName: "Trophy",
    color: "#f97316",
    bg: "rgba(249, 115, 22, 0.12)",
    border: "rgba(249, 115, 22, 0.3)",
  },
];

// ── Default Settings ──────────────────────────────────────────────────────────
export const defaultSettings: UserSettings = {
  theme: "dark",
  reminders: true,
  achievementAlerts: true,
  communityUpdates: false,
  showHeatmap: true,
  showLeaderboard: true,
  showMotivational: true,
  name: "Arjun Menon",
  college: "IIT Madras",
  track: "Full Stack Development",
};

export const todayChallenge = {
  dayNumber: 12,
  title: "Build a REST API with Express & MongoDB",
  estimatedTime: "4-5 hours",
  difficulty: "Intermediate",
};

// ── State Selector Function ───────────────────────────────────────────────────
export function getDashboardData(edgeCase: EdgeCase = "normal") {
  switch (edgeCase) {
    case "firstDay":
      return {
        user: firstDayUser,
        leaderboard: [],
        isFirstDay: true,
        isMissedDay: false,
        isEmptyProfile: false,
      };
    case "missedDay":
      return {
        user: missedDayUser,
        leaderboard: leaderboardData,
        isFirstDay: false,
        isMissedDay: true,
        isEmptyProfile: false,
      };
    case "emptyProfile":
      return {
        user: emptyProfileUser,
        leaderboard: [],
        isFirstDay: true,
        isMissedDay: false,
        isEmptyProfile: true,
      };
    default:
      return {
        user: normalUser,
        leaderboard: leaderboardData,
        isFirstDay: false,
        isMissedDay: false,
        isEmptyProfile: false,
      };
  }
}
