"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Bell, Settings, Layers, Code, LayoutDashboard } from "lucide-react";
import { DashboardUser } from "@/data/dashboard";

interface DesktopHeaderProps {
  user: DashboardUser;
  unreadCount: number;
  onOpenNotifications: () => void;
  onOpenSettings: () => void;
  onOpenProfile: () => void;
}

export function DesktopHeader({
  user,
  unreadCount,
  onOpenNotifications,
  onOpenSettings,
  onOpenProfile,
}: DesktopHeaderProps) {
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Challenges", href: `/day/${user.currentDay}`, icon: Code },
    { label: "Activity", href: "#activity", icon: Layers },
  ];

  return (
    <header className="hidden md:flex items-center justify-between px-8 py-3.5 border-b border-zinc-800/80 bg-[#09090B]/90 backdrop-blur-md sticky top-0 z-40">
      {/* Left: Brand */}
      <div className="flex items-center gap-8">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center group-hover:scale-105 transition-transform">
            <span className="text-base font-black text-indigo-300">AB</span>
          </div>
          <div>
            <h1 className="text-base font-black text-zinc-100 leading-tight">ABTalks</h1>
            <p className="text-[10px] text-zinc-400 font-medium">60-Day Challenge</p>
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
                    ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/30"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
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
        {user.track && (
          <div className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-semibold text-indigo-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500" />
            <span>{user.track}</span>
          </div>
        )}

        {/* Notifications */}
        <button
          onClick={onOpenNotifications}
          className="relative w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:border-zinc-700 transition-colors"
          aria-label="Open notifications"
        >
          <Bell size={18} className="text-zinc-300" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center border-2 border-[#09090B]">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Settings */}
        <button
          onClick={onOpenSettings}
          className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:border-zinc-700 transition-colors"
          aria-label="Open settings"
        >
          <Settings size={18} className="text-zinc-300 hover:rotate-45 transition-transform duration-300" />
        </button>

        {/* Profile Avatar */}
        <button
          onClick={onOpenProfile}
          className="flex items-center gap-2.5 p-1 pr-3 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-indigo-500/40 transition-colors"
          aria-label="Open profile"
        >
          <div className="w-8 h-8 rounded-xl overflow-hidden border border-indigo-500/40 bg-indigo-950/30 flex items-center justify-center text-xs font-bold text-indigo-300">
            {user.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              user.name.charAt(0)
            )}
          </div>
          <span className="text-xs font-bold text-zinc-200">{user.name.split(" ")[0]}</span>
        </button>
      </div>
    </header>
  );
}
