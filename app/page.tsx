"use client";

import React, { useState } from "react";
import { MotionConfig } from "framer-motion";
import SplashScreen from "@/components/SplashScreen";
import AudioPlayer from "@/components/AudioPlayer";
import Navbar from "@/components/Navbar";
import HeroCountdown from "@/components/HeroCountdown";
import RistekWrapped from "@/components/RistekWrapped";
import TimelineRundown from "@/components/TimelineRundown";
import PolaroidGallery from "@/components/PolaroidGallery";
import MemoriesFilmStrip from "@/components/MemoriesFilmStrip";
import BoardingPassGenerator from "@/components/BoardingPassGenerator";
import SecretAppreciationForm from "@/components/SecretAppreciationForm";
import Footer from "@/components/Footer";
import Backdrop from "@/components/ui/Backdrop";
import MemberMarquee from "@/components/MemberMarquee";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [autoPlayAudio, setAutoPlayAudio] = useState(false);

  const handleOpenInvitation = () => {
    setShowSplash(false);
    setAutoPlayAudio(true);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen flex flex-col overflow-x-hidden">
        <Backdrop />
        <SplashScreen isOpen={showSplash} onOpen={handleOpenInvitation} />
        <AudioPlayer autoPlayTrigger={autoPlayAudio} />
        <Navbar />

        <main id="top" className="flex-1 flex flex-col">
          <HeroCountdown />
          <MemberMarquee />
          <RistekWrapped />
          <TimelineRundown />
          <PolaroidGallery />
          <MemoriesFilmStrip />
          <BoardingPassGenerator />
          <SecretAppreciationForm />
        </main>

        <Footer />
      </div>
    </MotionConfig>
  );
}
