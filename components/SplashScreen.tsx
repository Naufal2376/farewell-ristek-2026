"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

interface SplashScreenProps {
  onOpen: () => void;
  isOpen: boolean;
}

const LINES = [
  { prompt: true, text: "git log --oneline ristek-2026 | wc -l" },
  { prompt: false, text: "1 periode, 20 orang, 24 momen" },
  { prompt: true, text: 'git tag -a farewell -m "terima kasih, Ristek"' },
];

export default function SplashScreen({ onOpen, isOpen }: SplashScreenProps) {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    const timers = LINES.map((_, i) => setTimeout(() => setVisible(i + 1), 450 + i * 650));
    return () => timers.forEach(clearTimeout);
  }, []);

  const handleLaunch = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        colors: ["#d6a94e", "#f0d08c", "#e7eaf1"],
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
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-bg p-5"
        >
          <div className="w-full max-w-lg">
            <div className="flex items-center gap-4">
              <Image src="/logo.png" alt="Logo Ristek" width={84} height={84} priority />
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">HIMSI Fasilkom Unsri</p>
                <h1 className="font-display font-semibold text-3xl sm:text-4xl leading-tight">
                  Farewell Ristek <span className="text-accent">2026</span>
                </h1>
              </div>
            </div>

            <div className="mt-8 border border-line bg-surface font-mono text-[13px] leading-relaxed">
              <div className="flex items-center justify-between border-b border-line px-4 py-2 text-[11px] text-muted">
                <span>~/ristek</span>
                <span>bash</span>
              </div>
              <div className="px-4 py-4 min-h-[7.5rem] space-y-1.5">
                {LINES.slice(0, visible).map((l) => (
                  <p key={l.text} className={l.prompt ? "text-fg" : "text-muted"}>
                    {l.prompt && <span className="text-accent">$ </span>}
                    {l.text}
                  </p>
                ))}
                {visible >= LINES.length && (
                  <p>
                    <span className="text-accent">$ </span>
                    <span className="inline-block w-[0.6em] h-[1.1em] align-text-bottom bg-accent animate-blink" />
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={handleLaunch}
              className="mt-6 w-full py-3.5 bg-accent text-bg font-semibold hover:bg-accent-soft transition-colors cursor-pointer"
            >
              Buka undangan
            </button>
            <p className="mt-3 text-center font-mono text-[11px] text-muted">
              Musik akan diputar setelah undangan dibuka.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
