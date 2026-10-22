"use client";

import React, { useSyncExternalStore, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";

// Sabtu, 24 Oktober 2026 pukul 09.00 WIB (UTC+7)
const TARGET = new Date("2026-10-24T09:00:00+07:00").getTime();

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number };

function subscribeSeconds(callback: () => void) {
  const id = setInterval(callback, 1000);
  return () => clearInterval(id);
}

function getSecondsLeft() {
  const diff = TARGET - Date.now();
  return diff <= 0 ? 0 : Math.floor(diff / 1000);
}

// Satu digit yang bergulir ke atas setiap kali nilainya berubah.
function RollingDigit({ d }: { d: string }) {
  return (
    <span className="relative inline-block w-[0.62em] h-[1em] overflow-hidden align-top">
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={d}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 flex justify-center"
        >
          {d}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const meta = [
  { icon: CalendarDays, text: "Sabtu, 24 Okt 2026" },
  { icon: Clock, text: "09.00 – 15.05 WIB" },
];

export default function HeroCountdown() {
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const secondsLeft = useSyncExternalStore(
    subscribeSeconds,
    getSecondsLeft,
    () => -1
  );

  const timeLeft = useMemo<TimeLeft | null>(() => {
    if (secondsLeft <= 0) return null;
    return {
      days: Math.floor(secondsLeft / 86400),
      hours: Math.floor((secondsLeft % 86400) / 3600),
      minutes: Math.floor((secondsLeft % 3600) / 60),
      seconds: secondsLeft % 60,
    };
  }, [secondsLeft]);

  const isExpired = isClient && secondsLeft === 0;

  const units = [
    { label: "Hari", value: timeLeft?.days },
    { label: "Jam", value: timeLeft?.hours },
    { label: "Menit", value: timeLeft?.minutes },
    { label: "Detik", value: timeLeft?.seconds },
  ];

  return (
    <section id="countdown" className="px-4 sm:px-6 pt-10 sm:pt-16 pb-16 sm:pb-24">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7 order-2 lg:order-1 text-center lg:text-left"
        >
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-gold">
            Grand Farewell · Ristek HIMSI 2026
          </p>

          <h1 className="mt-5 text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.02]">
            Code closed,
            <br />
            <span className="text-gold-shine">memories forever.</span>
          </h1>

          <p className="mt-6 text-lg text-muted leading-relaxed max-w-xl mx-auto lg:mx-0">
            Satu periode penuh cerita, dari rapat, deadline, momen random dan masih banyak lagi.
            Sebelum resmi demis dan sibuk sama jalan masing-masing, yuk kumpul sekali lagi buat
            seru-seruan dan bikin kenangan terakhir bareng keluarga Ristek! 💛
          </p>

          <ul className="mt-7 flex flex-wrap justify-center lg:justify-start gap-2">
            {meta.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-2 px-3.5 py-2 rounded-xl glass text-sm">
                <Icon className="w-4 h-4 text-gold" />
                {text}
              </li>
            ))}
          </ul>

          <div className="mt-8 max-w-lg mx-auto lg:mx-0">
            {isExpired ? (
              <div className="rounded-2xl glass p-5 text-xl font-bold text-gold">
                Acaranya sedang berlangsung. Sampai ketemu di sana!
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-2 sm:gap-3" aria-label="Hitung mundur ke acara">
                {units.map((u) => {
                  const str = u.value === undefined ? "--" : String(u.value).padStart(2, "0");
                  return (
                    <div key={u.label} className="rounded-2xl glass px-2 py-4 sm:py-5 text-center">
                      <div className="font-mono text-3xl sm:text-5xl font-bold leading-none tabular-nums">
                        {str.split("").map((ch, i) => (
                          <RollingDigit key={i} d={ch} />
                        ))}
                      </div>
                      <div className="mt-2 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-muted">
                        {u.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="mt-8 flex flex-wrap justify-center lg:justify-start items-center gap-3">
            <a
              href="#secret-form"
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-b from-gold-soft to-gold text-bg font-bold shadow-[0_10px_30px_-10px_rgb(251_191_36/0.6)] hover:shadow-[0_10px_40px_-8px_rgb(251_191_36/0.8)] transition-shadow"
            >
              Tulis pesan anonim
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#boarding-pass" className="px-6 py-3.5 rounded-xl glass font-semibold hover:border-line-strong transition-colors">
              Ambil tiket
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 order-1 lg:order-2 flex justify-center"
        >
          <figure className="relative w-full max-w-[420px]">
            <div aria-hidden="true" className="absolute -inset-6 rounded-[2rem] bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.18)_0%,transparent_70%)] pointer-events-none" />
            <div className="ring-orbit relative rounded-3xl glass p-3">
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-surface-2">
                <Image
                  src="/hero.jpeg"
                  alt="Foto bersama pengurus Ristek HIMSI 2026"
                  fill
                  sizes="(max-width: 1024px) 90vw, 420px"
                  className="object-cover"
                  priority
                />
              </div>
              <figcaption className="flex items-center justify-between px-2 pt-3 pb-1">
                <span className="flex items-center gap-2">
                  <Image src="/logo.png" alt="" width={32} height={32} />
                  <span className="leading-tight">
                    <span className="block text-sm font-bold">Ristek&apos;26</span>
                    <span className="block text-xs text-muted">Formasi lengkap</span>
                  </span>
                </span>
                <span className="font-mono text-xs text-gold">21 pengurus</span>
              </figcaption>
            </div>
          </figure>
        </motion.div>
      </div>
    </section>
  );
}
