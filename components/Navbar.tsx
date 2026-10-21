"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Terminal, Menu, X, MessageSquareHeart } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Countdown", href: "#countdown" },
    { label: "Ristek Wrapped", href: "#wrapped" },
    { label: "Rundown", href: "#rundown" },
    { label: "Galeri", href: "#galeri" },
    { label: "Boarding Pass", href: "#boarding-pass" },
    { label: "Secret Appreciation", href: "#secret-form" },
  ];

  return (
    <nav className="sticky top-0 z-30 w-full backdrop-blur-md bg-[#070B19]/80 border-b border-slate-800/80 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link
          href="#top"
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-amber-500 p-0.5 flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#090D1E] rounded-[6px] flex items-center justify-center">
              <Terminal className="w-4 h-4 text-amber-400 group-hover:rotate-6 transition-transform" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-mono font-bold text-sm text-slate-100 tracking-wider flex items-center gap-1.5">
              RISTEK <span className="text-amber-400">2026</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </span>
            <span className="text-[10px] text-slate-400 font-mono tracking-tight -mt-0.5">
              HIMSI Fasilkom Unsri
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-6 text-xs font-mono text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-amber-400 transition-colors py-1"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Action Button */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="#secret-form"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium text-xs shadow-md shadow-blue-600/20 hover:shadow-blue-600/30 transition-all cursor-pointer"
          >
            <MessageSquareHeart className="w-3.5 h-3.5 text-amber-300" />
            <span>Kirim Pesan</span>
          </a>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white bg-slate-800/60"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-slate-800 bg-[#070B19]/95 px-4 py-4 space-y-3 font-mono text-xs text-slate-300 backdrop-blur-xl">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1.5 hover:text-amber-400 transition-colors"
            >
              &gt; {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
            <a
              href="#secret-form"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 py-2 rounded-lg bg-blue-600 text-white font-medium text-xs"
            >
              <MessageSquareHeart className="w-4 h-4 text-amber-300" />
              Kirim Secret Appreciation
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
