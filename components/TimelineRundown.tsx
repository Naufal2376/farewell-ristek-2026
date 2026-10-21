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
    <section id="rundown" className="px-4 sm:px-6 py-20 sm:py-28">
      <div className="max-w-6xl mx-auto">
        <SectionHeading note="catat jamnya" title="Rundown & lokasi">
          Sabtu, 24 Oktober 2026. Dua sesi yang butuh persiapan dari rumah
          ditandai merah.
        </SectionHeading>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Rundown */}
          <ol className="lg:col-span-7 border-t border-ink">
            {schedule.map((item) => (
              <li
                key={item.time}
                className="grid grid-cols-[4.5rem_1fr] sm:grid-cols-[6rem_1fr] gap-4 py-5 border-b border-line"
              >
                <time className="font-serif text-2xl tabular-nums leading-none pt-0.5">{item.time}</time>
                <div>
                  <h3 className={`font-semibold text-lg leading-snug ${item.highlight ? "text-maroon" : ""}`}>
                    {item.title}
                  </h3>
                  <p className="mt-1 text-ink-soft leading-relaxed">{item.description}</p>
                  {item.highlight && (
                    <p className="mt-2 font-hand text-xl text-maroon">→ {item.highlight}</p>
                  )}
                </div>
              </li>
            ))}
            <li className="grid grid-cols-[4.5rem_1fr] sm:grid-cols-[6rem_1fr] gap-4 py-5">
              <time className="font-serif text-2xl tabular-nums leading-none text-ink-soft">15.00</time>
              <p className="text-ink-soft">Selesai.</p>
            </li>
          </ol>

          {/* Lokasi & checklist */}
          <aside className="lg:col-span-5 space-y-10">
            <div>
              <h3 className="font-serif text-2xl">Lokasi</h3>
              <p className="mt-2 font-semibold">Auditorium / Ruang Rapat Fasilkom Unsri</p>
              <p className="text-ink-soft">Fakultas Ilmu Komputer, Universitas Sriwijaya, Indralaya</p>

              <div className="mt-4 aspect-[4/3] w-full overflow-hidden rounded-lg border border-line bg-paper-2">
                <iframe
                  title="Peta Fasilkom Unsri Indralaya"
                  src="https://maps.google.com/maps?q=-3.219504,104.6511614&z=17&output=embed"
                  className="w-full h-full grayscale-[0.4] sepia-[0.15]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=-3.219504,104.6511614"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1 font-medium text-maroon underline underline-offset-4"
              >
                Buka rute di Google Maps
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            <div className="bg-card border border-line rounded-lg p-5 sm:p-6">
              <h3 className="font-serif text-2xl">Yang perlu dibawa</h3>
              <p className="mt-1 text-sm text-ink-soft">Centang yang sudah siap. Tersimpan di HP-mu sendiri.</p>
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
                          className={`mt-0.5 w-5 h-5 shrink-0 rounded border flex items-center justify-center transition-colors ${
                            checked ? "bg-maroon border-maroon text-paper" : "border-ink-soft/60 bg-paper"
                          }`}
                        >
                          {checked && <Check className="w-3.5 h-3.5" strokeWidth={3} />}
                        </span>
                        <span>
                          <span className={`block font-medium ${checked ? "line-through text-ink-soft" : ""}`}>
                            {item.label}
                          </span>
                          <span className="block text-sm text-ink-soft">{item.sub}</span>
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
