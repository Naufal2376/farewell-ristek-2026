import React from "react";
import { Moon, CheckCircle2, MessageSquare, Bug, Coffee, Users } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import SpotlightCard from "@/components/ui/SpotlightCard";
import CountUp from "@/components/ui/CountUp";
import Reveal from "@/components/ui/Reveal";

const stats = [
  {
    icon: Moon,
    label: "Rapat malam & Discord",
    value: "28x",
    note: "Paling sering mulai 23.45. \"10 menit lagi kelar kok ges.\"",
  },
  {
    icon: CheckCircle2,
    label: "Proker selesai",
    value: "20",
    note: "8 proker internal Ristek dan 12 proker HIMSI.",
  },
  {
    icon: MessageSquare,
    label: "Chat paling sering",
    value: "4.821x",
    note: "\"Revisi dikit lagi\", \"P\", \"Info link gmeet\", \"Aman gak?\"",
  },
  {
    icon: Bug,
    label: "Bug & overthinking",
    value: "99+",
    note: "Tidur nyenyak: 404 not found. Tapi semuanya beres.",
  },
  {
    icon: Coffee,
    label: "Kopi & gorengan patungan",
    value: "1.024+",
    note: "Kantin Fasilkom, terima kasih atas dukungannya.",
  },
  {
    icon: Users,
    label: "Keluarga Ristek",
    value: "20",
    note: "Fahri, Revanna, Naufal, Calista, dan 16 staf lainnya.",
  },
];

export default function RistekWrapped() {
  return (
    <section id="wrapped" className="px-4 sm:px-6 py-20 sm:py-28">
      <div className="max-w-6xl mx-auto">
        <SectionHeading index="01" label="Wrapped" title={<>Ristek Wrapped <span className="text-gold">2026</span></>}>
          Rekap satu periode kepengurusan dalam angka, Februari sampai Oktober.
        </SectionHeading>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {stats.map(({ icon: Icon, ...s }, i) => (
            <Reveal key={s.label} delay={(i % 3) * 0.07} className="h-full">
              <SpotlightCard className="h-full p-6 sm:p-7">
                <div className="flex items-center justify-between">
                  <span className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-gold" />
                  </span>
                  <span className="font-mono text-[11px] text-muted">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="mt-6 text-5xl font-extrabold tracking-tight">
                  <CountUp value={s.value} />
                </div>
                <div className="mt-2 font-semibold">{s.label}</div>
                <p className="mt-3 pt-3 border-t border-line text-sm text-muted leading-relaxed">{s.note}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
