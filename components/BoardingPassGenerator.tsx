"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Ticket,
  Sparkles,
  QrCode,
  Share2,
  Camera,
  Check,
  Plane,
  Terminal,
} from "lucide-react";
import confetti from "canvas-confetti";

export default function BoardingPassGenerator() {
  const [name, setName] = useState("Naufal Rizky");
  const [role, setRole] = useState("Frontend Engineer 💻");
  const [seatNumber, setSeatNumber] = useState("RS-26A");
  const [copied, setCopied] = useState(false);

  const roles = [
    "Frontend Engineer 💻",
    "Backend & System Dev 🛠️",
    "UI/UX & Product Design 🎨",
    "Cyber & Infrastructure 🛡️",
    "Creative & Multimedia 📸",
    "BPH / Kadep / Sekdep 👑",
    "Honorary Ristek Member 🚀",
  ];

  const handleShare = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
      });
    } catch {
      // ignore
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="boarding-pass" className="py-20 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/80 text-xs font-mono text-cyan-300 mb-3">
          <Ticket className="w-3.5 h-3.5 text-amber-400" />
          <span>EXCLUSIVE ACCESS PASS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Generator Kartu Akses / Boarding Pass
        </h2>
        <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
          Ketik nama panggilanmu untuk meng-generate tiket boarding pass VIP.
          Tinggal screenshot dan pamerkan ke Instagram Story!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Input Form Controls (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-[#0B1228] border border-slate-800 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span>Customize Pass Credentials</span>
          </h3>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5">
              Nama Lengkap / Panggilan
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Naufal / Kak Budi"
              maxLength={26}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5">
              Divisi / Peran di Ristek
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-amber-400 transition-colors cursor-pointer"
            >
              {roles.map((r, i) => (
                <option key={i} value={r} className="bg-slate-900 text-white">
                  {r}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5">
              Nomor Kursi (Seat ID)
            </label>
            <input
              type="text"
              value={seatNumber}
              onChange={(e) => setSeatNumber(e.target.value)}
              maxLength={8}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          <div className="pt-2">
            <button
              onClick={handleShare}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs font-mono flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Siap di-Screenshot! 📸</span>
                </>
              ) : (
                <>
                  <Camera className="w-4 h-4" />
                  <span>Screenshot & Share ke IG Story</span>
                </>
              )}
            </button>
            <p className="text-[11px] text-slate-400 text-center mt-2 font-mono">
              Tips: Screenshot area tiket di sebelah kanan pada layar HP
            </p>
          </div>
        </div>

        {/* Right: The Boarding Pass Card Preview (7 cols) */}
        <div className="lg:col-span-7 flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full max-w-md bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-[#0B0F19] text-white rounded-3xl border border-amber-400/40 shadow-2xl shadow-indigo-950/50 overflow-hidden relative"
          >
            {/* Holographic Header Bar */}
            <div className="px-6 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-500 flex items-center justify-between text-xs font-mono font-bold tracking-wider text-white">
              <span className="flex items-center gap-1.5">
                <Plane className="w-4 h-4" />
                <span>BOARDING PASS &bull; VIP ACCESS</span>
              </span>
              <span className="bg-black/30 px-2 py-0.5 rounded text-[10px]">
                RESTRICTED
              </span>
            </div>

            {/* Flight Route banner */}
            <div className="p-6 border-b border-dashed border-slate-700/80">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-2xl font-black font-mono tracking-wider text-amber-400">
                    FASILKOM
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    UNSRI &bull; RISTEK 2026
                  </div>
                </div>

                <div className="flex flex-col items-center px-4">
                  <Plane className="w-5 h-5 text-cyan-400 rotate-90" />
                  <div className="w-16 h-0.5 bg-slate-700 my-1" />
                  <span className="text-[9px] font-mono text-slate-400">
                    ONE-WAY FLIGHT
                  </span>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-black font-mono tracking-wider text-cyan-400">
                    FUTURE
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    NEXT CHAPTER &bull; SUCCESS
                  </div>
                </div>
              </div>

              {/* Pass Holder Details */}
              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-800 text-xs">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">
                    Passenger Name
                  </span>
                  <span className="font-bold font-mono text-sm text-white truncate block">
                    {name || "DEAR STAF RISTEK"}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">
                    Role / Position
                  </span>
                  <span className="font-semibold text-xs text-amber-300 truncate block">
                    {role}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">
                    Flight Date & Time
                  </span>
                  <span className="font-mono text-xs text-slate-200 block">
                    24 OCT 2026 &bull; 09:00 WIB
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">
                    Seat & Gate
                  </span>
                  <span className="font-mono text-xs font-bold text-cyan-300 block">
                    {seatNumber} &bull; GATE FASILKOM
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Stub / Barcode area */}
            <div className="p-6 bg-[#070B14]/80 flex items-center justify-between gap-4">
              <div className="flex-1 space-y-1">
                <div className="text-[10px] font-mono text-slate-400 tracking-wider">
                  STATUS: VERIFIED LIFETIME MEMBER
                </div>
                {/* Simulated Barcode */}
                <div className="h-9 flex items-center gap-1 opacity-80 overflow-hidden">
                  {[4, 2, 6, 1, 5, 2, 4, 1, 7, 2, 3, 5, 2, 6, 1, 4, 2, 5, 1, 3, 6, 2, 4, 1].map((w, idx) => (
                    <div
                      key={idx}
                      className="h-full bg-slate-300"
                      style={{ width: `${w * 1.5}px` }}
                    />
                  ))}
                </div>
                <div className="text-[9px] font-mono text-slate-500">
                  REF: 2026-RISTEK-FAREWELL-PARTY
                </div>
              </div>

              <div className="p-2 bg-white rounded-xl shadow-md shrink-0">
                <QrCode className="w-12 h-12 text-slate-900" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
