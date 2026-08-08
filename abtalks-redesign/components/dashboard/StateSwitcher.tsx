"use client";

import { motion } from "framer-motion";
import { EdgeCase } from "@/data/dashboard";
import { Sliders, Sparkles, AlertTriangle, UserCircle2, CheckCircle2 } from "lucide-react";

interface StateSwitcherProps {
  currentCase: EdgeCase;
  onChange: (edgeCase: EdgeCase) => void;
}

const states: { id: EdgeCase; label: string; icon: React.ElementType; color: string }[] = [
  { id: "normal", label: "Normal (Day 12)", icon: CheckCircle2, color: "#818cf8" },
  { id: "firstDay", label: "First Day", icon: Sparkles, color: "#4ade80" },
  { id: "missedDay", label: "Missed Day", icon: AlertTriangle, color: "#f87171" },
  { id: "emptyProfile", label: "Empty Profile", icon: UserCircle2, color: "#fbbf24" },
];

export function StateSwitcher({ currentCase, onChange }: StateSwitcherProps) {
  return (
    <div className="w-full bg-[#18181B] border-b border-[#27272a] px-4 py-2.5 flex items-center justify-between text-xs overflow-x-auto gap-2">
      <div className="flex items-center gap-1.5 text-zinc-400 font-semibold flex-shrink-0">
        <Sliders size={13} className="text-indigo-400" />
        <span className="hidden sm:inline">Preview Mode:</span>
      </div>

      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {states.map((st) => {
          const Icon = st.icon;
          const isActive = currentCase === st.id;
          return (
            <button
              key={st.id}
              onClick={() => onChange(st.id)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all flex-shrink-0"
              style={{
                background: isActive ? "rgba(79, 70, 229, 0.2)" : "rgba(255,255,255,0.03)",
                border: `1px solid ${isActive ? "rgba(79, 70, 229, 0.4)" : "#27272a"}`,
                color: isActive ? "#fafafa" : "#a1a1aa",
              }}
              aria-label={`Switch to ${st.label} mode`}
            >
              <Icon size={12} color={st.color} />
              <span>{st.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
