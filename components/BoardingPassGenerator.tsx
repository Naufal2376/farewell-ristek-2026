"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Ticket,
  QrCode,
  Camera,
  Check,
  Plane,
  UserCheck,
} from "lucide-react";
import confetti from "canvas-confetti";

export interface RistekMember2026 {
  name: string;
  role: string;
  division: string;
  instagram: string;
  seat: string;
}

export const RISTEK_MEMBERS_2026: RistekMember2026[] = [
  // Pimpinan Departemen
  {
    name: "M. Fahri Ramadhan",
    role: "Kepala Departemen Ristek 2026",
    division: "Pimpinan Departemen",
    instagram: "@_fahrirm",
    seat: "RS-01A",
  },
  {
    name: "Revanna Aulia Putri",
    role: "Wakil Kepala Departemen Ristek 2026",
    division: "Pimpinan Departemen",
    instagram: "@revannaauliaa",
    seat: "RS-01B",
  },

  // Pimpinan Divisi
  {
    name: "M. Naufal Rafif Pratama",
    role: "Kepala Divisi PTI",
    division: "Divisi PTI",
    instagram: "@nfalrfif",
    seat: "RS-02A",
  },
  {
    name: "Calista Alysia Rasendriya",
    role: "Kepala Divisi Akademik",
    division: "Divisi Akademik",
    instagram: "@calistaalysia_",
    seat: "RS-02B",
  },

  // Staff (17 orang)
  {
    name: "DD Eikel Fison",
    role: "Staff Ristek 2026",
    division: "Staff Departemen",
    instagram: "@eikaruuu",
    seat: "RS-03A",
  },
  {
    name: "Davin Gabriel Jonathan",
    role: "Staff Ristek 2026",
    division: "Staff Departemen",
    instagram: "@dvinss16",
    seat: "RS-03B",
  },
  {
    name: "Muhamad Ridwan",
    role: "Staff Ristek 2026",
    division: "Staff Departemen",
    instagram: "@ridd_tho",
    seat: "RS-04A",
  },
  {
    name: "Muhammad Irfan",
    role: "Staff Ristek 2026",
    division: "Staff Departemen",
    instagram: "@mhmd_irfan_10",
    seat: "RS-04B",
  },
  {
    name: "Siti Khairani Ramadona",
    role: "Staff Ristek 2026",
    division: "Staff Departemen",
    instagram: "@skhairanii_",
    seat: "RS-05A",
  },
  {
    name: "Siti Salmarifa Khalisah Putri",
    role: "Staff Ristek 2026",
    division: "Staff Departemen",
    instagram: "@salmaarfaa",
    seat: "RS-05B",
  },
  {
    name: "Zhoffarah Azzahrah",
    role: "Staff Ristek 2026",
    division: "Staff Departemen",
    instagram: "@zhoffaraazs",
    seat: "RS-06A",
  },
  {
    name: "Thessa Novela",
    role: "Staff Ristek 2026",
    division: "Staff Departemen",
    instagram: "@page.thsnvla",
    seat: "RS-06B",
  },
  {
    name: "Akilla Tyas Ayu Renata",
    role: "Staff Ristek 2026",
    division: "Staff Departemen",
    instagram: "@aqillqq_",
    seat: "RS-07A",
  },
  {
    name: "Afdella Azahra",
    role: "Staff Ristek 2026",
    division: "Staff Departemen",
    instagram: "@imxdlee",
    seat: "RS-07B",
  },
  {
    name: "Ayodya Zahzora Achtar",
    role: "Staff Ristek 2026",
    division: "Staff Departemen",
    instagram: "@4tr._za",
    seat: "RS-08A",
  },
  {
    name: "Delta Dwi Sari",
    role: "Staff Ristek 2026",
    division: "Staff Departemen",
    instagram: "@deltaadw",
    seat: "RS-08B",
  },
  {
    name: "Muhammad Faris Arrachman",
    role: "Staff Ristek 2026",
    division: "Staff Departemen",
    instagram: "@frs8127_",
    seat: "RS-09A",
  },
  {
    name: "Keisya Rizkyka",
    role: "Staff Ristek 2026",
    division: "Staff Departemen",
    instagram: "@keisyarzkaa",
    seat: "RS-09B",
  },
  {
    name: "Kaysan Rafi Akbar",
    role: "Staff Ristek 2026",
    division: "Staff Departemen",
    instagram: "@rafi.zz_42",
    seat: "RS-10A",
  },
  {
    name: "Muhammad Farrel Alif Fauzy",
    role: "Staff Ristek 2026",
    division: "Staff Departemen",
    instagram: "@strfarrell",
    seat: "RS-10B",
  },
  {
    name: "Muhammad Haris Al Fayyadh",
    role: "Staff Ristek 2026",
    division: "Staff Departemen",
    instagram: "@harisal2025",
    seat: "RS-11A",
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
  const [customRole, setCustomRole] = useState("Anggota Kehormatan Ristek 2026");
  const [customIg, setCustomIg] = useState("");
  const [copied, setCopied] = useState(false);

  // Active details
  const activeName = isCustom
    ? customName || "DEAR STAF RISTEK"
    : RISTEK_MEMBERS_2026[selectedIndex].name;

  const activeRole = isCustom
    ? customRole
    : RISTEK_MEMBERS_2026[selectedIndex].role;

  const activeIg = isCustom
    ? customIg || "@himsi.ristek"
    : RISTEK_MEMBERS_2026[selectedIndex].instagram;

  const activeSeat = useMemo(() => {
    if (isCustom) {
      return generateUniqueSeat(customName || "Tamu");
    }
    return RISTEK_MEMBERS_2026[selectedIndex].seat;
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
          <span>EXCLUSIVE RISTEK 2026 ACCESS PASS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Generator Kartu Akses / Boarding Pass
        </h2>
        <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
          Pilih namamu dari daftar resmi pengurus Departemen Ristek HIMSI 2026 untuk
          meng-generate tiket boarding pass VIP dengan nomor kursi khusus.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Input Form Controls (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-[#0B1228] border border-slate-800 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-cyan-400" />
            <span>Pilih Profil Pengurus Ristek 2026</span>
          </h3>

          {/* Member Dropdown from official 2026 profile */}
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5">
              Nama Anggota Ristek (himsiunsri.org 2026)
            </label>
            <select
              value={isCustom ? "custom" : selectedIndex}
              onChange={handleMemberChange}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-medium text-xs font-mono focus:outline-none focus:border-amber-400 transition-colors cursor-pointer"
            >
              <optgroup label="👑 Pimpinan Departemen">
                <option value={0}>M. Fahri Ramadhan (Kadep)</option>
                <option value={1}>Revanna Aulia Putri (Wakadep)</option>
              </optgroup>

              <optgroup label="💻 Pimpinan Divisi">
                <option value={2}>M. Naufal Rafif Pratama (Kadiv PTI)</option>
                <option value={3}>Calista Alysia Rasendriya (Kadiv Akademik)</option>
              </optgroup>

              <optgroup label="👥 Staff Departemen Ristek 2026">
                {RISTEK_MEMBERS_2026.slice(4).map((m, idx) => (
                  <option key={idx + 4} value={idx + 4}>
                    {m.name} ({m.instagram})
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
                  maxLength={36}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Username Instagram
                </label>
                <input
                  type="text"
                  value={customIg}
                  onChange={(e) => setCustomIg(e.target.value)}
                  placeholder="Contoh: @username"
                  maxLength={24}
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
              Tips: Pasang hasil screenshot tiket ini di IG Story dan tag @himsi.ristek!
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
                    Instagram Handle
                  </span>
                  <span className="font-mono text-xs text-cyan-300 flex items-center gap-1.5">
                    <svg className="w-3 h-3 text-pink-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                    </svg>
                    <span>{activeIg}</span>
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">
                    Seat & Gate
                  </span>
                  <span className="font-mono text-xs font-bold text-amber-300 block">
                    {activeSeat} &bull; GATE FASILKOM
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Stub / Barcode area */}
            <div className="p-6 bg-[#070B14]/80 flex items-center justify-between gap-4">
              <div className="flex-1 space-y-1">
                <div className="text-[10px] font-mono text-slate-400 tracking-wider">
                  STATUS: VERIFIED RISTEK 2026 MEMBER
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
