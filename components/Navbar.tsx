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
    <nav className="sticky top-0 z-40 w-full bg-bg/90 backdrop-blur border-b border-line">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-2.5">
          <Image src="/logo.png" alt="" width={40} height={40} priority />
          <span className="leading-tight">
            <span className="block font-display font-semibold">
              RISTEK <span className="text-accent">2026</span>
            </span>
            <span className="block font-mono text-[10px] text-muted">HIMSI Fasilkom Unsri</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-7 font-mono text-xs uppercase tracking-wider text-muted">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-fg transition-colors">
              {link.label}
            </a>
          ))}
          <a
            href="#secret-form"
            className="px-4 py-2 bg-accent text-bg font-semibold hover:bg-accent-soft transition-colors"
          >
            Kirim pesan
          </a>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 -mr-2"
          aria-label="Buka menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-line px-4 pb-4 font-mono text-sm uppercase tracking-wider">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-3 border-b border-line text-muted"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#secret-form"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-4 block text-center py-3 bg-accent text-bg font-semibold"
          >
            Kirim pesan
          </a>
        </div>
      )}
    </nav>
  );
}
