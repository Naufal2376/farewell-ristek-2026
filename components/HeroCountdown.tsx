"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  MessageSquareHeart,
  Ticket,
  ChevronDown,
  Terminal,
} from "lucide-react";

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

  const countdownUnits = [
    { label: "HARI", value: timeLeft.days },
    { label: "JAM", value: timeLeft.hours },
    { label: "MENIT", value: timeLeft.minutes },
    { label: "DETIK", value: timeLeft.seconds },
  ];

  return (
    <section
      id="countdown"
      className="relative pt-12 pb-20 px-4 sm:px-6 overflow-hidden flex flex-col items-center text-center"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[400px] bg-gradient-to-b from-blue-600/20 via-indigo-600/10 to-transparent rounded-full blur-[140px] -z-10 pointer-events-none" />

      {/* Top Badge */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-[11px] sm:text-xs font-mono text-cyan-300 mb-6 shadow-sm"
      >
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping inline-block" />
        <span className="font-semibold text-amber-300">FINAL CHAPTER</span>
        <span className="text-slate-500">&bull;</span>
        <span>RISTEK HIMSI FASILKOM UNSRI 2026</span>
      </motion.div>

      {/* Main Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white max-w-4xl leading-tight"
      >
        Code Closed,{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-amber-300">
          Memories Stored Forever.
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl font-sans font-normal leading-relaxed"
      >
        Perjalanan satu periode telah selesai di-<em>compile</em>. Mari rayakan
        setiap tawa, begadang bareng, hingga suka duka di malam penutupan terindah
        kita.
      </motion.p>

      {/* Event Quick Meta Tags */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs font-mono text-slate-300"
      >
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800">
          <Calendar className="w-3.5 h-3.5 text-amber-400" />
          <span>Sabtu, 24 Oktober 2026</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800">
          <Clock className="w-3.5 h-3.5 text-blue-400" />
          <span>09.00 – 15.00 WIB</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800">
          <MapPin className="w-3.5 h-3.5 text-rose-400" />
          <span>Fasilkom Unsri / Venue Acara</span>
        </div>
      </motion.div>

      {/* Countdown Timer Display */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-10 w-full max-w-xl"
      >
        {isMounted && timeLeft.isPast ? (
          <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/20 via-blue-500/20 to-purple-500/20 border border-amber-400/40 backdrop-blur-md shadow-2xl">
            <span className="text-2xl sm:text-3xl font-bold text-amber-300 font-mono flex items-center justify-center gap-2">
              <Sparkles className="w-6 h-6 animate-spin text-amber-400" />
              The Party is Happening Now! 🫶🏻
            </span>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 font-mono">
              Selamat berkumpul rekan-rekan Ristek 2026! Nikmati setiap momen hari ini.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2.5 sm:gap-4 p-4 sm:p-6 rounded-2xl bg-[#0B1228]/80 border border-slate-700/60 backdrop-blur-lg shadow-xl shadow-blue-950/40">
            {countdownUnits.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center p-2.5 sm:p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 group hover:border-amber-400/40 transition-colors"
              >
                <div className="text-2xl sm:text-4xl md:text-5xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-300 tracking-wider">
                  {isMounted
                    ? String(item.value).padStart(2, "0")
                    : "--"}
                </div>
                <div className="mt-1 sm:mt-2 text-[10px] sm:text-xs font-mono font-medium text-amber-400 tracking-widest">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Hero CTA Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-8 flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto"
      >
        <a
          href="#secret-form"
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium text-sm shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.02]"
        >
          <MessageSquareHeart className="w-4 h-4 text-amber-300" />
          <span>Kirim Secret Appreciation</span>
        </a>

        <a
          href="#boarding-pass"
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-amber-400/50 text-slate-200 font-medium text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <Ticket className="w-4 h-4 text-amber-400" />
          <span>Generate Boarding Pass</span>
        </a>
      </motion.div>

      {/* Down indicator */}
      <a
        href="#wrapped"
        className="mt-12 text-slate-500 hover:text-slate-300 transition-colors flex flex-col items-center gap-1 text-xs font-mono"
      >
        <span>Eksplor Ristek Wrapped</span>
        <ChevronDown className="w-4 h-4 animate-bounce text-amber-400" />
      </a>
    </section>
  );
}
