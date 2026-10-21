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
} from "lucide-react";

interface StatItem {
  icon: React.ReactNode;
  label: string;
  value: string;
  subValue: string;
  tag: string;
  color: string;
  borderGlow: string;
}

export default function RistekWrapped() {
  const stats: StatItem[] = [
    {
      icon: <Coffee className="w-5 h-5 text-amber-400" />,
      label: "Total Rapat Malam & Discord",
      value: "28x",
      subValue: "Waktu terfavorit: 23:45 WIB ('10 menit lagi kelar kok ges')",
      tag: "OVERTIME LOGS",
      color: "from-amber-500/20 to-orange-500/5",
      borderGlow: "group-hover:border-amber-400/50",
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-emerald-400" />,
      label: "Proker & Tech Projects",
      value: "100%",
      subValue: "8 Proker Internal Ristek & 12 Proker HIMSI tuntas dieksekusi",
      tag: "COMPILATION SUCCESS",
      color: "from-emerald-500/20 to-teal-500/5",
      borderGlow: "group-hover:border-emerald-400/50",
    },
    {
      icon: <MessageSquare className="w-5 h-5 text-cyan-400" />,
      label: "Kata Paling Sering Di-chat",
      value: "4.821x",
      subValue: "\"Revisi dikit lagi\", \"P\", \"Info link gmeet\", \"Aman gak?\"",
      tag: "TOP KEYWORD",
      color: "from-cyan-500/20 to-blue-500/5",
      borderGlow: "group-hover:border-cyan-400/50",
    },
    {
      icon: <Bug className="w-5 h-5 text-rose-400" />,
      label: "Bugs & Overthinking Teratasi",
      value: "99+",
      subValue: "\"Error 404: Tidur Nyenyak Not Found\", tapi selalu tuntas",
      tag: "DEBUGGED",
      color: "from-rose-500/20 to-pink-500/5",
      borderGlow: "group-hover:border-rose-400/50",
    },
    {
      icon: <Flame className="w-5 h-5 text-yellow-400" />,
      label: "Bahan Bakar Coding & Rapat",
      value: "1.024+",
      subValue: "Cup kopi & gorengan kantin Fasilkom yang dibeli patungan",
      tag: "ENERGY METRICS",
      color: "from-yellow-500/20 to-amber-500/5",
      borderGlow: "group-hover:border-yellow-400/50",
    },
    {
      icon: <Heart className="w-5 h-5 text-pink-400" />,
      label: "Kekeluargaan 20 Anggota",
      value: "∞ / ∞",
      subValue: "Fahri, Revanna, Naufal, Calista & 16 Staf hebat Ristek 2026",
      tag: "INFINITE LOVE",
      color: "from-pink-500/20 to-purple-500/5",
      borderGlow: "group-hover:border-pink-400/50",
    },
  ];

  return (
    <section id="wrapped" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Ristek Wrapped <span className="text-amber-400">2026</span>
        </h2>
        <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
          Kilasan data kocak, rekap begadang, dan statistik kebersamaan sepanjang
          perjalanan kepengurusan Departemen Ristek HIMSI 2026.
        </p>
      </div>

      {/* Direct Statistic Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            className={`group relative p-6 rounded-2xl bg-gradient-to-br ${stat.color} via-[#0B1228] to-[#090E1F] border border-slate-800 backdrop-blur-sm transition-all duration-300 ${stat.borderGlow} hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-950/30 flex flex-col justify-between`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-700/60">
                  {stat.icon}
                </div>
                <span className="text-[10px] font-mono tracking-wider px-2 py-0.5 rounded-md bg-slate-800 text-slate-400">
                  {stat.tag}
                </span>
              </div>

              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white mb-1 tracking-tight">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-slate-200 mb-2">
                {stat.label}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/80 text-xs font-mono text-slate-400 leading-relaxed italic">
              {stat.subValue}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
