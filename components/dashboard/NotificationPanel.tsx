"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, CheckCircle2, Zap, Flame, Trophy, CheckCheck, X } from "lucide-react";
import { NotificationItem } from "@/data/dashboard";

interface NotificationPanelProps {
  notifications: NotificationItem[];
  isOpen: boolean;
  onClose: () => void;
  onMarkRead: (id: string) => void;
  onMarkAllRead: () => void;
}

const iconMap = {
  CheckCircle2: { icon: CheckCircle2, color: "#4ade80", bg: "rgba(34, 197, 94, 0.1)" },
  Zap: { icon: Zap, color: "#818cf8", bg: "rgba(79, 70, 229, 0.1)" },
  Flame: { icon: Flame, color: "#f59e0b", bg: "rgba(245, 158, 11, 0.1)" },
  Trophy: { icon: Trophy, color: "#fbbf24", bg: "rgba(251, 191, 36, 0.1)" },
};

export function NotificationPanel({
  notifications,
  isOpen,
  onClose,
  onMarkRead,
  onMarkAllRead,
}: NotificationPanelProps) {
  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop for mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 md:bg-transparent md:backdrop-blur-none"
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-0 left-0 right-0 z-50 w-full rounded-t-3xl border-t border-zinc-800 bg-[#18181B] p-5 shadow-2xl md:absolute md:bottom-auto md:top-14 md:right-0 md:left-auto md:w-96 md:rounded-2xl md:border md:border-zinc-800"
          >
            {/* Top header */}
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <Bell size={16} className="text-indigo-400" />
                <h3 className="text-sm font-bold text-zinc-100">Notifications</h3>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-indigo-600/30 border border-indigo-500/40 text-[11px] font-semibold text-indigo-300">
                    {unreadCount} new
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={onMarkAllRead}
                    className="flex items-center gap-1 text-[11px] font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    <CheckCheck size={12} />
                    Mark all read
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="p-1 rounded-xl hover:bg-zinc-800 text-zinc-400 transition-colors"
                  aria-label="Close notifications"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* List */}
            <div className="max-h-[360px] overflow-y-auto py-2 space-y-2 mt-1">
              {notifications.length === 0 || unreadCount === 0 ? (
                <div className="py-8 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-800/60 border border-zinc-700/50 mx-auto flex items-center justify-center mb-2">
                    <CheckCircle2 size={20} className="text-emerald-400" />
                  </div>
                  <p className="text-sm font-semibold text-zinc-200">You&apos;re all caught up!</p>
                  <p className="text-xs text-zinc-400 mt-0.5">No unread notifications at the moment.</p>
                </div>
              ) : (
                notifications.map((item) => {
                  const cfg = iconMap[item.iconName] || iconMap.Zap;
                  const Icon = cfg.icon;

                  return (
                    <motion.div
                      key={item.id}
                      onClick={() => onMarkRead(item.id)}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                        item.unread
                          ? "bg-indigo-950/20 border-indigo-500/30 hover:border-indigo-500/50"
                          : "bg-zinc-900/40 border-zinc-800/50 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: cfg.bg }}
                      >
                        <Icon size={16} color={cfg.color} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <p className="text-xs font-bold text-zinc-100 truncate">{item.title}</p>
                          <span className="text-[10px] text-zinc-500 flex-shrink-0">{item.time}</span>
                        </div>
                        <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">{item.description}</p>
                      </div>

                      {item.unread && (
                        <div className="w-2 h-2 rounded-full bg-indigo-500 flex-shrink-0 mt-2" />
                      )}
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* Bottom info */}
            <div className="pt-2 text-center border-t border-zinc-800/80">
              <p className="text-[11px] text-zinc-500">ABTalks Challenge Notifications</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
