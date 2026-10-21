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
  Flame,
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
      className="relative pt-10 sm:pt-16 pb-20 px-4 sm:px-6 overflow-hidden flex flex-col items-center text-center"
    >
      {/* Golden Festive Ambient Radial Lights */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] sm:w-[800px] h-[500px] sm:h-[600px] bg-gradient-to-b from-amber-500/20 via-blue-600/15 to-transparent rounded-full blur-[150px] -z-10 pointer-events-none" />

      {/* Floating Golden Emblem */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative mb-6"
      >
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl p-1 bg-gradient-to-tr from-amber-500 via-yellow-300 to-amber-600 shadow-2xl shadow-amber-500/30 animate-float-slow">
          <div className="w-full h-full bg-[#080D1D] rounded-[22px] p-2 flex items-center justify-center overflow-hidden">
            <Image
              src="/logo.png"
              alt="Logo Resmi Ristek HIMSI 2026"
              width={80}
              height={80}
              className="object-contain filter drop-shadow-xl select-none"
              priority
            />
          </div>
        </div>
        {/* Sparkle decorative icons */}
        <span className="absolute -top-2 -right-2 text-xl animate-bounce">✨</span>
        <span className="absolute -bottom-1 -left-2 text-lg animate-pulse">🎉</span>
      </motion.div>

      {/* Cheerful Party Badge */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-400/10 border border-amber-400/40 text-xs font-mono text-amber-300 mb-5 shadow-lg shadow-amber-500/10 backdrop-blur-md"
      >
        <PartyPopper className="w-4 h-4 text-amber-400 animate-bounce" />
        <span className="font-bold tracking-wide">GRAND FAREWELL PARTY 2026</span>
        <span className="text-amber-500/60">&bull;</span>
        <span className="text-slate-200">HIMSI FASILKOM UNSRI</span>
      </motion.div>

      {/* Main Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.15]"
      >
        Code Closed,{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-500">
          Memories Forever.
        </span>{" "}
        🎉
      </motion.h1>

      {/* Warm Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl font-sans leading-relaxed"
      >
        Satu periode penuh tawa, begadang rapat Discord, kodingan tuntas, hingga
        patungan gorengan kantin Fasilkom telah selesai di-<em>compile</em>. Mari
        rayakan perpisahan terindah ini bersama seluruh keluarga Ristek!
      </motion.p>

      {/* Event Details Quick Tags */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-mono text-slate-200"
      >
        <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900/80 border border-amber-500/30 shadow-md">
          <Calendar className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-semibold">Sabtu, 24 Oktober 2026</span>
        </div>
        <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900/80 border border-blue-500/30 shadow-md">
          <Clock className="w-3.5 h-3.5 text-blue-400" />
          <span className="font-semibold">09.00 – 15.00 WIB</span>
        </div>
        <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900/80 border border-rose-500/30 shadow-md">
          <MapPin className="w-3.5 h-3.5 text-rose-400" />
          <span className="font-semibold">Fasilkom Unsri Indralaya</span>
        </div>
      </motion.div>

      {/* Energetic Countdown Display */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="mt-10 w-full max-w-xl"
      >
        {isMounted && timeLeft.isPast ? (
          <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-500/25 via-rose-500/25 to-blue-500/25 border-2 border-amber-400/50 backdrop-blur-xl shadow-2xl">
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-mono flex items-center justify-center gap-2">
              <Sparkles className="w-6 h-6 animate-spin text-amber-400" />
              The Party is Happening Right Now! 🥳
            </span>
            <p className="text-xs sm:text-sm text-slate-200 mt-2 font-mono">
              Selamat berkumpul rekan-rekan Ristek 2026! Nikmati tawa & nostalgia hari ini.
            </p>
          </div>
        ) : (
          <div className="relative p-1 rounded-3xl bg-gradient-to-r from-amber-500/40 via-blue-500/30 to-rose-500/40 shadow-2xl shadow-amber-950/40">
            <div className="grid grid-cols-4 gap-2 sm:gap-4 p-4 sm:p-6 rounded-[22px] bg-[#090E21]/90 backdrop-blur-xl">
              {countdownUnits.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-amber-400/60 hover:bg-slate-800/80 transition-all group"
                >
                  <div className="text-2xl sm:text-4xl md:text-5xl font-mono font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-amber-100 to-amber-300 tracking-wider">
                    {isMounted
                      ? String(item.value).padStart(2, "0")
                      : "--"}
                  </div>
                  <div className="mt-1.5 flex items-center gap-1 text-[10px] sm:text-xs font-mono font-bold text-amber-400 tracking-widest">
                    <span>{item.emoji}</span>
                    <span>{item.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* Hero Action CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-9 flex flex-wrap items-center justify-center gap-3.5 w-full max-w-lg"
      >
        <button
          onClick={handleConfettiBoom}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-slate-950 font-sans font-extrabold text-sm shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 hover:scale-[1.03] active:scale-[0.98] transition-all cursor-pointer"
        >
          <PartyPopper className="w-4 h-4 fill-slate-950 animate-bounce" />
          <span>Lempar Confetti! 🎉</span>
        </button>

        <a
          href="#secret-form"
          className="px-5 py-3 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-amber-500/40 text-amber-300 font-sans font-bold text-sm shadow-lg flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
        >
          <MessageSquareHeart className="w-4 h-4 text-rose-400 fill-rose-400" />
          <span>Kirim Pesan Rahasia</span>
        </a>

        <a
          href="#boarding-pass"
          className="px-5 py-3 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-cyan-400/50 text-slate-200 font-sans font-semibold text-sm flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
        >
          <Ticket className="w-4 h-4 text-cyan-400" />
          <span>Tiket Boarding Pass</span>
        </a>
      </motion.div>

      {/* Down indicator */}
      <a
        href="#wrapped"
        className="mt-12 text-slate-400 hover:text-amber-300 transition-colors flex flex-col items-center gap-1 text-xs font-mono group"
      >
        <span className="group-hover:tracking-wider transition-all">Lihat Ristek Wrapped 2026</span>
        <ChevronDown className="w-4 h-4 animate-bounce text-amber-400" />
      </a>
    </section>
  );
}
