"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

// Sabtu, 24 Oktober 2026 pukul 09.00 WIB (UTC+7)
const TARGET = new Date("2026-10-24T09:00:00+07:00").getTime();

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number };

function getTimeLeft(): TimeLeft | null {
  const diff = TARGET - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1000),
  };
}

export default function HeroCountdown() {
  const [isMounted, setIsMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setIsMounted(true);
    setTimeLeft(getTimeLeft());
    const interval = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  const units = timeLeft
    ? [
        { label: "hari", value: timeLeft.days },
        { label: "jam", value: timeLeft.hours },
        { label: "menit", value: timeLeft.minutes },
        { label: "detik", value: timeLeft.seconds },
      ]
    : [];

  return (
    <section id="countdown" className="px-4 sm:px-6 pt-10 sm:pt-16 pb-20 sm:pb-28">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-7 order-2 lg:order-1">
          <p className="text-sm font-medium text-maroon">Farewell Departemen Ristek · HIMSI Fasilkom Unsri</p>

          <h1 className="mt-4 font-serif text-5xl sm:text-6xl lg:text-7xl leading-[0.98] tracking-tight">
            Satu periode selesai.
            <span className="block italic text-maroon">Ayo kumpul sekali lagi.</span>
          </h1>

          <p className="mt-6 text-lg text-ink-soft leading-relaxed max-w-xl">
            Setahun rapat malam, proker, dan gorengan patungan di kantin Fasilkom.
            Sebelum kepengurusan ditutup, kita rayakan bareng 20 orang yang
            menjalaninya.
          </p>

          <dl className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-px bg-line border border-line rounded-lg overflow-hidden text-sm">
            <div className="bg-card px-4 py-3">
              <dt className="text-ink-soft text-xs">Hari</dt>
              <dd className="font-semibold mt-0.5">Sabtu, 24 Oktober 2026</dd>
            </div>
            <div className="bg-card px-4 py-3">
              <dt className="text-ink-soft text-xs">Jam</dt>
              <dd className="font-semibold mt-0.5 tabular-nums">09.00 – 15.00 WIB</dd>
            </div>
            <div className="bg-card px-4 py-3">
              <dt className="text-ink-soft text-xs">Tempat</dt>
              <dd className="font-semibold mt-0.5">Fasilkom Unsri, Indralaya</dd>
            </div>
          </dl>

          <div className="mt-8" aria-live="off">
            {isMounted && !timeLeft ? (
              <p className="font-serif text-2xl text-maroon">
                Acaranya sedang berlangsung. Sampai ketemu di sana!
              </p>
            ) : (
              <div className="flex items-end gap-5 sm:gap-8">
                {(units.length ? units : ["hari", "jam", "menit", "detik"].map((label) => ({ label, value: -1 }))).map(
                  (u) => (
                    <div key={u.label}>
                      <div className="font-serif text-5xl sm:text-6xl tabular-nums leading-none">
                        {u.value < 0 ? "--" : String(u.value).padStart(2, "0")}
                      </div>
                      <div className="mt-2 text-xs text-ink-soft">{u.label}</div>
                    </div>
                  )
                )}
                <p className="hidden sm:block pb-6 text-sm text-ink-soft">lagi</p>
              </div>
            )}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href="#secret-form"
              className="px-6 py-3 rounded-full bg-maroon text-paper font-medium hover:bg-maroon-deep transition-colors"
            >
              Tulis pesan anonim
            </a>
            <a href="#rundown" className="font-medium text-ink underline underline-offset-4 decoration-line hover:decoration-maroon">
              Lihat rundown
            </a>
          </div>
        </div>

        <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center">
          <figure className="relative w-full max-w-[400px] bg-card p-3 pb-12 shadow-[0_1px_2px_rgba(43,29,26,0.08),0_12px_32px_-12px_rgba(43,29,26,0.35)] rotate-[1.5deg]">
            <span
              aria-hidden="true"
              className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-gold-soft/60 -rotate-2"
            />
            <div className="relative aspect-square w-full overflow-hidden bg-paper-2">
              <Image
                src="/hero.jpeg"
                alt="Foto bersama pengurus Ristek HIMSI 2026"
                fill
                sizes="(max-width: 1024px) 90vw, 400px"
                className="object-cover"
                priority
              />
            </div>
            <figcaption className="absolute bottom-3 left-0 right-0 text-center font-hand text-2xl text-ink">
              Ristek&apos;26, formasi lengkap
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
