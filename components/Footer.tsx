import React from "react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-maroon-deep text-paper/80 px-4 sm:px-6 pt-14 pb-24">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 shrink-0 rounded-full bg-paper flex items-center justify-center">
            <Image src="/logo.png" alt="Logo Ristek" width={60} height={60} />
          </div>
          <div>
            <p className="font-serif text-2xl text-paper">Departemen Riset & Teknologi</p>
            <p className="text-sm">HIMSI Fasilkom Universitas Sriwijaya · 2026</p>
          </div>
        </div>
        <div className="text-sm sm:text-right space-y-1">
          <p>Dibuat oleh Ristek 2026, untuk Ristek 2026.</p>
          <a href="#top" className="inline-block text-paper underline underline-offset-4 hover:text-gold-soft">
            Kembali ke atas
          </a>
        </div>
      </div>
    </footer>
  );
}
