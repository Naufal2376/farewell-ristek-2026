"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpRight, Check, MapPin } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import SpotlightCard from "@/components/ui/SpotlightCard";
import Reveal from "@/components/ui/Reveal";

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
    <section id="rundown" className="px-4 sm:px-6 py-20 sm:py-28">
      <div className="max-w-6xl mx-auto">
        <SectionHeading index="02" label="Rundown" title="Lokasi & rundown acara">
          Sabtu, 24 Oktober 2026. Dua sesi bertanda emas butuh persiapan dari rumah.
        </SectionHeading>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Lokasi & checklist */}
          <aside className="lg:col-span-5 space-y-5 lg:sticky lg:top-24">
            <Reveal>
              <SpotlightCard className="p-5 sm:p-6">
                <h3 className="flex items-center gap-2 font-bold text-lg">
                  <MapPin className="w-5 h-5 text-gold" />
                  Lokasi
                </h3>
                <p className="mt-3 font-semibold">Auditorium / Ruang Rapat Fasilkom Unsri</p>
                <p className="text-sm text-muted">Fakultas Ilmu Komputer, Universitas Sriwijaya, Indralaya</p>
                <div className="mt-4 aspect-[16/10] w-full overflow-hidden rounded-xl border border-line">
                  <iframe
                    title="Peta Fasilkom Unsri Indralaya"
                    src="https://maps.google.com/maps?q=-3.219504,104.6511614&z=17&output=embed"
                    className="w-full h-full invert-[0.92] hue-rotate-180 saturate-[0.6] contrast-[0.9]"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=-3.219504,104.6511614"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-line hover:border-gold/50 hover:text-gold text-sm font-medium transition-colors"
                >
                  Buka rute di Google Maps
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </SpotlightCard>
            </Reveal>

            <Reveal delay={0.08}>
              <SpotlightCard className="p-5 sm:p-6">
                <h3 className="font-bold text-lg">Checklist bawaan</h3>
                <p className="mt-1 text-sm text-muted">Centang yang sudah siap. Tersimpan di HP-mu sendiri.</p>
                <ul className="mt-4 space-y-2">
                  {checklistItems.map((item) => {
                    const checked = !!checklist[item.id];
                    return (
                      <li key={item.id}>
                        <button
                          type="button"
                          role="checkbox"
                          aria-checked={checked}
                          onClick={() => toggleChecklist(item.id)}
                          className={`w-full text-left p-3 rounded-xl border flex items-start gap-3 transition-colors cursor-pointer ${
                            checked ? "border-gold/40 bg-gold/5" : "border-line hover:border-line-strong"
                          }`}
                        >
                          <span
                            className={`mt-0.5 w-5 h-5 shrink-0 rounded-md border flex items-center justify-center transition-colors ${
                              checked ? "bg-gold border-gold text-bg" : "border-line-strong"
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
              </SpotlightCard>
            </Reveal>
          </aside>

          {/* Rundown */}
          <ol className="lg:col-span-7 relative pl-7 sm:pl-9">
            <span aria-hidden="true" className="absolute left-[9px] sm:left-[13px] top-2 bottom-2 w-px bg-gradient-to-b from-gold/60 via-line-strong to-transparent" />
            {schedule.map((item, i) => (
              <li key={item.time} className="relative pb-4 last:pb-0">
                <span
                  aria-hidden="true"
                  className={`absolute -left-7 sm:-left-9 top-6 ml-[3px] sm:ml-[7px] w-3.5 h-3.5 rounded-full border-2 ${
                    item.highlight
                      ? "bg-gold border-gold shadow-[0_0_14px_rgb(251_191_36/0.7)]"
                      : "bg-bg border-line-strong"
                  }`}
                />
                <Reveal delay={Math.min(i * 0.04, 0.2)}>
                  <SpotlightCard
                    className={`p-5 sm:p-6 ${item.highlight ? "!border-gold/40 bg-gold/[0.04]" : ""}`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <time className="font-mono text-sm text-gold tabular-nums">{item.time} WIB</time>
                      {item.highlight && (
                        <span className="font-mono text-[11px] uppercase tracking-wider text-gold bg-gold/10 border border-gold/30 rounded-full px-2.5 py-1">
                          {item.highlight}
                        </span>
                      )}
                    </div>
                    <h3 className="mt-2 text-lg sm:text-xl font-bold leading-snug">{item.title}</h3>
                    <p className="mt-1 text-muted leading-relaxed">{item.description}</p>
                  </SpotlightCard>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
