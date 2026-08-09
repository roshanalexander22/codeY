"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { subDays, format, isToday, addDays, isSameWeek, startOfWeek } from "date-fns";
import {
  ChevronDown,
  TrendingUp,
  CheckCircle2,
  XCircle,
  Calendar,
  Flame,
} from "lucide-react";

interface WeeklyHeatmapProps {
  completedDays: number[];
  missedDays: number[];
  enrolledAt: string;
  streak?: number;
}

interface DayCell {
  dayIndex: number;
  status: "completed" | "missed" | "future" | "today";
  date: Date;
}

interface TooltipState {
  visible: boolean;
  x: number;
  y: number;
  content: { date: string; status: string; label: string; xp: string };
}

export function WeeklyHeatmap({
  completedDays,
  missedDays,
  enrolledAt,
  streak = 11,
}: WeeklyHeatmapProps) {
  const today = new Date();
  const enrolled = new Date(enrolledAt);
  const [filterMode, setFilterMode] = useState<"weekly" | "monthly">("weekly");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false,
    x: 0,
    y: 0,
    content: { date: "", status: "", label: "", xp: "" },
  });

  // ── Build Grid ─────────────────────────────────────────────────────────────
  const WEEKS = filterMode === "weekly" ? 7 : 12;
  const DAYS = 7;
  const allCells: DayCell[] = [];
  const weeks: DayCell[][] = [];
  const startDate = subDays(today, (WEEKS - 1) * 7 + today.getDay());

  for (let w = 0; w < WEEKS; w++) {
    const weekCells: DayCell[] = [];
    for (let d = 0; d < DAYS; d++) {
      const date = addDays(startDate, w * DAYS + d);
      const diffFromEnroll =
        Math.floor((date.getTime() - enrolled.getTime()) / 86_400_000) + 1;

      let status: DayCell["status"] = "future";
      if (date < enrolled || date > today) {
        status = "future";
      } else if (isToday(date)) {
        status = "today";
      } else if (completedDays.includes(diffFromEnroll)) {
        status = "completed";
      } else if (missedDays.includes(diffFromEnroll) || date < today) {
        status = "missed";
      }

      const cell: DayCell = { dayIndex: diffFromEnroll, status, date };
      weekCells.push(cell);
      allCells.push(cell);
    }
    weeks.push(weekCells);
  }

  // ── Derived Stats & Analytics ────────────────────────────────────────────────
  const totalSubmissions = completedDays.length;
  const totalDaysSinceEnroll = Math.max(
    1,
    Math.floor((today.getTime() - enrolled.getTime()) / 86_400_000) + 1
  );
  const completionRate = Math.round(
    (totalSubmissions / Math.min(totalDaysSinceEnroll, 60)) * 100
  );
  const activeDaysCount = totalSubmissions;

  const activeDaysThisWeek = allCells.filter(
    (c) =>
      c.status === "completed" &&
      isSameWeek(c.date, today, { weekStartsOn: 0 })
  ).length;

  // Weekly Activity Bar heights (%)
  const weeklyBarData = [
    { day: "Mon", val: 80 },
    { day: "Tue", val: 100 },
    { day: "Wed", val: 70 },
    { day: "Thu", val: 40 },
    { day: "Fri", val: 90 },
    { day: "Sat", val: 30 },
    { day: "Sun", val: 60 },
  ];

  // Recent Activity Log
  const recentActivities = [
    {
      title: "REST API with Express & MongoDB",
      status: "completed",
      time: "Today",
      xp: "+150 XP",
    },
    {
      title: "Binary Search Challenge",
      status: "completed",
      time: "Yesterday",
      xp: "+100 XP",
    },
    {
      title: "Graph Algorithms",
      status: "missed",
      time: "Aug 5",
      xp: "Missed",
    },
    {
      title: "SQL Optimization",
      status: "completed",
      time: "Aug 4",
      xp: "+120 XP",
    },
  ];

  const statusStyles: Record<
    DayCell["status"],
    { bg: string; border: string }
  > = {
    completed: {
      bg: "#22c55e",
      border: "rgba(34, 197, 94, 0.4)",
    },
    missed: {
      bg: "rgba(239, 68, 68, 0.25)",
      border: "rgba(239, 68, 68, 0.3)",
    },
    today: {
      bg: "rgba(79, 70, 229, 0.45)",
      border: "rgba(79, 70, 229, 0.7)",
    },
    future: {
      bg: "rgba(255,255,255,0.03)",
      border: "#27272a",
    },
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>, cell: DayCell) => {
    if (cell.status === "future") return;
    const rect = (e.currentTarget as HTMLElement)
      .closest(".activity-card")!
      .getBoundingClientRect();
    const cellRect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setTooltip({
      visible: true,
      x: cellRect.left - rect.left + cellRect.width / 2,
      y: cellRect.top - rect.top - 8,
      content: {
        date: format(cell.date, "EEEE, MMM d"),
        status:
          cell.status === "completed"
            ? "Completed"
            : cell.status === "missed"
            ? "Missed"
            : "Today",
        label: cell.status === "completed" ? "1 submission" : "No submission",
        xp: cell.status === "completed" ? "+150 XP" : "0 XP",
      },
    });
  };

  const handleMouseLeave = () => setTooltip((t) => ({ ...t, visible: false }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut", delay: 0.55 }}
      className="activity-card relative rounded-3xl p-5 sm:p-6 w-full bg-[#18181B] border border-zinc-800"
    >
      {/* ── CARD HEADER ── */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div>
            <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2">
              <Calendar size={18} className="text-indigo-400" />
              Activity Analytics
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              {totalSubmissions} submissions total · {activeDaysThisWeek} active days this week
            </p>
          </div>
        </div>

        {/* Filter Dropdown & Legend */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />
              <span className="text-xs text-zinc-400">Done</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm bg-rose-500/30 border border-rose-500/40" />
              <span className="text-xs text-zinc-400">Missed</span>
            </div>
          </div>

          {/* Filter Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-200 hover:border-zinc-700 transition-colors"
            >
              <span>{filterMode === "weekly" ? "Weekly" : "Monthly"}</span>
              <ChevronDown size={14} className="text-zinc-400" />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-32 rounded-xl bg-zinc-900 border border-zinc-800 py-1 shadow-2xl z-20">
                <button
                  onClick={() => {
                    setFilterMode("weekly");
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-zinc-800 ${
                    filterMode === "weekly" ? "text-indigo-400 font-bold" : "text-zinc-300"
                  }`}
                >
                  Weekly (7 Wks)
                </button>
                <button
                  onClick={() => {
                    setFilterMode("monthly");
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-zinc-800 ${
                    filterMode === "monthly" ? "text-indigo-400 font-bold" : "text-zinc-300"
                  }`}
                >
                  Monthly (12 Wks)
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── TWO-COLUMN INTERNAL LAYOUT (Desktop) / STACKED (Mobile) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* ── LEFT COLUMN: HEATMAP GRID ── */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Submission Heatmap
              </span>
              <span className="text-[11px] text-zinc-500 font-mono">S M T W T F S</span>
            </div>

            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-1.5 mb-2">
              {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                <div key={i} className="text-center text-[10px] font-semibold text-zinc-500">
                  {d}
                </div>
              ))}
            </div>

            {/* Heatmap Rows */}
            <div className="space-y-1.5">
              {weeks.map((week, wi) => (
                <div key={wi} className="grid grid-cols-7 gap-1.5">
                  {week.map((cell, di) => {
                    const s = statusStyles[cell.status];
                    return (
                      <motion.div
                        key={di}
                        className="aspect-square rounded-md transition-all cursor-pointer hover:scale-110"
                        style={{
                          background: s.bg,
                          border: `1px solid ${s.border}`,
                          maxHeight: "36px",
                        }}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          delay: 0.55 + (wi * DAYS + di) * 0.003,
                          duration: 0.18,
                        }}
                        onMouseEnter={(e) => handleMouseEnter(e, cell)}
                        onMouseLeave={handleMouseLeave}
                      />
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Axis labels */}
            <div className="flex justify-between items-center mt-3 text-[10px] text-zinc-500 font-medium">
              <span>{filterMode === "weekly" ? "6 weeks ago" : "11 weeks ago"}</span>
              <span>Today</span>
            </div>
          </div>

          {/* 7-Day Trend Visualization Sparkline */}
          <div className="pt-3 border-t border-zinc-800/80">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-zinc-400 font-semibold flex items-center gap-1.5">
                <TrendingUp size={13} className="text-emerald-400" />
                7-Day Activity Trend
              </span>
              <span className="text-emerald-400 font-bold text-[11px]">↑ +14% vs last week</span>
            </div>
            {/* SVG Sparkline */}
            <div className="h-10 w-full flex items-end gap-1 pt-1">
              {[40, 65, 80, 50, 95, 45, 85].map((val, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                  <div
                    className="w-full rounded-sm bg-gradient-to-t from-indigo-600/40 to-indigo-400 transition-all duration-300 hover:from-emerald-500 hover:to-emerald-400"
                    style={{ height: `${val}%` }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN: ANALYTICS & RECENT ACTIVITY ── */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-4">

          {/* 1. Activity Statistics Row (2x2 grid) */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-2">
              Activity Statistics
            </span>
            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-3 rounded-2xl bg-zinc-900/80 border border-zinc-800/80">
                <p className="text-[11px] text-zinc-400 font-medium">Completion rate</p>
                <p className="text-base font-black text-emerald-400 mt-0.5 tabular-nums">
                  {completionRate}%
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-zinc-900/80 border border-zinc-800/80">
                <p className="text-[11px] text-zinc-400 font-medium">Active days</p>
                <p className="text-base font-black text-indigo-400 mt-0.5 tabular-nums">
                  {activeDaysCount} days
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-zinc-900/80 border border-zinc-800/80">
                <p className="text-[11px] text-zinc-400 font-medium">Current streak</p>
                <p className="text-base font-black text-amber-400 mt-0.5 tabular-nums">
                  {streak} days
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-zinc-900/80 border border-zinc-800/80">
                <p className="text-[11px] text-zinc-400 font-medium">Best day</p>
                <p className="text-base font-black text-purple-400 mt-0.5">
                  Tuesday
                </p>
              </div>
            </div>
          </div>

          {/* 2. Weekly Activity Bars */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-2">
              Weekly Activity
            </span>
            <div className="space-y-1.5">
              {weeklyBarData.map((wb) => (
                <div key={wb.day} className="flex items-center gap-2 text-xs">
                  <span className="w-7 text-[11px] text-zinc-400 font-mono">{wb.day}</span>
                  <div className="flex-1 h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-indigo-500"
                      style={{ width: `${wb.val}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Recent Activity List */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-2">
              Recent Activity
            </span>
            <div className="space-y-1.5">
              {recentActivities.map((act, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2 rounded-xl bg-zinc-900/60 border border-zinc-800/60 text-xs"
                >
                  <div className="flex items-center gap-2 truncate pr-2">
                    {act.status === "completed" ? (
                      <CheckCircle2 size={13} className="text-emerald-400 flex-shrink-0" />
                    ) : (
                      <XCircle size={13} className="text-rose-400 flex-shrink-0" />
                    )}
                    <span className="text-zinc-200 font-semibold truncate">
                      {act.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-[10px] text-zinc-500">{act.time}</span>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        act.status === "completed"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                      }`}
                    >
                      {act.xp}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* ── TOOLTIP ── */}
      <AnimatePresence>
        {tooltip.visible && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.12 }}
            className="absolute pointer-events-none z-50 rounded-xl px-3 py-2 text-left"
            style={{
              left: tooltip.x,
              top: tooltip.y,
              transform: "translate(-50%, -100%)",
              background: "#1f1f23",
              border: "1px solid #3f3f46",
              boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
              minWidth: "130px",
            }}
          >
            <p className="text-xs font-bold text-zinc-100">{tooltip.content.date}</p>
            <p className="text-[11px] text-emerald-400 font-medium mt-0.5">
              {tooltip.content.status} · {tooltip.content.label}
            </p>
            <p className="text-[10px] text-zinc-400 font-bold mt-1 pt-1 border-t border-zinc-700/60">
              Reward: {tooltip.content.xp}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── ACTIVITY INSIGHT FOOTER ── */}
      <div className="mt-5 pt-3 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
        <span className="flex items-center gap-1.5 font-medium text-zinc-300">
          <Flame size={14} className="text-amber-400 flex-shrink-0" />
          🔥 {streak}-day streak — you&apos;re on fire! You&apos;ve been active {activeDaysThisWeek} of the last 7 days.
        </span>
      </div>
    </motion.div>
  );
}
