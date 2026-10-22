"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";

interface SplashScreenProps {
  onOpen: () => void;
  isOpen: boolean;
}

const LINES = [
  { kind: "cmd", text: "git log --oneline ristek-2026 | wc -l" },
  { kind: "out", text: "1 periode · 21 pengurus · 24 momen" },
  { kind: "cmd", text: 'git tag -a farewell -m "terima kasih, Ristek"' },
  { kind: "ok", text: "undangan siap dibuka" },
] as const;

export default function SplashScreen({ onOpen, isOpen }: SplashScreenProps) {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    const timers = LINES.map((_, i) => setTimeout(() => setVisible(i + 1), 400 + i * 550));
    return () => timers.forEach(clearTimeout);
  }, []);

  const handleLaunch = () => {
    try {
      confetti({
        particleCount: 110,
        spread: 90,
        origin: { y: 0.65 },
        colors: ["#fbbf24", "#fde68a", "#60a5fa", "#eef2fa"],
        disableForReducedMotion: true,
      });
    } catch {
      // ignore
    }
    onOpen();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03, filter: "blur(8px)" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-bg p-4 sm:p-6 overflow-hidden"
        >
          <div aria-hidden="true" className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[520px] h-[520px] rounded-full bg-gold/15 blur-[140px]" />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-xl"
          >
            <div className="flex flex-col items-center text-center">
              <Image src="/logo.png" alt="Logo Ristek" width={112} height={112} priority className="drop-shadow-[0_0_30px_rgb(251_191_36/0.25)]" />
              <p className="mt-2 font-mono text-xs uppercase tracking-[0.25em] text-muted">HIMSI Fasilkom Unsri</p>
              <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold tracking-tight">
                Farewell <span className="text-gold-shine">Ristek 2026</span>
              </h1>
            </div>

            <div className="mt-8 rounded-2xl glass overflow-hidden shadow-2xl shadow-black/50">
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-line">
                <span className="w-2.5 h-2.5 rounded-full bg-line-strong" />
                <span className="w-2.5 h-2.5 rounded-full bg-line-strong" />
                <span className="w-2.5 h-2.5 rounded-full bg-line-strong" />
                <span className="ml-2 font-mono text-[11px] text-muted">~/ristek-2026</span>
              </div>
              <div className="p-4 sm:p-5 font-mono text-[12.5px] sm:text-[13px] leading-relaxed min-h-[8.5rem] space-y-1.5">
                {LINES.slice(0, visible).map((l) => (
                  <motion.p
                    key={l.text}
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={l.kind === "cmd" ? "text-fg" : l.kind === "ok" ? "text-gold" : "text-muted"}
                  >
                    {l.kind === "cmd" && <span className="text-blue">❯ </span>}
                    {l.kind === "ok" && "✓ "}
                    {l.text}
                  </motion.p>
                ))}
                {visible >= LINES.length && (
                  <p>
                    <span className="text-blue">❯ </span>
                    <span className="inline-block w-[0.55em] h-[1.1em] align-text-bottom bg-gold animate-blink" />
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={handleLaunch}
              className="group mt-6 w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-b from-gold-soft to-gold text-bg font-bold text-base shadow-[0_10px_40px_-10px_rgb(251_191_36/0.6)] hover:shadow-[0_10px_50px_-8px_rgb(251_191_36/0.8)] transition-shadow cursor-pointer"
            >
              Buka undangan
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
