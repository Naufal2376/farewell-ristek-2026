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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://farewell-ristek-2026.vercel.app"),
  title: "Farewell Ristek 2026 | HIMSI Fasilkom Unsri",
  description:
    "Undangan farewell Departemen Riset dan Teknologi HIMSI Fasilkom Unsri 2026. Sabtu, 24 Oktober 2026, 09.00–15.00 WIB.",
  keywords: [
    "Farewell Ristek",
    "HIMSI Fasilkom Unsri",
    "Ristek 2026",
    "Pesan Anonim",
  ],
  openGraph: {
    title: "Farewell Ristek 2026",
    description: "Sabtu, 24 Oktober 2026 · 09.00–15.05 WIB",
    type: "website",
    images: [
      {
        url: "/hero.jpeg",
        width: 1200,
        height: 630,
        alt: "Farewell Ristek HIMSI 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Farewell Ristek 2026",
    description: "Sabtu, 24 Oktober 2026 · 09.00–15.05 WIB",
    images: ["/hero.jpeg"],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-fg font-sans">
        {children}
      </body>
    </html>
  );
}
