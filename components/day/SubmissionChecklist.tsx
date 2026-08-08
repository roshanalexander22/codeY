"use client";

import { motion } from "framer-motion";
import { ClipboardCheck, CheckCircle2, Circle } from "lucide-react";
import { useState } from "react";

const CHECKLIST_ITEMS = [
  { id: "working", label: "Project runs without errors" },
  { id: "public", label: "GitHub repository is public" },
  { id: "pushed", label: "Latest commit is pushed" },
  { id: "tested", label: "All API endpoints tested" },
  { id: "linkedin", label: "LinkedIn post is published" },
];

export function SubmissionChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggle = (id: string) =>
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));

  const checkedCount = Object.values(checked).filter(Boolean).length;
  const total = CHECKLIST_ITEMS.length;
  const allChecked = checkedCount === total;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut", delay: 0.2 }}
      className="px-4 py-2"
    >
      <div
        className="card p-5"
        style={{
          borderColor: allChecked
            ? "rgba(34, 197, 94, 0.35)"
            : "var(--border)",
          transition: "border-color 0.3s ease",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-xl flex items-center justify-center"
              style={{
                background: allChecked
                  ? "rgba(34, 197, 94, 0.12)"
                  : "rgba(255,255,255,0.05)",
                border: `1px solid ${allChecked ? "rgba(34, 197, 94, 0.3)" : "var(--border)"}`,
                transition: "all 0.3s ease",
              }}
            >
              <ClipboardCheck
                size={14}
                style={{ color: allChecked ? "#4ade80" : "var(--muted-foreground)" }}
              />
            </div>
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{
                color: allChecked ? "#4ade80" : "var(--muted-foreground)",
                letterSpacing: "0.1em",
                transition: "color 0.3s ease",
              }}
            >
              Before You Submit
            </span>
          </div>
          <span
            className="text-xs font-semibold"
            style={{
              color: allChecked ? "#4ade80" : "var(--muted-foreground)",
              transition: "color 0.3s ease",
            }}
          >
            {checkedCount} / {total}
          </span>
        </div>

        {/* Items */}
        <ul className="space-y-2" role="list">
          {CHECKLIST_ITEMS.map((item, index) => {
            const isChecked = !!checked[item.id];
            return (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: index * 0.04 }}
              >
                <button
                  type="button"
                  onClick={() => toggle(item.id)}
                  className="w-full flex items-center gap-3 rounded-xl p-3 text-left"
                  style={{
                    background: isChecked
                      ? "rgba(34, 197, 94, 0.06)"
                      : "rgba(255,255,255,0.02)",
                    border: `1px solid ${isChecked ? "rgba(34,197,94,0.2)" : "var(--border)"}`,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  aria-checked={isChecked}
                  role="checkbox"
                >
                  <motion.div
                    animate={{ scale: isChecked ? [1.2, 1] : 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isChecked ? (
                      <CheckCircle2 size={16} style={{ color: "#4ade80" }} />
                    ) : (
                      <Circle size={16} style={{ color: "var(--muted-foreground)" }} />
                    )}
                  </motion.div>
                  <span
                    className="text-sm"
                    style={{
                      color: isChecked ? "var(--foreground)" : "var(--muted-foreground)",
                      textDecoration: isChecked ? "none" : "none",
                      transition: "color 0.2s ease",
                    }}
                  >
                    {item.label}
                  </span>
                </button>
              </motion.li>
            );
          })}
        </ul>

        {allChecked && (
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs mt-3 text-center font-semibold"
            style={{ color: "#4ade80" }}
          >
            ✓ Ready to submit
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}
