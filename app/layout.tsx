import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import SyncStatusBadge from "./components/SyncStatusBadge";
import { getAppSettings } from "@/src/services/app-settings";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "World Cup Tracker 2026",
    template: "%s | World Cup Tracker",
  },
  description:
    "Follow FIFA World Cup 2026 matches, standings, brackets, teams and live scores.",
  applicationName: "World Cup Tracker",
  keywords: [
    "World Cup",
    "FIFA",
    "Football",
    "Soccer",
    "World Cup 2026",
    "Live Scores",
    "Standings",
    "Bracket",
  ],
  openGraph: {
    title: "World Cup Tracker 2026",
    description:
      "Follow FIFA World Cup 2026 matches, standings, brackets, teams and live scores.",
    siteName: "World Cup Tracker",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const appSettings = await getAppSettings();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}

        <SyncStatusBadge
          lastSynced={appSettings?.lastSyncedAt ?? null}
        />
      </body>
    </html>
  );
}