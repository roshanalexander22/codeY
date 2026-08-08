"use client";

import * as React from "react";
import { Flame, Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  onOpenJoinModal: () => void;
}

export function Navbar({ onOpenJoinModal }: NavbarProps) {
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
          ? "bg-[#09090B]/85 backdrop-blur-md border-b border-[#27272A]/80 py-3 shadow-xl"
          : "bg-transparent py-4 sm:py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-[12px] bg-gradient-to-br from-[#4F46E5] to-[#6366F1] flex items-center justify-center shadow-[0_0_20px_rgba(79,70,229,0.5)] group-hover:scale-105 transition-transform duration-200">
            <Flame className="h-5 w-5 text-white animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base sm:text-lg text-[#FAFAFA] tracking-tight flex items-center gap-1.5">
              ABTalks <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-[#4F46E5]/20 text-[#818CF8] border border-[#4F46E5]/40 font-mono">60DAYS</span>
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs sm:text-sm font-medium text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Button onClick={onOpenJoinModal} variant="primary" size="md" className="gap-2 text-xs sm:text-sm cursor-pointer">
            Start Day 1
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2.5 rounded-xl bg-[#18181B] border border-[#27272A] text-[#FAFAFA] hover:bg-[#27272A] transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#27272A] bg-[#09090B]/95 backdrop-blur-xl px-4 pt-3 pb-5 space-y-3 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-[#A1A1AA] hover:text-[#FAFAFA] py-2 px-3 rounded-lg hover:bg-[#18181B]"
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="pt-2">
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
