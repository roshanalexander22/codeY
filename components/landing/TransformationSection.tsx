"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { XCircle, CheckCircle2 } from "lucide-react";

export function TransformationSection() {
  const mindsetShift = [
    {
      before: "Watching endless 10-hour YouTube tutorials",
      after: "Writing 45 mins of production code daily",
    },
    {
      before: "Empty GitHub activity graph with 0 commits",
      after: "Green contribution matrix with 100+ public commits",
    },
    {
      before: "Saying 'I want to build a portfolio someday'",
      after: "Sharing daily proof of work on LinkedIn",
    },
    {
      before: "Postponing projects due to lack of accountability",
      after: "Maintaining an active streak alongside 5,000+ peers",
    },
  ];

  return (
    <section className="py-20 bg-[var(--background)] border-t border-[var(--border)] text-[var(--foreground)] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <Badge variant="primary">The Mindset Shift</Badge>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[var(--foreground)] tracking-tight">
            Stop Studying. Start Shipping.
          </h2>
          <p className="text-sm sm:text-base text-[var(--muted-foreground)] leading-relaxed">
            The difference between passive students and hired engineers isn&apos;t intelligence — it&apos;s daily public execution.
          </p>
        </div>

        {/* Before vs After Contrast Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          
          {/* Before Column */}
          <Card className="bg-[var(--card)] border border-[#EF4444]/40 p-6 space-y-5 relative glass-card">
            <div className="flex items-center gap-2 pb-3 border-b border-[var(--border)]">
              <XCircle className="h-5 w-5 text-[#EF4444]" />
              <h3 className="font-bold text-[var(--foreground)] text-base">Without ABTalks (Tutorial Trap)</h3>
            </div>
            <div className="space-y-3">
              {mindsetShift.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--muted-foreground)]">
                  <XCircle className="h-4 w-4 text-[#EF4444]/70 shrink-0 mt-0.5" />
                  <span>{item.before}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* After Column */}
          <Card className="bg-[var(--card)] border border-[#22C55E]/40 p-6 space-y-5 relative shadow-[0_0_30px_rgba(34,197,94,0.15)] glass-card">
            <div className="flex items-center gap-2 pb-3 border-b border-[var(--border)]">
              <CheckCircle2 className="h-5 w-5 text-[#22C55E]" />
              <h3 className="font-bold text-[var(--foreground)] text-base">With ABTalks 60-Day Challenge</h3>
            </div>
            <div className="space-y-3">
              {mindsetShift.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--foreground)] font-medium">
                  <CheckCircle2 className="h-4 w-4 text-[#22C55E] shrink-0 mt-0.5" />
                  <span>{item.after}</span>
                </div>
              ))}
            </div>
          </Card>

        </div>

      </div>
    </section>
  );
}
