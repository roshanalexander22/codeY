import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ABTalks — 60-Day Coding Challenge",
  description:
    "Build every day. Prove it publicly. ABTalks is a 60-day coding challenge for Indian college students to build consistency and get noticed by recruiters.",
  keywords: ["coding challenge", "ABTalks", "60 day challenge", "Indian students", "programming"],
  authors: [{ name: "ABTalks" }],
  openGraph: {
    title: "ABTalks — 60-Day Coding Challenge",
    description: "Build every day. Prove it publicly.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#09090B",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ background: "var(--background)", color: "var(--foreground)" }}
      >
        <ThemeProvider>
          {children}
          <Toaster
            theme="dark"
            toastOptions={{
              style: {
                background: "var(--card)",
                border: "1px solid var(--border)",
                color: "var(--foreground)",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
