"use client";

import { Info, Code2, ExternalLink } from "lucide-react";
import Link from "next/link";

export function AboutSettings() {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-base font-bold mb-1" style={{ color: "var(--foreground)" }}>
          About ABTalks Redesign
        </h3>
        <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
          60-Day Coding Challenge platform redesign for Indian college students.
        </p>
      </div>

      <div
        className="rounded-2xl p-4 space-y-3"
        style={{ background: "rgba(79, 70, 229, 0.08)", border: "1px solid rgba(79, 70, 229, 0.25)" }}
      >
        <div className="flex items-center gap-2">
          <Code2 size={20} style={{ color: "#818cf8" }} />
          <div>
            <h4 className="text-sm font-bold" style={{ color: "#c7d2fe" }}>
              ABTalks Platform v1.0.0
            </h4>
            <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
              Next.js 16 • React 19 • Framer Motion • Tailwind CSS
            </p>
          </div>
        </div>

        <p className="text-xs leading-relaxed" style={{ color: "var(--foreground)", opacity: 0.85 }}>
          Built mobile-first to help students maintain daily consistency late at night after college. Submitting GitHub commits and LinkedIn posts builds proof-of-work that makes candidates visible to top recruiters.
        </p>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--muted-foreground)" }}>
          Evaluated Application Routes
        </p>

        <div className="space-y-1.5 text-xs">
          <Link
            href="/"
            className="flex items-center justify-between p-3 rounded-xl border border-[var(--border)] bg-white/[0.02] hover:bg-white/[0.05] transition-colors text-indigo-400 font-mono"
          >
            <span>/ (Landing Page)</span>
            <ExternalLink size={13} />
          </Link>

          <Link
            href="/dashboard"
            className="flex items-center justify-between p-3 rounded-xl border border-[var(--border)] bg-white/[0.02] hover:bg-white/[0.05] transition-colors text-indigo-400 font-mono"
          >
            <span>/dashboard (Student Dashboard)</span>
            <ExternalLink size={13} />
          </Link>

          <Link
            href="/day/12"
            className="flex items-center justify-between p-3 rounded-xl border border-[var(--border)] bg-white/[0.02] hover:bg-white/[0.05] transition-colors text-indigo-400 font-mono"
          >
            <span>/day/12 (Challenge Day 12)</span>
            <ExternalLink size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
}
