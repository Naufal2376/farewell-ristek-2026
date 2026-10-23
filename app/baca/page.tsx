"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shuffle,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  ArrowLeft,
  Search,
  RefreshCw,
} from "lucide-react";
import type { SecretMessage } from "@/lib/secret-message";
import Backdrop from "@/components/ui/Backdrop";

const PASSCODE_KEY = "ristek_baca_passcode";

export default function LiveReadPage() {
  const [passcode, setPasscode] = useState<string | null>(null);
  const [passcodeInput, setPasscodeInput] = useState("");
  const [messages, setMessages] = useState<SecretMessage[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [loadError, setLoadError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);

  const loadMessages = useCallback(async (code: string) => {
    setStatus("loading");
    setLoadError(null);
    try {
      const res = await fetch("/api/messages", { headers: { "x-baca-passcode": code } });
      const data = await res.json().catch(() => null);
      if (res.status === 401) {
        sessionStorage.removeItem(PASSCODE_KEY);
        setPasscode(null);
        setLoadError("Passcode salah.");
        setStatus("idle");
        return;
      }
      if (!res.ok) throw new Error(data?.error ?? "Gagal mengambil pesan.");
      setMessages(data.messages);
      setPasscode(code);
      sessionStorage.setItem(PASSCODE_KEY, code);
      setStatus("ready");
    } catch (err) {
      setLoadError(err instanceof TypeError ? "Tidak bisa terhubung ke server." : (err as Error).message);
      setStatus("error");
    }
  }, []);

  // Passcode disimpan per tab supaya refresh halaman tidak minta ulang.
  useEffect(() => {
    const saved = sessionStorage.getItem(PASSCODE_KEY);
    if (saved) {
      setTimeout(() => {
        void loadMessages(saved);
      }, 0);
    }
  }, [loadMessages]);

  const filteredMessages = messages.filter((m) => {
    if (!searchQuery.trim()) return true;
    return m.recipient.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Clamp index agar tidak out-of-bounds saat mencari / reload
  const safeIndex =
    filteredMessages.length > 0
      ? Math.min(currentIndex, filteredMessages.length - 1)
      : 0;

  const currentMessage = filteredMessages[safeIndex] || null;

  const handleNext = useCallback(() => {
    if (filteredMessages.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % filteredMessages.length);
  }, [filteredMessages.length]);

  const handlePrev = useCallback(() => {
    if (filteredMessages.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + filteredMessages.length) % filteredMessages.length);
  }, [filteredMessages.length]);

  const handleShuffle = useCallback(() => {
    if (filteredMessages.length <= 1) return;
    let randomIndex = Math.floor(Math.random() * filteredMessages.length);
    if (randomIndex === safeIndex) {
      randomIndex = (randomIndex + 1) % filteredMessages.length;
    }
    setCurrentIndex(randomIndex);
  }, [filteredMessages.length, safeIndex]);

  const setRead = useCallback((id: string, isRead: boolean) =>
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, isRead } : m))), []);

  const toggleReadStatus = useCallback(async () => {
    if (!currentMessage || !passcode) return;
    const { id, isRead } = currentMessage;
    setRead(id, !isRead);
    try {
      const res = await fetch("/api/messages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json", "x-baca-passcode": passcode },
        body: JSON.stringify({ id, isRead: !isRead }),
      });
      if (!res.ok) throw new Error();
    } catch {
      setRead(id, isRead);
    }
  }, [currentMessage, passcode, setRead]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => { });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => { });
      setIsFullscreen(false);
    }
  }, []);

  // Keyboard navigation untuk presenter di panggung
  useEffect(() => {
    if (!passcode) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      // Abaikan jika presenter sedang mengetik di kotak pencarian
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key.toLowerCase() === "s") {
        e.preventDefault();
        handleShuffle();
      } else if (e.key.toLowerCase() === "r") {
        e.preventDefault();
        void toggleReadStatus();
      } else if (e.key.toLowerCase() === "f") {
        e.preventDefault();
        toggleFullscreen();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [passcode, handleNext, handlePrev, handleShuffle, toggleReadStatus, toggleFullscreen]);

  const readCount = messages.filter((m) => m.isRead).length;
  const btn =
    "inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl glass hover:border-line-strong text-sm transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-default";

  if (!passcode) {
    return (
      <div className="min-h-screen text-fg flex items-center justify-center p-6">
        <Backdrop />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (passcodeInput.trim()) loadMessages(passcodeInput.trim());
          }}
          className="w-full max-w-sm"
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold">/baca · presenter</p>
          <h1 className="mt-2 font-extrabold tracking-tight text-3xl">Pesan anonim</h1>
          <p className="mt-2 text-muted">Halaman presenter. Masukkan passcode panitia.</p>
          <input
            type="password"
            value={passcodeInput}
            onChange={(e) => setPasscodeInput(e.target.value)}
            autoFocus
            aria-label="Passcode"
            className="mt-6 w-full px-4 py-3 rounded-xl bg-surface border border-line font-mono focus:outline-none focus:border-gold/60"
          />
          {loadError && (
            <p role="alert" className="mt-3 text-sm text-danger">
              {loadError}
            </p>
          )}
          <button
            type="submit"
            disabled={status === "loading"}
            className="mt-4 w-full py-3 rounded-xl bg-gradient-to-b from-gold-soft to-gold text-bg font-bold transition-colors cursor-pointer disabled:opacity-60"
          >
            {status === "loading" ? "Memuat…" : "Buka"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-fg flex flex-col p-4 sm:p-8">
      <Backdrop />
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 -ml-2 text-muted hover:text-fg" aria-label="Kembali ke halaman utama">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="font-extrabold tracking-tight text-xl">Pesan anonim</h1>
            <p className="font-mono text-xs text-muted tabular-nums">
              {readCount} dari {messages.length} sudah dibaca
              {status === "error" && <span className="text-danger"> · {loadError}</span>}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 px-3 py-2 rounded-xl glass text-sm">
            <Search className="w-4 h-4 text-muted" />
            <input
              type="text"
              aria-label="Cari penerima pesan"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentIndex(0);
              }}
              placeholder="Cari penerima"
              className="bg-transparent placeholder:text-muted/70 outline-none w-32 sm:w-44"
            />
          </label>
          <button
            onClick={() => loadMessages(passcode)}
            disabled={status === "loading"}
            className="p-2.5 rounded-xl glass hover:border-line-strong disabled:opacity-50"
            aria-label="Muat pesan terbaru"
            title="Muat pesan terbaru"
          >
            <RefreshCw className={`w-4 h-4 ${status === "loading" ? "animate-spin" : ""}`} />
          </button>
          <button onClick={toggleFullscreen} className="p-2.5 rounded-xl glass hover:border-line-strong" aria-label="Layar penuh">
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center py-10">
        {filteredMessages.length === 0 ? (
          <p className="font-mono text-muted text-center max-w-md">
            {status === "error"
              ? loadError
              : messages.length === 0
                ? "Belum ada pesan masuk."
                : `Tidak ada pesan untuk “${searchQuery}”.`}
          </p>
        ) : (
          <AnimatePresence mode="wait">
            {currentMessage && (
              <motion.article
                key={currentMessage.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="ring-orbit w-full max-w-4xl rounded-3xl glass bg-surface/60 p-8 sm:p-14"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold">Untuk</p>
                    <h2 className="mt-2 font-extrabold tracking-tight text-4xl sm:text-6xl leading-tight">{currentMessage.recipient}</h2>
                  </div>
                  <span className="font-mono whitespace-nowrap text-sm text-muted tabular-nums pt-1">
                    {safeIndex + 1} / {filteredMessages.length}
                  </span>
                </div>

                <div className="mt-8 sm:mt-10 max-h-[50vh] overflow-y-auto pr-2">
                  <p
                    className={`leading-snug whitespace-pre-line ${
                      currentMessage.message.length > 800
                        ? "text-lg sm:text-xl md:text-2xl"
                        : currentMessage.message.length > 300
                          ? "text-xl sm:text-2xl md:text-3xl"
                          : "text-2xl sm:text-3xl md:text-4xl"
                    }`}
                  >
                    {currentMessage.message}
                  </p>
                </div>

                <div className="mt-10 pt-5 border-t border-line flex items-center justify-between gap-4 font-mono text-xs text-muted">
                  <span>Dari: seseorang di Ristek</span>
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!currentMessage.isRead}
                      onChange={toggleReadStatus}
                      className="w-4 h-4 accent-[#fbbf24]"
                    />
                    Sudah dibaca
                  </label>
                </div>
              </motion.article>
            )}
          </AnimatePresence>
        )}
      </main>

      <footer className="flex flex-wrap items-center justify-center gap-3">
        <button onClick={handlePrev} disabled={filteredMessages.length <= 1} className={btn}>
          <ChevronLeft className="w-4 h-4" />
          Sebelumnya
        </button>
        <button
          onClick={handleShuffle}
          disabled={filteredMessages.length <= 1}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-b from-gold-soft to-gold text-bg font-bold transition-colors cursor-pointer disabled:opacity-40"
        >
          <Shuffle className="w-4 h-4" />
          Acak
        </button>
        <button onClick={handleNext} disabled={filteredMessages.length <= 1} className={btn}>
          Berikutnya
          <ChevronRight className="w-4 h-4" />
        </button>
      </footer>
    </div>
  );
}
