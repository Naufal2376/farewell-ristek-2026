"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Sparkles,
  Lock,
  CheckCircle2,
  RefreshCw,
  User,
} from "lucide-react";
import confetti from "canvas-confetti";

export interface SecretMessage {
  id: string;
  recipient: string;
  message: string;
  createdAt: string;
  isRead?: boolean;
  category?: string;
}

export const INITIAL_MESSAGES: SecretMessage[] = [
  {
    id: "msg-1",
    recipient: "Semua Anak Ristek 💙",
    message:
      "Makasih banyak untuk 1 tahun yang luar biasa guys! Nggak nyangka kita bisa selesain web SI FEST dan semua proker tanpa ada yang tumbang. Kalian keluarga terbaik di Fasilkom!",
    createdAt: "2026-10-21T10:00:00.000Z",
    isRead: false,
  },
  {
    id: "msg-2",
    recipient: "Kak Iqbal & Jovandra 👑",
    message:
      "Terima kasih Kak Kadep dan Kak Wakadep yang selalu sabar bimbing kami saat panik deadline rapat pleno. Maaf kalau divisi sering ngaret gmeet ya kak hehe.",
    createdAt: "2026-10-21T11:30:00.000Z",
    isRead: false,
  },
  {
    id: "msg-3",
    recipient: "Divisi PTI 💻",
    message:
      "Buat anak-anak PTI, tolong setelah demis jam tidurnya dinormalkan ya. Jangan commit repo jam 3 pagi lagi, mata kalian udah mirip panda!",
    createdAt: "2026-10-21T14:15:00.000Z",
    isRead: false,
  },
];

export default function SecretAppreciationForm() {
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [messageCount, setMessageCount] = useState(3);

  // Sync count from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("ristek_secret_messages");
      if (stored) {
        const parsed = JSON.parse(stored);
        setMessageCount(parsed.length);
      } else {
        localStorage.setItem("ristek_secret_messages", JSON.stringify(INITIAL_MESSAGES));
        setMessageCount(INITIAL_MESSAGES.length);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient.trim() || !message.trim()) return;

    const newMessage: SecretMessage = {
      id: `msg-${Date.now()}`,
      recipient: recipient.trim(),
      message: message.trim(),
      createdAt: new Date().toISOString(),
      isRead: false,
    };

    try {
      const currentStored = localStorage.getItem("ristek_secret_messages");
      const list: SecretMessage[] = currentStored ? JSON.parse(currentStored) : INITIAL_MESSAGES;
      const updated = [newMessage, ...list];
      localStorage.setItem("ristek_secret_messages", JSON.stringify(updated));
      setMessageCount(updated.length);

      // Confetti explosion
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.7 },
        colors: ["#38BDF8", "#F59E0B", "#EC4899", "#10B981"],
      });
    } catch {
      // ignore
    }

    setIsSubmitted(true);
  };

  const handleReset = () => {
    setRecipient("");
    setMessage("");
    setIsSubmitted(false);
  };

  return (
    <section id="secret-form" className="py-20 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-950/60 border border-pink-800/60 text-xs font-mono text-pink-300 mb-3">
          <Lock className="w-3.5 h-3.5 text-pink-400" />
          <span>100% ANONYMOUS &bull; END-TO-END NOSTALGIC</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Secret Appreciation Form
        </h2>
        <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
          Tuliskan pesan, terima kasih, unek-unek kocak, atau kesan terpendammu
          tanpa nama pengirim. Bebas ditujukan untuk siapa saja dan akan dibacakan
          di sesi jam 11.00!
        </p>

        {/* Counter vault pill */}
        <div className="mt-4 inline-flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-900/80 px-3 py-1 rounded-full border border-slate-800">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>
            Brankas Rahasia: <strong className="text-amber-400">{messageCount}</strong> pesan tersimpan
          </span>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-[#0B1228] border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Decorative corner glows */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-[90px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[90px] pointer-events-none" />

        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="space-y-6 relative z-10"
            >
              {/* Recipient Input (Free Form Text) */}
              <div>
                <label className="block text-xs font-mono font-semibold text-slate-300 mb-2">
                  1. Untuk Siapa Pesan Ini? (Bebas Siapa Saja)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    placeholder="Contoh: Kak Iqbal, Owen, Fahri, Callista, atau Semua Anak Ristek"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-pink-400 transition-colors placeholder:text-slate-500 font-sans"
                  />
                </div>
              </div>

              {/* Message Textarea */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-mono font-semibold text-slate-300">
                    2. Isi Pesan / Kesan (100% Rahasia)
                  </label>
                  <span className="text-[11px] font-mono text-slate-500">
                    {message.length}/1000 karakter
                  </span>
                </div>
                <textarea
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={1000}
                  placeholder="Tuliskan apapun dari lubuk hatimu... Kenangan pertama ketemu, terima kasih atas bantuan proker, pesan roasting lucu, atau harapan buat dia di masa depan!"
                  required
                  className="w-full px-4 py-3 rounded-2xl bg-slate-900/90 border border-slate-700 text-white text-sm focus:outline-none focus:border-pink-400 transition-colors resize-none placeholder:text-slate-500 leading-relaxed font-sans"
                />
              </div>

              {/* Privacy disclaimer */}
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-900/50 p-3 rounded-xl border border-slate-800/80">
                <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  Tidak ada identitas, nama pengirim, atau data pribadi yang disimpan. 100% anonim!
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-pink-600 via-rose-600 to-amber-500 hover:from-pink-500 hover:to-amber-400 text-white font-bold text-sm shadow-xl shadow-pink-600/25 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Kirim Pesan Anonim Sekarang 💌</span>
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="py-8 text-center space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400/40 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h3 className="text-2xl font-bold text-white">
                Pesan Rahasiamu Berhasil Terkirim! 🎉
              </h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                Pesan ini telah masuk ke brankas rahasia panitia dan siap
                dibacakan pada sesi acara jam <strong>11.00 – 11.30 WIB</strong>.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleReset}
                  className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-mono font-semibold flex items-center gap-2 transition-all cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4 text-amber-400" />
                  <span>Kirim Pesan Lagi untuk yang Lain 💌</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
