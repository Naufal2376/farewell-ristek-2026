"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Plane } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

export interface RistekMember2026 {
  name: string;
  role: string;
  division: "pimpinan" | "pti" | "akademik";
  divisionName: string;
  instagram: string;
  seat: string;
}

export const RISTEK_MEMBERS_2026: RistekMember2026[] = [
  // --- 👑 4 Pimpinan RISTEK (Departemen & Divisi) ---
  {
    name: "M. Fahri Ramadhan",
    role: "Kepala Departemen RISTEK",
    division: "pimpinan",
    divisionName: "Pimpinan RISTEK",
    instagram: "@_fahrirm",
    seat: "LEAD-01",
  },
  {
    name: "Revanna Aulia Putri",
    role: "Wakil Kepala Departemen RISTEK",
    division: "pimpinan",
    divisionName: "Pimpinan RISTEK",
    instagram: "@revannaauliaa",
    seat: "LEAD-02",
  },
  {
    name: "M. Naufal Rafif Pratama",
    role: "Kepala Divisi PTI RISTEK",
    division: "pimpinan",
    divisionName: "Pimpinan RISTEK",
    instagram: "@nfalrfif",
    seat: "LEAD-03",
  },
  {
    name: "Calista Alysia Rasendriya",
    role: "Kepala Divisi Akademik RISTEK",
    division: "pimpinan",
    divisionName: "Pimpinan RISTEK",
    instagram: "@calistaalysia_",
    seat: "LEAD-04",
  },

  // --- 💻 Staff Divisi PTI ---
  {
    name: "DD Eikel Fison",
    role: "Staff Divisi PTI",
    division: "pti",
    divisionName: "Divisi PTI",
    instagram: "@eikaruuu",
    seat: "PTI-03",
  },
  {
    name: "Davin Gabriel Jonathan",
    role: "Staff Divisi PTI",
    division: "pti",
    divisionName: "Divisi PTI",
    instagram: "@dvinss16",
    seat: "PTI-08",
  },
  {
    name: "Muhamad Ridwan",
    role: "Staff Divisi PTI",
    division: "pti",
    divisionName: "Divisi PTI",
    instagram: "@ridd_tho",
    seat: "PTI-01",
  },
  {
    name: "Muhammad Irfan",
    role: "Staff Divisi PTI",
    division: "pti",
    divisionName: "Divisi PTI",
    instagram: "@mhmd_irfan_10",
    seat: "PTI-06",
  },
  {
    name: "Ayodya Zahzora Achtar",
    role: "Staff Divisi PTI",
    division: "pti",
    divisionName: "Divisi PTI",
    instagram: "@4tr._za",
    seat: "PTI-04",
  },
  {
    name: "Muhammad Faris Arrachman",
    role: "Staff Divisi PTI",
    division: "pti",
    divisionName: "Divisi PTI",
    instagram: "@frs8127_",
    seat: "PTI-07",
  },
  {
    name: "Kaysan Rafi Akbar",
    role: "Staff Divisi PTI",
    division: "pti",
    divisionName: "Divisi PTI",
    instagram: "@rafi.zz_42",
    seat: "PTI-02",
  },
  {
    name: "Muhammad Farrel Alif Fauzy",
    role: "Staff Divisi PTI",
    division: "pti",
    divisionName: "Divisi PTI",
    instagram: "@strfarrell",
    seat: "PTI-05",
  },

  // --- 🔬 Staff Divisi Akademik ---
  {
    name: "Siti Khairani Ramadona",
    role: "Staff Divisi Akademik",
    division: "akademik",
    divisionName: "Divisi Akademik",
    instagram: "@skhairanii_",
    seat: "AKD-02",
  },
  {
    name: "Siti Salmarifa Khalisah Putri",
    role: "Staff Divisi Akademik",
    division: "akademik",
    divisionName: "Divisi Akademik",
    instagram: "@salmaarfaa",
    seat: "AKD-08",
  },
  {
    name: "Zhoffarah Azzahrah",
    role: "Staff Divisi Akademik",
    division: "akademik",
    divisionName: "Divisi Akademik",
    instagram: "@zhoffaraazs",
    seat: "AKD-04",
  },
  {
    name: "Thessa Novela",
    role: "Staff Divisi Akademik",
    division: "akademik",
    divisionName: "Divisi Akademik",
    instagram: "@page.thsnvla",
    seat: "AKD-07",
  },
  {
    name: "Akilla Tyas Ayu Renata",
    role: "Staff Divisi Akademik",
    division: "akademik",
    divisionName: "Divisi Akademik",
    instagram: "@aqillqq_",
    seat: "AKD-01",
  },
  {
    name: "Afdella Azahra",
    role: "Staff Divisi Akademik",
    division: "akademik",
    divisionName: "Divisi Akademik",
    instagram: "@imxdlee",
    seat: "AKD-05",
  },
  {
    name: "Delta Dwi Sari",
    role: "Staff Divisi Akademik",
    division: "akademik",
    divisionName: "Divisi Akademik",
    instagram: "@deltaadw",
    seat: "AKD-03",
  },
  {
    name: "Keisya Rizkyka",
    role: "Staff Divisi Akademik",
    division: "akademik",
    divisionName: "Divisi Akademik",
    instagram: "@keisyarzkaa",
    seat: "AKD-06",
  },
];

type Division = RistekMember2026["division"];

// Nomor kursi tetap untuk nama yang diketik sendiri, dibedakan per divisi.
function generateUniqueSeat(name: string, division: Division): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const num = (Math.abs(hash) % 20) + 10; // 10 - 29
  const prefix = division === "pti" ? "PTI" : division === "akademik" ? "AKD" : "LEAD";
  return `${prefix}-${num}`;
}

const DIVISION_LABEL: Record<Division, string> = {
  pimpinan: "Pimpinan RISTEK",
  pti: "Divisi PTI",
  akademik: "Divisi Akademik",
};

const SEAT_COLOR: Record<string, string> = {
  PTI: "text-blue",
  AKD: "text-rose",
  LEAD: "text-gold",
  PIM: "text-gold",
  VIP: "text-gold",
};

const fieldClass =
  "w-full px-4 py-3 rounded-xl bg-surface border border-line text-fg focus:outline-none focus:border-gold/60 transition-colors";

export default function BoardingPassGenerator() {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isCustom, setIsCustom] = useState(false);
  const [customName, setCustomName] = useState("");
  const [customDivision, setCustomDivision] = useState<Division>("pti");
  const [customRole, setCustomRole] = useState("Tamu Farewell Ristek 2026");
  const [customIg, setCustomIg] = useState("");

  const member = RISTEK_MEMBERS_2026[selectedIndex];
  const activeName = isCustom ? customName || "Nama kamu" : member.name;
  const activeRole = isCustom ? customRole : member.role;
  const activeDivisionName = isCustom ? DIVISION_LABEL[customDivision] : member.divisionName;
  const activeIg = isCustom ? customIg : member.instagram;

  const activeSeat = useMemo(
    () => (isCustom ? generateUniqueSeat(customName || "Tamu", customDivision) : member.seat),
    [isCustom, customName, customDivision, member.seat]
  );

  const groups: { label: string; division: Division }[] = [
    { label: "Pimpinan RISTEK", division: "pimpinan" },
    { label: "Staff Divisi PTI", division: "pti" },
    { label: "Staff Divisi Akademik", division: "akademik" },
  ];

  return (
    <section id="boarding-pass" className="px-4 sm:px-6 py-20 sm:py-28">
      <div className="max-w-6xl mx-auto">
        <SectionHeading index="04" label="Boarding pass" title="Ambil tiketmu">
          Pilih namamu, nomor kursi sudah diacak per divisi. Screenshot tiketnya
          buat story, jangan lupa tag @himsi.ristek.
        </SectionHeading>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-5">
            <div className="space-y-4 rounded-2xl glass p-5 sm:p-6">
              <label className="block">
                <span className="block text-sm font-medium text-muted mb-1.5">Nama</span>
                <select
                  value={isCustom ? "custom" : selectedIndex}
                  onChange={(e) => {
                    if (e.target.value === "custom") {
                      setIsCustom(true);
                    } else {
                      setIsCustom(false);
                      setSelectedIndex(Number(e.target.value));
                    }
                  }}
                  className={`${fieldClass} cursor-pointer`}
                >
                  {groups.map((g) => (
                    <optgroup key={g.division} label={g.label}>
                      {RISTEK_MEMBERS_2026.map((m, idx) =>
                        m.division === g.division ? (
                          <option key={m.name} value={idx}>
                            {m.name}
                          </option>
                        ) : null
                      )}
                    </optgroup>
                  ))}
                  <optgroup label="Lainnya">
                    <option value="custom">Tamu / ketik nama sendiri</option>
                  </optgroup>
                </select>
              </label>

              {isCustom && (
                <div className="space-y-4">
                  <label className="block">
                    <span className="block text-sm font-medium text-muted mb-1.5">Nama lengkap / panggilan</span>
                    <input
                      type="text"
                      value={customName}
                      onChange={(e) => setCustomName(e.target.value)}
                      maxLength={26}
                      className={fieldClass}
                    />
                  </label>
                  <label className="block">
                    <span className="block text-sm font-medium text-muted mb-1.5">Kursi di area</span>
                    <select
                      value={customDivision}
                      onChange={(e) => setCustomDivision(e.target.value as Division)}
                      className={`${fieldClass} cursor-pointer`}
                    >
                      <option value="pti">Divisi PTI</option>
                      <option value="akademik">Divisi Akademik</option>
                      <option value="pimpinan">Tamu / Pimpinan</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className="block text-sm font-medium text-muted mb-1.5">Peran</span>
                    <input
                      type="text"
                      value={customRole}
                      onChange={(e) => setCustomRole(e.target.value)}
                      placeholder="Demisioner Ristek, tamu, dll."
                      maxLength={36}
                      className={fieldClass}
                    />
                  </label>
                  <label className="block">
                    <span className="block text-sm font-medium text-muted mb-1.5">Instagram (opsional)</span>
                    <input
                      type="text"
                      value={customIg}
                      onChange={(e) => setCustomIg(e.target.value)}
                      placeholder="@username"
                      maxLength={24}
                      className={fieldClass}
                    />
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* Tiket */}
          <div className="lg:col-span-7 flex justify-center">
            <motion.div
              key={activeName + activeSeat}
              initial={{ opacity: 0, y: 10, rotateX: 8 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="ring-orbit w-full max-w-xl rounded-3xl"
            >
              <div className="relative flex flex-col sm:flex-row rounded-3xl overflow-hidden bg-gradient-to-br from-surface-2 via-surface to-bg border border-line shadow-2xl shadow-black/50">
                <div aria-hidden="true" className="absolute -top-20 -left-10 w-64 h-64 rounded-full bg-gold/10 blur-3xl" />

                <div className="relative flex-1 p-6 sm:p-7">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Image src="/logo.png" alt="" width={34} height={34} />
                      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Boarding pass</span>
                    </div>
                    <span className="font-mono text-[11px] text-muted tabular-nums">24.10.2026</span>
                  </div>

                  <div className="mt-6 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-3xl sm:text-4xl font-extrabold leading-none">PLG</p>
                      <p className="mt-1.5 text-xs text-muted">RISTEK HIMSI UNSRI</p>
                    </div>
                    <div className="flex-1 flex items-center gap-2 text-gold">
                      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/60" />
                      <Plane className="w-5 h-5 shrink-0" />
                      <span className="h-px flex-1 bg-gradient-to-r from-gold/60 to-transparent" />
                    </div>
                    <div className="text-right">
                      <p className="text-3xl sm:text-4xl font-extrabold leading-none text-gold-shine">NXT</p>
                      <p className="mt-1.5 text-xs text-muted">Bab selanjutnya</p>
                    </div>
                  </div>

                  <dl className="mt-7 grid grid-cols-2 gap-x-4 gap-y-4">
                    <div className="col-span-2">
                      <dt className="font-mono text-[11px] uppercase tracking-wider text-muted">Penumpang</dt>
                      <dd className="mt-0.5 text-2xl font-bold leading-tight truncate">{activeName}</dd>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <dt className="font-mono text-[11px] uppercase tracking-wider text-muted">Peran</dt>
                      <dd className="mt-0.5 text-sm leading-snug">{activeRole}</dd>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <dt className="font-mono text-[11px] uppercase tracking-wider text-muted">Instagram</dt>
                      <dd className="mt-0.5 text-sm font-mono text-blue">{activeIg || "–"}</dd>
                    </div>
                  </dl>
                </div>

                {/* Sobekan */}
                <div className="relative sm:w-44 p-6 flex sm:flex-col justify-between items-center sm:items-start gap-4 border-t sm:border-t-0 sm:border-l border-dashed border-line-strong bg-white/[0.02]">
                  <span aria-hidden="true" className="absolute -top-3 -left-3 sm:-left-3 w-6 h-6 rounded-full bg-bg" />
                  <span aria-hidden="true" className="absolute -bottom-3 -left-3 hidden sm:block w-6 h-6 rounded-full bg-bg" />
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-wider text-muted">Kursi</p>
                    <p className={`mt-1 font-mono text-3xl font-bold leading-none tabular-nums whitespace-nowrap ${SEAT_COLOR[activeSeat.slice(0, 3)] ?? "text-gold"}`}>
                      {activeSeat}
                    </p>
                  </div>
                  <div className="text-right sm:text-left">
                    <p className="font-mono text-[11px] uppercase tracking-wider text-muted">Area</p>
                    <p className="text-sm font-semibold leading-snug">{activeDivisionName}</p>
                    <p className="mt-3 font-mono text-[11px] uppercase tracking-wider text-muted">Boarding</p>
                    <p className="text-sm font-semibold tabular-nums">09.00 WIB</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
