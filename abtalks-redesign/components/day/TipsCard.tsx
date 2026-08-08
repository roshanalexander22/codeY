"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, ChevronDown } from "lucide-react";
import { useState } from "react";

interface Tip {
  text: string;
  mentor: string;
}

interface TipsCardProps {
  tips: Tip[];
}

export function TipsCard({ tips }: TipsCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [expandedTips, setExpandedTips] = useState<Record<number, boolean>>({});

  const toggleTip = (index: number) => {
    setExpandedTips((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut", delay: 0.25 }}
      className="px-4 py-2"
    >
      <div className="card overflow-hidden">
        {/* Header — toggle */}
        <button
          onClick={() => setExpanded((v) => !v)}
          className="w-full flex items-center justify-between p-5"
          style={{ background: "transparent", border: "none", cursor: "pointer" }}
          aria-expanded={expanded}
          id="tips-toggle"
        >
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-xl flex items-center justify-center"
              style={{
                background: "rgba(245, 158, 11, 0.12)",
                border: "1px solid rgba(245, 158, 11, 0.3)",
              }}
            >
              <Lightbulb size={14} style={{ color: "#fbbf24" }} />
            </div>
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "#fbbf24", letterSpacing: "0.1em" }}
            >
              Mentor Tips
            </span>
            <span
              className="badge badge-warning ml-1"
              style={{ fontSize: "0.65rem" }}
            >
              {tips.length}
            </span>
          </div>
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <ChevronDown size={18} style={{ color: "var(--muted-foreground)" }} />
          </motion.div>
        </button>

        {/* Tips accordion content */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="tips-content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              style={{ overflow: "hidden" }}
            >
              <div className="px-5 pb-5 space-y-3">
                <hr className="divider mb-4" />
                {tips.map((tip, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut", delay: index * 0.06 }}
                    className="rounded-2xl p-4"
                    style={{
                      background: "rgba(245, 158, 11, 0.05)",
                      border: "1px solid rgba(245, 158, 11, 0.2)",
                    }}
                  >
                    <p
                      className="text-sm leading-relaxed mb-3"
                      style={{ color: "var(--foreground)", opacity: 0.9 }}
                    >
                      "{tip.text}"
                    </p>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{
                          background: "rgba(245, 158, 11, 0.25)",
                          color: "#fbbf24",
                        }}
                      >
                        {tip.mentor.charAt(0)}
                      </div>
                      <span className="text-xs font-medium" style={{ color: "#fbbf24" }}>
                        {tip.mentor}
                      </span>
                      <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                        · Mentor
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
