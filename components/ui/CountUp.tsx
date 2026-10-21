"use client";

import React, { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

// Menghitung naik angka di dalam teks (mis. "4.821x", "1.024+") saat terlihat.
// Teks tanpa angka (mis. "∞") ditampilkan apa adanya.
export default function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();

  const match = value.match(/^([^\d]*)([\d.]+)(.*)$/);
  const hasNumber = !!match;
  const target = match ? Number(match[2].replace(/\./g, "")) : 0;
  const useThousands = match ? match[2].includes(".") : false;
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!hasNumber || !inView) return;
    if (reduce) {
      setDisplay(target);
      return;
    }
    const controls = animate(0, target, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, target, hasNumber]);

  if (!match) return <span>{value}</span>;
  const n = useThousands ? display.toLocaleString("id-ID") : String(display);
  return (
    <span ref={ref} className="tabular-nums">
      {match[1]}
      {n}
      {match[3]}
    </span>
  );
}
