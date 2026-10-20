"use client";

import React, { useState, useEffect, useRef } from "react";
import { Music, Volume2, VolumeX, Play, Pause, Sparkles } from "lucide-react";

interface AudioPlayerProps {
  autoPlayTrigger?: boolean;
}

export default function AudioPlayer({ autoPlayTrigger }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isSynthMode, setIsSynthMode] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const synthIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Gentle lofi warm piano/ambient chord progression using Web Audio API as bulletproof zero-failure fallback
  const startSynthChords = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      // Chord frequencies: Cmaj7, Am7, Fmaj7, G7 (Warm nostalgic vibes)
      const chordProgressions = [
        [261.63, 329.63, 392.0, 493.88], // Cmaj7
        [220.0, 261.63, 329.63, 392.0],  // Am7
        [174.61, 220.0, 261.63, 329.63], // Fmaj7
        [196.0, 246.94, 293.66, 349.23], // G7
      ];

      let chordIndex = 0;

      const playChord = () => {
        if (!audioContextRef.current || isMuted) return;
        const currentCtx = audioContextRef.current;
        const notes = chordProgressions[chordIndex % chordProgressions.length];
        chordIndex++;

        notes.forEach((freq, i) => {
          const osc = currentCtx.createOscillator();
          const gain = currentCtx.createGain();

          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, currentCtx.currentTime);

          // Soft bell / Rhodes piano envelope
          const startTime = currentCtx.currentTime + i * 0.08;
          gain.gain.setValueAtTime(0.001, startTime);
          gain.gain.exponentialRampToValueAtTime(0.04, startTime + 0.1);
          gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 2.8);

          osc.connect(gain);
          gain.connect(currentCtx.destination);

          osc.start(startTime);
          osc.stop(startTime + 3.0);
        });
      };

      playChord();
      if (synthIntervalRef.current) clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = setInterval(playChord, 3200);
      setIsSynthMode(true);
    } catch {
      // AudioContext not supported
    }
  };

  const stopSynth = () => {
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
  };

  // Try playing audio file first, fallback to synth if blocked or error
  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // Fallback to Web Audio Ambient Chords
          startSynthChords();
          setIsPlaying(true);
        });
    } else {
      startSynthChords();
      setIsPlaying(true);
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    stopSynth();
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  };

  useEffect(() => {
    if (autoPlayTrigger) {
      playAudio();
    }
  }, [autoPlayTrigger]);

  useEffect(() => {
    return () => {
      stopSynth();
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-40">
      {/* Audio Element with warm royalty-free acoustic/lofi music */}
      <audio
        ref={audioRef}
        loop
        preload="metadata"
        src="https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3"
        onEnded={() => setIsPlaying(false)}
        onError={() => {
          // If network audio error, switch smoothly to synth
          if (isPlaying) {
            startSynthChords();
          }
        }}
      />

      <div className="flex items-center gap-2 bg-[#0D1429]/90 border border-slate-700/70 backdrop-blur-md px-3 py-2 rounded-full shadow-xl shadow-black/40 hover:border-amber-400/50 transition-all">
        {/* Animated equalizer waves */}
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? "Jeda musik" : "Putar musik"}
          className="flex items-center gap-1.5 cursor-pointer text-slate-300 hover:text-white"
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
            <Play className="w-4 h-4 text-slate-400 fill-slate-400" />
          )}

          <div className="flex flex-col text-left">
            <span className="text-[11px] font-semibold text-slate-200 flex items-center gap-1">
              <Music className="w-3 h-3 text-amber-400" />
              <span>Memories of Ristek</span>
            </span>
            <span className="text-[9px] text-slate-400 font-mono">
              {isPlaying ? "Now Playing • Lo-Fi Vibe" : "Paused • Click to Play"}
            </span>
          </div>
        </button>

        <button
          onClick={() => {
            setIsMuted(!isMuted);
            if (audioRef.current) audioRef.current.muted = !isMuted;
          }}
          className="p-1 rounded-full text-slate-400 hover:text-amber-400 transition-colors ml-1"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
}
