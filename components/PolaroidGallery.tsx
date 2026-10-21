"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import SpotlightCard from "@/components/ui/SpotlightCard";
import Reveal from "@/components/ui/Reveal";

export interface RistekMemoryItem {
  id: number;
  title: string;
  tag: string;
  month: string;
  date?: string;
  caption: string;
  /**
   * Foto asli momen ini, mis. "/galeri/01.jpg" (taruh file di public/galeri).
   * Kosongkan kalau belum ada: kartu tampil sebagai catatan tanpa foto,
   * jangan diisi foto stok.
   */
  photo?: string;
}

export const RISTEK_MEMORIES: RistekMemoryItem[] = [
  {
    id: 1,
    title: "Rapat perdana Ristek 2026",
    tag: "Kickoff",
    month: "Februari",
    caption:
      "Pertemuan pertama BPH dan seluruh staf. Masih canggung, masih saling hafalin nama, tapi semangatnya sudah penuh.",
  },
  {
    id: 2,
    title: "Rapat Global HIMSI",
    tag: "Rapglo",
    month: "Februari",
    caption:
      "Rapat pleno gabungan pertama bersama semua departemen HIMSI untuk menyamakan rencana satu periode.",
  },
  {
    id: 3,
    title: "Makrab HIMSI 2026",
    tag: "Makrab",
    month: "Maret",
    caption: "Malam keakraban seluruh pengurus. Games malam, api unggun, dan ketawa sampai larut.",
  },
  {
    id: 4,
    title: "SSMO",
    tag: "Proker HIMSI 01",
    month: "Maret",
    caption:
      "Sharing Session Manajemen Organisasi: cerita dan bekal langsung dari para alumni.",
  },
  {
    id: 5,
    title: "Bukber internal Ristek",
    tag: "Bukber",
    month: "Maret",
    caption: "Buka puasa khusus keluarga kecil Ristek. Rebutan es buah, dan tidak ada yang bahas proker.",
  },
  {
    id: 6,
    title: "Bukber akbar HIMSI",
    tag: "Bukber",
    month: "April",
    caption: "Satu himpunan kumpul: staf, BPH, dosen pembina, dan demisioner SI lintas angkatan.",
  },
  {
    id: 7,
    title: "KRBB",
    tag: "Proker HIMSI 02",
    month: "April",
    caption: "Kajian rohani lalu bakti sosial berbagi paket sembako ke warga sekitar.",
  },
  {
    id: 8,
    title: "Lebaran & halal bihalal",
    tag: "Lebaran",
    month: "April",
    caption: "Spam stiker maaf lahir batin di grup, pamer baju lebaran, lalu halal bihalal sepulang libur.",
  },
  {
    id: 9,
    title: "Seminar Job Finding",
    tag: "Proker HIMSI 03",
    month: "Mei",
    caption: "Seminar karier, personal branding, dan networking bersama praktisi industri IT.",
  },
  {
    id: 10,
    title: "UX Exhibition",
    tag: "Proker HIMSI 04",
    month: "Mei",
    caption: "Proker kebanggaan Ristek: pelatihan UI/UX dan pameran prototipe aplikasi.",
  },
  {
    id: 11,
    title: "Evaluasi 3 bulan",
    tag: "Evaluasi",
    month: "Mei",
    caption: "Review triwulan pertama. Jujur soal kendala, lalu saling menyemangati.",
  },
  {
    id: 12,
    title: "LADDER",
    tag: "Upgrading",
    month: "Mei",
    caption: "Upgrading internal: kepemimpinan, teknis, dan problem solving untuk staf Ristek.",
  },
  {
    id: 13,
    title: "Arcade, karaoke & take BTS Dies",
    tag: "Healing",
    month: "Mei",
    caption: "Main di Timezone, karaoke lagu galau, sambil ambil video BTS untuk Dies Natalis.",
  },
  {
    id: 14,
    title: "Dies Natalis HIMSI",
    tag: "Dies Natalis",
    month: "Mei",
    date: "25 Mei",
    caption: "Hari lahir HIMSI Fasilkom Unsri. Potong tumpeng dan pentas bareng.",
  },
  {
    id: 15,
    title: "SSMKP",
    tag: "Proker Ristek",
    month: "Juni – Juli",
    caption: "Sharing Magang & Kerja Praktik bareng alumni: CV, portofolio, dan tes teknis.",
  },
  {
    id: 16,
    title: "Fun Day Ristek",
    tag: "Funday",
    month: "Agustus",
    caption: "Satu hari tanpa laptop. Main di lapangan, jajan, ketawa.",
  },
  {
    id: 17,
    title: "Evaluasi 6 bulan + metu bareng",
    tag: "Evaluasi",
    month: "Agustus",
    caption: "Setengah jalan selesai. Ditutup dengan mie ayam dan es teh jumbo.",
  },
  {
    id: 18,
    title: "Peringatan 17 Agustus",
    tag: "Proker HIMSI 08",
    month: "Agustus",
    caption: "Lomba-lomba khas tujuhbelasan bersama pengurus HIMSI.",
  },
  {
    id: 19,
    title: "PKKMB Sistem Informasi",
    tag: "Proker HIMSI 07",
    month: "Agustus",
    caption: "Menyambut maba SI 2026. Ristek mengawal website dan kebutuhan teknisnya.",
  },
  {
    id: 20,
    title: "Inagurasi 2026 + KI",
    tag: "Proker HIMSI 09",
    month: "September",
    caption: "Malam inagurasi yang mempertemukan maba SI kampus Indralaya dan Bukit.",
  },
  {
    id: 21,
    title: "PORGESELSI 2026",
    tag: "Proker HIMSI 10",
    month: "September",
    caption: "Pekan olahraga dan seni SI: futsal, basket, e-sport, sampai pentas kreasi.",
  },
  {
    id: 22,
    title: "Opening SI FEST 2026",
    tag: "SI FEST",
    month: "Oktober",
    caption: "Pembukaan SI FEST dan peluncuran web resmi buatan tim PTI.",
  },
  {
    id: 23,
    title: "SIKRAB",
    tag: "SIKRAB",
    month: "Oktober",
    caption: "Malam keakraban satu jurusan menjelang akhir kepengurusan.",
  },
  {
    id: 24,
    title: "Rizztekk metu komplit",
    tag: "Formasi lengkap",
    month: "Oktober",
    caption: "Akhirnya 20 pengurus kumpul dan hangout bareng, lengkap.",
  },
];

const months = RISTEK_MEMORIES.reduce<string[]>(
  (acc, m) => (acc.includes(m.month) ? acc : [...acc, m.month]),
  []
);

export default function PolaroidGallery() {
  const withPhoto = RISTEK_MEMORIES.filter((m) => m.photo);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const open = openIndex !== null ? withPhoto[openIndex] : null;

  const step = (delta: number) =>
    setOpenIndex((i) => (i === null ? i : (i + delta + withPhoto.length) % withPhoto.length));

  return (
    <section id="galeri" className="px-4 sm:px-6 py-20 sm:py-28">
      <div className="max-w-6xl mx-auto">
        <SectionHeading index="03" label="Galeri" title="24 momen Ristek & HIMSI">
          Dari rapat perdana sampai akhirnya bisa kumpul lengkap. Punya fotonya?
          Kirim ke PTI biar galeri ini makin penuh.
        </SectionHeading>

        <div className="space-y-12">
          {months.map((month) => {
            const items = RISTEK_MEMORIES.filter((m) => m.month === month);
            return (
              <div key={month}>
                <Reveal className="flex items-center gap-4 mb-5">
                  <h3 className="flex items-center gap-2.5 text-lg font-bold">
                    <span className="w-2 h-2 rounded-full bg-gold shadow-[0_0_10px_rgb(251_191_36/0.8)]" />
                    {month}
                  </h3>
                  <span className="h-px flex-1 bg-gradient-to-r from-line-strong to-transparent" />
                  <span className="font-mono text-xs text-muted">{items.length} momen</span>
                </Reveal>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map((item, i) => (
                    <Reveal key={item.id} delay={(i % 3) * 0.06} className="h-full">
                      {item.photo ? (
                        <SpotlightCard as="article" className="h-full">
                          <button
                            type="button"
                            onClick={() => setOpenIndex(withPhoto.indexOf(item))}
                            className="group block w-full text-left p-3 cursor-zoom-in"
                          >
                            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-surface-2">
                              <Image
                                src={item.photo}
                                alt={item.title}
                                fill
                                sizes="(max-width: 768px) 90vw, 400px"
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            </div>
                            <div className="p-2 pt-3">
                              <p className="font-mono text-[11px] uppercase tracking-wider text-gold">{item.tag}</p>
                              <p className="mt-1 font-bold">{item.title}</p>
                              <p className="mt-1 text-sm text-muted line-clamp-2">{item.caption}</p>
                            </div>
                          </button>
                        </SpotlightCard>
                      ) : (
                        <SpotlightCard as="article" className="h-full p-5">
                          <div className="flex items-center justify-between gap-3">
                            <span className="font-mono text-[11px] uppercase tracking-wider text-gold">{item.tag}</span>
                            <span className="font-mono text-[11px] text-muted tabular-nums">
                              {item.date ?? `#${String(item.id).padStart(2, "0")}`}
                            </span>
                          </div>
                          <h4 className="mt-3 text-lg font-bold leading-snug">{item.title}</h4>
                          <p className="mt-1.5 text-sm text-muted leading-relaxed">{item.caption}</p>
                        </SpotlightCard>
                      )}
                    </Reveal>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenIndex(null)}
            className="fixed inset-0 z-50 bg-bg/90 backdrop-blur-md flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label={open.title}
          >
            <motion.figure
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl rounded-3xl glass p-3"
            >
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-surface-2">
                <Image src={open.photo!} alt={open.title} fill sizes="90vw" className="object-contain" />
              </div>
              <figcaption className="mt-3 px-2 pb-1 flex items-start justify-between gap-4">
                <div>
                  <p className="font-bold">{open.title}</p>
                  <p className="text-sm text-muted">{open.caption}</p>
                </div>
                <div className="flex gap-1 shrink-0">
                  {withPhoto.length > 1 && (
                    <>
                      <button onClick={() => step(-1)} className="p-2 rounded-lg hover:bg-white/5" aria-label="Foto sebelumnya">
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button onClick={() => step(1)} className="p-2 rounded-lg hover:bg-white/5" aria-label="Foto berikutnya">
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}
                  <button onClick={() => setOpenIndex(null)} className="p-2 rounded-lg hover:bg-white/5" aria-label="Tutup">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
