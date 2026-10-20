import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Ristek Wrapped & Farewell Invitation 2026 | HIMSI Fasilkom Unsri",
  description:
    "Undangan digital interaktif, Ristek Wrapped, countdown menuju 24 Oktober 2026, secret appreciation, dan arsip kenangan Departemen Riset dan Teknologi HIMSI Fasilkom Unsri 2026.",
  keywords: [
    "Farewell Ristek",
    "HIMSI Fasilkom Unsri",
    "Ristek 2026",
    "Ristek Wrapped",
    "Secret Appreciation",
  ],
  openGraph: {
    title: "Ristek Wrapped & Farewell Invitation 2026",
    description: "Final chapter of Departemen Riset dan Teknologi HIMSI Fasilkom Unsri 2026.",
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
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#070B19] text-slate-100 selection:bg-amber-400 selection:text-slate-950 font-sans">
        {children}
      </body>
    </html>
  );
}
