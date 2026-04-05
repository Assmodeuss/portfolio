import Navbar from "@/components/Navbar"
import BackgroundSystem from "@/components/BackgroundSystem"
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect"
import type { ProjectData, ContentSection } from "@/data/projects"
import LinkWithLoader from "@/components/LinkWithLoader"

function renderSection(section: ContentSection, index: number) {
  switch (section.type) {
    case "text":
      return (
        <div key={index} className="space-y-8">
          <h3 className="text-2xl font-headline font-semibold text-on-surface">
            {section.heading}
          </h3>
          <p className="text-sm font-body leading-relaxed text-on-surface/70">
            {section.body}
          </p>
        </div>
      )

    case "figure":
      return (
        <figure key={index} className="bg-surface-container rounded-xl overflow-hidden">
          <img
            src={section.src}
            alt={section.alt}
            className="w-full grayscale hover:grayscale-0 transition-all duration-1000"
          />
        </figure>
      )

    case "blockquote":
      return (
        <blockquote key={index} className="pl-8 border-l-2 border-primary/30 py-4">
          <p className="text-3xl font-serif italic font-light leading-snug text-primary/90">
            &ldquo;{section.quote}&rdquo;
          </p>
        </blockquote>
      )

    case "image-grid":
      return (
        <div key={index} className="grid grid-cols-2 gap-4">
          {section.images.map((img, i) => (
            <img
              key={i}
              src={img.src}
              alt={img.alt}
              className="rounded-xl aspect-[4/5] object-cover"
            />
          ))}
        </div>
      )
  }
}

export default function ProjectLayout({ project }: { project: ProjectData }) {
  return (
    <>
      <BackgroundSystem />

      <div className="fixed inset-0 z-0">
        <BackgroundRippleEffect />
      </div>

      {/* Grain overlay */}
      <div className="grain-overlay" />

      {/* Navbar */}
      <Navbar />

      <main className="pt-16 pb-32">
        {/* Hero image */}
        <section className="w-full h-[56.25vw] max-h-[819px] overflow-hidden bg-surface-container-lowest">
          <img
            src={project.heroImage}
            alt={project.title}
            className="w-full h-full object-cover grayscale brightness-75 transition-all duration-700"
          />
        </section>

        {/* Meta header */}
        <header className="max-w-[720px] mx-auto px-6 mt-24 mb-32">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <span className="font-mono text-[0.6875rem] tracking-[0.05em] text-primary">
                / CASE STUDY
              </span>
              <span className="font-mono text-[0.6875rem] tracking-[0.05em] text-on-surface/40">
                {project.year}
              </span>
            </div>

            <h1
              className="font-headline font-bold text-on-surface"
              style={{
                fontSize: "clamp(3.5rem, 8vw, 5rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.04em",
              }}
            >
              {project.title}
            </h1>

            <div className="flex flex-wrap gap-x-12 gap-y-4 mt-8">
              <div>
                <p className="font-mono text-[0.6875rem] tracking-[0.05em] text-on-surface/40 mb-1">
                  CLIENT
                </p>
                <p className="text-on-surface text-sm">{project.client}</p>
              </div>
              <div>
                <p className="font-mono text-[0.6875rem] tracking-[0.05em] text-on-surface/40 mb-1">
                  CATEGORIES
                </p>
                <p className="text-on-surface text-sm">{project.categories}</p>
              </div>
              <div>
                <p className="font-mono text-[0.6875rem] tracking-[0.05em] text-on-surface/40 mb-1">
                  ROLE
                </p>
                <p className="text-on-surface text-sm">{project.role}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Overview */}
        <section className="max-w-[720px] mx-auto px-6 mb-32">
          <div className="space-y-8">
            {project.content.overview.map((paragraph, i) => (
              <p
                key={i}
                className={`text-xl font-body leading-relaxed ${
                  i === 0 ? "text-on-surface-variant" : "text-on-surface-variant/80"
                }`}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        {/* Content sections */}
        <article className="max-w-[720px] mx-auto px-6 space-y-24">
          {project.content.sections.map((section, i) => renderSection(section, i))}
        </article>

        {/* Next project */}
        {project.nextProject && (
          <section className="mt-48 pt-24 border-t border-outline-variant/10">
            <div className="max-w-[720px] mx-auto px-6">
              <p className="font-mono text-[0.6875rem] tracking-[0.05em] text-on-surface/30 mb-6 uppercase">
                Next Project
              </p>
              <LinkWithLoader className="group block" href={`/projects/${project.nextProject.slug}`}>
                <h2
                  className="font-headline font-bold text-on-surface/40 group-hover:text-primary transition-colors duration-500"
                  style={{
                    fontSize: "clamp(3.5rem, 8vw, 5rem)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.04em",
                  }}
                >
                  {project.nextProject.title}
                </h2>
                <div className="flex items-center gap-4 mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="material-symbols-outlined text-primary">arrow_forward</span>
                  <span className="font-mono text-[0.6875rem] tracking-[0.05em] text-primary uppercase">
                    View Case Study
                  </span>
                </div>
              </LinkWithLoader>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#131313] pb-12 pt-24">
        <div className="max-w-[720px] mx-auto px-6 flex justify-between items-end w-full">
          <div className="flex flex-col gap-4">
            <div className="font-mono text-[#e5e2e1] text-[0.6875rem] tracking-[0.05em]">
              © 2024 PRATYUSH — BUILT WITH SILENCE
            </div>
          </div>
          <div className="flex gap-8 font-mono text-[0.6875rem] uppercase tracking-[0.05em]">
            <a
              className="text-[#e5e2e1]/30 hover:text-[#e5e2e1] transition-colors underline underline-offset-4 decoration-[#ccbeff]"
              href="#"
            >
              Email
            </a>
            <a className="text-[#e5e2e1]/30 hover:text-[#e5e2e1] transition-colors" href="#">
              Archive
            </a>
            <a className="text-[#e5e2e1]/30 hover:text-[#e5e2e1] transition-colors" href="#">
              Source
            </a>
          </div>
        </div>
      </footer>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-background/90 backdrop-blur-xl z-[100] border-t border-[#262626]">
        <div className="flex justify-around items-center h-full max-w-[720px] mx-auto">
          <LinkWithLoader className="flex flex-col items-center gap-1 text-muted-foreground" href="/">
            <span className="material-symbols-outlined text-[20px]">home</span>
            <span className="font-mono text-[8px] uppercase tracking-tighter">Work</span>
          </LinkWithLoader>
          <a className="flex flex-col items-center gap-1 text-muted-foreground" href="#">
            <span className="material-symbols-outlined text-[20px]">person</span>
            <span className="font-mono text-[8px] uppercase tracking-tighter">About</span>
          </a>
          <a className="flex flex-col items-center gap-1 text-muted-foreground" href="#">
            <span className="material-symbols-outlined text-[20px]">mail</span>
            <span className="font-mono text-[8px] uppercase tracking-tighter">Contact</span>
          </a>
        </div>
      </nav>
    </>
  )
}
