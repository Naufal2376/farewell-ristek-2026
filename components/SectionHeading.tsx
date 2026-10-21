import React from "react";

interface SectionHeadingProps {
  note: string;
  title: string;
  children?: React.ReactNode;
  align?: "left" | "center";
  /** "onDark" untuk seksi berlatar maroon. */
  tone?: "default" | "onDark";
}

// Satu pola judul untuk semua seksi: catatan tulisan tangan + judul serif.
export default function SectionHeading({
  note,
  title,
  children,
  align = "left",
  tone = "default",
}: SectionHeadingProps) {
  const centered = align === "center";
  const onDark = tone === "onDark";
  return (
    <header className={`mb-10 sm:mb-12 ${centered ? "text-center mx-auto" : ""} max-w-2xl`}>
      <p className={`font-hand text-2xl -rotate-1 inline-block ${onDark ? "text-gold-soft" : "text-maroon"}`}>{note}</p>
      <h2 className={`mt-1 font-serif text-4xl sm:text-5xl leading-[1.05] tracking-tight ${onDark ? "text-paper" : "text-ink"}`}>
        {title}
      </h2>
      {children && (
        <p className={`mt-4 text-base leading-relaxed ${onDark ? "text-paper/80" : "text-ink-soft"}`}>{children}</p>
      )}
    </header>
  );
}
