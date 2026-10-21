"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X } from "lucide-react";

export interface RistekMemoryItem {
  id: number;
  title: string;
  tag: string;
  date: string;
  caption: string;
  rotation: string;
  imageUrl: string;
}

export const RISTEK_MEMORIES: RistekMemoryItem[] = [
  {
    id: 1,
    title: "Rapat Pleno Pertama Ristek 2026",
    tag: "KICKOFF",
    date: "Februari 2026",
    caption:
      "Muka masih polos, semangat masih 1000%, belum kenal revisi dan pleno berlarut-larut sampai larut malam.",
    rotation: "-rotate-2",
    imageUrl:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Debugging & Ngoding Bareng @ Kantin",
    tag: "BEGADANG",
    date: "Maret 2026",
    caption:
      "Kopi sachet 3 gelas, error 1 hilang tapi muncul 5 error baru di repo. Tapi ketawanya tetap nomor satu!",
    rotation: "rotate-2",
    imageUrl:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Penyelenggaraan UX Exhibition",
    tag: "PROKER PECAH",
    date: "Mei 2026",
    caption:
      "Momen pecah workshop UI/UX design Ristek, antusias peserta luar biasa dan seluruh panitia saling backup.",
    rotation: "-rotate-1",
    imageUrl:
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "Sprint Malam: Revamp Web HIMSI",
    tag: "PTI SPRINT",
    date: "Juni 2026",
    caption:
      "Push git commit jam 03.14 subuh demi peluncuran website resmi himsiunsri.org yang baru dan responsif.",
    rotation: "rotate-3",
    imageUrl:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    title: "Sharing Session Magang & KP",
    tag: "AKADEMIK",
    date: "Juli 2026",
    caption:
      "Temu kangen alumni Ristek berbagi insight dan obrolan hangat seputar dunia industri dan dunia kerja.",
    rotation: "-rotate-2",
    imageUrl:
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    title: "Makan Bareng Pasca Pleno Evaluasi",
    tag: "MUKBANG",
    date: "Agustus 2026",
    caption:
      "Setelah pleno penuh ketegangan, langsung meluncur makan mie ayam dan es teh jumbo bareng seluruh staf.",
    rotation: "rotate-1",
    imageUrl:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 7,
    title: "Keluarga Besar PTI & Akademik",
    tag: "FAMILY",
    date: "September 2026",
    caption:
      "Dua pilar utama Ristek yang selalu kompak. Dari yang pendiam sampai yang suka kirim stiker WA aneh-aneh.",
    rotation: "-rotate-1",
    imageUrl:
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 8,
    title: "Menjelang Garis Akhir: Farewell 2026",
    tag: "FINAL CHAPTER",
    date: "Oktober 2026",
    caption:
      "Detik-detik akhir sebelum purna tugas. Terima kasih untuk setiap tawa, keringat, dan cerita tak tergantikan!",
    rotation: "rotate-2",
    imageUrl:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80",
  },
];

export default function PolaroidGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<RistekMemoryItem | null>(null);
  const [likes, setLikes] = useState<{ [id: number]: number }>({
    1: 64,
    2: 78,
    3: 92,
    4: 85,
    5: 57,
    6: 89,
    7: 94,
    8: 99,
  });

  const handleLike = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setLikes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  return (
    <section id="galeri" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Galeri Kenangan Ristek <span className="text-amber-400">2026</span>
        </h2>
        <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
          Setiap potret mengabadikan tawa, perjuangan, begadang bareng, dan jejak
          langkah kita selama satu periode di Departemen Riset dan Teknologi HIMSI 2026.
        </p>
      </div>

      {/* Polaroid Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {RISTEK_MEMORIES.map((photo) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.03, rotate: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelectedPhoto(photo)}
            className={`cursor-pointer transition-all duration-300 ${photo.rotation} hover:z-20`}
          >
            {/* Polaroid Paper Frame */}
            <div className="relative p-3 pb-5 bg-[#f8fafc] text-slate-900 rounded-sm shadow-2xl shadow-black/50 border border-slate-300 flex flex-col group h-full">
              {/* Tape effect at the top */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-amber-200/70 border border-amber-300/60 rotate-1 backdrop-blur-xs shadow-xs" />

              {/* Photo Image Container */}
              <div className="relative w-full aspect-[4/3] bg-slate-900 overflow-hidden rounded-xs shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter contrast-[1.05]"
                  loading="lazy"
                />
                <span className="absolute top-2 right-2 text-[9px] font-mono font-bold px-2 py-0.5 rounded shadow-sm bg-black/75 text-amber-300 backdrop-blur-xs">
                  {photo.tag}
                </span>
              </div>

              {/* Polaroid Bottom Caption area */}
              <div className="mt-3 px-1 flex flex-col justify-between flex-1">
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 font-sans tracking-tight line-clamp-1">
                    {photo.title}
                  </h4>
                  <p className="text-[11px] text-slate-600 mt-1 font-sans italic leading-relaxed line-clamp-2">
                    &ldquo;{photo.caption}&rdquo;
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>{photo.date}</span>

                  <button
                    onClick={(e) => handleLike(e, photo.id)}
                    className="flex items-center gap-1 text-rose-500 hover:text-rose-600 px-1.5 py-0.5 rounded-full hover:bg-rose-50 transition-colors cursor-pointer"
                    aria-label="Sukai foto"
                  >
                    <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                    <span className="font-bold">{likes[photo.id] || 50}</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-xl w-full bg-[#0E152B] border border-slate-700 rounded-2xl overflow-hidden shadow-2xl text-slate-100"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/60 text-slate-300 hover:text-white cursor-pointer"
                aria-label="Tutup preview"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative w-full aspect-[4/3] bg-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedPhoto.imageUrl}
                  alt={selectedPhoto.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between text-xs font-mono text-amber-400 mb-2">
                  <span>{selectedPhoto.tag} &bull; {selectedPhoto.date}</span>
                  <div className="flex items-center gap-1 text-rose-400">
                    <Heart className="w-4 h-4 fill-rose-400" />
                    <span>{likes[selectedPhoto.id] || 50} loves</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">
                  {selectedPhoto.title}
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed font-sans">
                  {selectedPhoto.caption}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
