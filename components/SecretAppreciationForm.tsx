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
    <section id="secret-form" className="px-4 sm:px-6 py-20 sm:py-28 border-t border-line bg-surface/60">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        <div className="lg:col-span-5">
          <SectionHeading index="05" label="Anonim" title="Secret appreciation">
            Tulis terima kasih, unek-unek, atau roasting kecil buat siapa pun di
            Ristek. Tidak ada kolom nama pengirim. Pesannya dibacakan jam 11.00
            di hari-H.
          </SectionHeading>
          <p className="font-mono text-xs text-muted">// boleh kirim lebih dari satu, untuk orang yang berbeda</p>
        </div>

        <div className="lg:col-span-7">
          <div className="hud-corners border border-line bg-bg p-6 sm:p-8">
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
                    <span className="block font-mono text-[11px] uppercase tracking-wider text-muted mb-1.5">Untuk</span>
                    <input
                      type="text"
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                      placeholder="Kak Fahri, Calista, semua anak PTI, …"
                      maxLength={100}
                      required
                      className="w-full px-4 py-3 bg-surface border border-line focus:outline-none focus:border-accent placeholder:text-muted/60"
                    />
                  </label>

                  <label className="block">
                    <span className="flex items-baseline justify-between mb-1.5">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-muted">Pesan</span>
                      <span className="font-mono text-[11px] text-muted tabular-nums">
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
                      className="w-full px-4 py-3 bg-surface border border-line focus:outline-none focus:border-accent resize-y placeholder:text-muted/60 leading-relaxed"
                    />
                  </label>

                  {sendError && (
                    <p role="alert" className="text-sm text-danger border border-danger/40 bg-danger/10 px-4 py-3">
                      {sendError} Pesanmu masih ada di kolom di atas.
                    </p>
                  )}

                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                    <p className="font-mono text-xs text-muted">Nama dan data pengirim tidak disimpan.</p>
                    <button
                      type="submit"
                      disabled={isSending}
                      className="px-6 py-3 bg-accent text-bg font-semibold hover:bg-accent-soft transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-wait"
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
                  <p className="font-mono text-xs uppercase tracking-wider text-accent">[ok] terkirim</p>
                  <h3 className="mt-2 font-display font-semibold text-3xl">
                    Pesanmu untuk {recipient.trim()} sudah masuk.
                  </h3>
                  <p className="mt-3 text-muted leading-relaxed">
                    Nanti dibacakan di sesi 11.00 – 11.30 WIB. Masih ada yang mau kamu sapa?
                  </p>
                  <button
                    onClick={handleReset}
                    className="mt-6 px-6 py-3 border border-line-strong font-medium hover:border-accent hover:text-accent transition-colors cursor-pointer"
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
