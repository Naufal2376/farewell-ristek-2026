"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
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
    photo: "/galeri/01.jpg",
    caption:
      "Pertemuan pertama BPH dan seluruh staf. Masih canggung, masih saling hafalin nama, tapi semangatnya sudah penuh.",
  },
  {
    id: 2,
    title: "Rapat Global HIMSI",
    tag: "Rapglo",
    month: "Februari",
    photo: "/galeri/rapat-global.jpg",
    caption:
      "Rapat pleno gabungan pertama bersama semua departemen HIMSI untuk menyamakan rencana satu periode.",
  },
  {
    id: 3,
    title: "Makrab HIMSI 2026",
    tag: "Makrab",
    month: "Maret",
    photo: "/galeri/makrab.jpg",
    caption: "Malam keakraban seluruh pengurus. Games malam, api unggun, dan ketawa sampai larut.",
  },
  {
    id: 4,
    title: "SSMO",
    tag: "Proker HIMSI 01",
    month: "Maret",
    photo: "/galeri/ssmo.jpg",
    caption:
      "Sharing Session Manajemen Organisasi: cerita dan bekal langsung dari para alumni.",
  },
  {
    id: 5,
    title: "Bukber internal Ristek",
    tag: "Bukber",
    month: "Maret",
    photo: "/galeri/bukber-ristek.jpg",
    caption: "Buka puasa khusus keluarga kecil Ristek. Rebutan es buah, dan tidak ada yang bahas proker.",
  },
  {
    id: 6,
    title: "Bukber akbar HIMSI",
    tag: "Bukber",
    month: "April",
    photo: "/galeri/bukber-himsi.jpg",
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
    photo: "/galeri/lebaran.jpg",
    caption: "Spam stiker maaf lahir batin di grup, pamer baju lebaran, lalu halal bihalal sepulang libur.",
  },
  {
    id: 9,
    title: "Seminar Job Finding",
    tag: "Proker HIMSI 03",
    month: "Mei",
    photo: "/galeri/sjf.jpg",
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
    photo: "/galeri/eval-3-bulan.jpg",
    caption: "Review triwulan pertama. Jujur soal kendala, lalu saling menyemangati.",
  },
  {
    id: 12,
    title: "LADDER",
    tag: "Upgrading",
    month: "Mei",
    photo: "/galeri/ladder.jpg",
    caption: "Upgrading internal: kepemimpinan, teknis, dan problem solving untuk staf Ristek.",
  },
  {
    id: 13,
    title: "Arcade, karaoke & take BTS Dies",
    tag: "Healing",
    month: "Mei",
    photo: "/galeri/arcade.jpg",
    caption: "Main di Timezone, karaoke lagu galau, sambil ambil video BTS untuk Dies Natalis.",
  },
  {
    id: 14,
    title: "Dies Natalis HIMSI",
    tag: "Dies Natalis",
    month: "Mei",
    date: "25 Mei",
    photo: "/galeri/dies.jpg",
    caption: "Hari lahir HIMSI Fasilkom Unsri. Potong tumpeng dan pentas bareng.",
  },
  {
    id: 15,
    title: "SSMKP",
    tag: "Proker Ristek",
    month: "Juni – Juli",
    photo: "/galeri/ssmkp.jpg",
    caption: "Sharing Magang & Kerja Praktik bareng alumni: CV, portofolio, dan tes teknis.",
  },
  {
    id: 16,
    title: "Fun Day HIMSI",
    tag: "Funday",
    month: "Agustus",
    photo: "/galeri/funday.jpg",
    caption: "Satu hari seru tanpa laptop. Main games lapangan bareng seluruh pengurus HIMSI.",
  },
  {
    id: 17,
    title: "Evaluasi 6 bulan",
    tag: "Evaluasi",
    month: "Agustus",
    photo: "/galeri/eval-6-bulan.jpg",
    caption: "Setengah jalan selesai. Review kinerja paruh kedua periode dan refleksi bersama.",
  },
  {
    id: 18,
    title: "PKKMB Sistem Informasi 2026",
    tag: "Proker HIMSI 07",
    month: "Agustus",
    photo: "/galeri/pkkmb.jpg",
    caption: "Menyambut mahasiswa baru SI 2026. Ristek mengawal website dan sarana teknisnya.",
  },
  {
    id: 19,
    title: "Peringatan 17 Agustus",
    tag: "Proker HIMSI 08",
    month: "Agustus",
    caption: "Lomba-lomba khas tujuhbelasan bersama keluarga besar pengurus HIMSI.",
  },
  {
    id: 20,
    title: "INAGURASI 2026",
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
    photo: "/galeri/opcer.jpg",
    caption: "Pembukaan SI FEST dan peluncuran web resmi buatan tim PTI.",
  },
  {
    id: 23,
    title: "SIKRAB",
    tag: "SIKRAB",
    month: "Oktober",
    photo: "/galeri/sikrab.jpg",
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

// Momen yang dijalankan di level himpunan masuk jalur "himsi", sisanya "ristek".
const HIMSI_LANE = new Set([2, 3, 4, 6, 7, 9, 14, 16, 18, 19, 20, 21, 22, 23]);

// Hash pendek yang stabil per momen, biar terasa seperti git log.
function shortHash(item: RistekMemoryItem): string {
  let h = 2166136261;
  for (const ch of item.title + item.id) {
    h ^= ch.charCodeAt(0);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(16).padStart(8, "0").slice(0, 7);
}

const LANE_X = { ristek: 14, himsi: 38 };

export default function PolaroidGallery() {
  const withPhoto = RISTEK_MEMORIES.filter((m) => m.photo);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const open = openIndex !== null ? withPhoto[openIndex] : null;

  const step = (delta: number) =>
    setOpenIndex((i) => (i === null ? i : (i + delta + withPhoto.length) % withPhoto.length));

  // git log: terbaru di atas.
  const log = [...RISTEK_MEMORIES].reverse();
  // Tag bulan dipasang di commit terbaru tiap bulan, jadi muncul di awal kelompoknya.
  const monthTag = new Set(
    RISTEK_MEMORIES.filter((m, i) => RISTEK_MEMORIES[i + 1]?.month !== m.month).map((m) => m.id)
  );
  const lastId = RISTEK_MEMORIES[RISTEK_MEMORIES.length - 1].id;
  const himsiStart = log.findIndex((m) => HIMSI_LANE.has(m.id));
  const himsiEnd = log.length - 1 - [...log].reverse().findIndex((m) => HIMSI_LANE.has(m.id));

  return (
    <section id="galeri" className="px-4 sm:px-6 py-20 sm:py-28">
      <div className="max-w-6xl mx-auto">
        <SectionHeading index="03" label="git log" title="24 momen Ristek & HIMSI">
          Satu periode sebagai riwayat commit. Jalur emas untuk kegiatan Ristek,
          jalur biru untuk kegiatan bareng HIMSI.
        </SectionHeading>

        <Reveal>
          <div className="mx-auto max-w-4xl rounded-3xl glass overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 border-b border-line font-mono text-xs text-muted">
              <span>
                <span className="text-blue">❯</span> git log --graph --oneline --all
              </span>
              <span className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-gold" /> ristek
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue" /> himsi
                </span>
              </span>
            </div>

            <ol>
              {log.map((item, i) => {
                const lane = HIMSI_LANE.has(item.id) ? "himsi" : "ristek";
                const isFirst = i === 0;
                const isLast = i === log.length - 1;
                return (
                  <li key={item.id} className="group relative flex hover:bg-white/[0.03] transition-colors">
                    {/* Graph */}
                    <div aria-hidden="true" className="relative w-14 shrink-0">
                      <span
                        className="absolute w-0.5 bg-gold/70"
                        style={{ left: LANE_X.ristek - 1, top: isFirst ? 28 : 0, bottom: isLast ? "calc(100% - 28px)" : 0 }}
                      />
                      {i >= himsiStart && i <= himsiEnd && (
                        <span
                          className="absolute w-0.5 bg-blue/50"
                          style={{
                            left: LANE_X.himsi - 1,
                            top: i === himsiStart ? 28 : 0,
                            bottom: i === himsiEnd ? "calc(100% - 28px)" : 0,
                          }}
                        />
                      )}
                      {lane === "himsi" && (
                        <span className="absolute h-0.5 bg-blue/50" style={{ left: LANE_X.ristek, width: LANE_X.himsi - LANE_X.ristek, top: 27 }} />
                      )}
                      <span
                        className={`absolute w-3.5 h-3.5 rounded-full border-2 border-bg transition-transform group-hover:scale-125 ${
                          lane === "himsi" ? "bg-blue" : "bg-gold"
                        } ${item.id === lastId ? "shadow-[0_0_14px_rgb(251_191_36/0.9)]" : ""}`}
                        style={{ left: LANE_X[lane] - 7, top: 21 }}
                      />
                    </div>

                    {/* Commit */}
                    <div className="flex-1 min-w-0 py-4 pr-5">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs">
                        <span className="text-gold/80">{shortHash(item)}</span>
                        {item.id === lastId && (
                          <span className="px-1.5 py-0.5 rounded bg-blue/15 text-blue">HEAD -&gt; farewell</span>
                        )}
                        {monthTag.has(item.id) && (
                          <span className="px-1.5 py-0.5 rounded border border-gold/40 text-gold">tag: {item.month}</span>
                        )}
                        <span className="text-muted">{item.date ?? item.month}</span>
                      </div>
                      <div className="mt-1 flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <h3 className="font-semibold leading-snug">
                            {item.title}
                            <span className="ml-2 font-mono text-[11px] font-normal text-muted">[{item.tag}]</span>
                          </h3>
                          <p className="mt-1 text-sm text-muted leading-relaxed">{item.caption}</p>
                        </div>
                        {item.photo && (
                          <button
                            type="button"
                            onClick={() => setOpenIndex(withPhoto.indexOf(item))}
                            className="relative shrink-0 w-20 h-14 rounded-lg overflow-hidden border border-line cursor-zoom-in"
                            aria-label={`Lihat foto ${item.title}`}
                          >
                            <Image src={item.photo} alt="" fill sizes="80px" className="object-cover" />
                          </button>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>

            <div className="px-5 py-3 border-t border-line font-mono text-xs text-muted">
              (END) · 24 commits · Punya fotonya? Kirim ke PTI biar log ini ada gambarnya.
            </div>
          </div>
        </Reveal>
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
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden bg-surface-2">
                <Image src={open.photo!} alt={open.title} fill sizes="90vw" className="object-cover" />
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
