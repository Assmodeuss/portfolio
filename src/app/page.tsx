"use client";

import { useState } from "react";
import ShaderBackground from "@/components/ShaderBackground";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import SectionReveal from "@/components/SectionReveal";
import ProjectList from "@/components/ProjectList";
import ContactDrawer from "@/components/ContactDrawer";

export default function Home() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <>
      {/* Grain overlay — static SVG, composited once */}
      <div className="grain" aria-hidden="true" />

      {/* Shader background — lazy loaded, SSR off */}
      <ShaderBackground />

      <Nav onContactOpen={() => setContactOpen(true)} />

      <main>
        {/* Hero */}
        <Hero />

        {/* Selected Work */}
        <section
          id="work"
          style={{
            paddingInline: "var(--margin-desktop)",
            maxWidth: "calc(var(--content-max-width) + var(--margin-desktop))",
            paddingBottom: "clamp(4rem, 8vw, 7.5rem)",
          }}
        >
          <SectionReveal>
            <header className="flex items-baseline gap-4 mb-12">
              <span className="font-mono text-xs uppercase tracking-[0.08em] text-ring">
                /01
              </span>
              <h2
                className="text-lg uppercase tracking-tight text-muted-foreground font-light"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Selected Work
              </h2>
            </header>
            <ProjectList />
          </SectionReveal>
        </section>

        {/* Introduction */}
        <section
          id="about"
          style={{
            paddingInline: "var(--margin-desktop)",
            maxWidth: "calc(var(--content-max-width) + var(--margin-desktop))",
            paddingBottom: "clamp(4rem, 8vw, 7.5rem)",
          }}
        >
          <SectionReveal>
            <header className="flex items-baseline gap-4 mb-12">
              <span className="font-mono text-xs uppercase tracking-[0.08em] text-ring">
                /02
              </span>
              <h2
                className="text-lg uppercase tracking-tight text-muted-foreground font-light"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Introduction
              </h2>
            </header>

            <p className="text-[1.375rem] leading-[1.6] text-foreground/80 font-light max-w-[65ch]">
              A design student at{" "}
              <span className="text-foreground font-normal">Shiv Nadar University</span>
              , obsessed with the convergence of typography, motion, and digital
              craftsmanship. I build interfaces that breathe and systems that endure.
            </p>

            <a
              href="#"
              className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground mt-8 group"
              style={{ transition: "color 300ms var(--ease-out)" }}
            >
              Read the archive
              <span
                className="h-px w-8 bg-muted-foreground/40 group-hover:w-12"
                style={{ transition: "width 300ms var(--ease-out)" }}
              />
            </a>
          </SectionReveal>
        </section>
      </main>

      <footer
        style={{
          paddingInline: "var(--margin-desktop)",
          maxWidth: "calc(var(--content-max-width) + var(--margin-desktop))",
          paddingBottom: "3rem",
          paddingTop: "6rem",
          borderTop: "1px solid var(--border)",
        }}
        className="flex justify-between items-end w-full"
      >
        <div className="flex flex-col gap-4">
          <span className="font-mono text-xs uppercase tracking-[0.08em] text-foreground font-bold">
            PRATYUSH
          </span>
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.05em] text-muted-foreground">
            © 2026 Pratyush — Built with silence
          </p>
        </div>

        <nav aria-label="Footer links" className="flex gap-8">
          {[
            { label: "Email", href: "mailto:pratyush@example.com" },
            { label: "Archive", href: "#" },
            { label: "Source", href: "#" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="font-mono text-[0.6875rem] uppercase tracking-[0.05em] text-muted-foreground hover:text-foreground"
              style={{ transition: "color 200ms var(--ease-out)" }}
            >
              {label}
            </a>
          ))}
        </nav>
      </footer>

      {/* Contact drawer */}
      <ContactDrawer
        open={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </>
  );
}
