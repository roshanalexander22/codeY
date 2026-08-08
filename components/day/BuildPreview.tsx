"use client";

import { motion } from "framer-motion";
import { Server, Database, ArrowRight, Layers } from "lucide-react";

export function BuildPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut", delay: 0.12 }}
      className="px-4 py-2"
    >
      <div
        className="card p-5 overflow-hidden"
        style={{ borderColor: "rgba(79, 70, 229, 0.2)" }}
      >
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <div
            className="w-7 h-7 rounded-xl flex items-center justify-center"
            style={{
              background: "rgba(79, 70, 229, 0.12)",
              border: "1px solid rgba(79, 70, 229, 0.3)",
            }}
          >
            <Layers size={14} style={{ color: "#818cf8" }} />
          </div>
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "#818cf8", letterSpacing: "0.1em" }}
          >
            What You&apos;ll Build
          </span>
        </div>

        {/* Architecture mock */}
        <div
          className="rounded-2xl p-4"
          style={{
            background: "rgba(9, 9, 11, 0.6)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {/* Client → API → DB */}
          <div className="flex items-center justify-between gap-2 mb-4">
            {/* Client */}
            <div
              className="flex-1 rounded-xl p-3 text-center"
              style={{
                background: "rgba(99, 102, 241, 0.08)",
                border: "1px solid rgba(99, 102, 241, 0.25)",
              }}
            >
              <p className="text-xs font-semibold" style={{ color: "#818cf8" }}>
                CLIENT
              </p>
              <p className="text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>
                Postman / Frontend
              </p>
            </div>

            <ArrowRight size={14} style={{ color: "var(--muted-foreground)", flexShrink: 0 }} />

            {/* Express API */}
            <div
              className="flex-1 rounded-xl p-3 text-center"
              style={{
                background: "rgba(34, 197, 94, 0.08)",
                border: "1px solid rgba(34, 197, 94, 0.25)",
              }}
            >
              <div className="flex justify-center mb-1">
                <Server size={12} style={{ color: "#4ade80" }} />
              </div>
              <p className="text-xs font-semibold" style={{ color: "#4ade80" }}>
                EXPRESS API
              </p>
              <p className="text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>
                Node.js server
              </p>
            </div>

            <ArrowRight size={14} style={{ color: "var(--muted-foreground)", flexShrink: 0 }} />

            {/* MongoDB */}
            <div
              className="flex-1 rounded-xl p-3 text-center"
              style={{
                background: "rgba(245, 158, 11, 0.08)",
                border: "1px solid rgba(245, 158, 11, 0.25)",
              }}
            >
              <div className="flex justify-center mb-1">
                <Database size={12} style={{ color: "#fbbf24" }} />
              </div>
              <p className="text-xs font-semibold" style={{ color: "#fbbf24" }}>
                MONGODB
              </p>
              <p className="text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>
                Atlas cloud DB
              </p>
            </div>
          </div>

          {/* Routes mock */}
          <div
            className="rounded-xl p-3"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <p className="text-xs font-semibold mb-2" style={{ color: "var(--muted-foreground)" }}>
              /api/todos — 4 endpoints
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { method: "GET", path: "/todos", color: "#4ade80", bg: "rgba(34,197,94,0.1)" },
                { method: "POST", path: "/todos", color: "#818cf8", bg: "rgba(99,102,241,0.1)" },
                { method: "PUT", path: "/todos/:id", color: "#fbbf24", bg: "rgba(245,158,11,0.1)" },
                { method: "DELETE", path: "/todos/:id", color: "#f87171", bg: "rgba(239,68,68,0.1)" },
              ].map((route) => (
                <div
                  key={route.method + route.path}
                  className="flex items-center gap-1.5 rounded-lg px-2 py-1.5"
                  style={{ background: route.bg }}
                >
                  <span
                    className="text-xs font-bold"
                    style={{ color: route.color, minWidth: "40px" }}
                  >
                    {route.method}
                  </span>
                  <span
                    className="text-xs font-mono truncate"
                    style={{ color: "var(--muted-foreground)", fontSize: "0.65rem" }}
                  >
                    {route.path}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="text-xs mt-3" style={{ color: "var(--muted-foreground)" }}>
          By end of today, all 4 endpoints will respond to real requests.
        </p>
      </div>
    </motion.div>
  );
}
