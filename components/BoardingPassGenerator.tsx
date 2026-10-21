"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Ticket,
  Sparkles,
  QrCode,
  Camera,
  Check,
  Plane,
  Terminal,
  UserCheck,
} from "lucide-react";
import confetti from "canvas-confetti";

interface RistekMember {
  name: string;
  role: string;
  division: string;
  defaultSeat: string;
}

export const RISTEK_MEMBERS: RistekMember[] = [
  // BPH Ristek
  {
    name: "Muhammad Iqbalul Khoiri",
    role: "Kepala Departemen Ristek 👑",
    division: "BPH Departemen",
    defaultSeat: "RS-01A",
  },
  {
    name: "Jovandra Anata Malayadza",
    role: "Wakil Kepala Departemen Ristek 👑",
    division: "BPH Departemen",
    defaultSeat: "RS-01B",
  },

  // Divisi PTI (Pengembangan Teknologi Informasi)
  {
    name: "Nicolaus Owen Marvell",
    role: "Kepala Divisi PTI 💻",
    division: "Divisi PTI",
    defaultSeat: "RS-02A",
  },
  {
    name: "M. Fahri Ramadhan",
    role: "Staf Divisi PTI 💻",
    division: "Divisi PTI",
    defaultSeat: "RS-02B",
  },
  {
    name: "Wulan Suryani",
    role: "Staf Divisi PTI 💻",
    division: "Divisi PTI",
    defaultSeat: "RS-03A",
  },
  {
    name: "M. Ghalib Assiddiq Gusri",
    role: "Staf Divisi PTI 💻",
    division: "Divisi PTI",
    defaultSeat: "RS-03B",
  },
  {
    name: "Muhammad Tias Djahfran Wijaya",
    role: "Staf Divisi PTI 💻",
    division: "Divisi PTI",
    defaultSeat: "RS-04A",
  },
  {
    name: "Maulana Adiatma",
    role: "Staf Divisi PTI 💻",
    division: "Divisi PTI",
    defaultSeat: "RS-04B",
  },
  {
    name: "Syawaluddin Boy Rambe Al-Ayyubi",
    role: "Staf Divisi PTI 💻",
    division: "Divisi PTI",
    defaultSeat: "RS-05A",
  },
  {
    name: "M. Naufal Rafif Pratama",
    role: "Staf Divisi PTI 💻",
    division: "Divisi PTI",
    defaultSeat: "RS-05B",
  },
  {
    name: "Rafael Antasena Dwianto Gultom",
    role: "Staf Divisi PTI 💻",
    division: "Divisi PTI",
    defaultSeat: "RS-06A",
  },
  {
    name: "Intan Al' Ainun",
    role: "Staf Divisi PTI 💻",
    division: "Divisi PTI",
    defaultSeat: "RS-06B",
  },

  // Divisi Akademik & Riset
  {
    name: "R.A. Callista Salsabila",
    role: "Kepala Divisi Akademik 🔬",
    division: "Divisi Akademik",
    defaultSeat: "RS-07A",
  },
  {
    name: "Yuriza Farras Fadhilah",
    role: "Staf Divisi Akademik 🔬",
    division: "Divisi Akademik",
    defaultSeat: "RS-07B",
  },
  {
    name: "Amallya Salsabila",
    role: "Staf Divisi Akademik 🔬",
    division: "Divisi Akademik",
    defaultSeat: "RS-08A",
  },
  {
    name: "Calista Alysia Rasendriya",
    role: "Staf Divisi Akademik 🔬",
    division: "Divisi Akademik",
    defaultSeat: "RS-08B",
  },
  {
    name: "Revanna Aulia Putri",
    role: "Staf Divisi Akademik 🔬",
    division: "Divisi Akademik",
    defaultSeat: "RS-09A",
  },
  {
    name: "Zulaikha Savira Viwinanda",
    role: "Staf Divisi Akademik 🔬",
    division: "Divisi Akademik",
    defaultSeat: "RS-09B",
  },
  {
    name: "Zahra Octavia",
    role: "Staf Divisi Akademik 🔬",
    division: "Divisi Akademik",
    defaultSeat: "RS-10A",
  },
  {
    name: "Ikhsan Nur Saputra",
    role: "Staf Divisi Akademik 🔬",
    division: "Divisi Akademik",
    defaultSeat: "RS-10B",
  },
  {
    name: "Muhammad Iqbal Meidiansyah",
    role: "Staf Divisi Akademik 🔬",
    division: "Divisi Akademik",
    defaultSeat: "RS-11A",
  },
];

// Hash function to guarantee a unique seat for custom names
function generateUniqueSeat(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const row = Math.abs(hash % 20) + 12; // row 12 - 31
  const letters = ["A", "B", "C", "D", "E", "F"];
  const col = letters[Math.abs(hash >> 3) % letters.length];
  return `RS-${row}${col}`;
}

export default function BoardingPassGenerator() {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isCustom, setIsCustom] = useState(false);
  const [customName, setCustomName] = useState("");
  const [customRole, setCustomRole] = useState("Anggota Kehormatan Ristek 🚀");
  const [copied, setCopied] = useState(false);

  // Active details
  const activeName = isCustom
    ? customName || "DEAR STAF RISTEK"
    : RISTEK_MEMBERS[selectedIndex].name;

  const activeRole = isCustom
    ? customRole
    : RISTEK_MEMBERS[selectedIndex].role;

  const activeSeat = useMemo(() => {
    if (isCustom) {
      return generateUniqueSeat(customName || "Tamu");
    }
    return RISTEK_MEMBERS[selectedIndex].defaultSeat;
  }, [isCustom, customName, selectedIndex]);

  const handleMemberChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === "custom") {
      setIsCustom(true);
    } else {
      setIsCustom(false);
      setSelectedIndex(Number(val));
    }
  };

  const handleShare = () => {
    try {
      confetti({
        particleCount: 60,
        spread: 70,
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
          <span>EXCLUSIVE RISTEK ACCESS PASS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Generator Kartu Akses / Boarding Pass
        </h2>
        <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
          Pilih namamu dari daftar resmi pengurus Departemen Ristek HIMSI Unsri untuk
          meng-generate tiket boarding pass VIP dengan nomor kursi khusus.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Input Form Controls (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-[#0B1228] border border-slate-800 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-cyan-400" />
            <span>Pilih Profil Pengurus Ristek</span>
          </h3>

          {/* Member Dropdown from official profile */}
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5">
              Nama Anggota Ristek (himsiunsri.org)
            </label>
            <select
              value={isCustom ? "custom" : selectedIndex}
              onChange={handleMemberChange}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-medium text-xs font-mono focus:outline-none focus:border-amber-400 transition-colors cursor-pointer"
            >
              <optgroup label="👑 Pimpinan Departemen">
                <option value={0}>Muhammad Iqbalul Khoiri (Kadep)</option>
                <option value={1}>Jovandra Anata Malayadza (Wakadep)</option>
              </optgroup>

              <optgroup label="💻 Divisi Pengembangan Teknologi Informasi (PTI)">
                {RISTEK_MEMBERS.slice(2, 12).map((m, idx) => (
                  <option key={idx + 2} value={idx + 2}>
                    {m.name}
                  </option>
                ))}
              </optgroup>

              <optgroup label="🔬 Divisi Akademik & Riset">
                {RISTEK_MEMBERS.slice(12).map((m, idx) => (
                  <option key={idx + 12} value={idx + 12}>
                    {m.name}
                  </option>
                ))}
              </optgroup>

              <optgroup label="✍️ Opsi Lain">
                <option value="custom">Ketik Nama Sendiri / Tamu Kehormatan</option>
              </optgroup>
            </select>
          </div>

          {/* Custom Name input if 'custom' is selected */}
          {isCustom && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Nama Lengkap / Panggilan
                </label>
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="Masukkan nama Anda..."
                  maxLength={26}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Peran / Afiliasi
                </label>
                <input
                  type="text"
                  value={customRole}
                  onChange={(e) => setCustomRole(e.target.value)}
                  placeholder="Contoh: Demisioner Ristek / Tamu Fasilkom"
                  maxLength={32}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-amber-400"
                />
              </div>
            </motion.div>
          )}

          {/* Read-only assigned Seat ID preview */}
          <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">Nomor Kursi Khusus:</span>
            <span className="text-amber-400 font-bold text-sm bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/30">
              {activeSeat}
            </span>
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
              Tips: Pasang hasil screenshot tiket ini di IG Story dengan tag @himsi.ristek!
            </p>
          </div>
        </div>

        {/* Right: The Boarding Pass Card Preview (7 cols) */}
        <div className="lg:col-span-7 flex justify-center">
          <motion.div
            key={activeName}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
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
                    {activeName}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">
                    Role / Position
                  </span>
                  <span className="font-semibold text-xs text-amber-300 truncate block">
                    {activeRole}
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
                    {activeSeat} &bull; GATE FASILKOM
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Stub / Barcode area */}
            <div className="p-6 bg-[#070B14]/80 flex items-center justify-between gap-4">
              <div className="flex-1 space-y-1">
                <div className="text-[10px] font-mono text-slate-400 tracking-wider">
                  STATUS: VERIFIED RISTEK MEMBER
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
                  REF: 2026-HIMSI-RISTEK-UNSRI
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
