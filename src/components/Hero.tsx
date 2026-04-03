"use client";

import { useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        indicatorRef.current?.classList.add("hidden-indicator");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      className="relative flex flex-col justify-end min-h-[100svh] pb-16"
      style={{ paddingInline: "var(--margin-desktop)" }}
      aria-label="Hero"
    >
      <div>
        <h1
          className="text-[clamp(3rem,8vw,7rem)] font-light tracking-[-0.03em] text-foreground"
          style={{ lineHeight: 0.95, fontFamily: "var(--font-display)" }}
        >
          PRATYUSH
        </h1>
        <p
          className="font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground mt-4"
        >
          design · systems · craft
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        ref={indicatorRef}
        className="scroll-indicator absolute bottom-8 left-[var(--margin-desktop)] flex flex-col gap-2"
        aria-hidden="true"
      >
        <span className="font-mono text-[0.625rem] uppercase tracking-[0.3em] text-ring">
          Scroll
        </span>
        <ArrowDown size={16} strokeWidth={1.5} className="text-ring" />
      </div>
    </section>
  );
}
