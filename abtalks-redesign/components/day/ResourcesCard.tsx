"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, BookOpen, Video, FileText, GitBranch, Play } from "lucide-react";

interface Resource {
  type: string;
  title: string;
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
            Resources
          </span>
        </div>

        {/* Resource list */}
        <div className="space-y-2">
          {resources.map((resource, index) => {
            const config = typeConfig[resource.type] ?? typeConfig.Article;
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
                className="flex items-center gap-3 rounded-2xl p-3 w-full"
                style={{
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid var(--border)",
                  textDecoration: "none",
                  display: "flex",
                }}
              >
                {/* Icon */}
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: config.bg }}
                >
                  <Icon size={14} style={{ color: config.color }} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p
                    className="text-sm font-medium truncate"
                    style={{ color: "var(--foreground)" }}
                  >
                    {resource.title}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span
                      className="text-xs"
                      style={{
                        color: config.color,
                        background: config.bg,
                        padding: "2px 8px",
                        borderRadius: "999px",
                      }}
                    >
                      {resource.type}
                    </span>
                    <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                      {resource.duration}
                    </span>
                  </div>
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
