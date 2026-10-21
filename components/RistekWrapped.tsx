"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Coffee,
  MessageSquare,
  CheckCircle,
  Bug,
  Heart,
  Flame,
  Sparkles,
} from "lucide-react";

interface StatItem {
  icon: React.ReactNode;
  label: string;
  value: string;
  subValue: string;
  tag: string;
  color: string;
  badgeBg: string;
}

export default function RistekWrapped() {
  const stats: StatItem[] = [
    {
      icon: <Coffee className="w-5 h-5 text-amber-400" />,
      label: "Total Rapat Malam & Discord",
      value: "28x",
      subValue: "Waktu terfavorit: 23:45 WIB ('10 menit lagi kelar kok ges')",
      tag: "🌙 OVERTIME LOGS",
      color: "from-amber-500/20 via-orange-500/10 to-transparent",
      badgeBg: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-emerald-400" />,
      label: "Proker & Tech Projects",
      value: "100%",
      subValue: "8 Proker Internal Ristek & 12 Proker HIMSI tuntas dieksekusi",
      tag: "🚀 COMPILATION SUCCESS",
      color: "from-emerald-500/20 via-teal-500/10 to-transparent",
      badgeBg: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    },
    {
      icon: <MessageSquare className="w-5 h-5 text-cyan-400" />,
      label: "Kata Paling Sering Di-chat",
      value: "4.821x",
      subValue: "\"Revisi dikit lagi\", \"P\", \"Info link gmeet\", \"Aman gak?\"",
      tag: "💬 TOP KEYWORD",
      color: "from-cyan-500/20 via-blue-500/10 to-transparent",
      badgeBg: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
    },
    {
      icon: <Bug className="w-5 h-5 text-rose-400" />,
      label: "Bugs & Overthinking Teratasi",
      value: "99+",
      subValue: "\"Error 404: Tidur Nyenyak Not Found\", tapi selalu tuntas",
      tag: "🐛 DEBUGGED",
      color: "from-rose-500/20 via-pink-500/10 to-transparent",
      badgeBg: "bg-rose-500/20 text-rose-300 border-rose-500/30",
    },
    {
      icon: <Flame className="w-5 h-5 text-yellow-400" />,
      label: "Bahan Bakar Coding & Rapat",
      value: "1.024+",
      subValue: "Cup kopi & gorengan kantin Fasilkom yang dibeli patungan",
      tag: "☕ ENERGY METRICS",
      color: "from-yellow-500/20 via-amber-500/10 to-transparent",
      badgeBg: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
    },
    {
      icon: <Heart className="w-5 h-5 text-pink-400 fill-pink-400" />,
      label: "Kekeluargaan 20 Anggota",
      value: "∞ / ∞",
      subValue: "Fahri, Revanna, Naufal, Calista & 16 Staf hebat Ristek 2026",
      tag: "💙 INFINITE LOVE",
      color: "from-pink-500/20 via-purple-500/10 to-transparent",
      badgeBg: "bg-pink-500/20 text-pink-300 border-pink-500/30",
    },
  ];

  return (
    <section id="wrapped" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto relative">
      {/* Section Header */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 font-mono text-xs mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>STATISTIK PERJALANAN SATU PERIODE</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Ristek Wrapped <span className="text-amber-400">2026</span> 🎉
        </h2>
        <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
          Kilasan data kocak, rekap begadang, dan statistik kebersamaan sepanjang
          perjalanan kepengurusan Departemen Ristek HIMSI 2026.
        </p>
      </div>

      {/* Direct Statistic Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            whileHover={{ y: -6, scale: 1.02 }}
            className={`group relative p-6 sm:p-7 rounded-3xl bg-[#090E21] border border-slate-800 hover:border-amber-400/50 backdrop-blur-md transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10 flex flex-col justify-between overflow-hidden`}
          >
            {/* Ambient card top gradient */}
            <div
              className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-b ${stat.color} pointer-events-none`}
            />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-5">
                <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-700/80 group-hover:scale-110 group-hover:rotate-6 transition-transform shadow-md">
                  {stat.icon}
                </div>
                <span
                  className={`text-[10px] font-mono font-bold tracking-wider px-2.5 py-1 rounded-lg border ${stat.badgeBg}`}
                >
                  {stat.tag}
                </span>
              </div>

              <div className="text-3xl sm:text-4xl font-black font-mono text-white mb-1.5 tracking-tight group-hover:text-amber-300 transition-colors">
                {stat.value}
              </div>
              <div className="text-sm sm:text-base font-bold text-slate-200 mb-3">
                {stat.label}
              </div>
            </div>

            <div className="relative z-10 pt-4 border-t border-slate-800/80 text-xs font-mono text-slate-400 leading-relaxed italic">
              {stat.subValue}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
