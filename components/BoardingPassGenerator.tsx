"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";

export interface RistekMember2026 {
  name: string;
  role: string;
  division: "bph" | "pti" | "akademik";
  divisionName: string;
  instagram: string;
  seat: string;
}

export const RISTEK_MEMBERS_2026: RistekMember2026[] = [
  // --- Pimpinan Departemen (BPH) ---
  {
    name: "M. Fahri Ramadhan",
    role: "Kepala Departemen Ristek 2026",
    division: "bph",
    divisionName: "Pimpinan Departemen",
    instagram: "@_fahrirm",
    seat: "BPH-01",
  },
  {
    name: "Revanna Aulia Putri",
    role: "Wakil Kepala Departemen Ristek 2026",
    division: "bph",
    divisionName: "Pimpinan Departemen",
    instagram: "@revannaauliaa",
    seat: "BPH-02",
  },

  // --- Divisi Pengembangan Teknologi Informasi (PTI) ---
  // Nomor kursi diacak khusus divisi PTI
  {
    name: "M. Naufal Rafif Pratama",
    role: "Kepala Divisi PTI",
    division: "pti",
    divisionName: "Divisi PTI",
    instagram: "@nfalrfif",
    seat: "PTI-07",
  },
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
    seat: "PTI-09",
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
    seat: "PTI-08",
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

  // --- Divisi Akademik ---
  // Nomor kursi diacak khusus divisi Akademik
  {
    name: "Calista Alysia Rasendriya",
    role: "Kepala Divisi Akademik",
    division: "akademik",
    divisionName: "Divisi Akademik",
    instagram: "@calistaalysia_",
    seat: "AKD-05",
  },
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
    seat: "AKD-09",
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
    seat: "AKD-07",
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
  const prefix = division === "pti" ? "PTI" : division === "akademik" ? "AKD" : "VIP";
  return `${prefix}-${num}`;
}

const DIVISION_LABEL: Record<Division, string> = {
  bph: "Tamu / BPH",
  pti: "Divisi PTI",
  akademik: "Divisi Akademik",
};

const fieldClass =
  "w-full px-3.5 py-2.5 rounded-md bg-paper border border-line text-ink focus:outline-none focus:border-maroon";

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
    { label: "Pimpinan Departemen", division: "bph" },
    { label: "Divisi PTI", division: "pti" },
    { label: "Divisi Akademik", division: "akademik" },
  ];

  return (
    <section id="boarding-pass" className="px-4 sm:px-6 py-20 sm:py-28">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        <div className="lg:col-span-5">
          <SectionHeading note="tiket masuk" title="Ambil tiketmu">
            Pilih namamu, nomor kursimu sudah diacak per divisi. Screenshot
            tiketnya buat story, jangan lupa tag @himsi.ristek.
          </SectionHeading>

          <div className="space-y-4">
            <label className="block">
              <span className="block text-sm font-medium mb-1.5">Nama</span>
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
                  <span className="block text-sm font-medium mb-1.5">Nama lengkap / panggilan</span>
                  <input
                    type="text"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    maxLength={26}
                    className={fieldClass}
                  />
                </label>
                <label className="block">
                  <span className="block text-sm font-medium mb-1.5">Kursi di area</span>
                  <select
                    value={customDivision}
                    onChange={(e) => setCustomDivision(e.target.value as Division)}
                    className={`${fieldClass} cursor-pointer`}
                  >
                    <option value="pti">Divisi PTI</option>
                    <option value="akademik">Divisi Akademik</option>
                    <option value="bph">Tamu / BPH</option>
                  </select>
                </label>
                <label className="block">
                  <span className="block text-sm font-medium mb-1.5">Peran</span>
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
                  <span className="block text-sm font-medium mb-1.5">Instagram (opsional)</span>
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
        <div className="lg:col-span-7 flex justify-center lg:pt-16">
          <div className="w-full max-w-xl flex flex-col sm:flex-row bg-card text-ink shadow-[0_16px_40px_-20px_rgba(43,29,26,0.5)] rounded-lg overflow-hidden">
            <div className="flex-1 p-6 sm:p-7">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Image src="/logo.png" alt="" width={36} height={36} />
                  <span className="text-xs font-semibold tracking-widest uppercase">Boarding pass</span>
                </div>
                <span className="text-xs text-ink-soft">24.10.2026</span>
              </div>

              <div className="mt-6 flex items-end justify-between gap-3">
                <div>
                  <p className="font-serif text-3xl sm:text-4xl leading-none">IDL</p>
                  <p className="mt-1 text-xs text-ink-soft">Fasilkom Unsri</p>
                </div>
                <div className="flex-1 mb-3 border-t-2 border-dashed border-line relative">
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-card px-2 font-hand text-lg text-maroon leading-none whitespace-nowrap">
                    sekali jalan
                  </span>
                </div>
                <div className="text-right">
                  <p className="font-serif text-3xl sm:text-4xl leading-none">???</p>
                  <p className="mt-1 text-xs text-ink-soft">Bab selanjutnya</p>
                </div>
              </div>

              <dl className="mt-7 grid grid-cols-2 gap-x-4 gap-y-4 text-sm">
                <div className="col-span-2">
                  <dt className="text-xs text-ink-soft">Penumpang</dt>
                  <dd className="font-serif text-2xl leading-tight truncate">{activeName}</dd>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <dt className="text-xs text-ink-soft">Peran</dt>
                  <dd className="font-medium leading-snug">{activeRole}</dd>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <dt className="text-xs text-ink-soft">Instagram</dt>
                  <dd className="font-medium">{activeIg || "–"}</dd>
                </div>
              </dl>
            </div>

            {/* Sobekan */}
            <div className="relative sm:w-44 bg-maroon text-paper p-6 flex sm:flex-col justify-between items-center sm:items-start border-t-2 sm:border-t-0 sm:border-l-2 border-dashed border-paper/40">
              <div>
                <p className="text-xs text-paper/70">Kursi</p>
                <p className="font-serif text-3xl leading-none mt-1 tabular-nums whitespace-nowrap">{activeSeat}</p>
              </div>
              <div className="text-right sm:text-left">
                <p className="text-xs text-paper/70">Area</p>
                <p className="font-medium leading-snug">{activeDivisionName}</p>
                <p className="text-xs text-paper/70 mt-3">Boarding</p>
                <p className="font-medium tabular-nums">09.00 WIB</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
