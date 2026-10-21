"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Rekap", href: "#wrapped" },
  { label: "Rundown", href: "#rundown" },
  { label: "Galeri", href: "#galeri" },
  { label: "Tiket", href: "#boarding-pass" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 w-full bg-paper/95 backdrop-blur border-b border-line">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-2.5">
          <Image src="/logo.png" alt="" width={40} height={40} priority />
          <span className="leading-tight">
            <span className="block font-serif text-lg">Ristek 2026</span>
            <span className="block text-[11px] text-ink-soft">HIMSI Fasilkom Unsri</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-7 text-sm text-ink-soft">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-maroon transition-colors">
              {link.label}
            </a>
          ))}
          <a
            href="#secret-form"
            className="px-4 py-2 rounded-full bg-maroon text-paper font-medium hover:bg-maroon-deep transition-colors"
          >
            Kirim pesan
          </a>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 -mr-2 text-ink"
          aria-label="Buka menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-line px-4 pb-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-3 border-b border-line text-ink"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#secret-form"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-4 block text-center py-3 rounded-full bg-maroon text-paper font-medium"
          >
            Kirim pesan
          </a>
        </div>
      )}
    </nav>
  );
}
