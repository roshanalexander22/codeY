import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
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
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-screen bg-[#09090B] text-[#FAFAFA] flex flex-col font-sans selection:bg-[#4F46E5] selection:text-white">
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#18181B",
              color: "#FAFAFA",
              border: "1px solid #27272A",
              borderRadius: "16px",
            },
          }}
        />
      </body>
    </html>
  );
}
