"use client";

import React, { useState } from "react";
import SplashScreen from "@/components/SplashScreen";
import AudioPlayer from "@/components/AudioPlayer";
import Navbar from "@/components/Navbar";
import HeroCountdown from "@/components/HeroCountdown";
import PartyAtmosphere from "@/components/PartyAtmosphere";
import RistekWrapped from "@/components/RistekWrapped";
import TimelineRundown from "@/components/TimelineRundown";
import PolaroidGallery from "@/components/PolaroidGallery";
import BoardingPassGenerator from "@/components/BoardingPassGenerator";
import SecretAppreciationForm from "@/components/SecretAppreciationForm";
import Footer from "@/components/Footer";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [autoPlayAudio, setAutoPlayAudio] = useState(false);

  const handleOpenInvitation = () => {
    setShowSplash(false);
    setAutoPlayAudio(true);
  };

  return (
    <div className="relative min-h-screen bg-[#060914] text-slate-100 flex flex-col selection:bg-amber-400 selection:text-slate-950 font-sans overflow-x-hidden">
      {/* 0. Ambient Floating Party Atmosphere (Confetti, Stars, & Warm Glows) */}
      <PartyAtmosphere />

      {/* 1. Terminal IT Opening / Splash Screen with Golden Logo Reveal */}
      <SplashScreen isOpen={showSplash} onOpen={handleOpenInvitation} />

      {/* 2. Background Music Controller (YouTube BGM: for real this time | ribs) */}
      <AudioPlayer autoPlayTrigger={autoPlayAudio} />

      {/* 3. Sticky Navigation Bar with Golden Logo & Confetti Pop */}
      <Navbar />

      {/* Main Content Sections */}
      <main id="top" className="flex-1 flex flex-col relative z-10">
        {/* 4. Hero Section with Real-Time Countdown to 24 Okt 2026 09:00 WIB & Floating Emblem */}
        <HeroCountdown />

        {/* 5. Ristek Wrapped (Statistik Lucu & Rekap Periode) */}
        <RistekWrapped />

        {/* Festive Divider */}
        <div className="w-full max-w-6xl mx-auto px-4 my-4">
          <div className="h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
        </div>

        {/* 6. Timeline Rundown (09.00 - 15.00 WIB) & Checklist Persiapan */}
        <TimelineRundown />

        {/* Festive Divider */}
        <div className="w-full max-w-6xl mx-auto px-4 my-4">
          <div className="h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
        </div>

        {/* 7. Galeri 24 Momen Ristek & HIMSI Polaroid Interaktif */}
        <PolaroidGallery />

        {/* Festive Divider */}
        <div className="w-full max-w-6xl mx-auto px-4 my-4">
          <div className="h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
        </div>

        {/* 8. Generator Kartu Akses / Boarding Pass (Alokasi Kursi PTI-XX & AKD-XX) */}
        <BoardingPassGenerator />

        {/* Festive Divider */}
        <div className="w-full max-w-6xl mx-auto px-4 my-4">
          <div className="h-px bg-gradient-to-r from-transparent via-rose-500/30 to-transparent" />
        </div>

        {/* 9. Secret Appreciation Form (100% Anonim) */}
        <SecretAppreciationForm />
      </main>

      {/* 10. Footer with Official Logo & Rocket Scroll-to-Top */}
      <Footer />
    </div>
  );
}
