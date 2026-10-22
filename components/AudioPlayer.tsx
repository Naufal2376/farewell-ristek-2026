"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";

interface AudioPlayerProps {
  autoPlayTrigger?: boolean;
}

export default function AudioPlayer({ autoPlayTrigger }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const videoId = "UjTkrPewesE"; // for real this time | ribs - gracie abrams & lorde (mashup)

  const sendCommand = useCallback((func: string, args: unknown = "") => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: "command", func, args }),
        "*"
      );
    }
  }, []);

  const playMusic = useCallback(() => {
    sendCommand("playVideo");
    setIsPlaying(true);
  }, [sendCommand]);

  const pauseMusic = () => {
    sendCommand("pauseVideo");
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      sendCommand("unMute");
      setIsMuted(false);
    } else {
      sendCommand("mute");
      setIsMuted(true);
    }
  };

  useEffect(() => {
    if (autoPlayTrigger) {
      // Small timeout to allow iframe to establish ready state
      const t = setTimeout(() => {
        playMusic();
      }, 500);
      return () => clearTimeout(t);
    }
  }, [autoPlayTrigger, playMusic]);

  return (
    <>
      {/* Hidden YouTube Iframe with JS API Enabled */}
      <div className="fixed -top-[9999px] -left-[9999px] opacity-0 pointer-events-none w-1 h-1 overflow-hidden">
        <iframe
          ref={iframeRef}
          id="yt-bgm-player"
          title="Background Music Player"
          width="200"
          height="200"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?enablejsapi=1&loop=1&playlist=${videoId}&playsinline=1&controls=0`}
          allow="autoplay; encrypted-media"
        />
      </div>

      {/* Floating Audio Controller */}
      <div className="fixed bottom-4 right-4 z-40 flex items-center gap-1 glass bg-bg/70 rounded-full shadow-lg shadow-black/40 text-fg pl-1.5 pr-3 py-1.5 max-w-[260px]">
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? "Jeda musik" : "Putar musik"}
          className="w-8 h-8 shrink-0 rounded-full bg-gold text-bg hover:bg-gold-soft flex items-center justify-center cursor-pointer"
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
        </button>

        <div className="min-w-0 px-1.5 leading-tight">
          <p className="text-xs font-medium truncate">for real this time | ribs</p>
          <p className="font-mono text-[10px] text-muted truncate">Gracie Abrams & Lorde</p>
        </div>

        <button
          onClick={toggleMute}
          className="p-1 shrink-0 text-muted hover:text-fg cursor-pointer"
          aria-label={isMuted ? "Nyalakan suara" : "Bisukan"}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>
    </>
  );
}
