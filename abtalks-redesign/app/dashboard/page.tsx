import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard — ABTalks Challenge",
  description: "Your ABTalks challenge dashboard — track progress, streak, and daily tasks.",
};

export default function DashboardPage() {
  return (
    <main
      className="min-h-dvh flex flex-col items-center justify-center px-6 text-center"
      style={{ background: "var(--background)", maxWidth: "480px", margin: "0 auto" }}
    >
      {/* Header */}
      <div
        className="w-16 h-16 rounded-3xl mx-auto mb-4 flex items-center justify-center"
        style={{
          background: "rgba(34, 197, 94, 0.12)",
          border: "2px solid rgba(34, 197, 94, 0.3)",
        }}
      >
        <span className="text-2xl">📊</span>
      </div>

      <h1 className="text-2xl font-black mb-2" style={{ color: "var(--foreground)" }}>
        Dashboard
      </h1>
      <p className="text-sm mb-6" style={{ color: "var(--muted-foreground)" }}>
        Student progress & streak hub
      </p>

      <div
        className="card p-6 w-full text-left mb-6"
        style={{ borderColor: "rgba(34, 197, 94, 0.25)" }}
      >
        <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
          This is the{" "}
          <span style={{ color: "var(--foreground)", fontWeight: 600 }}>Student Dashboard</span>{" "}
          — to be built by{" "}
          <span style={{ color: "#4ade80", fontWeight: 600 }}>Team Member B</span>.
        </p>
        <div
          className="mt-4 p-3 rounded-2xl"
          style={{
            background: "rgba(34, 197, 94, 0.08)",
            border: "1px solid rgba(34, 197, 94, 0.2)",
          }}
        >
          <p className="text-xs font-mono" style={{ color: "#4ade80" }}>
            Route: /dashboard
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 w-full">
        <Link href="/" className="btn btn-secondary w-full" id="nav-to-home">
          ← Landing Page
        </Link>
        <Link href="/day/12" className="btn btn-primary w-full" id="nav-to-day12-from-dash">
          → Day 12 Challenge (Live Demo)
        </Link>
      </div>
    </main>
  );
}
