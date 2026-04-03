"use client";

import { useEffect, useRef, useState } from "react";

interface NavProps {
  onContactOpen: () => void;
}

export default function Nav({ onContactOpen }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 100);
        rafRef.current = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const linkClass =
    "font-mono text-[0.8125rem] uppercase tracking-[0.06em] text-muted-foreground hover:text-foreground transition-colors duration-200";
  const activeLinkClass =
    "font-mono text-[0.8125rem] uppercase tracking-[0.06em] text-foreground";

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{ height: "var(--nav-height)" }}
    >
      <nav
        className={[
          "flex items-center justify-between h-full transition-all duration-300",
          scrolled
            ? "nav-pill fixed"
            : "px-[var(--margin-desktop)] max-w-none",
        ].join(" ")}
        style={
          scrolled
            ? undefined
            : {
                paddingInline: "var(--margin-desktop)",
              }
        }
        aria-label="Main navigation"
      >
        <span className="font-mono text-[0.8125rem] uppercase tracking-[0.06em] text-muted-foreground">
          pratyush
        </span>

        <div className="flex items-center gap-8">
          <a href="#work" className={activeLinkClass}>
            Work
          </a>
          <a href="#about" className={linkClass}>
            About
          </a>
          <a href="#studio" className={linkClass}>
            Studio
          </a>
          <button
            onClick={onContactOpen}
            className={linkClass + " cursor-pointer"}
          >
            Contact
          </button>
        </div>
      </nav>
    </header>
  );
}
