"use client";

import { motion } from "framer-motion";
import { ExternalLink, BookOpen, FileText, GitBranch, Play, Wrench, Sparkles } from "lucide-react";

interface Resource {
  type: string;
  category?: string;
  title: string;
  description?: string;
  url: string;
  duration: string;
}

interface ResourcesCardProps {
  resources: Resource[];
}

const typeConfig: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  Video: { icon: Play, color: "#f87171", bg: "rgba(239, 68, 68, 0.12)" },
  Docs: { icon: BookOpen, color: "#818cf8", bg: "rgba(79, 70, 229, 0.12)" },
  Article: { icon: FileText, color: "#4ade80", bg: "rgba(34, 197, 94, 0.12)" },
  GitHub: { icon: GitBranch, color: "#A1A1AA", bg: "rgba(161, 161, 170, 0.12)" },
  TOOLS: { icon: Wrench, color: "#fbbf24", bg: "rgba(245, 158, 11, 0.12)" },
  INSPIRE: { icon: Sparkles, color: "#c084fc", bg: "rgba(192, 132, 252, 0.12)" },
};

export function ResourcesCard({ resources }: ResourcesCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut", delay: 0.22 }}
      className="px-4 py-2"
    >
      <div className="card p-5">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <div
            className="w-7 h-7 rounded-xl flex items-center justify-center"
            style={{
              background: "rgba(79, 70, 229, 0.12)",
              border: "1px solid rgba(79, 70, 229, 0.3)",
            }}
          >
            <BookOpen size={14} style={{ color: "#818cf8" }} />
          </div>
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "#818cf8", letterSpacing: "0.1em" }}
          >
            Resources & Reference
          </span>
        </div>

        {/* Resource list */}
        <div className="space-y-2.5">
          {resources.map((resource, index) => {
            const config =
              typeConfig[resource.category ?? ""] ??
              typeConfig[resource.type] ??
              typeConfig.Article;
            const Icon = config.icon;

            return (
              <motion.a
                key={index}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.2, ease: "easeOut", delay: index * 0.05 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-3 rounded-2xl p-3 w-full transition-all duration-200 hover:border-indigo-500/30"
                style={{
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid var(--border)",
                  textDecoration: "none",
                  display: "flex",
                }}
              >
                {/* Icon */}
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: config.bg }}
                >
                  <Icon size={15} style={{ color: config.color }} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p
                      className="text-sm font-medium truncate"
                      style={{ color: "var(--foreground)" }}
                    >
                      {resource.title}
                    </p>
                    {resource.category && (
                      <span
                        className="text-[0.65rem] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider"
                        style={{
                          color: config.color,
                          background: config.bg,
                        }}
                      >
                        {resource.category}
                      </span>
                    )}
                  </div>
                  {resource.description ? (
                    <p className="text-xs truncate mt-0.5 font-medium" style={{ color: "var(--foreground)", opacity: 0.85 }}>
                      {resource.description}
                    </p>
                  ) : (
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                        {resource.duration}
                      </span>
                    </div>
                  )}
                </div>

                {/* Arrow */}
                <ExternalLink
                  size={14}
                  style={{ color: "var(--muted-foreground)", flexShrink: 0 }}
                />
              </motion.a>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
