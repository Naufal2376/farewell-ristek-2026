"use client";

import React from "react";
import Image from "next/image";
import { Heart, ArrowUp, Sparkles, PartyPopper } from "lucide-react";
import confetti from "canvas-confetti";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.9 },
        colors: ["#F59E0B", "#FBBF24", "#38BDF8", "#F43F5E"],
      });
    } catch {
      // ignore
    }
  };

  return (
    <footer className="w-full border-t border-amber-500/20 bg-[#050814] pt-16 pb-12 text-slate-300 font-sans text-xs relative overflow-hidden">
      {/* Ambient footer glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-slate-800/80 text-center md:text-left">
          {/* Brand with Official Golden Emblem */}
          <div className="space-y-3">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 p-0.5 shadow-lg shadow-amber-500/25">
                <div className="w-full h-full bg-[#080D1D] rounded-[14px] p-1 flex items-center justify-center overflow-hidden">
                  <Image
                    src="/logo.png"
                    alt="Logo Ristek HIMSI"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-mono font-extrabold text-sm sm:text-base text-white tracking-wider flex items-center gap-2">
                  DEPARTEMEN RISET & TEKNOLOGI
                  <span className="px-1.5 py-0.5 rounded text-[9px] bg-amber-400/20 border border-amber-400/40 text-amber-300">
                    2026
                  </span>
                </span>
                <span className="text-slate-400 text-xs font-mono">
                  HIMSI Fasilkom Universitas Sriwijaya
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-xs max-w-md font-sans leading-relaxed">
              Sebuah arsip digital perpisahan penuh cinta, tawa, dan rasa syukur.
              Terima kasih untuk setiap baris kode, rapat malam, dan kebersamaan satu periode!
            </p>

            <p className="text-amber-300/90 font-mono text-[11px] italic flex items-center justify-center md:justify-start gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>&ldquo;No matter where our future compiles, Ristek will always be our root directory.&rdquo;</span>
            </p>
          </div>

          {/* Quick Party Actions & Scroll to top button */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={scrollToTop}
              className="px-4 py-2.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-amber-500/30 text-amber-300 hover:text-white transition-all cursor-pointer flex items-center gap-2 shadow-lg shadow-black/40 hover:scale-105 active:scale-95 text-xs font-mono"
              aria-label="Kembali ke atas dengan confetti"
            >
              <ArrowUp className="w-4 h-4 text-amber-400" />
              <span>Kembali ke Puncak 🚀</span>
            </button>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 font-mono text-[11px]">
          <div>
            &copy; 2026 Farewell Ristek HIMSI Fasilkom Unsri. All memories compiled successfully.
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <span>Dibuat dengan rasa bangga & cinta</span>
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 inline animate-pulse" />
            <span>oleh Keluarga Ristek 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
