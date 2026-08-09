"use client";

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
    <div className="w-full bg-[var(--background)] border-b border-[var(--border)] px-4 py-2.5 flex items-center justify-between text-xs overflow-x-auto gap-2">
      <div className="flex items-center gap-1.5 text-[var(--muted-foreground)] font-semibold flex-shrink-0">
        <Sliders size={13} className="text-[var(--primary)]" />
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
                background: isActive ? "var(--primary-glow)" : "var(--surface-fill)",
                border: `1px solid ${isActive ? "var(--primary)" : "var(--border)"}`,
                color: isActive ? "var(--foreground)" : "var(--muted-foreground)",
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
