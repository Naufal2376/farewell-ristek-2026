import React from "react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-line px-4 sm:px-6 pt-14 pb-24">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-8">
        <div className="flex items-center gap-4">
          <Image src="/logo.png" alt="Logo Ristek" width={72} height={72} />
          <div>
            <p className="font-display font-semibold text-xl">Departemen Riset &amp; Teknologi</p>
            <p className="font-mono text-xs text-muted">HIMSI Fasilkom Universitas Sriwijaya · 2026</p>
          </div>
        </div>
        <div className="font-mono text-xs text-muted sm:text-right space-y-2">
          <p>Dibuat oleh Ristek 2026, untuk Ristek 2026.</p>
          <a href="#top" className="inline-block text-accent hover:text-accent-soft">
            ↑ Kembali ke atas
          </a>
        </div>
      </div>
    </footer>
  );
}
