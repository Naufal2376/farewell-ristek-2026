import type { Metadata } from "next";
import { Caveat, Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Farewell Ristek 2026 | HIMSI Fasilkom Unsri",
  description:
    "Undangan farewell Departemen Riset dan Teknologi HIMSI Fasilkom Unsri 2026. Sabtu, 24 Oktober 2026, 09.00–15.00 WIB.",
  keywords: [
    "Farewell Ristek",
    "HIMSI Fasilkom Unsri",
    "Ristek 2026",
    "Secret Appreciation",
  ],
  openGraph: {
    title: "Farewell Ristek 2026",
    description: "Sabtu, 24 Oktober 2026 · Fasilkom Unsri Indralaya",
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
      className={`${jakarta.variable} ${fraunces.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink font-sans">
        {children}
      </body>
    </html>
  );
}
