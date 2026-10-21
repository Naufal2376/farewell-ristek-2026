import React from "react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-line px-4 sm:px-6 pt-14 pb-28">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-8">
        <div className="flex items-center gap-4">
          <Image src="/logo.png" alt="Logo Ristek" width={64} height={64} />
          <div>
            <p className="font-extrabold text-lg">Departemen Riset &amp; Teknologi</p>
            <p className="text-sm text-muted">HIMSI Fasilkom Universitas Sriwijaya · 2026</p>
          </div>
        </div>
        <div className="text-sm text-muted sm:text-right space-y-2">
          <p className="font-mono text-xs">No matter where our future compiles, Ristek stays our root directory.</p>
          <a href="#top" className="inline-flex items-center gap-1 text-gold hover:text-gold-soft">
            Kembali ke atas ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
