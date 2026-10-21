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

const details = [
  { label: "Tanggal", value: "Sabtu, 24.10.2026" },
  { label: "Waktu", value: "09.00 – 15.00 WIB" },
  { label: "Lokasi", value: "Fasilkom Unsri, Indralaya" },
];

export default function HeroCountdown() {
  const [isMounted, setIsMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setIsMounted(true);
    setTimeLeft(getTimeLeft());
    const interval = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  const units = [
    { label: "hari", value: timeLeft?.days },
    { label: "jam", value: timeLeft?.hours },
    { label: "menit", value: timeLeft?.minutes },
    { label: "detik", value: timeLeft?.seconds },
  ];

  return (
    <section id="countdown" className="px-4 sm:px-6 pt-10 sm:pt-16 pb-20 sm:pb-28">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
        <div className="lg:col-span-7 order-2 lg:order-1">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Farewell · Departemen Riset &amp; Teknologi
          </p>

          <h1 className="mt-4 font-display font-semibold text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight">
            Satu periode
            <br />
            <span className="text-accent">selesai di-deploy.</span>
          </h1>

          <p className="mt-6 text-lg text-muted leading-relaxed max-w-xl">
            Setahun rapat malam, proker, dan gorengan patungan di kantin Fasilkom.
            Sebelum kepengurusan ditutup, kita kumpul sekali lagi bareng 20 orang
            yang menjalaninya.
          </p>

          <dl className="mt-8 grid grid-cols-1 sm:grid-cols-3 border border-line divide-y sm:divide-y-0 sm:divide-x divide-line bg-surface">
            {details.map((d) => (
              <div key={d.label} className="px-4 py-3">
                <dt className="font-mono text-[11px] uppercase tracking-wider text-muted">{d.label}</dt>
                <dd className="mt-1 font-medium">{d.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8">
            <p className="font-mono text-[11px] uppercase tracking-wider text-muted">T-minus</p>
            {isMounted && !timeLeft ? (
              <p className="mt-2 font-display text-2xl text-accent">Acara sedang berlangsung. Sampai ketemu di sana.</p>
            ) : (
              <div className="mt-2 flex items-start font-mono tabular-nums">
                {units.map((u, i) => (
                  <React.Fragment key={u.label}>
                    {i > 0 && <span className="text-3xl sm:text-5xl text-line-strong px-1 sm:px-2">:</span>}
                    <div className="text-center">
                      <div className="text-4xl sm:text-6xl font-medium leading-none">
                        {u.value === undefined ? "--" : String(u.value).padStart(2, "0")}
                      </div>
                      <div className="mt-2 text-[11px] uppercase tracking-wider text-muted">{u.label}</div>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href="#secret-form"
              className="px-6 py-3 bg-accent text-bg font-semibold hover:bg-accent-soft transition-colors"
            >
              Tulis pesan anonim
            </a>
            <a href="#rundown" className="font-mono text-sm text-muted hover:text-fg transition-colors">
              Lihat rundown →
            </a>
          </div>
        </div>

        <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center">
          <figure className="w-full max-w-[420px]">
            <div className="hud-corners border border-line p-2 bg-surface">
              <div className="relative aspect-square w-full overflow-hidden bg-surface-2">
                <Image
                  src="/hero.jpeg"
                  alt="Foto bersama pengurus Ristek HIMSI 2026"
                  fill
                  sizes="(max-width: 1024px) 90vw, 420px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            <figcaption className="mt-3 flex justify-between font-mono text-[11px] uppercase tracking-wider text-muted">
              <span>Ristek&apos;26 · formasi lengkap</span>
              <span>20 orang</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
