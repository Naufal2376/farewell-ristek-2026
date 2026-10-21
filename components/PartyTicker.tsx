"use client";

import React from "react";
import { Sparkles, Heart, Rocket, Code2, PartyPopper } from "lucide-react";

export default function PartyTicker() {
  const items = [
    { text: "FAREWELL RISTEK 2026", icon: <PartyPopper className="w-4 h-4 text-amber-300" /> },
    { text: "365 HARI PENUH TAWA & MEMORI", icon: <Heart className="w-4 h-4 text-rose-400 fill-rose-400" /> },
    { text: "DARI RAPAT PERDANA HINGGA RIZZTEKK METU", icon: <Rocket className="w-4 h-4 text-cyan-400" /> },
    { text: "CODE CLOSED, MEMORIES COMPILED", icon: <Code2 className="w-4 h-4 text-emerald-400" /> },
    { text: "SEE YOU ON TOP KELUARGA RISTEK!", icon: <Sparkles className="w-4 h-4 text-yellow-300" /> },
    { text: "20 PENGURUS • SATU KELUARGA ABADI 💙", icon: <Heart className="w-4 h-4 text-blue-400 fill-blue-400" /> },
  ];

  return (
    <div className="w-full relative overflow-hidden py-3 bg-gradient-to-r from-amber-500/15 via-blue-600/20 to-rose-500/15 border-y border-amber-500/20 backdrop-blur-md">
      {/* Glow edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#070B19] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#070B19] to-transparent z-10 pointer-events-none" />

      {/* Ticker Flex container moving infinitely */}
      <div className="flex select-none whitespace-nowrap animate-party-ticker">
        {[...items, ...items, ...items].map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2.5 mx-5 font-mono text-xs sm:text-sm font-semibold tracking-wider text-slate-200"
          >
            <span>{item.icon}</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-amber-300">
              {item.text}
            </span>
            <span className="text-amber-500/50 text-xs ml-2">&bull;</span>
          </div>
        ))}
      </div>
    </div>
  );
}
