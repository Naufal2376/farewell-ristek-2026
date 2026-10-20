"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Camera, X, Sparkles, MessageCircle } from "lucide-react";

interface PolaroidItem {
  id: number;
  title: string;
  caption: string;
  date: string;
  tag: string;
  rotation: string;
  imageUrl: string;
}

export default function PolaroidGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<PolaroidItem | null>(null);
  const [likes, setLikes] = useState<{ [id: number]: number }>({
    1: 42,
    2: 56,
    3: 38,
    4: 77,
    5: 64,
    6: 89,
  });

  const photos: PolaroidItem[] = [
    {
      id: 1,
      title: "Rapat Pleno Pertama",
      caption: "Muka masih polos, semangat masih 1000%, belum kenal revisi.",
      date: "Februari 2026",
      tag: "KICKOFF",
      rotation: "-rotate-2",
      imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      title: "Debugging Marathon @ Kantin",
      caption: "Kopi sachet 3 gelas, error 1 hilang tapi muncul 5 error baru.",
      date: "April 2026",
      tag: "BEGADANG",
      rotation: "rotate-3",
      imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      title: "Workshop & Tech Talk",
      caption: "Staf Ristek jadi pembicara kece di depan ratusan maba Fasilkom.",
      date: "Juni 2026",
      tag: "PROKER PECAH",
      rotation: "-rotate-3",
      imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 4,
      title: "Makan Malam Pasca Evaluasi",
      caption: "Setelah berdarah-darah di pleno, ditutup mie ayam & es teh jumbo.",
      date: "Agustus 2026",
      tag: "MUKBANG",
      rotation: "rotate-2",
      imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 5,
      title: "Foto Divisi Semi Formal",
      caption: "Coba pose keren ala startup Silicon Valley, tapi tetep aja kocak.",
      date: "September 2026",
      tag: "FAMILY",
      rotation: "-rotate-1",
      imageUrl: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 6,
      title: "Gladi Bersih Farewell 2026",
      caption: "Detik-detik penutupan kepengurusan. We made it together, gengs!",
      date: "Oktober 2026",
      tag: "FINAL STAGE",
      rotation: "rotate-2",
      imageUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80",
    },
  ];

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
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/80 text-xs font-mono text-cyan-300 mb-3">
          <Camera className="w-3.5 h-3.5 text-amber-400" />
          <span>MEMORY DUMP &bull; 2026 LOGS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Galeri Kenangan Polaroid
        </h2>
        <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
          Setiap frame menyimpan tawa, lelah, dan kebersamaan kita. Klik foto untuk
          memperbesar atau tinggalkan love!
        </p>
      </div>

      {/* Polaroid Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
        {photos.map((photo) => (
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
            <div className="relative p-3.5 pb-6 bg-[#f8fafc] text-slate-900 rounded-sm shadow-2xl shadow-black/50 border border-slate-300 flex flex-col group">
              {/* Tape effect at the top */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-amber-200/70 border border-amber-300/60 rotate-1 backdrop-blur-xs shadow-xs" />

              {/* Photo Image Container */}
              <div className="relative w-full aspect-[4/3] bg-slate-900 overflow-hidden rounded-xs">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter contrast-[1.05]"
                  loading="lazy"
                />
                <span className="absolute top-2 right-2 text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-black/75 text-amber-300 backdrop-blur-xs">
                  {photo.tag}
                </span>
              </div>

              {/* Polaroid Bottom Caption area */}
              <div className="mt-4 px-1 flex flex-col justify-between flex-1">
                <div>
                  <h4 className="font-bold text-sm text-slate-900 font-sans tracking-tight">
                    {photo.title}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 font-sans italic leading-relaxed">
                    &ldquo;{photo.caption}&rdquo;
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500 font-mono">
                  <span>{photo.date}</span>

                  <button
                    onClick={(e) => handleLike(e, photo.id)}
                    className="flex items-center gap-1 text-rose-500 hover:text-rose-600 px-2 py-0.5 rounded-full hover:bg-rose-50 transition-colors"
                    aria-label="Sukai foto"
                  >
                    <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                    <span className="font-bold">{likes[photo.id]}</span>
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
                className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/60 text-slate-300 hover:text-white"
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
                    <span>{likes[selectedPhoto.id]} loves</span>
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
