"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

export function AccordionItem({
  question,
  answer,
  isOpen = false,
  onToggle,
}: AccordionItemProps) {
  return (
    <div className="border border-[var(--border)] rounded-[20px] bg-[var(--card)] overflow-hidden transition-all duration-300 glass-card">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left font-semibold text-[var(--foreground)] text-base md:text-lg hover:text-[var(--primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
      >
        <span>{question}</span>
        <div
          className={cn(
            "h-8 w-8 rounded-full bg-white/10 flex items-center justify-center transition-transform duration-300 shrink-0 ml-4",
            isOpen && "rotate-180 bg-[var(--primary-glow)] text-[var(--primary)]"
          )}
        >
          <ChevronDown className="h-4 w-4 text-[var(--foreground)]" />
        </div>
      </button>
      {isOpen && (
        <div className="px-6 pb-6 pt-0 text-[var(--muted-foreground)] text-sm md:text-base leading-relaxed border-t border-[var(--border)] mt-1">
          <p className="pt-4">{answer}</p>
        </div>
      )}
    </div>
  );
}

export function Accordion({
  items,
}: {
  items: Array<{ id: string; question: string; answer: string }>;
}) {
  const [openId, setOpenId] = React.useState<string | null>(items[0]?.id || null);

  return (
    <div className="space-y-4 w-full">
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          question={item.question}
          answer={item.answer}
          isOpen={openId === item.id}
          onToggle={() => setOpenId(openId === item.id ? null : item.id)}
        />
      ))}
    </div>
  );
}
