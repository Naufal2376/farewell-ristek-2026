import React from "react";
import { RISTEK_MEMBERS_2026 } from "@/components/BoardingPassGenerator";

// Teks berjalan berisi 20 nama pengurus.
export default function MemberMarquee() {
  const names = RISTEK_MEMBERS_2026.map((m) => m.name);
  return (
    <div className="relative border-y border-line bg-surface/40 py-4 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
      <ul className="flex w-max animate-marquee" aria-label="Pengurus Ristek 2026">
        {[...names, ...names].map((name, i) => (
          <li
            key={i}
            aria-hidden={i >= names.length}
            className="flex items-center gap-6 pr-6 text-sm sm:text-base font-semibold text-muted whitespace-nowrap"
          >
            {name}
            <span className="w-1.5 h-1.5 rotate-45 bg-gold/70" />
          </li>
        ))}
      </ul>
    </div>
  );
}
