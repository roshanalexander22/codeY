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
    <div className="border border-[#27272A] rounded-[20px] bg-[#18181B] overflow-hidden transition-all duration-300">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left font-semibold text-[#FAFAFA] text-base md:text-lg hover:text-[#818CF8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]"
      >
        <span>{question}</span>
        <div
          className={cn(
            "h-8 w-8 rounded-full bg-[#27272A] flex items-center justify-center transition-transform duration-300 shrink-0 ml-4",
            isOpen && "rotate-180 bg-[#4F46E5]/20 text-[#818CF8]"
          )}
        >
          <ChevronDown className="h-4 w-4" />
        </div>
      </button>
      {isOpen && (
        <div className="px-6 pb-6 pt-0 text-[#A1A1AA] text-sm md:text-base leading-relaxed border-t border-[#27272A]/50 mt-1">
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
