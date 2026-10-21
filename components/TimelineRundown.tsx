"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

interface ScheduleItem {
  time: string;
  title: string;
  description: string;
  highlight?: string;
}

const schedule: ScheduleItem[] = [
  {
    time: "09.00",
    title: "Datang & ngopi pagi",
    description: "Presensi, ngopi santai, temu kangen.",
  },
  {
    time: "09.30",
    title: "Pembukaan & sambutan",
    description: "Sambutan dari Kahim HIMSI dan Kepala Departemen Ristek 2026.",
  },
  {
    time: "10.15",
    title: "Kilas balik & mini games",
    description: "Nonton video satu periode, lalu kuis inside jokes seputar proker.",
  },
  {
    time: "11.00",
    title: "Pembacaan secret appreciation",
    description: "Pesan anonim dari form di bawah dibacakan satu per satu di proyektor. Siapkan tisu.",
    highlight: "Isi form sebelum Jumat malam",
  },
  {
    time: "11.30",
    title: "Ishoma & makan siang",
    description: "Salat Zuhur berjamaah, lalu makan siang prasmanan bareng.",
  },
  {
    time: "13.00",
    title: "Hall of Fame & awarding",
    description: "Plakat apresiasi dan pengumuman nominasi paling kocak satu periode.",
  },
  {
    time: "13.45",
    title: "Tukar surat & kado",
    description: "Saling tukar surat deskripsi fisik dan kado kecil yang dibawa dari rumah.",
    highlight: "Bawa dari rumah",
  },
  {
    time: "14.30",
    title: "Foto bersama & penutupan",
    description: "Foto angkatan, foto per divisi, lalu salam penutup kepengurusan.",
  },
];

const checklistItems = [
  {
    id: "surat",
    label: "Surat apresiasi / deskripsi fisik",
    sub: "Tulis tangan atau cetak, buat rekan Ristek.",
  },
  {
    id: "kado",
    label: "Kado untuk tukar kado",
    sub: "Nominal terjangkau, dikumpulkan di pintu masuk.",
  },
  {
    id: "pesan",
    label: "Sudah isi secret appreciation",
    sub: "Paling lambat Jumat malam.",
  },
  {
    id: "dresscode",
    label: "Dresscode batik / smart casual",
    sub: "Rapi dan nyaman, buat sesi foto.",
  },
];

const STORAGE_KEY = "ristek_farewell_checklist";

export default function TimelineRundown() {
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setChecklist(JSON.parse(saved));
    } catch {
      // ignore
    }
  }, []);

  const toggleChecklist = (key: string) => {
    setChecklist((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  return (
    <section id="rundown" className="px-4 sm:px-6 py-20 sm:py-28 border-t border-line">
      <div className="max-w-6xl mx-auto">
        <SectionHeading index="02" label="Rundown" title="Jadwal & lokasi">
          Sabtu, 24 Oktober 2026. Sesi bertanda [!] butuh persiapan dari rumah.
        </SectionHeading>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Rundown */}
          <ol className="lg:col-span-7 border-l border-line">
            {schedule.map((item) => (
              <li key={item.time} className="relative pl-6 sm:pl-8 pb-7 last:pb-0">
                <span
                  aria-hidden="true"
                  className={`absolute -left-[5px] top-1.5 w-[9px] h-[9px] ${
                    item.highlight ? "bg-accent" : "bg-bg border border-line-strong"
                  }`}
                />
                <time className="font-mono text-sm text-accent tabular-nums">{item.time} WIB</time>
                <h3 className="mt-1 font-display font-semibold text-xl leading-snug">{item.title}</h3>
                <p className="mt-1 text-muted leading-relaxed">{item.description}</p>
                {item.highlight && (
                  <p className="mt-2 inline-block font-mono text-xs uppercase tracking-wider text-accent border border-accent/40 bg-accent-dim px-2 py-1">
                    [!] {item.highlight}
                  </p>
                )}
              </li>
            ))}
            <li className="relative pl-6 sm:pl-8">
              <span aria-hidden="true" className="absolute -left-[5px] top-1.5 w-[9px] h-[9px] bg-line-strong" />
              <time className="font-mono text-sm text-muted tabular-nums">15.00 WIB</time>
              <p className="mt-1 text-muted">Selesai.</p>
            </li>
          </ol>

          {/* Lokasi & checklist */}
          <aside className="lg:col-span-5 space-y-8">
            <div className="border border-line bg-surface">
              <div className="p-5">
                <p className="font-mono text-[11px] uppercase tracking-wider text-muted">Lokasi</p>
                <p className="mt-2 font-semibold">Auditorium / Ruang Rapat Fasilkom Unsri</p>
                <p className="text-sm text-muted">Fakultas Ilmu Komputer, Universitas Sriwijaya, Indralaya</p>
                <p className="mt-2 font-mono text-[11px] text-muted">-3.2195, 104.6512</p>
              </div>
              <div className="aspect-[4/3] w-full overflow-hidden border-y border-line">
                <iframe
                  title="Peta Fasilkom Unsri Indralaya"
                  src="https://maps.google.com/maps?q=-3.219504,104.6511614&z=17&output=embed"
                  className="w-full h-full invert-[0.9] hue-rotate-180 contrast-[0.9]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=-3.219504,104.6511614"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-5 py-3 font-mono text-sm text-accent hover:bg-surface-2 transition-colors"
              >
                Buka rute di Google Maps
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            <div className="border border-line bg-surface p-5">
              <p className="font-mono text-[11px] uppercase tracking-wider text-muted">Checklist</p>
              <h3 className="mt-2 font-display font-semibold text-xl">Yang perlu dibawa</h3>
              <p className="mt-1 text-sm text-muted">Centang yang sudah siap. Tersimpan di HP-mu sendiri.</p>
              <ul className="mt-4 divide-y divide-line">
                {checklistItems.map((item) => {
                  const checked = !!checklist[item.id];
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        role="checkbox"
                        aria-checked={checked}
                        onClick={() => toggleChecklist(item.id)}
                        className="w-full text-left py-3 flex items-start gap-3 cursor-pointer"
                      >
                        <span
                          className={`mt-0.5 w-5 h-5 shrink-0 border flex items-center justify-center transition-colors ${
                            checked ? "bg-accent border-accent text-bg" : "border-line-strong"
                          }`}
                        >
                          {checked && <Check className="w-3.5 h-3.5" strokeWidth={3} />}
                        </span>
                        <span>
                          <span className={`block font-medium ${checked ? "line-through text-muted" : ""}`}>
                            {item.label}
                          </span>
                          <span className="block text-sm text-muted">{item.sub}</span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
