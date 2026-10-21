import React from "react";
import Reveal from "@/components/ui/Reveal";

interface SectionHeadingProps {
  index: string;
  label: string;
  title: React.ReactNode;
  children?: React.ReactNode;
}

// Satu pola judul untuk semua seksi.
export default function SectionHeading({ index, label, title, children }: SectionHeadingProps) {
  return (
    <Reveal className="mb-12 sm:mb-14 text-center max-w-2xl mx-auto">
      <p className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-gold">
        <span className="h-px w-8 bg-gold/50" />
        {index} · {label}
        <span className="h-px w-8 bg-gold/50" />
      </p>
      <h2 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05]">{title}</h2>
      {children && <p className="mt-4 text-base sm:text-lg text-muted leading-relaxed">{children}</p>}
    </Reveal>
  );
}
