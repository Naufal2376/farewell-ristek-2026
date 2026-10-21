"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Play, Sparkles, Volume2, ArrowRight, PartyPopper } from "lucide-react";
import confetti from "canvas-confetti";

interface SplashScreenProps {
  onOpen: () => void;
  isOpen: boolean;
}

export default function SplashScreen({ onOpen, isOpen }: SplashScreenProps) {
  const [lines, setLines] = useState<string[]>([]);
  const [isTypingDone, setIsTypingDone] = useState(false);

  const terminalSequence = [
    { text: "$ git checkout -b farewell/celebration-2026", delay: 200 },
    { text: "> Switched to branch 'farewell/celebration-2026' [Status: READY TO PARTY 🎉]", delay: 600 },
    { text: "$ git log -1 --pretty=format:'\"%s\"'", delay: 1100 },
    { text: "> \"Final chapter of Ristek HIMSI 2026: Mission accomplished with love & tawa 💙\"", delay: 1600 },
    { text: "$ ./run_farewell_party.exe --vibe=meriah --confetti=true", delay: 2200 },
    { text: "> [OK] 365 hari penuh canda tawa, rapat malam & kenangan manis loaded (100%)", delay: 2700 },
    { text: "> [OK] Golden Ristek Emblem decrypted. Secret vault ready.", delay: 3200 },
    { text: "> Undangan resmi siap diluncurkan! Klik tombol di bawah untuk rayakan...", delay: 3600 },
  ];

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];
    terminalSequence.forEach(({ text, delay }) => {
      const t = setTimeout(() => {
        setLines((prev) => [...prev, text]);
      }, delay);
      timeouts.push(t);
    });

    const finishTimeout = setTimeout(() => {
      setIsTypingDone(true);
    }, 3900);
    timeouts.push(finishTimeout);

    return () => timeouts.forEach(clearTimeout);
  }, []);

  const handleLaunch = () => {
    try {
      // Big celebratory multi-angle confetti explosion
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6, x: 0.3 },
        colors: ["#F59E0B", "#FBBF24", "#38BDF8", "#F43F5E", "#10B981"],
      });
      setTimeout(() => {
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.6, x: 0.7 },
          colors: ["#F59E0B", "#FBBF24", "#38BDF8", "#F43F5E", "#10B981"],
        });
      }, 200);
    } catch {
      // ignore
    }
    onOpen();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05, filter: "blur(12px)" }}
        transition={{ duration: 0.65, ease: "easeInOut" }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#050814]/95 backdrop-blur-2xl p-4 sm:p-6 overflow-hidden"
      >
        {/* Festive Golden & Party Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-gradient-to-tr from-amber-500/25 via-yellow-400/20 to-blue-600/20 rounded-full blur-[130px] pointer-events-none animate-pulse-glow" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-rose-500/15 rounded-full blur-[100px] pointer-events-none" />

        {/* Terminal Window Box */}
        <div className="relative w-full max-w-2xl bg-[#080C1D] border border-amber-500/30 rounded-3xl shadow-2xl shadow-amber-950/30 overflow-hidden flex flex-col">
          {/* Terminal Titlebar with Logo */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#0B1328] border-b border-amber-500/20">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block shadow-sm shadow-rose-500/50" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block shadow-sm shadow-amber-500/50" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block shadow-sm shadow-emerald-500/50" />
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-amber-300 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
              <span>bash - farewell_party_init.sh</span>
            </div>

            <div className="text-[10px] font-mono text-slate-400 hidden sm:flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>RISTEK 2026</span>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-5 sm:p-7 font-mono text-xs sm:text-sm text-slate-300 min-h-[320px] flex flex-col justify-between scanline-bg">
            <div className="space-y-2.5">
              {/* Top status bar inside terminal */}
              <div className="text-slate-400 text-xs pb-2 border-b border-slate-800/80 flex items-center justify-between">
                <span className="text-amber-400 font-bold flex items-center gap-1.5">
                  <PartyPopper className="w-3.5 h-3.5 text-amber-400" />
                  Ristek HIMSI Fasilkom Unsri &bull; Farewell System
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">
                  LIVE READY
                </span>
              </div>

              {/* Log lines */}
              {lines.map((line, idx) => {
                const isCommand = line.startsWith("$");
                const isSuccess = line.includes("[OK]");
                const isQuote = line.includes("Final chapter");

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`leading-relaxed ${
                      isCommand
                        ? "text-amber-400 font-semibold"
                        : isSuccess
                        ? "text-emerald-400 font-medium"
                        : isQuote
                        ? "text-cyan-300 italic"
                        : "text-slate-300"
                    }`}
                  >
                    {line}
                  </motion.div>
                );
              })}

              {/* Blinking cursor */}
              <div className="flex items-center gap-1.5 text-slate-400 pt-1">
                <span className="text-amber-400">$</span>
                <span className="inline-block w-2.5 h-4 bg-amber-400 animate-blink" />
              </div>
            </div>

            {/* Emblem Reveal & Launch Action Section */}
            <div className="pt-5 mt-4 border-t border-slate-800/90 flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Left Logo preview */}
              <div className="flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500/30 to-yellow-400/20 border border-amber-400/50 p-1 flex items-center justify-center">
                  <Image
                    src="/logo.png"
                    alt="Logo Ristek"
                    width={36}
                    height={36}
                    className="object-contain filter drop-shadow-md animate-pulse"
                  />
                </div>
                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-1.5 text-amber-300 font-sans text-xs font-semibold">
                    <Volume2 className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                    <span>Lagu Kenangan Auto-play</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">
                    for real this time &bull; ribs
                  </span>
                </div>
              </div>

              {/* Launch Button */}
              <button
                onClick={handleLaunch}
                className="w-full sm:w-auto relative group overflow-hidden px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-slate-950 font-sans font-extrabold text-sm shadow-xl shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <PartyPopper className="w-4 h-4 fill-slate-950 animate-bounce" />
                <span>Buka Undangan Farewell Party!</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
