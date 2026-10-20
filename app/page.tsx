"use client";

import React, { useState } from "react";
import SplashScreen from "@/components/SplashScreen";
import AudioPlayer from "@/components/AudioPlayer";
import Navbar from "@/components/Navbar";
import HeroCountdown from "@/components/HeroCountdown";
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
    <div className="relative min-h-screen bg-[#070B19] text-slate-100 flex flex-col selection:bg-amber-400 selection:text-slate-950 font-sans">
      {/* 1. Terminal IT Opening / Splash Screen */}
      <SplashScreen isOpen={showSplash} onOpen={handleOpenInvitation} />

      {/* 2. Background Music Controller (Floating Pill) */}
      <AudioPlayer autoPlayTrigger={autoPlayAudio} />

      {/* 3. Sticky Navigation Bar */}
      <Navbar />

      {/* Main Content Sections */}
      <main id="top" className="flex-1 flex flex-col">
        {/* 4. Hero Section with Real-Time Countdown to 24 Okt 2026 09:00 WIB */}
        <HeroCountdown />

        {/* Subtle Section Divider */}
        <div className="w-full max-w-6xl mx-auto px-4">
          <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
        </div>

        {/* 5. Ristek Wrapped (Statistik Lucu & Rekap Periode) */}
        <RistekWrapped />

        <div className="w-full max-w-6xl mx-auto px-4">
          <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
        </div>

        {/* 6. Timeline Rundown (09.00 - 15.00 WIB) & Checklist Persiapan */}
        <TimelineRundown />

        <div className="w-full max-w-6xl mx-auto px-4">
          <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
        </div>

        {/* 7. Galeri Kenangan Polaroid Interaktif */}
        <PolaroidGallery />

        <div className="w-full max-w-6xl mx-auto px-4">
          <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
        </div>

        {/* 8. Generator Kartu Akses / Boarding Pass (Bonus IG Story Viral) */}
        <BoardingPassGenerator />

        <div className="w-full max-w-6xl mx-auto px-4">
          <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
        </div>

        {/* 9. Secret Appreciation Form (100% Anonim) */}
        <SecretAppreciationForm />
      </main>

      {/* 10. Footer with Shortcut to Live Read Mode */}
      <Footer />
    </div>
  );
}
