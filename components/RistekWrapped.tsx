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
];

export default function RistekWrapped() {
  return (
    <section id="wrapped" className="px-4 sm:px-6 py-20 sm:py-28 bg-paper-2/60 border-y border-line">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5">
          <SectionHeading note="rekap setahun" title="Ristek Wrapped 2026">
            Kalau satu periode kepengurusan dicetak jadi struk kantin, kira-kira
            begini isinya.
          </SectionHeading>
        </div>

        {/* Struk */}
        <div className="lg:col-span-7 flex justify-center lg:justify-start">
          <div className="w-full max-w-md drop-shadow-[0_10px_18px_rgba(43,29,26,0.18)]">
            <div className="bg-card px-6 sm:px-8 pt-8 pb-10 font-mono text-[13px] text-ink [clip-path:polygon(0_0,100%_0,100%_calc(100%-8px),95%_100%,90%_calc(100%-8px),85%_100%,80%_calc(100%-8px),75%_100%,70%_calc(100%-8px),65%_100%,60%_calc(100%-8px),55%_100%,50%_calc(100%-8px),45%_100%,40%_calc(100%-8px),35%_100%,30%_calc(100%-8px),25%_100%,20%_calc(100%-8px),15%_100%,10%_calc(100%-8px),5%_100%,0_calc(100%-8px))]">
              <div className="text-center">
                <p className="font-bold tracking-widest">RISTEK HIMSI 2026</p>
                <p className="text-ink-soft text-xs mt-1">Fasilkom Unsri · Feb – Okt 2026</p>
              </div>
  
              <div className="my-5 border-t border-dashed border-ink/30" />
  
              <ul className="space-y-4">
                {stats.map((s) => (
                  <li key={s.label}>
                    <div className="flex items-baseline gap-2">
                      <span className="shrink-0">{s.label}</span>
                      <span className="flex-1 border-b border-dotted border-ink/30 translate-y-[-3px]" />
                      <span className="shrink-0 font-bold tabular-nums">{s.value}</span>
                    </div>
                    <p className="text-ink-soft text-xs mt-1 font-sans">{s.note}</p>
                  </li>
                ))}
              </ul>
  
              <div className="my-5 border-t border-dashed border-ink/30" />
  
              <div className="flex items-baseline justify-between font-bold">
                <span>TOTAL ANGGOTA</span>
                <span>20 orang</span>
              </div>
              <p className="text-ink-soft text-xs mt-1 font-sans">
                Fahri, Revanna, Naufal, Calista, dan 16 staf lainnya.
              </p>
  
              <p className="mt-6 text-center text-xs tracking-widest">LUNAS · TERIMA KASIH</p>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
