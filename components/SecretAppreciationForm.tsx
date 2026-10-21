"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import SectionHeading from "@/components/SectionHeading";

const MAX_LENGTH = 1000;

export default function SecretAppreciationForm() {
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient.trim() || !message.trim() || isSending) return;

    setIsSending(true);
    setSendError(null);
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipient, message }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Pesan gagal dikirim. Coba lagi.");
      }
    } catch (err) {
      setSendError(
        err instanceof TypeError
          ? "Tidak bisa terhubung. Cek koneksi internetmu lalu coba lagi."
          : (err as Error).message
      );
      setIsSending(false);
      return;
    }
    setIsSending(false);

    try {
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.7 },
        colors: ["#7c1f24", "#a97a33", "#d9b26a"],
        disableForReducedMotion: true,
      });
    } catch {
      // ignore
    }

    setIsSubmitted(true);
  };

  const handleReset = () => {
    setRecipient("");
    setMessage("");
    setIsSubmitted(false);
  };

  return (
    <section id="secret-form" className="px-4 sm:px-6 py-20 sm:py-28 bg-maroon text-paper">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        <div className="lg:col-span-5">
          <SectionHeading tone="onDark" note="tanpa nama, janji" title="Secret appreciation">
            Tulis terima kasih, unek-unek, atau roasting kecil buat siapa pun di
            Ristek. Tidak ada kolom nama pengirim. Pesannya dibacakan jam 11.00
            di hari-H.
          </SectionHeading>
          <p className="text-paper/80">Boleh kirim lebih dari satu, untuk orang yang berbeda.</p>
        </div>

        <div className="lg:col-span-7">
          <div className="bg-card text-ink rounded-lg p-6 sm:p-8 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.6)]">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <label className="block">
                    <span className="block font-medium mb-1.5">Untuk</span>
                    <input
                      type="text"
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                      placeholder="Kak Fahri, Calista, semua anak PTI, …"
                      maxLength={100}
                      required
                      className="w-full px-4 py-3 rounded-md bg-paper border border-line focus:outline-none focus:border-maroon placeholder:text-ink-soft/60"
                    />
                  </label>

                  <label className="block">
                    <span className="flex items-baseline justify-between mb-1.5">
                      <span className="font-medium">Pesan</span>
                      <span className="text-xs text-ink-soft tabular-nums">
                        {message.length}/{MAX_LENGTH}
                      </span>
                    </span>
                    <textarea
                      rows={6}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      maxLength={MAX_LENGTH}
                      placeholder="Kenangan pertama ketemu, makasih sudah bantu proker, atau harapan buat dia ke depan."
                      required
                      className="w-full px-4 py-3 rounded-md bg-paper border border-line focus:outline-none focus:border-maroon resize-y placeholder:text-ink-soft/60 leading-relaxed"
                    />
                  </label>

                  {sendError && (
                    <p role="alert" className="text-sm text-maroon bg-maroon/5 border border-maroon/30 rounded-md px-4 py-3">
                      {sendError} Pesanmu masih ada di kolom di atas.
                    </p>
                  )}

                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                    <p className="text-sm text-ink-soft">Nama dan data pengirim tidak disimpan.</p>
                    <button
                      type="submit"
                      disabled={isSending}
                      className="px-6 py-3 rounded-full bg-maroon text-paper font-medium hover:bg-maroon-deep transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-wait"
                    >
                      {isSending ? "Mengirim…" : "Kirim pesan"}
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-6"
                  role="status"
                >
                  <p className="font-hand text-3xl text-maroon">Terkirim.</p>
                  <h3 className="mt-1 font-serif text-3xl">
                    Pesanmu untuk {recipient.trim()} sudah masuk.
                  </h3>
                  <p className="mt-3 text-ink-soft leading-relaxed">
                    Nanti dibacakan di sesi 11.00 – 11.30 WIB. Masih ada yang mau kamu sapa?
                  </p>
                  <button
                    onClick={handleReset}
                    className="mt-6 px-6 py-3 rounded-full border border-ink text-ink font-medium hover:bg-ink hover:text-paper transition-colors cursor-pointer"
                  >
                    Tulis pesan lain
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
