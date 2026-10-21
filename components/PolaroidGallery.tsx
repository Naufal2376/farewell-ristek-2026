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
    title: "1. Rapat Perdana Ristek 2026",
    tag: "KICKOFF",
    date: "Februari 2026",
    caption:
      "Pertemuan pertama BPH & seluruh staf Ristek. Muka masih polos, semangat masih 1000%, dan perkenalan awal pembagian jobdesk divisi.",
    rotation: "-rotate-2",
    imageUrl:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "2. Rapat Global (Rapglo) HIMSI",
    tag: "RAPGLO",
    date: "Februari 2026",
    caption:
      "Rapat pleno gabungan perdana bersama seluruh departemen dan pengurus HIMSI Fasilkom Unsri untuk sinkronisasi arah gerak himpunan.",
    rotation: "rotate-2",
    imageUrl:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "3. Makrab HIMSI 2026",
    tag: "MAKRAB",
    date: "Maret 2026",
    caption:
      "Malam keakraban seluruh pengurus HIMSI. Momen bonding, games malam tanpa sekat, api unggun, dan tawa lepas bareng.",
    rotation: "-rotate-1",
    imageUrl:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "4. SSMO & Bukber Ristek",
    tag: "SSMO & BUKBER",
    date: "Maret 2026",
    caption:
      "Sharing Session Manajemen Organisasi bersama alumni pemateri, ditutup hangat dengan buka puasa bersama internal keluarga Ristek.",
    rotation: "rotate-3",
    imageUrl:
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    title: "5. Bukber Akbar HIMSI",
    tag: "BUKBER AKBAR",
    date: "April 2026",
    caption:
      "Buka puasa bersama akbar satu himpunan penuh, mempertemukan staf, BPH, dosen pembina, dan para demisioner Sistem Informasi.",
    rotation: "-rotate-2",
    imageUrl:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    title: "6. KRBB (Kajian Rohani & Baksos)",
    tag: "PROKER 02 HIMSI",
    date: "April 2026",
    caption:
      "Kajian Rohani, Berbagi, dan Bakti Sosial untuk meningkatkan ketakwaan, mempererat silaturahmi, dan berbagi kepedulian kepada sesama.",
    rotation: "rotate-1",
    imageUrl:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 7,
    title: "7. Momen Lebaran & Halal Bihalal",
    tag: "LEBARAN",
    date: "April 2026",
    caption:
      "Saling kirim ucapan maaf lahir batin di grup WhatsApp, pamer foto baju lebaran masing-masing staf, dan halal bihalal usai liburan.",
    rotation: "-rotate-2",
    imageUrl:
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 8,
    title: "8. Seminar Job Finding (SJF)",
    tag: "PROKER 03 HIMSI",
    date: "Mei 2026",
    caption:
      "Seminar pengembangan karir, personal branding, dan teknik networking bersama para profesional industri untuk masa depan mahasiswa SI.",
    rotation: "rotate-2",
    imageUrl:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 9,
    title: "9. UX Exhibition Ristek",
    tag: "PROKER 04 HIMSI",
    date: "Mei 2026",
    caption:
      "Proker kebanggaan Ristek! Pelatihan interaktif prinsip UI/UX design dan pameran prototyping web user-centered yang sangat diapresiasi peserta.",
    rotation: "-rotate-1",
    imageUrl:
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 10,
    title: "10. Evaluasi 3 Bulan (Kuartal 1)",
    tag: "EVAL 3 BULAN",
    date: "Juni 2026",
    caption:
      "Momen evaluasi triwulan pertama. Review performa proker, evaluasi kedisiplinan, dan saling tukar feedback jujur demi kemajuan departemen.",
    rotation: "rotate-3",
    imageUrl:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 11,
    title: "11. LADDER (Upgrading Skill Ristek)",
    tag: "LADDER",
    date: "Juni 2026",
    caption:
      "Program upgrading internal untuk menaikkan tangga skill kepemimpinan, teknis komputasi, dan pemecahan masalah bagi staf Ristek.",
    rotation: "-rotate-2",
    imageUrl:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 12,
    title: "12. Arcade, Karaoke & BTS Taking DIES",
    tag: "HEALING TIME",
    date: "Juni 2026",
    caption:
      "Paling pecah! Main game arcade Timezone bareng, karaoke lagu galau sekencang-kencangnya, sambil take video BTS untuk Dies Natalis.",
    rotation: "rotate-1",
    imageUrl:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 13,
    title: "13. Perayaan Dies Natalis HIMSI",
    tag: "DIES NATALIS",
    date: "Juli 2026",
    caption:
      "Hari ulang tahun HIMSI Fasilkom Unsri yang meriah. Tumpengan bareng, aneka perlombaan seru, dan kebanggaan menjadi bagian dari himpunan.",
    rotation: "-rotate-1",
    imageUrl:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 14,
    title: "14. SSMKP (Sharing Magang & KP)",
    tag: "PROKER RISTEK",
    date: "Juli 2026",
    caption:
      "Sharing Session Magang & Kerja Praktik bersama alumni Ristek untuk membimbing adik tingkat mempersiapkan diri terjun ke dunia industri.",
    rotation: "rotate-2",
    imageUrl:
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 15,
    title: "15. Fun Day & Games Ristek",
    tag: "FUNDAY",
    date: "Agustus 2026",
    caption:
      "Hari rekreasi santai tanpa beban deadline. Main games bareng di lapangan, makan camilan patungan, dan menikmati hari bersama keluarga kedua.",
    rotation: "-rotate-2",
    imageUrl:
      "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 16,
    title: "16. Evaluasi 6 Bulan + Metu Bareng",
    tag: "EVAL 6 + METU",
    date: "Agustus 2026",
    caption:
      "Pleno evaluasi paruh periode penanda setengah perjalanan telah tuntas. Ditutup dengan tradisi metu bareng kulineran mie ayam dan es teh jumbo.",
    rotation: "rotate-3",
    imageUrl:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 17,
    title: "17. Peringatan Kemerdekaan 17 Agustus",
    tag: "PROKER 08 HIMSI",
    date: "Agustus 2026",
    caption:
      "Merayakan HUT Republik Indonesia dengan aneka lomba khas 17-an, memupuk jiwa nasionalisme dan menciptakan suasana guyub internal BPH HIMSI.",
    rotation: "-rotate-1",
    imageUrl:
      "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 18,
    title: "18. PKKMB Sistem Informasi 2026",
    tag: "PROKER 07 HIMSI",
    date: "Agustus 2026",
    caption:
      "Menyambut mahasiswa baru Sistem Informasi angkatan 2026. Tim Ristek sigap mengawal kebutuhan sistem informasi dan pendampingan maba.",
    rotation: "rotate-2",
    imageUrl:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 19,
    title: "19. Inagurasi 2026 + KI",
    tag: "PROKER 09 HIMSI",
    date: "September 2026",
    caption:
      "Malam inagurasi penuh kehangatan yang mempertemukan dan mengakrabkan mahasiswa baru SI kampus Indralaya dan Bukit tanpa sekat.",
    rotation: "-rotate-2",
    imageUrl:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 20,
    title: "20. PORGESELSI 2026",
    tag: "PROKER 10 HIMSI",
    date: "September 2026",
    caption:
      "Pekan Olahraga dan Gelar Seni Sistem Informasi. Ajang unjuk bakat futsal, basket, e-sport, hingga pentas seni kreasi mahasiswa Fasilkom.",
    rotation: "rotate-1",
    imageUrl:
      "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 21,
    title: "21. Opening Ceremony SI FEST 2026",
    tag: "OPCER SI FEST",
    date: "Oktober 2026",
    caption:
      "Panggung pembukaan mega event SI FEST 2026. Peluncuran platform web resmi oleh tim PTI dan pembukaan kompetisi IT tingkat nasional.",
    rotation: "-rotate-2",
    imageUrl:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 22,
    title: "22. SIKRAB (SI Keakraban)",
    tag: "SIKRAB",
    date: "Oktober 2026",
    caption:
      "Malam keakraban akbar jurusan Sistem Informasi menjelang akhir tahun. Saling bertukar cerita, apresiasi, dan mempererat tali persaudaraan.",
    rotation: "rotate-2",
    imageUrl:
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 23,
    title: "23. Rizztekk Metu Komplittt! 💙",
    tag: "FULL TEAM MEMORY",
    date: "Oktober 2026",
    caption:
      "Momen langka dan paling bersejarah! 20 pengurus Ristek (Fahri, Revanna, Naufal, Calista & 16 Staf) akhirnya bisa kumpul dan hangout komplit 100%!",
    rotation: "-rotate-1",
    imageUrl:
      "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&w=800&q=80",
  },
];

export default function PolaroidGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<RistekMemoryItem | null>(null);
  const [likes, setLikes] = useState<{ [id: number]: number }>(() => {
    const initial: { [id: number]: number } = {};
    RISTEK_MEMORIES.forEach((m, idx) => {
      initial[m.id] = 45 + (idx % 10) * 5 + (idx % 7);
    });
    return initial;
  });

  const handleLike = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setLikes((prev) => ({
      ...prev,
      [id]: (prev[id] || 50) + 1,
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
          Arsip 23 momen bersejarah perjalanan kita dari awal rapat perdana, eksekusi
          seluruh proker, evaluasi, momen seru, hingga purna tugas.
        </p>
      </div>

      {/* Polaroid Grid of All 23 Memories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
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
