"use client";

import { useEffect, useRef } from "react";
import { X, ArrowUpRight } from "lucide-react";

interface ContactDrawerProps {
  open: boolean;
  onClose: () => void;
}

const LINKS = [
  { label: "Email", href: "mailto:pratyush@example.com" },
  { label: "LinkedIn", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "Read.cv", href: "#" },
];

export default function ContactDrawer({ open, onClose }: ContactDrawerProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    overlayRef.current?.classList.toggle("open", open);
    drawerRef.current?.classList.toggle("open", open);
  }, [open]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div
        ref={overlayRef}
        className="contact-overlay fixed inset-0 z-40 bg-background/50"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Contact"
        className="contact-drawer fixed bottom-0 left-0 right-0 z-50 bg-secondary/95 backdrop-blur-2xl border-t border-border"
        style={{
          borderRadius: "0.625rem 0.625rem 0 0",
          padding: "3rem var(--margin-desktop)",
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-muted-foreground hover:text-foreground"
          style={{ transition: "color 200ms var(--ease-out)" }}
          aria-label="Close contact"
        >
          <X size={16} strokeWidth={1.5} />
        </button>

        <p className="font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground mb-3">
          Get in touch
        </p>
        <h2
          className="text-[clamp(1.5rem,3vw,2.5rem)] font-light tracking-tight text-foreground mb-8"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Let&rsquo;s work together
        </h2>

        <nav aria-label="Contact links">
          {LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="flex justify-between items-center py-3 border-b border-border font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground hover:text-foreground"
              style={{ transition: "color 200ms var(--ease-out)" }}
            >
              {label}
              <ArrowUpRight size={16} strokeWidth={1.5} />
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
