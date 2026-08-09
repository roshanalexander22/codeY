"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, Code, Flame, User } from "lucide-react";

interface BottomNavProps {
  currentDay?: number;
  onOpenProfile?: () => void;
}

export function BottomNav({ currentDay = 12, onOpenProfile }: BottomNavProps) {
  const pathname = usePathname();

  const navItems = [
    { href: "/", icon: Home, label: "Home", id: "nav-home" },
    { href: `/day/${currentDay}`, icon: Code, label: "Challenges", id: "nav-challenges" },
    { href: "#activity", icon: Flame, label: "Activity", id: "nav-activity" },
    { href: "#profile", icon: User, label: "Profile", id: "nav-profile", isProfile: true },
  ];

  return (
    <motion.nav
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: 0.4 }}
      className="fixed bottom-0 left-0 right-0 z-40 flex justify-center md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 8px)" }}
    >
      <div
        className="w-full max-w-[480px] flex items-center justify-around px-4 py-2 bg-[var(--card)]/90 border-t border-[var(--border)] backdrop-blur-xl shadow-2xl glass-nav"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href === "/dashboard" && pathname === "/dashboard");

          if (item.isProfile) {
            return (
              <button
                key={item.label}
                type="button"
                onClick={onOpenProfile}
                className="flex flex-col items-center gap-1 py-1.5 px-3 rounded-2xl transition-all duration-200 min-w-[56px] text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                aria-label="Open profile modal"
              >
                <Icon size={20} />
                <span className="text-[11px] font-medium">{item.label}</span>
              </button>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              id={item.id}
              className="flex flex-col items-center gap-1 py-1.5 px-3 rounded-2xl transition-all duration-200 relative min-w-[56px]"
            >
              {isActive && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-2xl bg-[var(--primary-glow)] border border-[var(--primary)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <Icon
                size={20}
                className={isActive ? "text-[var(--primary)] relative z-10" : "text-[var(--muted-foreground)] relative z-10"}
              />
              <span
                className={`text-[11px] font-medium relative z-10 ${
                  isActive ? "text-[var(--primary)] font-semibold" : "text-[var(--muted-foreground)]"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
}
