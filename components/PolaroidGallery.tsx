"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, ChevronLeft, ChevronRight, Sparkles, PartyPopper } from "lucide-react";
import confetti from "canvas-confetti";

export interface RistekMemoryItem {
  id: number;
  title: string;
  tag: string;
  badge: string;
  date: string;
  caption: string;
  rotation: string;
  imageUrl: string;
}

export const RISTEK_MEMORIES_24: RistekMemoryItem[] = [
  {
    id: 1,
    title: "1. Rapat Perdana Ristek 2026",
    tag: "KICKOFF",
    badge: "🌱 Awal Perjalanan",
    date: "Februari 2026",
    caption:
      "Pertemuan pertama BPH & seluruh staf Ristek 2026. Muka masih polos, masih saling canggung, tapi semangat koding dan prokernya sudah 1000%!",
    rotation: "-rotate-2",
    imageUrl:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "2. Rapat Global (Rapglo) HIMSI",
    tag: "RAPGLO",
    badge: "🏛️ Satu Himpunan",
    date: "Februari 2026",
    caption:
      "Rapat pleno gabungan perdana bersama seluruh departemen dan pengurus HIMSI Fasilkom Unsri untuk sinkronisasi visi besar satu periode.",
    rotation: "rotate-2",
    imageUrl:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "3. Makrab HIMSI 2026",
    tag: "MAKRAB",
    badge: "🔥 Api Unggun",
    date: "Maret 2026",
    caption:
      "Malam keakraban seluruh pengurus HIMSI. Momen bonding, games malam tanpa sekat, api unggun, dan tawa lepas bareng teman seperjuangan.",
    rotation: "-rotate-1",
    imageUrl:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "4. SSMO (Sharing Session Manajemen Organisasi)",
    tag: "PROKER 01 HIMSI",
    badge: "📚 Upgrade Diri",
    date: "Maret 2026",
    caption:
      "Proker resmi pertama HIMSI! Sharing pengalaman manajemen organisasi, cara memecahkan masalah, dan bekal berharga langsung dari para alumni.",
    rotation: "rotate-3",
    imageUrl:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    title: "5. Buka Puasa Bersama (Bukber) Internal Ristek",
    tag: "BUKBER RISTEK",
    badge: "🌙 Rebutan Takjil",
    date: "Maret 2026",
    caption:
      "Buka puasa perdana khusus keluarga kecil Ristek! Momen makan bareng, ketawa ngakak rebutan es buah, dan sharing santai tanpa ngomongin proker.",
    rotation: "-rotate-2",
    imageUrl:
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    title: "6. Bukber Akbar HIMSI",
    tag: "BUKBER AKBAR",
    badge: "✨ Silaturahmi",
    date: "April 2026",
    caption:
      "Buka puasa bersama akbar satu himpunan penuh, mempertemukan staf, BPH, dosen pembina, dan para demisioner Sistem Informasi lintas angkatan.",
    rotation: "rotate-1",
    imageUrl:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 7,
    title: "7. KRBB (Kajian Rohani, Berbagi & Baksos)",
    tag: "PROKER 02 HIMSI",
    badge: "🤲 Berbagi Kasih",
    date: "April 2026",
    caption:
      "Kajian rohani Islam untuk meningkatkan keimanan dan aksi bakti sosial berbagi paket sembako dan kebahagiaan kepada masyarakat yang membutuhkan.",
    rotation: "-rotate-2",
    imageUrl:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 8,
    title: "8. Momen Lebaran & Halal Bihalal",
    tag: "LEBARAN",
    badge: "🎉 Maaf Lahir Batin",
    date: "April 2026",
    caption:
      "Saling kirim ucapan maaf di grup WA, spam stiker kocak, pamer foto baju lebaran masing-masing staf, dan halal bihalal usai liburan semester.",
    rotation: "rotate-2",
    imageUrl:
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 9,
    title: "9. Seminar Job Finding (SJF)",
    tag: "PROKER 03 HIMSI",
    badge: "💼 Career Prep",
    date: "Mei 2026",
    caption:
      "Seminar pengembangan karir, personal branding, dan strategi networking efektif bersama para praktisi industri IT ternama untuk masa depan anak SI.",
    rotation: "-rotate-1",
    imageUrl:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 10,
    title: "10. UX Exhibition Ristek",
    tag: "PROKER 04 HIMSI",
    badge: "🎨 Karya Masterpiece",
    date: "Mei 2026",
    caption:
      "Proker kebanggaan Ristek! Pelatihan komprehensif prinsip UI/UX design dan pameran prototyping aplikasi web interaktif yang menuai banyak pujian.",
    rotation: "rotate-3",
    imageUrl:
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 11,
    title: "11. Evaluasi 3 Bulan (Kuartal 1)",
    tag: "EVAL 3 BULAN",
    badge: "📊 Review & Curhat",
    date: "Juni 2026",
    caption:
      "Review triwulan pertama. Evaluasi kinerja divisi, refleksi jujur kendala proker, dan saling menyemangati agar tetap solid sampai akhir periode.",
    rotation: "-rotate-2",
    imageUrl:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 12,
    title: "12. LADDER (Upgrading Skill Ristek)",
    tag: "LADDER",
    badge: "⚡ Level Up",
    date: "Juni 2026",
    caption:
      "Program upgrading internal untuk menaikkan tangga skill kepemimpinan, teknis komputasi, dan problem solving demi kesiapan profesional staf Ristek.",
    rotation: "rotate-1",
    imageUrl:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 13,
    title: "13. Arcade, Karaoke & BTS Taking DIES",
    tag: "HEALING TIME",
    badge: "🎤 Seru Pecah",
    date: "Juni 2026",
    caption:
      "Momen paling heboh! Main arcade bareng di Timezone, karaoke nyanyi lagu galau sekencang-kencangnya, sambil take video BTS untuk Dies Natalis.",
    rotation: "-rotate-3",
    imageUrl:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 14,
    title: "14. Perayaan Dies Natalis HIMSI",
    tag: "DIES NATALIS",
    badge: "🎂 Milad HIMSI",
    date: "Juli 2026",
    caption:
      "Perayaan hari lahir HIMSI Fasilkom Unsri yang megah dan berkesan. Potong tumpeng, pentas kebersamaan, dan euforia bangga berhimpun.",
    rotation: "rotate-2",
    imageUrl:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 15,
    title: "15. SSMKP (Sharing Magang & KP)",
    tag: "PROKER RISTEK",
    badge: "🚀 Tips Lolos Magang",
    date: "Juli 2026",
    caption:
      "Sharing Session Magang & Kerja Praktik bersama alumni Ristek untuk membimbing adik tingkat mempersiapkan CV, portfolio, dan tes teknikal.",
    rotation: "-rotate-1",
    imageUrl:
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 16,
    title: "16. Fun Day & Games Ristek",
    tag: "FUNDAY",
    badge: "⚽ Refreshing",
    date: "Agustus 2026",
    caption:
      "Hari rekreasi santai tanpa mikirin laptop dan git push. Main games bareng di lapangan, jajan bareng, dan menikmati tawa bersama keluarga kedua.",
    rotation: "rotate-2",
    imageUrl:
      "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 17,
    title: "17. Evaluasi 6 Bulan + Metu Bareng",
    tag: "EVAL 6 + METU",
    badge: "🍜 Kulineran",
    date: "Agustus 2026",
    caption:
      "Pleno evaluasi paruh periode penanda setengah perjalanan telah tuntas. Ditutup dengan tradisi metu bareng kulineran mie ayam dan es teh jumbo.",
    rotation: "-rotate-2",
    imageUrl:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 18,
    title: "18. Peringatan Kemerdekaan 17 Agustus",
    tag: "PROKER 08 HIMSI",
    badge: "🇮🇩 Semangat 45",
    date: "Agustus 2026",
    caption:
      "Merayakan HUT Republik Indonesia dengan aneka lomba khas 17-an, memupuk jiwa patriotisme dan kekompakan sesama pengurus BPH HIMSI.",
    rotation: "rotate-1",
    imageUrl:
      "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 19,
    title: "19. PKKMB Sistem Informasi 2026",
    tag: "PROKER 07 HIMSI",
    badge: "🎓 Sambut Maba",
    date: "Agustus 2026",
    caption:
      "Menyambut adik-adik mahasiswa baru Sistem Informasi angkatan 2026. Tim Ristek sigap mengawal kebutuhan website dan sarana pendampingan maba.",
    rotation: "-rotate-1",
    imageUrl:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 20,
    title: "20. Inagurasi 2026 + KI",
    tag: "PROKER 09 HIMSI",
    badge: "🌟 Malam Hangat",
    date: "September 2026",
    caption:
      "Malam inagurasi penuh kehangatan yang mempertemukan dan mengakrabkan mahasiswa baru SI kampus Indralaya dan Bukit tanpa ada sekat jarak.",
    rotation: "rotate-2",
    imageUrl:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 21,
    title: "21. PORGESELSI 2026",
    tag: "PROKER 10 HIMSI",
    badge: "🏆 Sport & Art",
    date: "September 2026",
    caption:
      "Pekan Olahraga dan Gelar Seni Sistem Informasi. Ajang unjuk bakat futsal, basket, e-sport, hingga pentas kreasi mahasiswa Fasilkom Unsri.",
    rotation: "-rotate-2",
    imageUrl:
      "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 22,
    title: "22. Opening Ceremony SI FEST 2026",
    tag: "OPCER SI FEST",
    badge: "💻 Peluncuran Web",
    date: "Oktober 2026",
    caption:
      "Panggung pembukaan event akbar tahunan SI FEST 2026. Peluncuran web resmi karya tim PTI dan kick-off rentetan kompetisi IT tingkat nasional.",
    rotation: "rotate-2",
    imageUrl:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 23,
    title: "23. SIKRAB (SI Keakraban)",
    tag: "SIKRAB",
    badge: "💙 Keluarga SI",
    date: "Oktober 2026",
    caption:
      "Malam keakraban akbar satu jurusan Sistem Informasi menjelang akhir tahun kepengurusan. Saling bertukar cerita, apresiasi, dan tawa haru.",
    rotation: "-rotate-1",
    imageUrl:
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 24,
    title: "24. Rizztekk Metu Komplittt! 💙",
    tag: "FULL TEAM 100%",
    badge: "👑 Puncak Kenangan",
    date: "Oktober 2026",
    caption:
      "Momen langka dan paling bersejarah! 20 pengurus Ristek (Fahri, Revanna, Naufal, Calista & 16 Staf) akhirnya kumpul dan hangout komplit 100%! Keluarga selamanya.",
    rotation: "rotate-2",
    imageUrl:
      "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&w=800&q=80",
  },
];

export default function PolaroidGallery() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [likes, setLikes] = useState<{ [id: number]: number }>(() => {
    const initial: { [id: number]: number } = {};
    RISTEK_MEMORIES_24.forEach((m, idx) => {
      initial[m.id] = 48 + (idx % 8) * 6 + (idx % 5);
    });
    return initial;
  });

  const [floatingHearts, setFloatingHearts] = useState<
    { id: number; photoId: number; emoji: string }[]
  >([]);

  const handleLike = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setLikes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));

    // Spawn animated floating heart
    const emojis = ["❤️", "💖", "✨", "🫶🏻", "💙"];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    const heartKey = Date.now() + Math.random();

    setFloatingHearts((prev) => [
      ...prev,
      { id: heartKey, photoId: id, emoji: randomEmoji },
    ]);

    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => h.id !== heartKey));
    }, 1200);

    // Mini confetti burst
    try {
      confetti({
        particleCount: 15,
        spread: 35,
        origin: { y: 0.8 },
        colors: ["#F43F5E", "#F59E0B", "#38BDF8"],
      });
    } catch {
      // ignore
    }
  };

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((selectedPhotoIndex + 1) % RISTEK_MEMORIES_24.length);
  };

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex(
      (selectedPhotoIndex - 1 + RISTEK_MEMORIES_24.length) % RISTEK_MEMORIES_24.length
    );
  };

  const currentModalPhoto =
    selectedPhotoIndex !== null ? RISTEK_MEMORIES_24[selectedPhotoIndex] : null;

  return (
    <section id="galeri" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 font-mono text-xs mb-3">
          <PartyPopper className="w-3.5 h-3.5 text-amber-400" />
          <span>ALBUM KENANGAN KELUARGA RISTEK 2026</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Galeri 24 Momen Ristek & HIMSI 📸
        </h2>
        <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
          Mulai dari rapat perdana, pemisahan SSMO & bukber internal, euforia proker
          resmi, hingga momen langka Rizztekk Metu Komplit 20 pengurus. Klik untuk perbesar!
        </p>
      </div>

      {/* Polaroid Scrapbook Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 sm:gap-8 pt-4">
        {RISTEK_MEMORIES_24.map((item, idx) => {
          const itemHearts = floatingHearts.filter((h) => h.photoId === item.id);

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45, delay: (idx % 4) * 0.08 }}
              whileHover={{ y: -8, scale: 1.04, rotate: 0 }}
              onClick={() => setSelectedPhotoIndex(idx)}
              className={`group relative bg-[#13192F] p-3.5 pb-5 rounded-2xl shadow-xl shadow-black/50 border border-slate-700/80 hover:border-amber-400/60 hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-300 cursor-pointer flex flex-col justify-between ${item.rotation}`}
            >
              {/* Washi tape sticker */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-amber-400/40 backdrop-blur-sm border-l border-r border-amber-300/40 -rotate-2 z-10 shadow-sm" />

              {/* Top fun badge tag */}
              <div className="absolute top-5 right-5 z-10 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-mono font-bold text-amber-300 shadow">
                {item.badge}
              </div>

              {/* Photo Canvas */}
              <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5">
                  <span className="text-[11px] font-mono text-amber-300 font-semibold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Klik untuk perbesar foto
                  </span>
                </div>
              </div>

              {/* Polaroid Caption & Footer */}
              <div className="mt-3.5 px-1 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[10px] font-mono font-bold text-amber-400">
                      {item.tag}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {item.date}
                    </span>
                  </div>
                  <h3 className="font-sans font-bold text-sm text-slate-100 group-hover:text-amber-300 transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-400 font-sans line-clamp-2 leading-relaxed">
                    {item.caption}
                  </p>
                </div>

                {/* Like Button & Floating Hearts */}
                <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between relative">
                  <button
                    onClick={(e) => handleLike(e, item.id)}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800/80 hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 border border-slate-700/60 hover:border-rose-500/40 text-xs font-mono transition-all cursor-pointer group/like active:scale-90"
                  >
                    <Heart className="w-3.5 h-3.5 fill-rose-500/30 text-rose-400 group-hover/like:fill-rose-500 transition-all" />
                    <span>{likes[item.id] || 0}</span>
                  </button>

                  <span className="text-[10px] font-mono text-slate-500">
                    #{String(item.id).padStart(2, "0")} / 24
                  </span>

                  {/* Floating heart animations */}
                  {itemHearts.map((h) => (
                    <motion.span
                      key={h.id}
                      initial={{ opacity: 1, y: 0, scale: 0.8 }}
                      animate={{ opacity: 0, y: -45, scale: 1.4 }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="absolute left-6 text-base pointer-events-none select-none z-20"
                    >
                      {h.emoji}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox Modal with Next / Prev Navigation */}
      <AnimatePresence>
        {currentModalPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhotoIndex(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full bg-[#0D1429] border border-amber-500/30 rounded-3xl p-5 sm:p-7 shadow-2xl shadow-amber-950/40 flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPhotoIndex(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
                aria-label="Tutup foto"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Prev / Next controls */}
              <button
                onClick={handlePrevPhoto}
                className="absolute left-2 sm:-left-12 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/90 border border-amber-500/40 text-amber-300 hover:scale-110 active:scale-95 transition-all shadow-xl z-20 cursor-pointer"
                aria-label="Foto sebelumnya"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={handleNextPhoto}
                className="absolute right-2 sm:-right-12 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/90 border border-amber-500/40 text-amber-300 hover:scale-110 active:scale-95 transition-all shadow-xl z-20 cursor-pointer"
                aria-label="Foto selanjutnya"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Big High-Res Image Display */}
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner">
                <Image
                  src={currentModalPhoto.imageUrl}
                  alt={currentModalPhoto.title}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority
                />
              </div>

              {/* Modal Info Bar */}
              <div className="mt-4 pt-3 flex flex-col gap-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-mono font-bold">
                      {currentModalPhoto.tag}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-xs font-mono">
                      {currentModalPhoto.badge}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    {currentModalPhoto.date} &bull; Momen {currentModalPhoto.id} dari 24
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white">
                  {currentModalPhoto.title}
                </h3>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                  {currentModalPhoto.caption}
                </p>

                {/* Modal footer like action */}
                <div className="mt-2 pt-3 border-t border-slate-800 flex items-center justify-between">
                  <button
                    onClick={(e) => handleLike(e, currentModalPhoto.id)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold text-xs shadow-lg shadow-rose-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    <Heart className="w-4 h-4 fill-white" />
                    <span>Beri Cinta ({likes[currentModalPhoto.id] || 0})</span>
                  </button>

                  <span className="text-xs font-mono text-slate-400">
                    Tekan panah atau tombol untuk lihat foto lainnya
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
