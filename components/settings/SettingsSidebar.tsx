"use client";

import {
  User,
  Palette,
  Bell,
  Target,
  BookOpen,
  Eye,
  ShieldCheck,
  Database,
  UserCheck,
  Info,
} from "lucide-react";

export type SettingsCategory =
  | "profile"
  | "appearance"
  | "notifications"
  | "challenge"
  | "learning"
  | "accessibility"
  | "privacy"
  | "data"
  | "account"
  | "about";

interface CategoryItem {
  id: SettingsCategory;
  label: string;
  icon: React.ElementType;
  color: string;
}

export const SETTINGS_CATEGORIES: CategoryItem[] = [
  { id: "profile", label: "Profile", icon: User, color: "#818cf8" },
  { id: "appearance", label: "Appearance", icon: Palette, color: "#c084fc" },
  { id: "notifications", label: "Notifications", icon: Bell, color: "#fbbf24" },
  { id: "challenge", label: "Challenge Preferences", icon: Target, color: "#f87171" },
  { id: "learning", label: "Learning & Resources", icon: BookOpen, color: "#60a5fa" },
  { id: "accessibility", label: "Accessibility", icon: Eye, color: "#4ade80" },
  { id: "privacy", label: "Privacy & Visibility", icon: ShieldCheck, color: "#34d399" },
  { id: "data", label: "Data & Storage", icon: Database, color: "#f472b6" },
  { id: "account", label: "Account / Demo", icon: UserCheck, color: "#a7f3d0" },
  { id: "about", label: "About ABTalks", icon: Info, color: "#93c5fd" },
];

interface SettingsSidebarProps {
  activeCategory: SettingsCategory;
  onSelectCategory: (cat: SettingsCategory) => void;
}

export function SettingsSidebar({ activeCategory, onSelectCategory }: SettingsSidebarProps) {
  return (
    <nav className="space-y-1 w-full" aria-label="Settings Categories">
      {SETTINGS_CATEGORIES.map((cat) => {
        const Icon = cat.icon;
        const isActive = activeCategory === cat.id;

        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelectCategory(cat.id)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-sm transition-all duration-150"
            style={{
              background: isActive ? "var(--primary-glow)" : "transparent",
              color: isActive ? "var(--foreground)" : "var(--muted-foreground)",
              fontWeight: isActive ? 600 : 400,
              border: isActive ? "1px solid rgba(79, 70, 229, 0.3)" : "1px solid transparent",
            }}
          >
            <Icon size={16} style={{ color: cat.color }} />
            <span className="truncate">{cat.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
