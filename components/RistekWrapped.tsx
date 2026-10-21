"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Coffee,
  MessageSquare,
  CheckCircle,
  Bug,
  Heart,
  Flame,
  Award,
  Globe,
  Layout,
  Code2,
  Users,
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
  const [activeTab, setActiveTab] = useState<"stats" | "highlights" | "awards">("stats");

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
      label: "Kekeluargaan 21 Anggota",
      value: "∞ / ∞",
      subValue: "Fahri, Revanna, Naufal, Calista & 17 Staf hebat Ristek 2026",
      tag: "INFINITE LOVE",
      color: "from-pink-500/20 to-purple-500/5",
      borderGlow: "group-hover:border-pink-400/50",
    },
  ];

  const highlights = [
    {
      icon: <Globe className="w-5 h-5 text-blue-400" />,
      title: "Revamp Web HIMSI 2026",
      description: "Berhasil meluncurkan kembali wajah baru website resmi HIMSI Fasilkom Unsri dengan arsitektur modern.",
      metric: "PRODUKSI LIVE",
    },
    {
      icon: <Layout className="w-5 h-5 text-amber-400" />,
      title: "UX Exhibition Ristek 2026",
      description: "Memfasilitasi ratusan mahasiswa untuk belajar UI/UX prototyping yang berpusat pada kenyamanan pengguna.",
      metric: "EDUKASI PECAT",
    },
    {
      icon: <Code2 className="w-5 h-5 text-emerald-400" />,
      title: "HIMSI Digital Ecosystem",
      description: "Fondasi ekosistem digital terintegrasi untuk mendukung seluruh kebutuhan publikasi dan sistem himpunan.",
      metric: "TERINTEGRASI",
    },
    {
      icon: <Users className="w-5 h-5 text-purple-400" />,
      title: "Sinergi Sukses SI FEST 2026",
      description: "Kolaborasi solid seluruh fungsionaris dalam menyukseskan festival tahunan terbesar Sistem Informasi.",
      metric: "MEGA AGENDA",
    },
  ];

  const awards = [
    {
      title: "👑 King/Queen of Stiker WhatsApp",
      description: "Chat apapun di grup Ristek responnya selalu pakai stiker kucing atau meme Fasilkom.",
      badge: "MEME MASTER",
    },
    {
      title: "🦉 The Midnight Committer",
      description: "Push git jam 03.14 subuh dengan commit message: 'bismillah fix beneran'.",
      badge: "CODE WARRIOR",
    },
    {
      title: "☕ Kopi Addict of the Year",
      description: "Rapat belum afdol kalau belum ada es kopi susu gula aren di samping laptop.",
      badge: "FUEL CHAMPION",
    },
    {
      title: "✨ BPH Paling Sabar",
      description: "Selalu mengingatkan deadline pleno dengan senyuman dan emotikon '🫶🏻'.",
      badge: "PEACE MAKER",
    },
  ];

  return (
    <section id="wrapped" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/60 text-xs font-mono text-cyan-300 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>SPOTIFY x GITHUB WRAPPED EDITION</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Ristek Wrapped <span className="text-amber-400">2026</span>
        </h2>
        <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
          Kilasan data kocak, rekap begadang, dan kilas balik pencapaian sepanjang
          perjalanan kepengurusan Departemen Ristek HIMSI 2026.
        </p>

        {/* Tab Toggle */}
        <div className="mt-6 inline-flex flex-wrap justify-center p-1 rounded-xl bg-slate-900 border border-slate-800 gap-1">
          <button
            onClick={() => setActiveTab("stats")}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
              activeTab === "stats"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Statistik Lucu
          </button>
          <button
            onClick={() => setActiveTab("highlights")}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
              activeTab === "highlights"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Highlight Pencapaian 🚀
          </button>
          <button
            onClick={() => setActiveTab("awards")}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
              activeTab === "awards"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Hall of Inside Jokes 🏆
          </button>
        </div>
      </div>

      {/* Content depending on activeTab */}
      {activeTab === "stats" && (
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
      )}

      {activeTab === "highlights" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {highlights.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              className="p-6 rounded-2xl bg-[#0B1228] border border-slate-800 hover:border-blue-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    {item.icon}
                  </div>
                  <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20">
                    {item.metric}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {activeTab === "awards" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {awards.map((award, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 via-[#0B1228] to-[#090E1F] border border-amber-500/30 hover:border-amber-400/60 transition-all flex items-start gap-4"
            >
              <div className="p-3 rounded-xl bg-amber-500/20 text-amber-300 shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-base font-bold text-white">
                    {award.title}
                  </h3>
                  <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
                    {award.badge}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                  {award.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
