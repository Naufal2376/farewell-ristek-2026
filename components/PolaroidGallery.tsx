"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

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
    <section id="galeri" className="px-4 sm:px-6 py-20 sm:py-28 bg-paper-2/60 border-y border-line">
      <div className="max-w-6xl mx-auto">
        <SectionHeading note="dari Februari sampai Oktober" title="24 momen satu periode">
          Dari rapat perdana sampai akhirnya bisa kumpul lengkap. Punya fotonya?
          Kirim ke PTI biar halaman ini makin penuh.
        </SectionHeading>

        <div className="space-y-12">
          {months.map((month) => (
            <div key={month} className="grid grid-cols-1 md:grid-cols-[9rem_1fr] gap-4 md:gap-8">
              <h3 className="font-serif text-2xl md:text-3xl text-maroon md:pt-3 md:sticky md:top-20 md:self-start">
                {month}
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {RISTEK_MEMORIES.filter((m) => m.month === month).map((item, idx) =>
                  item.photo ? (
                    <li key={item.id} className="sm:col-span-2">
                      <button
                        type="button"
                        onClick={() => setOpenIndex(withPhoto.indexOf(item))}
                        className="group block w-full text-left bg-card p-3 pb-4 shadow-[0_10px_24px_-14px_rgba(43,29,26,0.45)] -rotate-1 hover:rotate-0 transition-transform cursor-zoom-in"
                      >
                        <div className="relative aspect-[4/3] w-full overflow-hidden bg-paper-2">
                          <Image
                            src={item.photo}
                            alt={item.title}
                            fill
                            sizes="(max-width: 768px) 90vw, 600px"
                            className="object-cover"
                          />
                        </div>
                        <p className="mt-3 font-hand text-2xl leading-tight">{item.title}</p>
                        <p className="text-sm text-ink-soft">{item.caption}</p>
                      </button>
                    </li>
                  ) : (
                    <li
                      key={item.id}
                      className={`bg-card border border-line rounded-sm p-4 sm:p-5 ${
                        idx % 2 ? "sm:rotate-[0.6deg]" : "sm:-rotate-[0.4deg]"
                      }`}
                    >
                      <div className="flex items-baseline justify-between gap-3 text-xs text-ink-soft">
                        <span className="uppercase tracking-wider">{item.tag}</span>
                        <span className="tabular-nums">
                          {item.date ?? `#${String(item.id).padStart(2, "0")}`}
                        </span>
                      </div>
                      <h4 className="mt-2 font-serif text-xl leading-snug">{item.title}</h4>
                      <p className="mt-1.5 text-sm text-ink-soft leading-relaxed">{item.caption}</p>
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenIndex(null)}
            className="fixed inset-0 z-50 bg-ink/90 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label={open.title}
          >
            <figure
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl bg-card p-3 sm:p-4"
            >
              <div className="relative w-full aspect-[4/3] bg-paper-2">
                <Image src={open.photo!} alt={open.title} fill sizes="90vw" className="object-contain" />
              </div>
              <figcaption className="mt-3 flex items-start justify-between gap-4">
                <div>
                  <p className="font-hand text-2xl leading-tight">{open.title}</p>
                  <p className="text-sm text-ink-soft">{open.caption}</p>
                </div>
                {withPhoto.length > 1 && (
                  <div className="flex gap-1 shrink-0">
                    <button onClick={() => step(-1)} className="p-2 hover:text-maroon" aria-label="Foto sebelumnya">
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button onClick={() => step(1)} className="p-2 hover:text-maroon" aria-label="Foto berikutnya">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </figcaption>
              <button
                onClick={() => setOpenIndex(null)}
                className="absolute -top-3 -right-3 p-2 rounded-full bg-paper text-ink shadow"
                aria-label="Tutup"
              >
                <X className="w-4 h-4" />
              </button>
            </figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
