"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Settings, Layers, Code, LayoutDashboard } from "lucide-react";
import { DashboardUser } from "@/data/dashboard";
import { useStudentProfile } from "@/context/ProfileContext";
import { Avatar } from "@/components/ui/avatar";

interface DesktopHeaderProps {
  user: DashboardUser;
  unreadCount: number;
  onOpenNotifications: () => void;
  onOpenSettings: () => void;
  onOpenProfile: () => void;
}

export function DesktopHeader({
  user: propUser,
  unreadCount,
  onOpenNotifications,
  onOpenSettings,
  onOpenProfile,
}: DesktopHeaderProps) {
  const pathname = usePathname();
  const { profile } = useStudentProfile();

  const activeName = profile.name || propUser.name;
  const activeAvatar = profile.avatar || propUser.avatar;
  const activeTrack = profile.track || propUser.track;

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Challenges", href: `/day/${propUser.currentDay || 12}`, icon: Code },
    { label: "Activity", href: "#activity", icon: Layers },
  ];

  return (
    <header className="hidden md:flex items-center justify-between px-8 py-3.5 border-b border-[var(--border)] bg-[var(--background)]/90 backdrop-blur-md sticky top-0 z-40">
      {/* Left: Brand */}
      <div className="flex items-center gap-8">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center group-hover:scale-105 transition-transform">
            <span className="text-base font-black text-indigo-300">AB</span>
          </div>
          <div>
            <h1 className="text-base font-black text-[var(--foreground)] leading-tight">ABTalks</h1>
            <p className="text-[10px] text-[var(--muted-foreground)] font-medium">60-Day Challenge</p>
          </div>
        </Link>

        {/* Navigation links */}
        <nav className="flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/30"
                    : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-white/5"
                }`}
              >
                <Icon size={14} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Track selector */}
        {activeTrack && (
          <div className="px-3 py-1.5 rounded-xl bg-white/[0.03] border border-[var(--border)] text-xs font-semibold text-indigo-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500" />
            <span>{activeTrack}</span>
          </div>
        )}

        {/* Notifications */}
        <button
          onClick={onOpenNotifications}
          className="relative w-10 h-10 rounded-xl bg-white/[0.04] border border-[var(--border)] flex items-center justify-center hover:bg-white/10 transition-colors"
          aria-label="Open notifications"
        >
          <Bell size={18} className="text-[var(--muted-foreground)]" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center border-2 border-[var(--background)]">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Settings */}
        <button
          onClick={onOpenSettings}
          className="w-10 h-10 rounded-xl bg-white/[0.04] border border-[var(--border)] flex items-center justify-center hover:bg-white/10 transition-colors"
          aria-label="Open settings"
        >
          <Settings size={18} className="text-[var(--muted-foreground)] hover:rotate-45 transition-transform duration-300" />
        </button>

        {/* Profile Avatar */}
        <button
          onClick={onOpenProfile}
          className="flex items-center gap-2.5 p-1 pr-3 rounded-2xl bg-white/[0.04] border border-[var(--border)] hover:border-indigo-500/40 transition-colors cursor-pointer"
          aria-label="Open profile"
        >
          <Avatar src={activeAvatar} name={activeName} size="sm" border={false} />
          <span className="text-xs font-bold text-[var(--foreground)]">{activeName.split(" ")[0]}</span>
        </button>
      </div>
    </header>
  );
}
