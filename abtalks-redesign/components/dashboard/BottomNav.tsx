"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, LayoutDashboard, Zap, User } from "lucide-react";

const navItems = [
  { href: "/", icon: Home, label: "Home", id: "nav-home" },
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard", id: "nav-dashboard" },
  { href: "/day/12", icon: Zap, label: "Today", id: "nav-today" },
  { href: "#", icon: User, label: "Profile", id: "nav-profile" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <motion.nav
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: 0.7 }}
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-center"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div
        className="w-full max-w-[480px] flex items-center justify-around px-4 py-2"
        style={{
          background: "rgba(24, 24, 27, 0.95)",
          borderTop: "1px solid #27272a",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              id={item.id}
              className="flex flex-col items-center gap-1 py-2 px-4 rounded-2xl transition-all duration-200 relative"
              style={{ minWidth: "56px" }}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: "rgba(79, 70, 229, 0.12)",
                    border: "1px solid rgba(79, 70, 229, 0.2)",
                  }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <Icon
                size={20}
                color={isActive ? "#818cf8" : "#4b5563"}
                className="relative z-10"
              />
              <span
                className="text-xs font-medium relative z-10"
                style={{ color: isActive ? "#818cf8" : "#4b5563" }}
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
