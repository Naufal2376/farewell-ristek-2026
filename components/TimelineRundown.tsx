"use client";

import React, { useState } from "react";
import { Check, CalendarDays, Clock, Sparkles } from "lucide-react";
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
    time: "09.00 – 09.30",
    title: "Kumpul dan persiapan",
    description: "Kedatangan seluruh anggota RISTEK, presensi, dan persiapan pembukaan acara.",
  },
  {
    time: "09.30 – 10.00",
    title: "Ngobrol santai dan ice breaking",
    description: "Mencairkan suasana, ngobrol santai, dan games ice breaking seru.",
  },
  {
    time: "10.00 – 11.00",
    title: "Games seru bareng",
    description: "Berbagai mini games kebersamaan yang seru bareng seluruh keluarga Ristek.",
  },
  {
    time: "11.00 – 11.30",
    title: "Appreciation time",
    description: "Sesi pembacaan secret appreciation dan pesan anonim yang masuk di website.",
    highlight: "Isi form sebelum Jumat malam",
  },
  {
    time: "11.30 – 12.00",
    title: "Sharing cerita dan kenangan selama di RISTEK",
    description: "Kilas balik pengalaman suka duka, keluh kesah, dan cerita tak terlupakan satu periode.",
  },
  {
    time: "12.00 – 13.00",
    title: "ISHOMA",
    description: "Istirahat, salat berjamaah, dan makan siang bersama.",
  },
  {
    time: "13.00 – 13.45",
    title: "Games tebak-tebakan tentang anggota RISTEK",
    description: "Kuis seru seputar fakta unik, kebiasaan lucu, dan inside jokes anak Ristek.",
  },
  {
    time: "13.45 – 14.30",
    title: "Tukar surat desc atau hadiah kecil (tukar kado max 10 rb)",
    description: "Saling tukar surat deskripsi rekan kerja dan kado kecil yang dibawa dari rumah.",
    highlight: "Bawa dari rumah · Maks 10 rb",
  },
  {
    time: "14.30 – 15.00",
    title: "Sesi foto dan video TikTok",
    description: "Foto angkatan, foto per divisi, pose bebas, dan bikin konten video TikTok kenangan.",
  },
  {
    time: "15.00 – 15.05",
    title: "Closing, pesan terakhir, dan doa bersama",
    description: "Pesan penutup kepengurusan dari pimpinan, doa bersama, dan salam perpisahan resmi.",
  },
];

const checklistItems = [
  {
    id: "surat",
    label: "Surat deskripsi / apresiasi",
    sub: "Tulis tangan atau cetak untuk rekan RISTEK.",
  },
  {
    id: "kado",
    label: "Hadiah tukar kado (maks. Rp10.000)",
    sub: "Kado kecil yang dibungkus rapi dari rumah.",
  },
  {
    id: "pesan",
    label: "Sudah kirim secret appreciation",
    sub: "Kirim pesan lewat form di website sebelum acara.",
  },
  {
    id: "dresscode",
    label: "Outfit rapi & nyaman",
    sub: "Siap buat sesi foto bersama & video TikTok.",
  },
];

const STORAGE_KEY = "ristek_farewell_checklist";

export default function TimelineRundown() {
  const [checklist, setChecklist] = useState<Record<string, boolean>>(() => {
    if (typeof window === "undefined") return {};
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

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
        <SectionHeading index="02" label="Rundown" title="Rundown acara">
          Sabtu, 24 Oktober 2026 · 09.00–15.05 WIB. Dua sesi bertanda emas butuh persiapan dari rumah.
        </SectionHeading>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Detail acara & checklist */}
          <aside className="lg:col-span-5 space-y-5 lg:sticky lg:top-24">
            <Reveal>
              <SpotlightCard className="p-5 sm:p-6">
                <div className="flex items-center gap-2 text-gold">
                  <Sparkles className="w-5 h-5" />
                  <h3 className="font-bold text-lg text-fg">Detail Acara</h3>
                </div>
                <p className="mt-2 text-xl font-extrabold text-gold-shine">
                  FAREWELL PARTY DEPARTEMEN RISTEK 🫶🏻
                </p>

                <div className="mt-5 space-y-3 font-mono text-sm">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-2/60 border border-line">
                    <CalendarDays className="w-4 h-4 text-gold shrink-0" />
                    <span className="font-semibold text-fg">Sabtu, 24 Oktober 2026</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-2/60 border border-line">
                    <Clock className="w-4 h-4 text-gold shrink-0" />
                    <span className="font-semibold text-fg">09.00 – 15.05 WIB</span>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-line text-xs text-muted leading-relaxed space-y-2">
                  <p className="flex items-start gap-2">
                    <span className="text-gold">✦</span>
                    <span>Jangan lupa siapkan surat deskripsi dan kado kecil (maks. 10 rb) dari rumah.</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-gold">✦</span>
                    <span>Info detail titik temu koordinasi dibagikan panitia di grup WhatsApp internal Ristek.</span>
                  </p>
                </div>
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
