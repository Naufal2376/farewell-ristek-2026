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
    if (saved) loadMessages(saved);
  }, [loadMessages]);

  const filteredMessages = messages.filter((m) => {
    if (!searchQuery.trim()) return true;
    return m.recipient.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const currentMessage = filteredMessages[currentIndex] || null;

  const handleNext = () => {
    if (filteredMessages.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % filteredMessages.length);
  };

  const handlePrev = () => {
    if (filteredMessages.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + filteredMessages.length) % filteredMessages.length);
  };

  const handleShuffle = () => {
    if (filteredMessages.length <= 1) return;
    let randomIndex = Math.floor(Math.random() * filteredMessages.length);
    if (randomIndex === currentIndex) {
      randomIndex = (randomIndex + 1) % filteredMessages.length;
    }
    setCurrentIndex(randomIndex);
  };

  const setRead = (id: string, isRead: boolean) =>
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, isRead } : m)));

  const toggleReadStatus = async () => {
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
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const readCount = messages.filter((m) => m.isRead).length;
  const btn =
    "inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-paper/30 hover:border-paper text-sm transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-default";

  if (!passcode) {
    return (
      <div className="min-h-screen bg-maroon-deep text-paper flex items-center justify-center p-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (passcodeInput.trim()) loadMessages(passcodeInput.trim());
          }}
          className="w-full max-w-sm"
        >
          <h1 className="font-serif text-3xl">Secret appreciation</h1>
          <p className="mt-2 text-paper/70">Halaman presenter. Masukkan passcode panitia.</p>
          <input
            type="password"
            value={passcodeInput}
            onChange={(e) => setPasscodeInput(e.target.value)}
            autoFocus
            aria-label="Passcode"
            className="mt-6 w-full px-4 py-3 rounded-md bg-paper text-ink focus:outline-none"
          />
          {loadError && (
            <p role="alert" className="mt-3 text-sm text-gold-soft">
              {loadError}
            </p>
          )}
          <button
            type="submit"
            disabled={status === "loading"}
            className="mt-4 w-full py-3 rounded-full bg-paper text-maroon-deep font-semibold hover:bg-white transition-colors cursor-pointer disabled:opacity-60"
          >
            {status === "loading" ? "Memuat…" : "Buka"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-maroon-deep text-paper flex flex-col p-4 sm:p-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 -ml-2 text-paper/70 hover:text-paper" aria-label="Kembali ke halaman utama">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="font-serif text-xl">Secret appreciation</h1>
            <p className="text-sm text-paper/60 tabular-nums">
              {readCount} dari {messages.length} sudah dibaca
              {status === "error" && <span className="text-gold-soft"> · {loadError}</span>}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 px-3 py-2 rounded-full border border-paper/30 text-sm">
            <Search className="w-4 h-4 text-paper/60" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentIndex(0);
              }}
              placeholder="Cari penerima"
              className="bg-transparent placeholder:text-paper/50 outline-none w-32 sm:w-44"
            />
          </label>
          <button
            onClick={() => loadMessages(passcode)}
            disabled={status === "loading"}
            className="p-2.5 rounded-full border border-paper/30 hover:border-paper disabled:opacity-50"
            aria-label="Muat pesan terbaru"
            title="Muat pesan terbaru"
          >
            <RefreshCw className={`w-4 h-4 ${status === "loading" ? "animate-spin" : ""}`} />
          </button>
          <button onClick={toggleFullscreen} className="p-2.5 rounded-full border border-paper/30 hover:border-paper" aria-label="Layar penuh">
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center py-10">
        {filteredMessages.length === 0 ? (
          <p className="text-paper/70 text-lg text-center max-w-md">
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
                className="w-full max-w-4xl bg-card text-ink rounded-lg p-8 sm:p-14 shadow-2xl"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-hand text-3xl text-maroon">untuk</p>
                    <h2 className="font-serif text-4xl sm:text-6xl leading-tight">{currentMessage.recipient}</h2>
                  </div>
                  <span className="text-sm text-ink-soft tabular-nums pt-2">
                    {currentIndex + 1} / {filteredMessages.length}
                  </span>
                </div>

                <p className="mt-8 sm:mt-10 text-2xl sm:text-3xl md:text-4xl leading-snug font-serif whitespace-pre-line">
                  {currentMessage.message}
                </p>

                <div className="mt-10 pt-5 border-t border-line flex items-center justify-between gap-4 text-sm text-ink-soft">
                  <span>Dari: seseorang di Ristek</span>
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!currentMessage.isRead}
                      onChange={toggleReadStatus}
                      className="w-4 h-4 accent-maroon"
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
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-paper text-maroon-deep font-semibold hover:bg-white transition-colors cursor-pointer disabled:opacity-40"
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
