"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function Dialog({
  isOpen,
  onClose,
  title,
  description,
  children,
}: DialogProps) {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      {/* Content Container */}
      <div className="relative w-full max-w-lg bg-[#18181B] border border-[#27272A] rounded-[24px] p-6 sm:p-8 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8),0_0_30px_rgba(79,70,229,0.2)] z-10 overflow-hidden">
        {/* Top close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-[#27272A] transition-colors focus:outline-none"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#FAFAFA] tracking-tight">{title}</h2>
          {description && (
            <p className="text-sm text-[#A1A1AA] mt-1.5 leading-relaxed">{description}</p>
          )}
        </div>

        {children}
      </div>
    </div>
  );
}
