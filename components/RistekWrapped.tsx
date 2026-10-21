"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { RISTEK_MEMBERS_2026 } from "@/components/BoardingPassGenerator";

const SLIDE_MS = 5500;

type StatSlide = {
  kind: "stat";
  kicker: string;
  value: string;
  unit: string;
  caption: string;
  bg: string;
  ink: string;
  shape: "circle" | "stripes" | "rings" | "blob" | "grid";
};

type Slide = { kind: "intro" } | StatSlide | { kind: "outro" };

const SLIDES: Slide[] = [
  { kind: "intro" },
  {
    kind: "stat",
    kicker: "Tahun ini kita rapat malam sebanyak",
    value: "28",
    unit: "kali",
    caption: "Jam favorit: 23.45. \"10 menit lagi kelar kok ges.\"",
    bg: "bg-[#1d4ed8]",
    ink: "text-[#dbeafe]",
    shape: "circle",
  },
  {
    kind: "stat",
    kicker: "Proker yang berhasil kita selesaikan",
    value: "20",
    unit: "proker",
    caption: "8 proker internal Ristek, 12 proker HIMSI. Semuanya tuntas.",
    bg: "bg-[#fbbf24]",
    ink: "text-[#1c1300]",
    shape: "stripes",
  },
  {
    kind: "stat",
    kicker: "Chat terkirim di grup, kurang lebih",
    value: "4.821",
    unit: "pesan",
    caption: "Top keyword: \"Revisi dikit lagi\", \"P\", \"Info link gmeet\", \"Aman gak?\"",
    bg: "bg-[#e11d48]",
    ink: "text-[#ffe4e6]",
    shape: "rings",
  },
  {
    kind: "stat",
    kicker: "Bug dan overthinking yang berhasil di-fix",
    value: "99+",
    unit: "",
    caption: "Error 404: tidur nyenyak not found. Tapi semuanya beres.",
    bg: "bg-[#0f172a]",
    ink: "text-[#a7f3d0]",
    shape: "grid",
  },
  {
    kind: "stat",
    kicker: "Kopi & gorengan patungan di kantin Fasilkom",
    value: "1.024+",
    unit: "porsi",
    caption: "Sponsor utama kepengurusan ini, tanpa MoU.",
    bg: "bg-[#7c3aed]",
    ink: "text-[#ede9fe]",
    shape: "blob",
  },
  { kind: "outro" },
];

function Shape({ shape }: { shape: StatSlide["shape"] }) {
  const common = "absolute pointer-events-none";
  switch (shape) {
    case "circle":
      return <div className={`${common} -right-24 -bottom-24 w-[28rem] h-[28rem] rounded-full bg-white/10`} />;
    case "stripes":
      return (
        <div
          className={`${common} -right-10 top-0 bottom-0 w-1/2 opacity-20 rotate-6`}
          style={{ backgroundImage: "repeating-linear-gradient(90deg, #000 0 14px, transparent 14px 34px)" }}
        />
      );
    case "rings":
      return (
        <div className={`${common} -right-20 -top-20 w-[26rem] h-[26rem]`}>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="absolute rounded-full border-2 border-white/20" style={{ inset: `${i * 2.5}rem` }} />
          ))}
        </div>
      );
    case "grid":
      return (
        <div
          className={`${common} inset-0 opacity-30`}
          style={{
            backgroundImage:
              "linear-gradient(rgb(167 243 208 / 0.25) 1px, transparent 1px), linear-gradient(90deg, rgb(167 243 208 / 0.25) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      );
    case "blob":
      return <div className={`${common} -left-20 -bottom-28 w-[30rem] h-[22rem] rounded-[45%_55%_60%_40%] bg-[#f0abfc]/25 rotate-12`} />;
  }
}

export default function RistekWrapped() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  const reduce = useReducedMotion();
  const playing = inView && !paused && !reduce;

  const go = useCallback((delta: number) => {
    setIndex((i) => (i + delta + SLIDES.length) % SLIDES.length);
    setElapsed(0);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const start = performance.now() - elapsed;
    let raf = 0;
    const tick = (t: number) => {
      const e = t - start;
      if (e >= SLIDE_MS) {
        go(1);
        return;
      }
      setElapsed(e);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // elapsed sengaja tidak jadi dependency: hanya dibaca saat (re)mulai.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, index, go]);

  const slide = SLIDES[index];
  const isStat = slide.kind === "stat";

  return (
    <section id="wrapped" className="px-4 sm:px-6 py-20 sm:py-28">
      <div className="max-w-6xl mx-auto">
        <SectionHeading index="01" label="Wrapped" title={<>Ristek Wrapped <span className="text-gold">2026</span></>}>
          Setahun kepengurusan, diputar ulang. Tap kanan untuk lanjut, kiri untuk kembali.
        </SectionHeading>

        <div
          ref={ref}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") go(1);
            if (e.key === "ArrowLeft") go(-1);
            if (e.key === " ") {
              e.preventDefault();
              setPaused((p) => !p);
            }
          }}
          aria-roledescription="carousel"
          aria-label="Ristek Wrapped 2026"
          className={`relative mx-auto max-w-4xl h-[560px] sm:h-[520px] rounded-[2rem] overflow-hidden select-none shadow-2xl shadow-black/60 transition-colors duration-500 ${
            isStat ? slide.bg : "bg-surface"
          }`}
        >
          {/* Progress */}
          <div className="absolute top-4 inset-x-4 sm:inset-x-6 z-20 flex gap-1.5">
            {SLIDES.map((_, i) => (
              <div key={i} className="h-1 flex-1 rounded-full bg-white/25 overflow-hidden">
                <div
                  className="h-full bg-white"
                  style={{ width: i < index ? "100%" : i === index ? `${(elapsed / SLIDE_MS) * 100}%` : "0%" }}
                />
              </div>
            ))}
          </div>

          <div className="absolute top-8 inset-x-4 sm:inset-x-6 z-20 flex items-center justify-between">
            <span className={`flex items-center gap-2 text-xs font-semibold ${isStat ? slide.ink : "text-fg"}`}>
              <Image src="/logo.png" alt="" width={26} height={26} />
              Ristek Wrapped
            </span>
            <button
              onClick={() => setPaused((p) => !p)}
              className={`p-1.5 rounded-full bg-black/15 hover:bg-black/25 ${isStat ? slide.ink : "text-fg"}`}
              aria-label={paused ? "Lanjutkan" : "Jeda"}
            >
              {paused ? <Play className="w-3.5 h-3.5 fill-current" /> : <Pause className="w-3.5 h-3.5 fill-current" />}
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
              aria-live="polite"
            >
              {slide.kind === "intro" && (
                <div className="relative h-full flex flex-col justify-end p-7 sm:p-12 overflow-hidden">
                  <div aria-hidden="true" className="absolute -top-32 -right-32 w-[30rem] h-[30rem] rounded-full bg-gold/20 blur-3xl" />
                  <motion.div
                    initial={{ rotate: -8, scale: 0.8, opacity: 0 }}
                    animate={{ rotate: -6, scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 120, damping: 14 }}
                    className="absolute right-6 sm:right-14 top-20 sm:top-16 w-40 sm:w-56 aspect-square rounded-3xl overflow-hidden border-4 border-gold shadow-2xl"
                  >
                    <Image src="/hero.jpeg" alt="" fill sizes="224px" className="object-cover" />
                  </motion.div>
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.15 }}
                    className="font-mono text-sm text-gold"
                  >
                    Feb – Okt 2026
                  </motion.p>
                  <motion.h3
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.25 }}
                    className="mt-2 text-5xl sm:text-7xl font-black tracking-tight leading-[0.95]"
                  >
                    Tahun kita,
                    <br />
                    <span className="text-gold">diputar ulang.</span>
                  </motion.h3>
                </div>
              )}

              {slide.kind === "stat" && (
                <div className={`relative h-full flex flex-col justify-center p-7 sm:p-12 overflow-hidden ${slide.ink}`}>
                  <Shape shape={slide.shape} />
                  <motion.p
                    initial={{ y: 16, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="relative text-xl sm:text-3xl font-bold max-w-md leading-tight"
                  >
                    {slide.kicker}
                  </motion.p>
                  <motion.p
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 160, damping: 13 }}
                    className="relative mt-2 origin-left text-[6.5rem] sm:text-[11rem] font-black tracking-tighter leading-none tabular-nums"
                  >
                    {slide.value}
                    {slide.unit && <span className="ml-3 text-2xl sm:text-4xl font-bold tracking-normal">{slide.unit}</span>}
                  </motion.p>
                  <motion.p
                    initial={{ y: 16, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.55 }}
                    className="relative mt-4 text-base sm:text-lg max-w-lg opacity-80"
                  >
                    {slide.caption}
                  </motion.p>
                </div>
              )}

              {slide.kind === "outro" && (
                <div className="relative h-full flex flex-col justify-center p-7 sm:p-12 bg-gold text-[#1c1300] overflow-hidden">
                  <p className="text-xl sm:text-2xl font-bold">Dan yang paling penting,</p>
                  <h3 className="mt-1 text-5xl sm:text-7xl font-black tracking-tight leading-none">20 orang ini.</h3>
                  <ul className="mt-6 flex flex-wrap gap-1.5 sm:gap-2 max-w-3xl">
                    {RISTEK_MEMBERS_2026.map((m, i) => (
                      <motion.li
                        key={m.name}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 + i * 0.04 }}
                        className={`px-2.5 py-1 rounded-full text-xs sm:text-sm font-semibold ${
                          m.division === "bph" ? "bg-[#1c1300] text-gold" : "bg-[#1c1300]/10"
                        }`}
                      >
                        {m.name.replace(/^(M\.|Muhammad|Muhamad)\s/, "")}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Area tap kiri/kanan */}
          <button onClick={() => go(-1)} className="group/prev absolute left-0 top-16 bottom-0 w-1/3 z-10 cursor-pointer" aria-label="Slide sebelumnya">
            <ChevronLeft className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 text-white/0 group-hover/prev:text-white/70 transition-colors" />
          </button>
          <button onClick={() => go(1)} className="group/next absolute right-0 top-16 bottom-0 w-2/3 z-10 cursor-pointer" aria-label="Slide berikutnya">
            <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 text-white/0 group-hover/next:text-white/70 transition-colors" />
          </button>
        </div>

        <p className="mt-4 text-center font-mono text-xs text-muted">
          {index + 1} / {SLIDES.length} · panah kiri/kanan untuk pindah, spasi untuk jeda
        </p>
      </div>
    </section>
  );
}
