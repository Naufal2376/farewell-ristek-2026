"use client";

import React, { useState, useEffect, useRef } from "react";
import { Music, Volume2, VolumeX, Play, Pause, ExternalLink } from "lucide-react";

interface AudioPlayerProps {
  autoPlayTrigger?: boolean;
}

export default function AudioPlayer({ autoPlayTrigger }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const videoId = "UjTkrPewesE"; // for real this time | ribs - gracie abrams & lorde (mashup)

  const sendCommand = (func: string, args: unknown = "") => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: "command", func, args }),
        "*"
      );
    }
  };

  const playMusic = () => {
    sendCommand("playVideo");
    setIsPlaying(true);
  };

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
  }, [autoPlayTrigger]);

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
      <div className="fixed bottom-4 right-4 z-40">
        <div className="flex items-center gap-2 bg-[#0D1429]/95 border border-slate-700/80 backdrop-blur-md px-3.5 py-2 rounded-full shadow-2xl shadow-black/60 hover:border-amber-400/60 transition-all max-w-[280px] sm:max-w-xs">
          {/* Play/Pause Button with animated equalizer */}
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? "Jeda musik" : "Putar musik"}
            className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white shrink-0"
          >
            {isPlaying ? (
              <div className="w-5 h-5 flex items-center justify-center text-amber-400">
                <span className="flex items-end gap-0.5 h-3">
                  <span className="w-0.5 bg-amber-400 h-full animate-[pulse_0.6s_ease-in-out_infinite]" />
                  <span className="w-0.5 bg-amber-400 h-2/3 animate-[pulse_0.8s_ease-in-out_infinite_0.2s]" />
                  <span className="w-0.5 bg-amber-400 h-4/5 animate-[pulse_0.5s_ease-in-out_infinite_0.4s]" />
                </span>
              </div>
            ) : (
              <div className="w-5 h-5 flex items-center justify-center rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700">
                <Play className="w-3 h-3 fill-slate-300 ml-0.5" />
              </div>
            )}
          </button>

          {/* Track Information */}
          <div className="flex flex-col text-left overflow-hidden">
            <span className="text-[11px] font-semibold text-slate-200 truncate flex items-center gap-1">
              <Music className="w-3 h-3 text-amber-400 shrink-0" />
              <span className="truncate">for real this time | ribs</span>
            </span>
            <span className="text-[9px] text-slate-400 font-mono truncate">
              {isPlaying ? "Gracie Abrams & Lorde" : "Klik untuk memutar lagu"}
            </span>
          </div>

          {/* Mute Toggle */}
          <button
            onClick={toggleMute}
            className="p-1 rounded-full text-slate-400 hover:text-amber-400 transition-colors ml-auto shrink-0"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-rose-400" />
            ) : (
              <Volume2 className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>
    </>
  );
}
