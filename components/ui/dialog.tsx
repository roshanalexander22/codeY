"use client";

import * as React from "react";
import { X } from "lucide-react";

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
        className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity"
      />

      {/* Content Container */}
      <div className="relative w-full max-w-lg bg-[var(--card)] text-[var(--foreground)] border border-[var(--border)] rounded-[24px] p-6 sm:p-8 shadow-2xl glass-modal z-10 overflow-hidden">
        {/* Top close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-white/10 transition-colors focus:outline-none"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[var(--foreground)] tracking-tight">{title}</h2>
          {description && (
            <p className="text-sm text-[var(--muted-foreground)] mt-1.5 leading-relaxed">{description}</p>
          )}
        </div>

        {children}
      </div>
    </div>
  );
}
