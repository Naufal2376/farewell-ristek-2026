"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, MessageSquareHeart, PartyPopper } from "lucide-react";
import confetti from "canvas-confetti";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Countdown", href: "#countdown" },
    { label: "Ristek Wrapped", href: "#wrapped" },
    { label: "Rundown", href: "#rundown" },
    { label: "Galeri 24 Momen", href: "#galeri" },
    { label: "Boarding Pass", href: "#boarding-pass" },
    { label: "Secret Appreciation", href: "#secret-form" },
  ];

  const handleConfettiPop = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.1 },
        colors: ["#F59E0B", "#38BDF8", "#F43F5E", "#10B981"],
      });
    } catch {
      // ignore
    }
  };

  return (
    <nav className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#060914]/85 border-b border-amber-500/20 shadow-lg shadow-black/40 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand with Official Golden Logo */}
        <Link
          href="#top"
          className="flex items-center gap-3 group cursor-pointer"
        >
          <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl p-0.5 bg-gradient-to-tr from-amber-500/80 via-yellow-400 to-amber-600 shadow-md shadow-amber-500/30 group-hover:scale-105 group-hover:shadow-amber-400/50 transition-all">
            <div className="w-full h-full bg-[#080D1D] rounded-[10px] flex items-center justify-center p-1 overflow-hidden">
              <Image
                src="/logo.png"
                alt="Logo Ristek HIMSI"
                width={36}
                height={36}
                className="object-contain filter drop-shadow group-hover:rotate-3 transition-transform"
                priority
              />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-mono font-extrabold text-sm sm:text-base text-white tracking-wider">
                RISTEK <span className="text-amber-400">2026</span>
              </span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-amber-400/20 border border-amber-400/40 text-amber-300">
                FAREWELL
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono tracking-tight">
              HIMSI Fasilkom Unsri
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-5 text-xs font-mono text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-amber-400 transition-colors py-1 relative group"
            >
              <span>{link.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 group-hover:w-full transition-all duration-200" />
            </a>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-2.5">
          <button
            onClick={handleConfettiPop}
            title="Rayakan dengan confetti!"
            className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-amber-500/30 text-amber-400 hover:text-amber-300 hover:scale-105 active:scale-95 transition-all shadow-sm cursor-pointer"
          >
            <PartyPopper className="w-4 h-4 animate-bounce" />
          </button>

          <a
            href="#secret-form"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-slate-950 font-sans font-bold text-xs shadow-lg shadow-amber-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <MessageSquareHeart className="w-4 h-4 text-slate-950 fill-slate-950" />
            <span>Kirim Pesan</span>
          </a>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={handleConfettiPop}
            className="p-2 rounded-lg bg-slate-900 border border-amber-500/30 text-amber-400"
          >
            <PartyPopper className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-300 hover:text-white bg-slate-900/80 border border-slate-800"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-amber-500/20 bg-[#070B19]/95 px-5 py-4 space-y-3 font-mono text-xs text-slate-300 backdrop-blur-2xl">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 hover:text-amber-400 border-b border-slate-800/50 transition-colors"
            >
              🎉 {link.label}
            </a>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <a
              href="#secret-form"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-slate-950 font-bold text-xs shadow-md"
            >
              <MessageSquareHeart className="w-4 h-4 fill-slate-950" />
              Kirim Secret Appreciation
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
