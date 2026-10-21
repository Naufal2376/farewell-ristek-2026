"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

interface SplashScreenProps {
  onOpen: () => void;
  isOpen: boolean;
}

const COMMAND = `git tag -a farewell-2026 -m "terima kasih, Ristek"`;

export default function SplashScreen({ onOpen, isOpen }: SplashScreenProps) {
  const [typed, setTyped] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setTyped(COMMAND.slice(0, i));
      if (i >= COMMAND.length) clearInterval(interval);
    }, 38);
    return () => clearInterval(interval);
  }, []);

  const handleLaunch = () => {
    try {
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.65 },
        colors: ["#7c1f24", "#a97a33", "#d9b26a", "#f3ecdf"],
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-maroon-deep text-paper p-6"
        >
          <div className="w-full max-w-md text-center">
            <div className="mx-auto w-32 h-32 rounded-full bg-paper flex items-center justify-center">
              <Image src="/logo.png" alt="Logo Ristek" width={124} height={124} priority />
            </div>

            <p className="mt-6 text-sm text-paper/70">Kepada seluruh pengurus</p>
            <h1 className="mt-1 font-serif text-4xl sm:text-5xl leading-tight">
              Departemen Ristek
              <br />
              HIMSI 2026
            </h1>

            <p
              className="mt-8 font-mono text-[11px] sm:text-xs text-gold-soft text-left bg-black/20 rounded px-3 py-2.5 min-h-[2.75rem] break-all"
              aria-hidden="true"
            >
              <span className="text-paper/50">$ </span>
              {typed}
              <span className="inline-block w-[0.55em] h-[1.1em] align-text-bottom bg-gold-soft ml-0.5 animate-blink" />
            </p>

            <button
              onClick={handleLaunch}
              className="mt-8 w-full sm:w-auto px-8 py-3.5 rounded-full bg-paper text-maroon-deep font-semibold hover:bg-white transition-colors cursor-pointer"
            >
              Buka undangan
            </button>
            <p className="mt-3 text-xs text-paper/60">Musik akan diputar setelah undangan dibuka.</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
