"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { RISTEK_MEMBERS_2026 } from "@/components/BoardingPassGenerator";

const MAX_LENGTH = 5000;

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
    <section id="secret-form" className="px-4 sm:px-6 py-20 sm:py-28 content-auto">
      <div className="max-w-3xl mx-auto">
        <SectionHeading index="05" label="Pesan anonim" title="Pesan anonim untuk Ristek">
          Tulis terima kasih, unek-unek, atau roasting kecil buat siapa pun. Tanpa
          nama pengirim, dan akan dibacakan di sesi 11.00. Boleh kirim lebih dari satu.
        </SectionHeading>

        <Reveal>
          <div className="ring-orbit rounded-3xl">
            <div className="relative rounded-3xl glass bg-surface/60 p-6 sm:p-8">
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
                      <span className="block text-sm font-medium text-muted mb-1.5">Untuk</span>
                      <input
                        type="text"
                        list="recipient-suggestions"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        placeholder="Pimpinan, Staff, Doi, Keluarga Ristek, Atau Siapapun..."
                        maxLength={100}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-bg/60 border border-line focus:outline-none focus:border-gold/60 transition-colors placeholder:text-muted/60"
                      />
                      <datalist id="recipient-suggestions">
                        <option value="Semua Anak Ristek" />
                        <option value="Pimpinan RISTEK" />
                        <option value="Divisi PTI" />
                        <option value="Divisi Akademik" />
                        {RISTEK_MEMBERS_2026.map((m) => (
                          <option key={m.name} value={m.name} />
                        ))}
                      </datalist>
                    </label>

                    <label className="block">
                      <span className="flex items-baseline justify-between mb-1.5">
                        <span className="text-sm font-medium text-muted">Pesan</span>
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
                        className="w-full px-4 py-3 rounded-xl bg-bg/60 border border-line focus:outline-none focus:border-gold/60 transition-colors resize-y placeholder:text-muted/60 leading-relaxed"
                      />
                    </label>

                    {sendError && (
                      <p role="alert" className="text-sm text-danger border border-danger/40 bg-danger/10 rounded-xl px-4 py-3">
                        {sendError} Pesanmu masih ada di kolom di atas.
                      </p>
                    )}

                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                      <p className="font-mono text-xs text-muted">Nama dan data pengirim tidak disimpan.</p>
                      <button
                        type="submit"
                        disabled={isSending}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-b from-gold-soft to-gold text-bg font-bold shadow-[0_10px_30px_-10px_rgb(251_191_36/0.6)] transition-shadow hover:shadow-[0_10px_40px_-8px_rgb(251_191_36/0.8)] cursor-pointer disabled:opacity-60 disabled:cursor-wait"
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
                    <p className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-gold"><span className="w-2 h-2 rounded-full bg-gold shadow-[0_0_10px_rgb(251_191_36/0.8)]" />Terkirim</p>
                    <h3 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight">
                      Pesanmu untuk {recipient.trim()} sudah masuk.
                    </h3>
                    <p className="mt-3 text-muted leading-relaxed">
                      Nanti dibacakan di sesi 11.00 – 11.30 WIB. Masih ada yang mau kamu sapa?
                    </p>
                    <button
                      onClick={handleReset}
                      className="mt-6 px-6 py-3 rounded-xl glass font-semibold hover:border-gold/50 hover:text-gold transition-colors cursor-pointer"
                    >
                      Tulis pesan lain
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
