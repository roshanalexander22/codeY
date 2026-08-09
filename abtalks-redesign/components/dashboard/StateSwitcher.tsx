"use client";

import { motion } from "framer-motion";
import { EdgeCase } from "@/data/dashboard";
import { Sparkles, AlertTriangle, UserCircle2, CheckCircle2, FlaskConical } from "lucide-react";

interface StateSwitcherProps {
  currentCase: EdgeCase;
  onChange: (edgeCase: EdgeCase) => void;
}

const states: { id: EdgeCase; label: string; icon: React.ElementType; color: string }[] = [
  { id: "normal", label: "Day 12 (Normal)", icon: CheckCircle2, color: "#818cf8" },
  { id: "firstDay", label: "First Day", icon: Sparkles, color: "#4ade80" },
  { id: "missedDay", label: "Missed Day", icon: AlertTriangle, color: "#f87171" },
  { id: "emptyProfile", label: "Empty Profile", icon: UserCircle2, color: "#fbbf24" },
];

export function StateSwitcher({ currentCase, onChange }: StateSwitcherProps) {
  return (
    <div
      className="w-full px-3 py-2 flex items-center gap-3 overflow-x-auto no-scrollbar"
      style={{
        background: "rgba(15, 10, 30, 0.95)",
        borderBottom: "1px solid rgba(79, 70, 229, 0.2)",
      }}
    >
      {/* DEV badge */}
      <div
        className="flex items-center gap-1.5 flex-shrink-0 px-2.5 py-1 rounded-lg"
        style={{
          background: "rgba(79, 70, 229, 0.15)",
          border: "1px solid rgba(79, 70, 229, 0.35)",
        }}
      >
        <FlaskConical size={11} className="text-indigo-400" />
        <span
          className="text-[10px] font-black uppercase tracking-wider"
          style={{ color: "#818cf8", fontFamily: "var(--font-geist-mono), monospace" }}
        >
          DEV
        </span>
      </div>

      {/* State buttons */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {states.map((st) => {
          const Icon = st.icon;
          const isActive = currentCase === st.id;
          return (
            <motion.button
              key={st.id}
              onClick={() => onChange(st.id)}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all flex-shrink-0 whitespace-nowrap"
              style={{
                background: isActive
                  ? `rgba(${
                      st.id === "normal"
                        ? "79, 70, 229"
                        : st.id === "firstDay"
                        ? "34, 197, 94"
                        : st.id === "missedDay"
                        ? "239, 68, 68"
                        : "245, 158, 11"
                    }, 0.15)`
                  : "rgba(255,255,255,0.03)",
                border: `1px solid ${
                  isActive
                    ? `rgba(${
                        st.id === "normal"
                          ? "79, 70, 229"
                          : st.id === "firstDay"
                          ? "34, 197, 94"
                          : st.id === "missedDay"
                          ? "239, 68, 68"
                          : "245, 158, 11"
                      }, 0.4)`
                    : "#27272a"
                }`,
                color: isActive ? "#fafafa" : "#71717a",
              }}
              aria-label={`Switch to ${st.label} state preview`}
            >
              <Icon size={11} color={isActive ? st.color : "#52525b"} />
              <span>{st.label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
