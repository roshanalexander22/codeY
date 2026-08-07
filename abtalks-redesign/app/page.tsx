import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ABTalks — 60-Day Coding Challenge for Indian College Students",
  description:
    "Build every day. Prove it publicly. ABTalks is a 60-day coding challenge for Indian college students to build consistency and visibility with recruiters.",
};

export default function LandingPage() {
  return (
    <main
      className="min-h-dvh flex flex-col items-center justify-center px-6 text-center"
      style={{ background: "var(--background)", maxWidth: "480px", margin: "0 auto" }}
    >
      {/* Logo */}
      <div className="mb-6">
        <div
          className="w-16 h-16 rounded-3xl mx-auto mb-4 flex items-center justify-center"
          style={{
            background: "var(--primary-glow)",
            border: "2px solid rgba(79, 70, 229, 0.4)",
          }}
        >
          <span className="text-2xl font-black" style={{ color: "#c7d2fe" }}>
            AB
          </span>
        </div>
        <h1 className="text-3xl font-black mb-2" style={{ color: "var(--foreground)" }}>
          ABTalks
        </h1>
        <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
          60-Day Coding Challenge
        </p>
      </div>

      <div
        className="card p-6 w-full text-left mb-6"
        style={{ borderColor: "rgba(79, 70, 229, 0.25)" }}
      >
        <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
          This is the{" "}
          <span style={{ color: "var(--foreground)", fontWeight: 600 }}>Landing Page</span> —
          to be built by <span style={{ color: "#818cf8", fontWeight: 600 }}>Team Member A</span>.
        </p>
        <div className="mt-4 p-3 rounded-2xl" style={{ background: "rgba(79, 70, 229, 0.08)", border: "1px solid rgba(79, 70, 229, 0.2)" }}>
          <p className="text-xs font-mono" style={{ color: "#818cf8" }}>Route: /</p>
        </div>
      </div>

      <div className="flex flex-col gap-3 w-full">
        <Link
          href="/dashboard"
          className="btn btn-secondary w-full"
          id="nav-to-dashboard"
        >
          → Dashboard
        </Link>
        <Link
          href="/day/12"
          className="btn btn-primary w-full"
          id="nav-to-day12"
        >
          → Day 12 Challenge (Live Demo)
        </Link>
      </div>
    </main>
  );
}
