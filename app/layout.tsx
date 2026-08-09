import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { ProfileProvider } from "@/context/ProfileContext";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ABTalks — Build in Public. Become Impossible to Ignore.",
  description:
    "Join the 60-Day ABTalks Coding Challenge. Build daily, share your GitHub commits, gain recruiter visibility, and transform your tech career.",
  keywords: [
    "60-day challenge",
    "build in public",
    "coding streak",
    "developer portfolio",
    "software engineer",
    "ABTalks",
  ],
  authors: [{ name: "ABTalks Community" }],
  openGraph: {
    title: "ABTalks — Build in Public. Become Impossible to Ignore.",
    description:
      "Join 5,000+ developers committing code daily in the 60-Day ABTalks Challenge.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <body
        className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col font-sans selection:bg-[var(--primary)] selection:text-white"
        suppressHydrationWarning
      >
        {/* Inline blocking script: apply dark theme BEFORE React hydration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=JSON.parse(localStorage.getItem('abtalks_user_preferences_v1')||'{}');var r=document.documentElement;r.classList.remove('light');r.classList.add('dark');if(s.accentColor){r.setAttribute('data-accent',s.accentColor);}else{r.setAttribute('data-accent','indigo');}}catch(e){}})();`,
          }}
        />
        <ThemeProvider>
          <ProfileProvider>
            {children}
            <Toaster
              position="bottom-right"
              toastOptions={{
                style: {
                  background: "var(--card)",
                  color: "var(--foreground)",
                  border: "1px solid var(--border)",
                  borderRadius: "16px",
                },
              }}
            />
          </ProfileProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
