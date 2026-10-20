"use client";

import React from "react";
import Link from "next/link";
import { Terminal, Heart, Code2, Eye, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full border-t border-slate-800/80 bg-[#050814] pt-14 pb-10 text-slate-400 font-sans text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-10 border-b border-slate-800/80 text-center md:text-left">
          {/* Brand */}
          <div className="space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-amber-400">
                <Terminal className="w-4 h-4" />
              </div>
              <span className="font-mono font-bold text-sm text-white tracking-wider">
                DEPARTEMEN RISAT & TEKNOLOGI
              </span>
            </div>
            <p className="text-slate-400 text-xs max-w-md font-sans">
              HIMSI Fasilkom Universitas Sriwijaya &bull; Periode 2026
            </p>
            <p className="text-amber-400/90 font-mono text-[11px] italic">
              &ldquo;No matter where our future compiles, Ristek will always be our root directory.&rdquo;
            </p>
          </div>

          {/* Quick links & Admin projector mode button */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/baca"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-cyan-500/40 text-cyan-300 hover:text-white hover:border-cyan-400 text-xs font-mono transition-all shadow-sm"
            >
              <Eye className="w-4 h-4 text-cyan-400" />
              <span>Buka Live Read Mode (/baca) 📽️</span>
            </Link>

            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors"
              aria-label="Kembali ke atas"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 font-mono text-[11px]">
          <div>
            &copy; 2026 Farewell Ristek HIMSI. All memories compiled successfully.
          </div>
          <div className="flex items-center gap-1.5">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 inline" />
            <span>by Ristek Family</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
