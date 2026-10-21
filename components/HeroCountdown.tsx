"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  MessageSquareHeart,
  Ticket,
  ChevronDown,
  PartyPopper,
} from "lucide-react";
import confetti from "canvas-confetti";

export default function HeroCountdown() {
  // Target: Sabtu, 24 Oktober 2026 pukul 09.00 WIB (UTC+7)
  const targetDate = new Date("2026-10-24T09:00:00+07:00").getTime();

  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isPast: boolean;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isPast: true,
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isPast: false,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const handleConfettiBoom = () => {
    try {
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.5 },
        colors: ["#F59E0B", "#FBBF24", "#38BDF8", "#F43F5E", "#10B981"],
      });
    } catch {
      // ignore
    }
  };

  const countdownUnits = [
    { label: "HARI", value: timeLeft.days, emoji: "📅" },
    { label: "JAM", value: timeLeft.hours, emoji: "⏰" },
    { label: "MENIT", value: timeLeft.minutes, emoji: "⏳" },
    { label: "DETIK", value: timeLeft.seconds, emoji: "⚡" },
  ];

  return (
    <section
      id="countdown"
      className="relative pt-8 sm:pt-14 pb-16 sm:pb-24 px-4 sm:px-6 overflow-hidden"
    >
      {/* Ambient background glow & blurred backdrop from hero photo */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[400px] sm:h-[550px] bg-gradient-to-b from-amber-500/15 via-rose-500/10 to-blue-600/10 rounded-full blur-[160px] -z-10 pointer-events-none" />

      {/* Main Hero Container with 2-Column Responsive Split */}
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        {/* Left Column: Headlines, Countdown & CTAs (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
          {/* Top Party Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/40 text-xs font-mono text-amber-300 mb-4 shadow-md backdrop-blur-md"
          >
            <PartyPopper className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-bold tracking-wide">GRAND FAREWELL PARTY 2026</span>
            <span className="text-amber-500/60">&bull;</span>
            <span className="text-slate-200">HIMSI FASILKOM UNSRI</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.15]"
          >
            Code Closed,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-500">
              Memories Forever.
            </span>{" "}
            🎉
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-3.5 sm:mt-4 text-sm sm:text-base text-slate-300 max-w-xl font-sans leading-relaxed"
          >
            Satu periode penuh tawa, begadang rapat Discord, kodingan tuntas, hingga
            patungan gorengan kantin Fasilkom telah selesai di-<em>compile</em>. Mari
            rayakan perpisahan terindah ini bersama seluruh keluarga Ristek!
          </motion.p>

          {/* Event Quick Meta Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-5 flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-2.5 text-xs font-mono text-slate-200"
          >
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-amber-500/30">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-semibold">Sabtu, 24 Okt 2026</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-blue-500/30">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              <span className="font-semibold">09.00 – 15.00 WIB</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-rose-500/30">
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              <span className="font-semibold">Fasilkom Unsri Indralaya</span>
            </div>
          </motion.div>

          {/* Countdown Display Cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 w-full max-w-lg"
          >
            {isMounted && timeLeft.isPast ? (
              <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/25 via-rose-500/25 to-blue-500/25 border-2 border-amber-400/50 backdrop-blur-xl shadow-xl text-center">
                <span className="text-xl sm:text-2xl font-extrabold text-amber-300 font-mono flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  Acara Sedang Berlangsung! 🥳
                </span>
                <p className="text-xs text-slate-200 mt-1 font-mono">
                  Selamat berkumpul rekan-rekan Ristek 2026! Nikmati tawa & nostalgia hari ini.
                </p>
              </div>
            ) : (
              <div className="p-1 rounded-2xl bg-gradient-to-r from-amber-500/40 via-blue-500/30 to-rose-500/40 shadow-xl shadow-amber-950/30">
                <div className="grid grid-cols-4 gap-2 sm:gap-3 p-3 sm:p-4 rounded-[14px] bg-[#090E21]/95 backdrop-blur-xl">
                  {countdownUnits.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-amber-400/60 transition-all"
                    >
                      <div className="text-xl sm:text-3xl font-mono font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-amber-100 to-amber-300 tracking-wider">
                        {isMounted
                          ? String(item.value).padStart(2, "0")
                          : "--"}
                      </div>
                      <div className="mt-1 flex items-center gap-1 text-[9px] sm:text-[11px] font-mono font-bold text-amber-400 tracking-wider">
                        <span className="hidden sm:inline">{item.emoji}</span>
                        <span>{item.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Action CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-3 w-full"
          >
            <button
              onClick={handleConfettiBoom}
              className="px-4 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-slate-950 font-sans font-extrabold text-xs sm:text-sm shadow-lg shadow-amber-500/25 flex items-center justify-center gap-1.5 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <PartyPopper className="w-4 h-4 fill-slate-950" />
              <span>Lempar Confetti! 🎉</span>
            </button>

            <a
              href="#secret-form"
              className="px-4 py-2.5 sm:py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-amber-500/40 text-amber-300 font-sans font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-1.5 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <MessageSquareHeart className="w-4 h-4 text-rose-400 fill-rose-400" />
              <span>Kirim Pesan</span>
            </a>

            <a
              href="#boarding-pass"
              className="px-4 py-2.5 sm:py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-cyan-400/50 text-slate-200 font-sans font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <Ticket className="w-4 h-4 text-cyan-400" />
              <span>Boarding Pass</span>
            </a>
          </motion.div>
        </div>

        {/* Right Column: Featured Ristek'26 Squad Photo Card (5 cols) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-5 flex justify-center order-1 lg:order-2"
        >
          <div className="relative w-full max-w-[360px] sm:max-w-[420px] group">
            {/* Ambient behind-card glow matching photo colors */}
            <div className="absolute -inset-2 bg-gradient-to-tr from-amber-500/30 via-rose-500/25 to-blue-600/30 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 transition-opacity pointer-events-none" />

            {/* Polaroid / Showcase Frame (Preserving 1:1 square ratio) */}
            <div className="relative bg-[#10162B] p-3 sm:p-4 pb-4 sm:pb-5 rounded-3xl border-2 border-amber-400/50 shadow-2xl shadow-black/80 flex flex-col items-center">
              {/* Washi Tape Header */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-5 bg-amber-400/40 backdrop-blur-sm border-l border-r border-amber-300/50 -rotate-1 z-10 shadow" />

              {/* The 1:1 Square Photo Container */}
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner">
                <Image
                  src="/hero.jpeg"
                  alt="Keluarga Besar Ristek HIMSI 2026"
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 420px"
                  className="object-contain sm:object-cover group-hover:scale-105 transition-transform duration-500"
                  priority
                />
              </div>

              {/* Card Bottom Banner with Logo & Official Badge */}
              <div className="mt-3.5 w-full flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 p-0.5 shadow-sm shrink-0">
                    <div className="w-full h-full bg-[#080D1D] rounded-[10px] p-0.5 flex items-center justify-center">
                      <Image
                        src="/logo.png"
                        alt="Logo Ristek"
                        width={24}
                        height={24}
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-mono font-extrabold text-xs text-white tracking-wider flex items-center gap-1">
                      RISTEK &lsquo;26
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      20 Pengurus Komplit
                    </span>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-[10px] font-mono font-bold text-amber-300">
                  OFFICIAL SQUAD
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Down indicator */}
      <div className="mt-12 flex justify-center">
        <a
          href="#wrapped"
          className="text-slate-400 hover:text-amber-300 transition-colors flex flex-col items-center gap-1 text-xs font-mono group"
        >
          <span className="group-hover:tracking-wider transition-all">Lihat Ristek Wrapped 2026</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-amber-400" />
        </a>
      </div>
    </section>
  );
}
