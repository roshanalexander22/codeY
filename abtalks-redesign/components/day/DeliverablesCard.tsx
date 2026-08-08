"use client";

import { motion } from "framer-motion";
import { GitBranch, GitCommitHorizontal, Link2, Package, Terminal } from "lucide-react";

interface Deliverable {
  type: string;
  label: string;
  icon: string;
}

interface DeliverablesCardProps {
  deliverables: Deliverable[];
}

const iconMap: Record<string, React.ElementType> = {
  Github: GitBranch,
  GitCommit: GitCommitHorizontal,
  Linkedin: Link2,
  Terminal,
  Package,
};

export function DeliverablesCard({ deliverables }: DeliverablesCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut", delay: 0.2 }}
      className="px-4 py-2"
    >
      <div className="card p-5">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <div
            className="w-7 h-7 rounded-xl flex items-center justify-center"
            style={{
              background: "rgba(245, 158, 11, 0.12)",
              border: "1px solid rgba(245, 158, 11, 0.3)",
            }}
          >
            <Package size={14} style={{ color: "#fbbf24" }} />
          </div>
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "#fbbf24", letterSpacing: "0.1em" }}
          >
            What to Deliver
          </span>
        </div>

        {/* Deliverables */}
        <div className="space-y-3">
          {deliverables.map((item, index) => {
            const Icon = iconMap[item.icon] ?? Package;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.2, ease: "easeOut", delay: index * 0.06 }}
                className="flex items-center gap-3 rounded-2xl p-3"
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid var(--border)",
                }}
              >
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "rgba(245, 158, 11, 0.1)",
                    border: "1px solid rgba(245, 158, 11, 0.25)",
                  }}
                >
                  <Icon size={15} style={{ color: "#fbbf24" }} />
                </div>
                <span
                  className="text-sm"
                  style={{ color: "var(--foreground)", opacity: 0.85 }}
                >
                  {item.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
