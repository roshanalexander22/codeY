"use client";

import * as React from "react";
import { Flame, Heart } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/icons";

export function Footer() {
  return (
    <footer className="bg-[var(--card)] border-t border-[var(--border)] py-16 text-sm text-[var(--muted-foreground)] transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[var(--border)]">
          
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <a href="#" className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-[10px] bg-[var(--primary)] flex items-center justify-center shadow-[0_0_15px_var(--primary-glow)]">
                <Flame className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-lg text-[var(--foreground)]">ABTalks</span>
            </a>
            <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
              The premier 60-day build-in-public challenge empowering student developers to become impossible to ignore.
            </p>
          </div>

          {/* Track Links */}
          <div className="space-y-3">
            <h4 className="font-semibold text-[var(--foreground)] text-xs uppercase tracking-wider">Tracks</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#how-it-works" className="hover:text-[var(--foreground)] transition-colors">Frontend Engineering</a></li>
              <li><a href="#how-it-works" className="hover:text-[var(--foreground)] transition-colors">Fullstack Web App</a></li>
              <li><a href="#how-it-works" className="hover:text-[var(--foreground)] transition-colors">AI & LLM Integration</a></li>
              <li><a href="#how-it-works" className="hover:text-[var(--foreground)] transition-colors">Cloud & DevOps</a></li>
            </ul>
          </div>

          {/* Community Links */}
          <div className="space-y-3">
            <h4 className="font-semibold text-[var(--foreground)] text-xs uppercase tracking-wider">Community</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#benefits" className="hover:text-[var(--foreground)] transition-colors">Discord Squad</a></li>
              <li><a href="#testimonials" className="hover:text-[var(--foreground)] transition-colors">Talent Directory</a></li>
              <li><a href="#stats" className="hover:text-[var(--foreground)] transition-colors">Leaderboard</a></li>
              <li><a href="#faq" className="hover:text-[var(--foreground)] transition-colors">Guidelines</a></li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-3">
            <h4 className="font-semibold text-[var(--foreground)] text-xs uppercase tracking-wider">Connect</h4>
            <div className="flex items-center gap-3">
              <a href="#" className="h-9 w-9 rounded-xl bg-[var(--background)] border border-[var(--border)] flex items-center justify-center text-[var(--foreground)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors">
                <GithubIcon className="h-4 w-4" />
              </a>
              <a href="#" className="h-9 w-9 rounded-xl bg-[var(--background)] border border-[var(--border)] flex items-center justify-center text-[var(--foreground)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors">
                <LinkedinIcon className="h-4 w-4" />
              </a>
              <a href="#" className="h-9 w-9 rounded-xl bg-[var(--background)] border border-[var(--border)] flex items-center justify-center text-[var(--foreground)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors">
                <TwitterIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs gap-4 text-[var(--muted-foreground)]">
          <p>© {new Date().getFullYear()} ABTalks. Build in Public. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Crafted with <Heart className="h-3.5 w-3.5 text-[#EF4444] fill-current inline" /> for ambitious developers.
          </p>
        </div>
      </div>
    </footer>
  );
}
