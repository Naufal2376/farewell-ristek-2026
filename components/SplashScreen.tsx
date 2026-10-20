"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Play, Sparkles, Volume2, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";

interface SplashScreenProps {
  onOpen: () => void;
  isOpen: boolean;
}

export default function SplashScreen({ onOpen, isOpen }: SplashScreenProps) {
  const [lines, setLines] = useState<string[]>([]);
  const [isTypingDone, setIsTypingDone] = useState(false);

  const terminalSequence = [
    { text: "$ git status", delay: 200 },
    { text: "> On branch main: Ristek HIMSI Fasilkom Unsri 2026", delay: 600 },
    { text: "$ git log -1 --pretty=format:'\"%s\"'", delay: 1100 },
    { text: "> \"Final chapter of Ristek HIMSI 2026: Mission accomplished with love 💙\"", delay: 1600 },
    { text: "$ ./run_farewell_party.exe --mode=nostalgia", delay: 2200 },
    { text: "> [OK] 365 days of code, late-night discord, and laughter loaded (100%)", delay: 2800 },
    { text: "> [OK] Secret appreciation vault decrypted successfully.", delay: 3300 },
    { text: "> Invitation ready. Waiting for user execution signal...", delay: 3700 },
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
    }, 4000);
    timeouts.push(finishTimeout);

    return () => timeouts.forEach(clearTimeout);
  }, []);

  const handleLaunch = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#38BDF8", "#F59E0B", "#818CF8", "#F472B6"],
      });
    } catch {
      // ignore in environments without canvas
    }
    onOpen();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, y: -40, filter: "blur(10px)" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#050814]/95 backdrop-blur-xl p-4 sm:p-6 overflow-hidden"
      >
        {/* Ambient background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Terminal Window Box */}
        <div className="relative w-full max-w-2xl bg-[#090D1E] border border-slate-700/60 rounded-2xl shadow-2xl shadow-blue-950/40 overflow-hidden flex flex-col">
          {/* Terminal Titlebar */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#0D1429] border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block shadow-sm shadow-rose-500/50" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block shadow-sm shadow-amber-500/50" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block shadow-sm shadow-emerald-500/50" />
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <Terminal className="w-3.5 h-3.5 text-blue-400" />
              <span>bash - ristek_farewell_init.sh</span>
            </div>
            <div className="text-[10px] font-mono text-slate-500 hidden sm:block">
              v2026.final
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-5 sm:p-6 font-mono text-xs sm:text-sm text-slate-300 min-h-[260px] sm:min-h-[300px] flex flex-col justify-between scanline-bg">
            <div className="space-y-2.5">
              <div className="text-slate-500 text-xs pb-1 border-b border-slate-800/80 flex items-center justify-between">
                <span>Ristek HIMSI Fasilkom Unsri &bull; System Boot</span>
                <span className="text-blue-400">Ready</span>
              </div>

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
                        ? "text-emerald-400"
                        : isQuote
                        ? "text-cyan-300 italic"
                        : "text-slate-400"
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

            {/* Launch Action Section */}
            <div className="pt-6 mt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-slate-400 text-xs">
                <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" />
                <span>BGM & ambient audio auto-start on click</span>
              </div>

              <button
                onClick={handleLaunch}
                className="w-full sm:w-auto relative group overflow-hidden px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-500 text-white font-sans font-semibold text-sm shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Run farewell_party.exe</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
