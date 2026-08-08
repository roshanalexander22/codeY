"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Play, BarChart3, Trophy, Flame } from "lucide-react";

interface QuickActionsProps {
  currentDay?: number;
  onOpenProgress?: () => void;
  onOpenAchievements?: () => void;
}

export function QuickActions({
  currentDay = 12,
  onOpenProgress,
  onOpenAchievements,
}: QuickActionsProps) {
  const actions = [
    {
      label: "Continue Challenge",
      icon: Play,
      href: `/day/${currentDay}`,
      color: "var(--primary)",
      bg: "var(--primary-glow)",
      border: "var(--primary)",
      isPrimary: true,
    },
    {
      label: "View Progress",
      icon: BarChart3,
      onClick: onOpenProgress,
      href: "#progress",
      color: "#22c55e",
      bg: "rgba(34, 197, 94, 0.1)",
      border: "rgba(34, 197, 94, 0.25)",
    },
    {
      label: "Achievements",
      icon: Trophy,
      onClick: onOpenAchievements,
      href: "#achievements",
      color: "#f59e0b",
      bg: "rgba(245, 158, 11, 0.1)",
      border: "rgba(245, 158, 11, 0.25)",
    },
    {
      label: "Streak History",
      icon: Flame,
      href: "#activity",
      color: "#ef4444",
      bg: "rgba(239, 68, 68, 0.1)",
      border: "rgba(239, 68, 68, 0.25)",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut", delay: 0.35 }}
      className="w-full"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
          Quick Actions
        </h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {actions.map((act) => {
          const Icon = act.icon;
          const content = (
            <div
              className="flex items-center gap-2.5 p-3 rounded-2xl border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer glass-card"
            >
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: act.bg, border: `1px solid ${act.border}` }}
              >
                <Icon size={15} color={act.color} />
              </div>
              <span className="text-xs font-semibold text-[var(--foreground)] truncate">
                {act.label}
              </span>
            </div>
          );

          if (act.onClick) {
            return (
              <button
                key={act.label}
                type="button"
                onClick={act.onClick}
                className="text-left w-full"
              >
                {content}
              </button>
            );
          }

          return (
            <Link key={act.label} href={act.href}>
              {content}
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
}
