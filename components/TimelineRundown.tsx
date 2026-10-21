"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  Gift,
  HeartHandshake,
  Coffee,
  Sparkles,
  CheckSquare,
  Square,
  AlertCircle,
  Camera,
  Utensils,
  Trophy,
} from "lucide-react";

interface ScheduleItem {
  time: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  isHighlight?: boolean;
  highlightTag?: string;
  highlightColor?: string;
}

export default function TimelineRundown() {
  const [checklist, setChecklist] = useState<{ [key: string]: boolean }>({
    surat: false,
    kado: false,
    dresscode: false,
    pesan: false,
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem("ristek_farewell_checklist");
      if (saved) {
        setChecklist(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const toggleChecklist = (key: string) => {
    setChecklist((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      try {
        localStorage.setItem("ristek_farewell_checklist", JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const schedule: ScheduleItem[] = [
    {
      time: "09.00 – 09.30 WIB",
      title: "Check-in & Morning Coffee Gathering",
      description: "Kedatangan seluruh staf Ristek, presensi, ngopi santai & warming up temu kangen.",
      icon: <Coffee className="w-4 h-4 text-amber-400" />,
    },
    {
      time: "09.30 – 10.15 WIB",
      title: "Opening Ceremony & Sambutan BPH",
      description: "Pembukaan formal, sambutan hangat dari Kahim HIMSI & Kepala Departemen Ristek 2026.",
      icon: <Sparkles className="w-4 h-4 text-blue-400" />,
    },
    {
      time: "10.15 – 11.00 WIB",
      title: "Ristek Flashback & Fun Tech Mini-Games",
      description: "Nonton video kilas balik satu periode dan kuis trivia inside jokes seputar proker.",
      icon: <Trophy className="w-4 h-4 text-cyan-400" />,
    },
    {
      time: "11.00 – 11.30 WIB",
      title: "Secret Appreciation Reveal Session",
      description: "Sesi pembacaan pesan anonim satu per satu di proyektor besar. Mengharukan, kocak, dan penuh emosi!",
      icon: <HeartHandshake className="w-4 h-4 text-pink-400" />,
      isHighlight: true,
      highlightTag: "SESI UTAMA • SIAPKAN TISSU 🥺",
      highlightColor: "border-pink-500/60 bg-pink-500/10 text-pink-300",
    },
    {
      time: "11.30 – 13.00 WIB",
      title: "ISHOMA & Lunch Bareng",
      description: "Sholat Dhuhur berjamaah dan makan siang prasmanan santai bersama seluruh pengurus.",
      icon: <Utensils className="w-4 h-4 text-emerald-400" />,
    },
    {
      time: "13.00 – 13.45 WIB",
      title: "Ristek Hall of Fame & Awarding",
      description: "Penyerahan plakat apresiasi dan pengumuman pemenang nominasi terkocak satu periode.",
      icon: <Trophy className="w-4 h-4 text-amber-400" />,
    },
    {
      time: "13.45 – 14.30 WIB",
      title: "Tukar Surat & Kado Impian",
      description: "Sesi saling menukar surat deskripsi fisik dan kado kenang-kenangan yang dibawa dari rumah.",
      icon: <Gift className="w-4 h-4 text-amber-400" />,
      isHighlight: true,
      highlightTag: "WAJIB BAWA DARI RUMAH 🎁",
      highlightColor: "border-amber-500/60 bg-amber-500/10 text-amber-300",
    },
    {
      time: "14.30 – 15.00 WIB",
      title: "Foto Bersama, Peluk Hangat & Closing",
      description: "Foto angkatan, foto per divisi, peluk hangat perpisahan, dan salam penutupan kepengurusan.",
      icon: <Camera className="w-4 h-4 text-purple-400" />,
    },
  ];

  return (
    <section id="rundown" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-14">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Detail Lokasi & Rundown Acara
        </h2>
        <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
          Pastikan hadir tepat waktu ya! Perhatikan dua sesi bertanda highlight khusus.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Venue Card & Preparation Checklist (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Location & Time Info Card */}
          <div className="p-6 rounded-2xl bg-[#0B1228] border border-slate-800 shadow-xl shadow-blue-950/20">
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-rose-400" />
              <span>Lokasi & Waktu Acara</span>
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-slate-300 font-sans">
              <div className="flex items-start gap-3">
                <Calendar className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Sabtu, 24 Oktober 2026</div>
                  <div className="text-slate-400 text-xs font-mono">H-2 menuju momen kenangan</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">09.00 – 15.00 WIB</div>
                  <div className="text-slate-400 text-xs font-mono">Diharapkan hadir 15 menit sebelum acara</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Auditorium / Ruang Rapat Fasilkom Unsri</div>
                  <div className="text-slate-400 text-xs">Kampus Fasilkom Universitas Sriwijaya, Indralaya</div>
                </div>
              </div>
            </div>

            {/* Embedded Interactive Google Maps View */}
            <div className="mt-4 w-full h-44 rounded-xl overflow-hidden border border-slate-700/80 shadow-inner relative bg-slate-900">
              <iframe
                title="Google Maps Lokasi Fasilkom Unsri"
                src="https://maps.google.com/maps?q=Fakultas+Ilmu+Komputer+Universitas+Sriwijaya+Indralaya&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "contrast(1.05) saturate(1.1)" }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="mt-4 pt-4 border-t border-slate-800">
              <a
                href="https://maps.google.com/?q=Fakultas+Ilmu+Komputer+Universitas+Sriwijaya"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 text-xs font-mono font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Buka Rute Lengkap di Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
            </div>
          </div>

          {/* Interactive Preparation Checklist Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 via-[#0B1228] to-[#090D1E] border border-amber-500/30 shadow-xl">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold text-white">
                Checklist Persiapan Staf
              </h3>
            </div>
            <p className="text-xs text-slate-400 mb-4 font-mono">
              Centang hal yang sudah kamu siapkan dari rumah:
            </p>

            <div className="space-y-3 text-xs sm:text-sm">
              {[
                {
                  id: "surat",
                  label: "Surat Apresiasi / Surat Deskripsi Fisik",
                  sub: "Tulis tangan atau cetak pesan hangat buat rekan Ristek.",
                },
                {
                  id: "kado",
                  label: "Kado Tukar Kado (Bungkus Koran/Kado)",
                  sub: "Nominal terjangkau dan ikhlas, dikumpulkan di pintu masuk.",
                },
                {
                  id: "pesan",
                  label: "Sudah Isi Form Secret Appreciation di Web",
                  sub: "Paling lambat Jumat malam agar masuk daftar baca.",
                },
                {
                  id: "dresscode",
                  label: "Dresscode Rapi & Nyaman (Batik / Smart Casual)",
                  sub: "Siapkan senyum terbaikmu untuk sesi foto bareng.",
                },
              ].map((item) => {
                const checked = checklist[item.id];
                return (
                  <button
                    key={item.id}
                    onClick={() => toggleChecklist(item.id)}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${
                      checked
                        ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-200"
                        : "bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700"
                    }`}
                  >
                    <span className="shrink-0 mt-0.5">
                      {checked ? (
                        <CheckSquare className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-500" />
                      )}
                    </span>
                    <div>
                      <div className={`font-semibold ${checked ? "line-through text-slate-400" : "text-white"}`}>
                        {item.label}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {item.sub}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Schedule Timeline (7 cols) */}
        <div className="lg:col-span-7">
          <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2.5 sm:before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-blue-500 before:via-amber-400 before:to-pink-500">
            {schedule.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="relative group"
              >
                {/* Timeline node dot */}
                <div
                  className={`absolute -left-6 sm:-left-8 top-1.5 w-5 h-5 rounded-full flex items-center justify-center border-2 transition-transform group-hover:scale-125 ${
                    item.isHighlight
                      ? "bg-amber-400 border-amber-300 shadow-md shadow-amber-400/50"
                      : "bg-[#0B1228] border-blue-400 text-blue-400"
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                </div>

                {/* Timeline Content Card */}
                <div
                  className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                    item.isHighlight
                      ? "bg-gradient-to-r from-amber-500/10 via-[#0E1733] to-[#0A1024] border-amber-400/50 shadow-lg shadow-amber-500/10"
                      : "bg-[#090E20]/90 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1.5">
                      {item.icon}
                      {item.time}
                    </span>

                    {item.isHighlight && (
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${item.highlightColor}`}
                      >
                        {item.highlightTag}
                      </span>
                    )}
                  </div>

                  <h4 className="text-sm sm:text-base font-bold text-white mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
