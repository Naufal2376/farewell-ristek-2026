"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shuffle,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Sparkles,
  ArrowLeft,
  CheckCircle,
  Eye,
  Filter,
  Lock,
} from "lucide-react";
import confetti from "canvas-confetti";
import { SecretMessage, INITIAL_MESSAGES } from "@/components/SecretAppreciationForm";

export default function LiveReadPage() {
  const [messages, setMessages] = useState<SecretMessage[]>(INITIAL_MESSAGES);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState("Semua");
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Load from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("ristek_secret_messages");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.length > 0) {
          setMessages(parsed);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const filteredMessages = messages.filter((m) => {
    if (selectedFilter === "Semua") return true;
    return m.recipient.toLowerCase().includes(selectedFilter.toLowerCase());
  });

  const currentMessage = filteredMessages[currentIndex] || null;

  const handleNext = () => {
    if (filteredMessages.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % filteredMessages.length);
  };

  const handlePrev = () => {
    if (filteredMessages.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + filteredMessages.length) % filteredMessages.length);
  };

  const handleShuffle = () => {
    if (filteredMessages.length <= 1) return;
    let randomIndex = Math.floor(Math.random() * filteredMessages.length);
    if (randomIndex === currentIndex) {
      randomIndex = (randomIndex + 1) % filteredMessages.length;
    }
    setCurrentIndex(randomIndex);

    try {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }
  };

  const toggleReadStatus = () => {
    if (!currentMessage) return;
    const updated = messages.map((m) =>
      m.id === currentMessage.id ? { ...m, isRead: !m.isRead } : m
    );
    setMessages(updated);
    try {
      localStorage.setItem("ristek_secret_messages", JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#060A17] text-white flex flex-col justify-between p-4 sm:p-8 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-r from-blue-600/15 via-purple-600/15 to-pink-600/15 rounded-full blur-[160px] pointer-events-none" />

      {/* Top Bar for Presenter */}
      <header className="relative z-10 flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-all flex items-center gap-1.5 text-xs font-mono"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Web</span>
          </Link>

          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
              <h1 className="text-base sm:text-lg font-bold font-mono tracking-tight text-white">
                LIVE READ MODE &bull; PROYECTOR VIEW
              </h1>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              Sesi Pembacaan Secret Appreciation (11.00 – 11.30 WIB)
            </p>
          </div>
        </div>

        {/* Presenter controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Recipient Filter */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
            <Filter className="w-3.5 h-3.5 text-amber-400" />
            <select
              value={selectedFilter}
              onChange={(e) => {
                setSelectedFilter(e.target.value);
                setCurrentIndex(0);
              }}
              className="bg-transparent text-white outline-none cursor-pointer"
            >
              <option value="Semua" className="bg-slate-900">Filter: Semua Penerima</option>
              <option value="Semua Anak Ristek" className="bg-slate-900">Semua Anak Ristek</option>
              <option value="Kadep" className="bg-slate-900">Kadep & Sekdep</option>
              <option value="Web" className="bg-slate-900">Divisi Web & App</option>
              <option value="Research" className="bg-slate-900">Divisi Research & Tech</option>
              <option value="Creative" className="bg-slate-900">Divisi Creative & Media</option>
            </select>
          </div>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-400 text-slate-300 hover:text-white transition-colors"
            title="Toggle Layar Penuh"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Main Center Stage Card */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center py-8 max-w-4xl mx-auto w-full">
        {filteredMessages.length === 0 ? (
          <div className="text-center p-12 bg-slate-900/60 rounded-3xl border border-slate-800">
            <p className="text-slate-400 font-mono text-sm">
              Tidak ada pesan untuk filter &quot;{selectedFilter}&quot;.
            </p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {currentMessage && (
              <motion.div
                key={currentMessage.id}
                initial={{ opacity: 0, scale: 0.92, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -15 }}
                transition={{ duration: 0.35 }}
                className="w-full bg-gradient-to-br from-[#0F172E] via-[#0E1528] to-[#0A0E1C] border-2 border-amber-400/50 rounded-3xl p-8 sm:p-14 shadow-2xl shadow-blue-950/60 relative overflow-hidden"
              >
                {/* Decorative background stamps */}
                <div className="absolute top-6 right-6 flex items-center gap-2">
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/40">
                    {currentMessage.category}
                  </span>
                  <button
                    onClick={toggleReadStatus}
                    className={`px-3 py-1 rounded-full text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer border ${
                      currentMessage.isRead
                        ? "bg-emerald-950/60 border-emerald-500/50 text-emerald-300"
                        : "bg-slate-800/80 border-slate-700 text-slate-400 hover:text-white"
                    }`}
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>{currentMessage.isRead ? "Sudah Dibaca" : "Tandai Dibaca"}</span>
                  </button>
                </div>

                {/* Recipient Headline */}
                <div className="mb-6">
                  <div className="text-xs sm:text-sm font-mono text-amber-400 tracking-wider uppercase mb-1">
                    SURAT RAHASIA UNTUK:
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                    {currentMessage.recipient}
                  </h2>
                </div>

                {/* The Secret Message Quote */}
                <div className="my-8 sm:my-10 p-6 sm:p-8 rounded-2xl bg-black/40 border border-slate-800/80 relative">
                  <p className="text-lg sm:text-2xl md:text-3xl text-slate-100 font-sans font-medium leading-relaxed italic text-center sm:text-left">
                    &ldquo;{currentMessage.message}&rdquo;
                  </p>
                </div>

                {/* Bottom Footer Info */}
                <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-500 pt-4 border-t border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <Lock className="w-3.5 h-3.5 text-pink-400" />
                    <span>Pengirim: 100% Anonim Staf Ristek 2026</span>
                  </div>
                  <div>
                    Pesan {currentIndex + 1} dari {filteredMessages.length}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </main>

      {/* Bottom Presenter Controls Bar */}
      <footer className="relative z-10 flex flex-wrap items-center justify-center sm:justify-between gap-4 pt-6 border-t border-slate-800 max-w-4xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            disabled={filteredMessages.length <= 1}
            className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 disabled:opacity-40 text-white transition-all flex items-center gap-1 text-xs font-mono cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Sebelumnya</span>
          </button>

          <button
            onClick={handleNext}
            disabled={filteredMessages.length <= 1}
            className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 disabled:opacity-40 text-white transition-all flex items-center gap-1 text-xs font-mono cursor-pointer"
          >
            <span>Selanjutnya</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Big Gacha / Shuffle Button */}
        <button
          onClick={handleShuffle}
          className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 hover:from-amber-400 hover:to-pink-400 text-slate-950 font-extrabold font-mono text-sm shadow-xl shadow-amber-500/20 flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 cursor-pointer"
        >
          <Shuffle className="w-4 h-4" />
          <span>Gacha / Acak Pesan Selanjutnya 🎲</span>
        </button>
      </footer>
    </div>
  );
}
