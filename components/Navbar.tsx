"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Wrapped", href: "#wrapped" },
  { label: "Rundown", href: "#rundown" },
  { label: "Galeri", href: "#galeri" },
  { label: "Tiket", href: "#boarding-pass" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="sticky top-0 z-40 w-full px-3 sm:px-6 pt-3">
      <div
        className={`max-w-6xl mx-auto rounded-2xl transition-all duration-300 ${
          scrolled ? "glass bg-bg/70 shadow-lg shadow-black/30" : "border border-transparent"
        }`}
      >
        <div className="h-14 px-3 sm:px-4 flex items-center justify-between gap-4">
          <a href="#top" className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="" width={40} height={40} priority />
            <span className="leading-tight">
              <span className="block font-extrabold tracking-wide">
                RISTEK <span className="text-gold">2026</span>
              </span>
              <span className="block text-[11px] text-muted">HIMSI Fasilkom Unsri</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-1 text-sm text-muted">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="px-3 py-2 rounded-lg hover:text-fg hover:bg-white/5 transition-colors">
                {link.label}
              </a>
            ))}
            <a
              href="#secret-form"
              className="ml-2 px-4 py-2 rounded-xl bg-gold text-bg font-semibold hover:bg-gold-soft transition-colors"
            >
              Kirim pesan
            </a>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/5"
            aria-label="Buka menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden px-3 pb-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-3 rounded-lg text-muted hover:text-fg hover:bg-white/5"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#secret-form"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 block text-center py-3 rounded-xl bg-gold text-bg font-semibold"
            >
              Kirim pesan
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
