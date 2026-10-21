import React from "react";

interface SectionHeadingProps {
  index: string;
  label: string;
  title: string;
  children?: React.ReactNode;
}

// Satu pola judul untuk semua seksi: label mono bernomor + judul display.
export default function SectionHeading({ index, label, title, children }: SectionHeadingProps) {
  return (
    <header className="mb-10 sm:mb-12 max-w-2xl">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
        <span className="text-muted">{index} /</span> {label}
      </p>
      <h2 className="mt-3 font-display font-semibold text-3xl sm:text-5xl leading-[1.05] tracking-tight">
        {title}
      </h2>
      {children && <p className="mt-4 text-base text-muted leading-relaxed">{children}</p>}
    </header>
  );
}
