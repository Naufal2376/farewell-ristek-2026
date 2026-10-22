"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Film, Maximize2, Pause, Play } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

export interface KlisePhoto {
  id: number;
  src: string;
  title: string;
  caption: string;
  location?: string;
  frameCode: string;
}

export const KLISE_PHOTOS: KlisePhoto[] = [
  {
    id: 1,
    src: "/galeri/klise/foto-01.jpg",
    title: "Metu & Nongkrong Santai",
    caption: "Momen melepas penat bareng anak Ristek setelah serangkaian proker selesai.",
    location: "Palembang",
    frameCode: "EXP 01A",
  },
  {
    id: 2,
    src: "/galeri/klise/foto-02.jpg",
    title: "Jalan-Jalan Sore",
    caption: "Keliling sore sambil cerita ngalor-ngidul, dari kuliah sampai overthinking masa depan.",
    location: "Indralaya",
    frameCode: "EXP 02A",
  },
  {
    id: 3,
    src: "/galeri/klise/foto-03.jpg",
    title: "Tawa Lepas di Luar Rapat",
    caption: "Candid tawa lepas yang gak pernah kelihatan kalau lagi rapat formal di Discord.",
    location: "Hangout Spot",
    frameCode: "EXP 03A",
  },
  {
    id: 4,
    src: "/galeri/klise/foto-04.jpg",
    title: "Kumpul di Kafe Favorit",
    caption: "Niatnya nugas atau evaluasi, ujung-ujungnya malah main kartu dan gibah santai.",
    location: "Coffee Shop",
    frameCode: "EXP 04A",
  },
  {
    id: 5,
    src: "/galeri/klise/foto-05.jpg",
    title: "Patungan Makan & Ngobrol",
    caption: "Paling seru pas bayar kasir: 'Eh ini punya siapa tadi?', 'Gua belum bayar es teh!'",
    location: "Kantin / Resto",
    frameCode: "EXP 05A",
  },
  {
    id: 6,
    src: "/galeri/klise/foto-06.jpg",
    title: "Momen Seru Tak Terduga",
    caption: "Momen-momen spontan yang sama sekali gak masuk di rundown acara tapi paling berkesan.",
    location: "Kampus Fasilkom",
    frameCode: "EXP 06A",
  },
  {
    id: 7,
    src: "/galeri/klise/foto-07.jpg",
    title: "Ramean Bareng Keluarga Ristek",
    caption: "Foto bersama formasi hangat. Bukti kalau kita bukan sekadar partner kerja, tapi teman.",
    location: "Palembang",
    frameCode: "EXP 07A",
  },
  {
    id: 8,
    src: "/galeri/klise/foto-08.jpg",
    title: "Satu Rasa, Satu Cerita",
    caption: "Dari yang awalnya malu-malu di awal periode, sampai akhirnya akrab tanpa canggung.",
    location: "Indralaya",
    frameCode: "EXP 08A",
  },
  {
    id: 9,
    src: "/galeri/klise/foto-09.jpg",
    title: "Momen Spontan Penuh Tawa",
    caption: "Kapan pun dan di mana pun kalau kumpul anak Ristek, pasti ada aja yang dibikin lucu.",
    location: "Outdoor",
    frameCode: "EXP 09A",
  },
  {
    id: 10,
    src: "/galeri/klise/foto-10.jpg",
    title: "Keliling Bareng Sebelum Demis",
    caption: "Memanfaatkan sisa-sisa waktu kepengurusan sebelum semua sibuk dengan jalan masing-masing.",
    location: "Palembang",
    frameCode: "EXP 10A",
  },
  {
    id: 11,
    src: "/galeri/klise/foto-11.jpg",
    title: "Kenangan Paling Berharga",
    caption: "Terima kasih untuk setiap kilometer perjalanan, setiap tawa, dan kenangan indah satu periode ini.",
    location: "Ristek HIMSI 2026",
    frameCode: "EXP 11A",
  },
];

// Baris sproket lubang klise 35mm film
function SprocketHoles() {
  return (
    <div className="flex justify-between items-center px-2 py-1.5 bg-black/90 border-line/40 select-none">
      {Array.from({ length: 14 }).map((_, i) => (
        <span
          key={i}
          className="w-2.5 h-3 rounded-[3px] bg-surface-2/80 border border-white/10 shrink-0"
        />
      ))}
    </div>
  );
}

export default function MemoriesFilmStrip() {
  const [selectedPhoto, setSelectedPhoto] = useState<KlisePhoto | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Duplikasi array untuk loop infinite marquee
  const photosRow1 = [...KLISE_PHOTOS, ...KLISE_PHOTOS];
  const photosRow2 = [...KLISE_PHOTOS.slice(5), ...KLISE_PHOTOS.slice(0, 5), ...KLISE_PHOTOS];

  const handlePrev = useCallback(() => {
    if (!selectedPhoto) return;
    const currentIndex = KLISE_PHOTOS.findIndex((p) => p.id === selectedPhoto.id);
    const prevIndex = (currentIndex - 1 + KLISE_PHOTOS.length) % KLISE_PHOTOS.length;
    setSelectedPhoto(KLISE_PHOTOS[prevIndex]);
  }, [selectedPhoto]);

  const handleNext = useCallback(() => {
    if (!selectedPhoto) return;
    const currentIndex = KLISE_PHOTOS.findIndex((p) => p.id === selectedPhoto.id);
    const nextIndex = (currentIndex + 1) % KLISE_PHOTOS.length;
    setSelectedPhoto(KLISE_PHOTOS[nextIndex]);
  }, [selectedPhoto]);

  // Keyboard navigation untuk lightbox modal
  useEffect(() => {
    if (!selectedPhoto) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedPhoto(null);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPhoto, handlePrev, handleNext]);

  return (
    <section id="klise-kenangan" className="py-20 sm:py-28 overflow-hidden relative">
      {/* Background glow aksen film roll */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 -left-40 w-96 h-96 rounded-full bg-gold/5 blur-[120px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute top-1/2 -right-40 w-96 h-96 rounded-full bg-blue/5 blur-[120px] pointer-events-none"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          index="03.5"
          label="Klise bergerak · 35mm memories"
          title="Di balik layar & metu bareng"
        >
          Koleksi foto candid, jalan-jalan santai, patungan makan, dan tawa lepas di luar proker
          formal. Gulir atau klik klise foto untuk memperbesar momen.
        </SectionHeading>

        {/* Kontrol interaktif play/pause */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass hover:border-line-strong text-xs font-mono text-muted hover:text-fg transition-colors cursor-pointer"
            aria-label={isPaused ? "Lanjutkan putaran klise" : "Jeda putaran klise"}
          >
            {isPaused ? <Play className="w-3.5 h-3.5 text-gold fill-current" /> : <Pause className="w-3.5 h-3.5 text-gold" />}
            <span>{isPaused ? "PUTAR KLISE" : "JEDA KLISE"}</span>
          </button>
          <span className="text-xs font-mono text-muted/60">· 11 FRAME TERSIMPAN</span>
        </div>
      </div>

      {/* Film Reel Roll 1 (Bergerak ke Kiri) */}
      <div className="relative w-full overflow-hidden select-none my-3 group">
        <div
          className={`flex gap-5 w-max animate-marquee ${
            isPaused ? "[animation-play-state:paused]" : "group-hover:[animation-play-state:paused]"
          }`}
        >
          {photosRow1.map((item, idx) => (
            <motion.div
              key={`row1-${item.id}-${idx}`}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedPhoto(item)}
              className="relative w-72 sm:w-80 shrink-0 rounded-2xl overflow-hidden bg-black/95 border-2 border-surface-2 shadow-xl shadow-black/60 cursor-pointer transition-all duration-300 group/frame"
            >
              {/* Lubang sprocket atas */}
              <SprocketHoles />

              {/* Header bingkai film analog */}
              <div className="flex items-center justify-between px-3 py-1 bg-black/90 font-mono text-[9px] text-amber-500/80 tracking-widest border-b border-white/5">
                <span>KODAK GOLD 400</span>
                <span>{item.frameCode}</span>
                <span>2026</span>
              </div>

              {/* Canvas foto */}
              <div className="relative aspect-[4/3] w-full bg-slate-950 overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 288px, 320px"
                  className="object-cover transition-transform duration-500 group-hover/frame:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-0 group-hover/frame:opacity-100 transition-opacity flex items-end p-3.5">
                  <div className="flex items-center gap-1.5 text-xs text-gold font-medium">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Perbesar foto</span>
                  </div>
                </div>
              </div>

              {/* Footer bingkai film analog */}
              <div className="p-3 bg-black/90 border-t border-white/5">
                <p className="font-sans font-bold text-sm text-fg truncate">{item.title}</p>
                <p className="mt-0.5 text-xs text-muted truncate">{item.caption}</p>
              </div>

              {/* Lubang sprocket bawah */}
              <SprocketHoles />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Film Reel Roll 2 (Bergerak ke Kanan) */}
      <div className="relative w-full overflow-hidden select-none my-3 group">
        <div
          className={`flex gap-5 w-max animate-marquee-reverse ${
            isPaused ? "[animation-play-state:paused]" : "group-hover:[animation-play-state:paused]"
          }`}
        >
          {photosRow2.map((item, idx) => (
            <motion.div
              key={`row2-${item.id}-${idx}`}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedPhoto(item)}
              className="relative w-72 sm:w-80 shrink-0 rounded-2xl overflow-hidden bg-black/95 border-2 border-surface-2 shadow-xl shadow-black/60 cursor-pointer transition-all duration-300 group/frame"
            >
              {/* Lubang sprocket atas */}
              <SprocketHoles />

              {/* Header bingkai film analog */}
              <div className="flex items-center justify-between px-3 py-1 bg-black/90 font-mono text-[9px] text-amber-500/80 tracking-widest border-b border-white/5">
                <span>FUJIFILM 400</span>
                <span>{item.frameCode}</span>
                <span>SAFETY FILM</span>
              </div>

              {/* Canvas foto */}
              <div className="relative aspect-[4/3] w-full bg-slate-950 overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 288px, 320px"
                  className="object-cover transition-transform duration-500 group-hover/frame:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-0 group-hover/frame:opacity-100 transition-opacity flex items-end p-3.5">
                  <div className="flex items-center gap-1.5 text-xs text-gold font-medium">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Perbesar foto</span>
                  </div>
                </div>
              </div>

              {/* Footer bingkai film analog */}
              <div className="p-3 bg-black/90 border-t border-white/5">
                <p className="font-sans font-bold text-sm text-fg truncate">{item.title}</p>
                <p className="mt-0.5 text-xs text-muted truncate">{item.caption}</p>
              </div>

              {/* Lubang sprocket bawah */}
              <SprocketHoles />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal Interaktif */}
      <AnimatePresence>
        {selectedPhoto && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 15 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl rounded-3xl overflow-hidden bg-surface border border-line-strong shadow-2xl shadow-black/90 flex flex-col"
            >
              {/* Header Modal */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-line bg-surface-2/60">
                <div className="flex items-center gap-2">
                  <Film className="w-4 h-4 text-gold" />
                  <span className="font-mono text-xs uppercase tracking-wider text-muted">
                    Roll Kenangan Ristek · {selectedPhoto.frameCode}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-muted tabular-nums">
                    {selectedPhoto.id} / {KLISE_PHOTOS.length}
                  </span>
                  <button
                    onClick={() => setSelectedPhoto(null)}
                    className="p-1.5 rounded-full hover:bg-white/10 text-muted hover:text-fg transition-colors"
                    aria-label="Tutup pratinjau"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Foto Utama */}
              <div className="relative aspect-[16/10] sm:aspect-[16/10] w-full bg-black/80 flex items-center justify-center overflow-hidden">
                <Image
                  src={selectedPhoto.src}
                  alt={selectedPhoto.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 800px"
                  className="object-cover"
                  priority
                />

                {/* Tombol navigasi slide di dalam modal */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full glass bg-black/40 hover:bg-black/80 text-fg transition-colors"
                  aria-label="Foto sebelumnya"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full glass bg-black/40 hover:bg-black/80 text-fg transition-colors"
                  aria-label="Foto berikutnya"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Deskripsi & Keterangan Foto */}
              <div className="p-5 sm:p-6 bg-surface">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-fg">
                    {selectedPhoto.title}
                  </h3>
                  {selectedPhoto.location && (
                    <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 border border-line text-gold">
                      📍 {selectedPhoto.location}
                    </span>
                  )}
                </div>
                <p className="mt-2.5 text-sm sm:text-base text-muted leading-relaxed">
                  {selectedPhoto.caption}
                </p>
                <div className="mt-4 pt-4 border-t border-line/60 flex items-center justify-between text-xs font-mono text-muted">
                  <span>Gunakan tombol panah ← → untuk melihat foto lain</span>
                  <span>Farewell Ristek 2026</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
