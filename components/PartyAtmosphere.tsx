"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";

export default function PartyAtmosphere() {
  // Generate random festive floating confetti particles once
  const particles = useMemo(() => {
    const colors = [
      "bg-amber-400/50",
      "bg-amber-300/40",
      "bg-blue-400/50",
      "bg-indigo-400/40",
      "bg-rose-400/50",
      "bg-pink-400/40",
      "bg-emerald-400/45",
      "bg-cyan-300/50",
    ];

    return Array.from({ length: 28 }).map((_, i) => ({
      id: i,
      left: `${(i * 3.7) % 96}%`,
      top: `${(i * 7.3) % 94}%`,
      size: i % 4 === 0 ? "w-3 h-3" : i % 3 === 0 ? "w-2.5 h-2.5" : "w-1.5 h-1.5",
      color: colors[i % colors.length],
      shape: i % 3 === 0 ? "rounded-full" : i % 3 === 1 ? "rounded-sm rotate-45" : "rounded-none rotate-12",
      duration: 6 + (i % 6) * 1.5,
      delay: (i % 5) * 0.7,
      driftX: ((i % 5) - 2) * 20,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Golden Festive Ambient Glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px]" />
      <div className="absolute top-1/3 -right-40 w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-[160px]" />
      <div className="absolute bottom-1/4 -left-32 w-[400px] h-[400px] bg-rose-500/10 rounded-full blur-[150px]" />
      <div className="absolute -bottom-20 right-1/4 w-[380px] h-[380px] bg-amber-400/10 rounded-full blur-[130px]" />

      {/* Floating Confetti Sparks */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={`absolute ${p.left} ${p.top} ${p.size} ${p.color} ${p.shape}`}
          initial={{ opacity: 0.2, y: 0 }}
          animate={{
            opacity: [0.2, 0.8, 0.3, 0.9, 0.2],
            y: [-15, 20, -25, 10, -15],
            x: [0, p.driftX, -p.driftX, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
}
