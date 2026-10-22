"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Film, Maximize2 } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

export interface KlisePhoto {
  id: number;
  src: string;
  frameCode: string;
}

export const KLISE_PHOTOS: KlisePhoto[] = [
  { id: 1, src: "/galeri/klise/foto-01.jpg", frameCode: "EXP 01A" },
  { id: 2, src: "/galeri/klise/foto-02.jpg", frameCode: "EXP 02A" },
  { id: 3, src: "/galeri/klise/foto-03.jpg", frameCode: "EXP 03A" },
  { id: 4, src: "/galeri/klise/foto-04.jpg", frameCode: "EXP 04A" },
  { id: 5, src: "/galeri/klise/foto-05.jpg", frameCode: "EXP 05A" },
  { id: 6, src: "/galeri/klise/foto-06.jpg", frameCode: "EXP 06A" },
  { id: 7, src: "/galeri/klise/foto-07.jpg", frameCode: "EXP 07A" },
  { id: 8, src: "/galeri/klise/foto-08.jpg", frameCode: "EXP 08A" },
  { id: 9, src: "/galeri/klise/foto-09.jpg", frameCode: "EXP 09A" },
  { id: 10, src: "/galeri/klise/foto-10.jpg", frameCode: "EXP 10A" },
  { id: 11, src: "/galeri/klise/foto-11.jpg", frameCode: "EXP 11A" },
];

// Lubang sproket khas klise film 35mm
function SprocketHoles() {
  return (
    <div className="flex justify-between items-center px-2 py-1.5 bg-black/90 select-none">
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

  // Gandakan array agar loop animasi mulus tanpa jeda
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

  // Keyboard navigation untuk lightbox
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
      {/* Background ambient glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 -left-40 w-96 h-96 rounded-full bg-gold/5 blur-[120px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute top-1/2 -right-40 w-96 h-96 rounded-full bg-blue/5 blur-[120px] pointer-events-none"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-10">
        <SectionHeading
          index="03.5"
          label="Klise bergerak · 35mm memories"
          title="Di balik layar & metu bareng"
        >
          Koleksi foto candid, jalan-jalan santai, patungan makan, dan tawa lepas di luar proker
          formal. Klik foto untuk memperbesar.
        </SectionHeading>
      </div>

      {/* Film Reel Baris 1 (Bergerak ke Kiri via Framer Motion GPU) */}
      <div className="relative w-full overflow-hidden select-none my-3">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 28,
          }}
          className="flex gap-4 w-max"
        >
          {photosRow1.map((item, idx) => (
            <motion.div
              key={`row1-${item.id}-${idx}`}
              whileHover={{ scale: 1.03 }}
              onClick={() => setSelectedPhoto(item)}
              className="relative w-64 sm:w-72 shrink-0 rounded-2xl overflow-hidden bg-black/95 border-2 border-surface-2 shadow-xl shadow-black/60 cursor-pointer transition-transform group"
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
                  alt="Foto kenangan Ristek"
                  fill
                  sizes="(max-width: 768px) 256px, 288px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                  <div className="flex items-center gap-1.5 text-xs text-gold font-medium">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Lihat foto</span>
                  </div>
                </div>
              </div>

              {/* Lubang sprocket bawah */}
              <SprocketHoles />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Film Reel Baris 2 (Bergerak ke Kanan via Framer Motion GPU) */}
      <div className="relative w-full overflow-hidden select-none my-3">
        <motion.div
          animate={{ x: ["-50%", "0%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 32,
          }}
          className="flex gap-4 w-max"
        >
          {photosRow2.map((item, idx) => (
            <motion.div
              key={`row2-${item.id}-${idx}`}
              whileHover={{ scale: 1.03 }}
              onClick={() => setSelectedPhoto(item)}
              className="relative w-64 sm:w-72 shrink-0 rounded-2xl overflow-hidden bg-black/95 border-2 border-surface-2 shadow-xl shadow-black/60 cursor-pointer transition-transform group"
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
                  alt="Foto kenangan Ristek"
                  fill
                  sizes="(max-width: 768px) 256px, 288px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                  <div className="flex items-center gap-1.5 text-xs text-gold font-medium">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Lihat foto</span>
                  </div>
                </div>
              </div>

              {/* Lubang sprocket bawah */}
              <SprocketHoles />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox Modal Interaktif (Hanya Foto Murni & Tombol Tutup/Navigasi) */}
      <AnimatePresence>
        {selectedPhoto && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl rounded-3xl overflow-hidden bg-surface border border-line-strong shadow-2xl shadow-black/90 flex flex-col"
            >
              {/* Header Modal Bersih */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-line bg-surface-2/60">
                <div className="flex items-center gap-2">
                  <Film className="w-4 h-4 text-gold" />
                  <span className="font-mono text-xs uppercase tracking-wider text-muted">
                    Klise Kenangan · {selectedPhoto.frameCode}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="p-1.5 rounded-full hover:bg-white/10 text-muted hover:text-fg transition-colors cursor-pointer"
                  aria-label="Tutup pratinjau"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Foto Utama Murni (Sesuai Ukuran Cover) */}
              <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full bg-black/80 flex items-center justify-center overflow-hidden">
                <Image
                  src={selectedPhoto.src}
                  alt="Foto kenangan"
                  fill
                  sizes="(max-width: 1024px) 100vw, 960px"
                  className="object-cover"
                  priority
                />

                {/* Tombol Navigasi Kiri & Kanan */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full glass bg-black/50 hover:bg-black/80 text-fg transition-colors cursor-pointer"
                  aria-label="Foto sebelumnya"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full glass bg-black/50 hover:bg-black/80 text-fg transition-colors cursor-pointer"
                  aria-label="Foto berikutnya"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
