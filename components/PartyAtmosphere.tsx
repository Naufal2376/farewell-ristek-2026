"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";

interface Balloon {
  id: number;
  left: string;
  size: number;
  color: string;
  stringColor: string;
  duration: number;
  delay: number;
  drift: number;
}

export default function PartyAtmosphere() {
  // Festive party balloons floating from bottom to top
  const balloons: Balloon[] = useMemo(() => [
    {
      id: 1,
      left: "8%",
      size: 42,
      color: "from-amber-400/70 to-yellow-500/70",
      stringColor: "border-amber-400/40",
      duration: 22,
      delay: 0,
      drift: 25,
    },
    {
      id: 2,
      left: "22%",
      size: 36,
      color: "from-rose-400/65 to-pink-500/65",
      stringColor: "border-rose-400/40",
      duration: 26,
      delay: 5,
      drift: -20,
    },
    {
      id: 3,
      left: "38%",
      size: 48,
      color: "from-blue-400/60 to-indigo-500/60",
      stringColor: "border-blue-400/40",
      duration: 24,
      delay: 11,
      drift: 30,
    },
    {
      id: 4,
      left: "58%",
      size: 40,
      color: "from-emerald-400/65 to-teal-500/65",
      stringColor: "border-emerald-400/40",
      duration: 28,
      delay: 3,
      drift: -25,
    },
    {
      id: 5,
      left: "75%",
      size: 46,
      color: "from-amber-300/70 to-orange-400/70",
      stringColor: "border-amber-400/40",
      duration: 23,
      delay: 8,
      drift: 20,
    },
    {
      id: 6,
      left: "90%",
      size: 38,
      color: "from-pink-400/65 to-rose-500/65",
      stringColor: "border-pink-400/40",
      duration: 27,
      delay: 14,
      drift: -15,
    },
  ], []);

  // Subtle ambient twinkling stars across the entire screen
  const stars = useMemo(() => [
    { id: 1, left: "12%", top: "18%", size: 3, duration: 3.5, delay: 0 },
    { id: 2, left: "28%", top: "45%", size: 2.5, duration: 4.2, delay: 1 },
    { id: 3, left: "48%", top: "22%", size: 3, duration: 3.8, delay: 0.5 },
    { id: 4, left: "68%", top: "65%", size: 2, duration: 4.5, delay: 1.5 },
    { id: 5, left: "84%", top: "35%", size: 3.5, duration: 3.2, delay: 0.8 },
    { id: 6, left: "92%", top: "78%", size: 2.5, duration: 4.0, delay: 2 },
    { id: 7, left: "6%", top: "70%", size: 2.5, duration: 3.6, delay: 1.2 },
    { id: 8, left: "52%", top: "82%", size: 3, duration: 4.1, delay: 0.3 },
  ], []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Warm Golden & Party Ambient Glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px]" />
      <div className="absolute top-1/3 -right-40 w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-[160px]" />
      <div className="absolute bottom-1/4 -left-32 w-[400px] h-[400px] bg-rose-500/10 rounded-full blur-[150px]" />
      <div className="absolute -bottom-20 right-1/4 w-[380px] h-[380px] bg-amber-400/10 rounded-full blur-[130px]" />

      {/* Floating Celebration Balloons */}
      {balloons.map((b) => (
        <motion.div
          key={b.id}
          className="absolute flex flex-col items-center select-none"
          style={{ left: b.left }}
          initial={{ y: "115vh", opacity: 0 }}
          animate={{
            y: ["115vh", "-30vh"],
            x: [0, b.drift, -b.drift, 0],
            rotate: [0, 6, -6, 0],
            opacity: [0, 0.75, 0.75, 0],
          }}
          transition={{
            duration: b.duration,
            repeat: Infinity,
            ease: "linear",
            delay: b.delay,
          }}
        >
          {/* Balloon Oval Body */}
          <div
            className={`rounded-full bg-gradient-to-t ${b.color} relative shadow-lg shadow-black/20`}
            style={{
              width: `${b.size}px`,
              height: `${b.size * 1.22}px`,
            }}
          >
            {/* Highlight gleam reflection */}
            <div className="absolute top-2 left-2.5 w-2 h-3.5 bg-white/40 rounded-full rotate-[-25deg]" />
            {/* Balloon tie knot */}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-1.5 bg-amber-300/60 rounded-sm" />
          </div>

          {/* Dangling Balloon String */}
          <div
            className={`w-0 h-10 border-l border-dashed ${b.stringColor} opacity-50`}
          />
        </motion.div>
      ))}

      {/* Twinkling ambient stars */}
      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-amber-200"
          style={{
            left: s.left,
            top: s.top,
            width: `${s.size}px`,
            height: `${s.size}px`,
          }}
          animate={{
            opacity: [0.2, 0.85, 0.2],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: s.delay,
          }}
        />
      ))}
    </div>
  );
}
