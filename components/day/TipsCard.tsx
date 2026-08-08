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
  const [expanded, setExpanded] = useState(true);
  const [activeTipIndex, setActiveTipIndex] = useState<number | null>(0);

  const toggleTip = (index: number) => {
    setActiveTipIndex((prev) => (prev === index ? null : index));
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
          className="w-full flex items-center justify-between p-5 text-left"
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
              Mentor Advice
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
              <div className="px-5 pb-5 space-y-2.5">
                <hr className="divider mb-4" />
                {tips.map((tip, index) => {
                  const isOpen = activeTipIndex === index;

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, ease: "easeOut", delay: index * 0.05 }}
                      className="rounded-2xl overflow-hidden transition-colors"
                      style={{
                        background: isOpen ? "rgba(245, 158, 11, 0.07)" : "rgba(255, 255, 255, 0.02)",
                        border: `1px solid ${isOpen ? "rgba(245, 158, 11, 0.3)" : "var(--border)"}`,
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => toggleTip(index)}
                        className="w-full flex items-center justify-between p-3.5 text-left"
                        style={{ background: "transparent", border: "none", cursor: "pointer" }}
                      >
                        <div className="flex items-center gap-2 min-w-0 pr-2">
                          <div
                            className="w-5 h-5 rounded-full flex items-center justify-center text-[0.65rem] font-bold flex-shrink-0"
                            style={{
                              background: "rgba(245, 158, 11, 0.25)",
                              color: "#fbbf24",
                            }}
                          >
                            {tip.mentor.charAt(0)}
                          </div>
                          <span className="text-xs font-semibold truncate" style={{ color: "#fbbf24" }}>
                            {tip.mentor}
                          </span>
                        </div>
                        <ChevronDown
                          size={14}
                          className="transition-transform duration-200"
                          style={{
                            color: "var(--muted-foreground)",
                            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                            flexShrink: 0,
                          }}
                        />
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="px-4 pb-4 text-sm leading-relaxed"
                            style={{ color: "var(--foreground)", opacity: 0.9 }}
                          >
                            &ldquo;{tip.text}&rdquo;
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
