import React from "react";
import SectionHeading from "@/components/SectionHeading";

interface StatItem {
  label: string;
  value: string;
  note: string;
}

const stats: StatItem[] = [
  {
    label: "Rapat malam & Discord",
    value: "28x",
    note: "Paling sering mulai 23.45. \"10 menit lagi kelar kok ges.\"",
  },
  {
    label: "Proker selesai",
    value: "20",
    note: "8 proker internal Ristek, 12 proker HIMSI.",
  },
  {
    label: "Chat paling sering",
    value: "4.821x",
    note: "\"Revisi dikit lagi\", \"P\", \"Info link gmeet\", \"Aman gak?\"",
  },
  {
    label: "Bug & overthinking",
    value: "99+",
    note: "Tidur nyenyak: 404. Tapi semuanya beres.",
  },
  {
    label: "Kopi & gorengan patungan",
    value: "1.024+",
    note: "Kantin Fasilkom, terima kasih atas dukungannya.",
  },
  {
    label: "Anggota",
    value: "20",
    note: "Fahri, Revanna, Naufal, Calista, dan 16 staf lainnya.",
  },
];

export default function RistekWrapped() {
  return (
    <section id="wrapped" className="px-4 sm:px-6 py-20 sm:py-28 border-t border-line">
      <div className="max-w-6xl mx-auto">
        <SectionHeading index="01" label="Ristek Wrapped" title="Rekap satu periode">
          Statistik setahun kepengurusan, Februari sampai Oktober 2026.
        </SectionHeading>

        <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line">
          {stats.map((s) => (
            <div key={s.label} className="bg-bg p-6 sm:p-7 flex flex-col">
              <dt className="font-mono text-[11px] uppercase tracking-wider text-muted">{s.label}</dt>
              <dd className="mt-3 font-display font-semibold text-5xl text-accent tabular-nums leading-none">
                {s.value}
              </dd>
              <dd className="mt-4 text-sm text-muted leading-relaxed">{s.note}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
