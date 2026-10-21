"use client";

import React, { useRef } from "react";

type Props = React.HTMLAttributes<HTMLElement> & { as?: "div" | "article" };

// Kartu kaca dengan sorotan cahaya yang mengikuti kursor.
export default function SpotlightCard({ as: Tag = "div", className = "", children, ...rest }: Props) {
  const ref = useRef<HTMLElement | null>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const Comp = Tag as React.ElementType;
  return (
    <Comp
      ref={ref}
      onMouseMove={onMove}
      className={`group/spot relative overflow-hidden rounded-2xl glass transition-colors hover:border-line-strong ${className}`}
      {...rest}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 group-hover/spot:opacity-100 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(360px circle at var(--mx, 50%) var(--my, 50%), rgb(251 191 36 / 0.10), transparent 60%)",
        }}
      />
      <div className="relative">{children}</div>
    </Comp>
  );
}
