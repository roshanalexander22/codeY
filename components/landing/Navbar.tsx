"use client";

import * as React from "react";
import { Flame, Menu, X, ArrowRight, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  onOpenJoinModal: () => void;
  onOpenSettings?: () => void;
}

export function Navbar({ onOpenJoinModal, onOpenSettings }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "How it Works", href: "#how-it-works" },
    { name: "Day 1 Preview", href: "#day1-preview" },
    { name: "Benefits", href: "#benefits" },
    { name: "Stats", href: "#stats" },
    { name: "Stories", href: "#testimonials" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--card)]/85 backdrop-blur-md border-b border-[var(--border)] py-3 shadow-xl glass-nav"
          : "bg-transparent py-4 sm:py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-[12px] bg-[var(--primary)] flex items-center justify-center shadow-[0_0_20px_var(--primary-glow)] group-hover:scale-105 transition-transform duration-200">
            <Flame className="h-5 w-5 text-white animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base sm:text-lg text-[var(--foreground)] tracking-tight flex items-center gap-1.5">
              ABTalks <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-[var(--primary-glow)] text-[var(--primary)] border border-[var(--primary)] font-mono">60DAYS</span>
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs sm:text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action CTA & Settings */}
        <div className="hidden md:flex items-center gap-3">
          {onOpenSettings && (
            <button
              onClick={onOpenSettings}
              className="p-2.5 rounded-xl bg-[var(--card)] border border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:border-[var(--primary)] transition-colors"
              aria-label="Open settings"
              title="Open Settings"
            >
              <Settings className="h-4 w-4" />
            </button>
          )}

          <Button onClick={onOpenJoinModal} variant="primary" size="md" className="gap-2 text-xs sm:text-sm cursor-pointer">
            Start Day 1
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Mobile Hamburger Toggle & Settings */}
        <div className="md:hidden flex items-center gap-2">
          {onOpenSettings && (
            <button
              onClick={onOpenSettings}
              className="p-2.5 rounded-xl bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] transition-colors"
              aria-label="Open settings"
            >
              <Settings className="h-5 w-5 text-[var(--muted-foreground)]" />
            </button>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[var(--border)] bg-[var(--card)]/95 backdrop-blur-xl px-4 pt-3 pb-5 space-y-3 animate-in slide-in-from-top duration-200 glass-modal">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] py-2 px-3 rounded-lg hover:bg-white/10"
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="pt-2 flex flex-col gap-2">
            <Button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenJoinModal();
              }}
              variant="primary"
              size="lg"
              className="w-full gap-2 text-sm"
            >
              Start Day 1
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
