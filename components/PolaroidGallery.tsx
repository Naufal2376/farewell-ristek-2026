"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Camera, X, Layers, Sparkles, CheckCircle2 } from "lucide-react";

export interface ProkerGalleryItem {
  id: number;
  title: string;
  category: "internal" | "himsi";
  categoryLabel: string;
  targetAudience?: string;
  description: string;
  rotation: string;
  imageUrl: string;
}

export const ALL_PROKERS: ProkerGalleryItem[] = [
  // --- Proker Internal Ristek 2026 ---
  {
    id: 1,
    title: "Revamp Web HIMSI 2026",
    category: "internal",
    categoryLabel: "INTERNAL RISTEK",
    description:
      "Pengembangan ulang website resmi HIMSI FASILKOM UNSRI dengan teknologi modern, performa lebih cepat, dan tampilan yang lebih responsif.",
    rotation: "-rotate-2",
    imageUrl:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "UX Exhibition",
    category: "internal",
    categoryLabel: "INTERNAL RISTEK",
    description:
      "Membantu dan mempermudah mahasiswa dalam mempelajari prinsip UI/UX design serta menciptakan prototyping desain aplikasi web yang berorientasi pengguna.",
    rotation: "rotate-2",
    imageUrl:
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "HIMSI Digital Ecosystem",
    category: "internal",
    categoryLabel: "INTERNAL RISTEK",
    description:
      "Pembangunan ekosistem digital terintegrasi untuk mendukung seluruh aktivitas, arsip, dan operasional digital organisasi HIMSI.",
    rotation: "-rotate-1",
    imageUrl:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "Sharing Session Magang & KP",
    category: "internal",
    categoryLabel: "INTERNAL RISTEK",
    description:
      "Sharing pengalaman magang dan kerja praktik bersama alumni untuk memberikan gambaran dunia industri bagi mahasiswa Sistem Informasi.",
    rotation: "rotate-2",
    imageUrl:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    title: "Course Ristek To HIMSI",
    category: "internal",
    categoryLabel: "INTERNAL RISTEK",
    description:
      "Kursus dan upgrading teknologi intensif yang diselenggarakan oleh Ristek untuk seluruh anggota dan pengurus HIMSI.",
    rotation: "-rotate-2",
    imageUrl:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    title: "PKKMB Sistem Informasi 2026",
    category: "internal",
    categoryLabel: "INTERNAL RISTEK",
    description:
      "Pengenalan kehidupan kampus dan budaya belajar di Jurusan Sistem Informasi Fasilkom Unsri untuk mahasiswa baru angkatan 2026.",
    rotation: "rotate-1",
    imageUrl:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 7,
    title: "Layanan Akademik",
    category: "internal",
    categoryLabel: "INTERNAL RISTEK",
    description:
      "Layanan konsultasi, bimbingan akademik, serta advokasi belajar bagi mahasiswa SI sebagai jembatan dengan pihak kampus.",
    rotation: "-rotate-1",
    imageUrl:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 8,
    title: "Info Akademik",
    category: "internal",
    categoryLabel: "INTERNAL RISTEK",
    description:
      "Penyebaran informasi akademik terkini, beasiswa, perlombaan IT nasional, dan agenda penting secara cepat dan akurat.",
    rotation: "rotate-2",
    imageUrl:
      "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80",
  },

  // --- Proker HIMSI 2026 ---
  {
    id: 9,
    title: "SI FEST 2026",
    category: "himsi",
    categoryLabel: "PROKER HIMSI",
    targetAudience: "Masyarakat Umum",
    description:
      "Acara tahunan terbesar HIMSI Fasilkom Unsri yang menghadirkan kompetisi IT nasional, seminar teknologi, pameran inovasi, dan edukasi digital.",
    rotation: "-rotate-2",
    imageUrl:
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 10,
    title: "Seminar Job Finding",
    category: "himsi",
    categoryLabel: "PROKER HIMSI",
    targetAudience: "Masyarakat Umum",
    description:
      "Membahas cara efektif membangun jaringan profesional, personal branding, serta tips praktis dari pakar industri untuk memaksimalkan potensi karier.",
    rotation: "rotate-2",
    imageUrl:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 11,
    title: "Workshop Design Grafis",
    category: "himsi",
    categoryLabel: "PROKER HIMSI",
    targetAudience: "Masyarakat Umum",
    description:
      "Pelatihan intensif desain grafis untuk membantu mahasiswa Fasilkom Unsri mengembangkan potensi kreatif visual di era digital.",
    rotation: "-rotate-1",
    imageUrl:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 12,
    title: "Webinar Business Development",
    category: "himsi",
    categoryLabel: "PROKER HIMSI",
    targetAudience: "Masyarakat Umum",
    description:
      "Membahas strategi membangun dan menskalakan bisnis di era digital, identifikasi peluang, validasi ide, hingga strategi ekspansi dan inovasi.",
    rotation: "rotate-3",
    imageUrl:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 13,
    title: "INAGURASI 2026",
    category: "himsi",
    categoryLabel: "PROKER HIMSI",
    targetAudience: "Mahasiswa Baru SI 2026",
    description:
      "Mempertemukan dan mempererat keakraban maba Sistem Informasi kampus Indralaya dan Bukit agar saling mengenal dan tidak ada sekat.",
    rotation: "-rotate-2",
    imageUrl:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 14,
    title: "PORSI DAN GESELSI",
    category: "himsi",
    categoryLabel: "PROKER HIMSI",
    targetAudience: "Mahasiswa SI & Masyarakat",
    description:
      "Wadah kompetisi olahraga (Porsi) dan festival seni (Geselsi) untuk mengasah sportivitas, daya saing positif, dan kreativitas mahasiswa SI.",
    rotation: "rotate-2",
    imageUrl:
      "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 15,
    title: "Sharing Session Manajemen Organisasi",
    category: "himsi",
    categoryLabel: "PROKER HIMSI",
    targetAudience: "Seluruh BPH HIMSI",
    description:
      "Pembekalan berorganisasi, problem solving, dan transfer pengalaman dari para alumni pemateri untuk seluruh fungsionaris HIMSI.",
    rotation: "-rotate-1",
    imageUrl:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 16,
    title: "Kajian Rohani, Berbagi & Bakti Sosial (KRBB)",
    category: "himsi",
    categoryLabel: "PROKER HIMSI",
    targetAudience: "Masyarakat Umum",
    description:
      "Meningkatkan keimanan, ketakwaan, jalinan silaturahmi, dan semangat berbagi kepedulian sosial mahasiswa Fasilkom kepada masyarakat.",
    rotation: "rotate-2",
    imageUrl:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 17,
    title: "Peringatan Kemerdekaan 17 Agustus",
    category: "himsi",
    categoryLabel: "PROKER HIMSI",
    targetAudience: "Seluruh Mahasiswa SI",
    description:
      "Merayakan kembali agenda kemerdekaan RI serta membangun kehangatan dan kekeluargaan yang guyub di internal BPH HIMSI.",
    rotation: "-rotate-2",
    imageUrl:
      "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 18,
    title: "Musyawarah Besar (Mubes)",
    category: "himsi",
    categoryLabel: "PROKER HIMSI",
    targetAudience: "Seluruh BPH HIMSI",
    description:
      "Agenda tertinggi akhir masa bakti kepengurusan untuk membahas RAD/RAT, evaluasi GHPKO, serta suksesi kepemimpinan periode baru.",
    rotation: "rotate-1",
    imageUrl:
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=80",
  },
];

export default function PolaroidGallery() {
  const [filter, setFilter] = useState<"all" | "internal" | "himsi">("all");
  const [selectedProker, setSelectedProker] = useState<ProkerGalleryItem | null>(null);
  const [likes, setLikes] = useState<{ [id: number]: number }>({
    1: 64,
    2: 52,
    3: 45,
    4: 78,
    5: 39,
    6: 83,
    7: 34,
    8: 41,
    9: 98,
    10: 71,
    11: 59,
    12: 48,
    13: 88,
    14: 67,
    15: 53,
    16: 62,
    17: 46,
    18: 91,
  });

  const filteredProkers = ALL_PROKERS.filter((item) => {
    if (filter === "all") return true;
    return item.category === filter;
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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/80 text-xs font-mono text-cyan-300 mb-3">
          <Camera className="w-3.5 h-3.5 text-amber-400" />
          <span>PORTFOLIO & DOKUMENTASI PROKER 2026</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Galeri Program Kerja Terlaksana
        </h2>
        <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
          Setiap bingkai merekam jejak karya dan dedikasi kita. Temukan dokumentasi
          lengkap program kerja internal Ristek dan agenda kolaborasi HIMSI 2026.
        </p>

        {/* Filter Tabs */}
        <div className="mt-6 inline-flex flex-wrap justify-center p-1 rounded-xl bg-slate-900 border border-slate-800 gap-1">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
              filter === "all"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Semua Proker ({ALL_PROKERS.length})
          </button>
          <button
            onClick={() => setFilter("internal")}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
              filter === "internal"
                ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Internal Ristek (8)
          </button>
          <button
            onClick={() => setFilter("himsi")}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
              filter === "himsi"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Program Kerja HIMSI (10)
          </button>
        </div>
      </div>

      {/* Polaroid Grid of Prokers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
        {filteredProkers.map((proker) => (
          <motion.div
            key={proker.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.03, rotate: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelectedProker(proker)}
            className={`cursor-pointer transition-all duration-300 ${proker.rotation} hover:z-20`}
          >
            {/* Polaroid Paper Frame */}
            <div className="relative p-3.5 pb-6 bg-[#f8fafc] text-slate-900 rounded-sm shadow-2xl shadow-black/50 border border-slate-300 flex flex-col group h-full">
              {/* Tape effect at the top */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-amber-200/70 border border-amber-300/60 rotate-1 backdrop-blur-xs shadow-xs" />

              {/* Photo Image Container */}
              <div className="relative w-full aspect-[4/3] bg-slate-900 overflow-hidden rounded-xs shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={proker.imageUrl}
                  alt={proker.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter contrast-[1.05]"
                  loading="lazy"
                />
                <span
                  className={`absolute top-2 right-2 text-[9px] font-mono font-bold px-2 py-0.5 rounded shadow-sm backdrop-blur-xs ${
                    proker.category === "internal"
                      ? "bg-amber-500 text-slate-950"
                      : "bg-blue-600 text-white"
                  }`}
                >
                  {proker.categoryLabel}
                </span>
              </div>

              {/* Polaroid Bottom Caption area */}
              <div className="mt-4 px-1 flex flex-col justify-between flex-1">
                <div>
                  <h4 className="font-bold text-sm text-slate-900 font-sans tracking-tight line-clamp-1">
                    {proker.title}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 font-sans leading-relaxed line-clamp-3">
                    {proker.description}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500 font-mono">
                  <span className="text-[10px] text-emerald-600 flex items-center gap-1 font-bold">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Terlaksana</span>
                  </span>

                  <button
                    onClick={(e) => handleLike(e, proker.id)}
                    className="flex items-center gap-1 text-rose-500 hover:text-rose-600 px-2 py-0.5 rounded-full hover:bg-rose-50 transition-colors"
                    aria-label="Sukai foto"
                  >
                    <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                    <span className="font-bold">{likes[proker.id] || 40}</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal for Detail View */}
      <AnimatePresence>
        {selectedProker && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProker(null)}
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
                onClick={() => setSelectedProker(null)}
                className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/60 text-slate-300 hover:text-white"
                aria-label="Tutup preview"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative w-full aspect-[16/10] bg-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedProker.imageUrl}
                  alt={selectedProker.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between text-xs font-mono text-amber-400 mb-2">
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {selectedProker.categoryLabel}
                  </span>
                  <div className="flex items-center gap-1 text-rose-400">
                    <Heart className="w-4 h-4 fill-rose-400" />
                    <span>{likes[selectedProker.id] || 40} likes</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">
                  {selectedProker.title}
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed font-sans">
                  {selectedProker.description}
                </p>

                {selectedProker.targetAudience && (
                  <div className="mt-4 pt-3 border-t border-slate-800/80 text-xs font-mono text-cyan-300">
                    Sasaran: {selectedProker.targetAudience}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
