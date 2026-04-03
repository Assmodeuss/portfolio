import type { Metadata } from 'next'
import Link from 'next/link'
import { SectionReveal } from '@/components/layout/SectionReveal'
import { Footer } from '@/components/layout/Footer'
import { AnimatedUnderline } from '@/components/shared/AnimatedUnderline'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Pratyush — third-year design student at Shiv Nadar University, working across UX, visual identity, typography, and spatial design.',
}

export default function AboutPage() {
  return (
    <main>
      {/* Page header */}
      <div
        className="content-col"
        style={{ paddingTop: 'calc(var(--nav-height) + 3rem)' }}
      >
        <SectionReveal as="section">
          <h1 className="text-h1" style={{ color: 'var(--foreground)', marginBottom: '3rem' }}>
            About
          </h1>
        </SectionReveal>
      </div>

      {/* Main content */}
      <div className="content-col">
        <SectionReveal as="section" delay={50}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '65ch' }}>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.125rem',
                lineHeight: 1.6,
                color: 'var(--foreground)',
              }}
            >
              I&apos;m Pratyush — a third-year design student at Shiv Nadar
              University. My work sits at the intersection of UX, visual
              identity, typography, and spatial/speculative design.
            </p>

            <p style={{ fontFamily: 'var(--font-body)', lineHeight: 1.6, color: 'var(--foreground)' }}>
              I approach design as a question more than a craft. Not{' '}
              <em>how do I make this look good</em> but{' '}
              <em>what is this trying to say, and does the form say it?</em>{' '}
              That question applies equally to a brand system, a 55-screen
              product, a VR experience, and a typeface.
            </p>

            <p style={{ fontFamily: 'var(--font-body)', lineHeight: 1.6, color: 'var(--foreground)' }}>
              I&apos;m particularly interested in design as cultural production —
              how visual systems encode values, how typographic choices carry
              historical weight, how spatial design shapes behavior and
              perception. The work I care most about has an argument.
            </p>
          </div>
        </SectionReveal>

        {/* Skills */}
        <SectionReveal as="section" delay={100} style={{ paddingTop: 'clamp(3rem, 5vw, 4rem)' }}>
          <h2 className="text-h3" style={{ color: 'var(--foreground)', marginBottom: '1.5rem' }}>
            Disciplines
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '0.5rem',
              maxWidth: '65ch',
            }}
          >
            {[
              'UX Design',
              'Visual Identity',
              'Typography',
              'Devanagari Type',
              'Spatial / VR',
              'Data Visualization',
              'Speculative Design',
              'Design Research',
              'Front-end Development',
            ].map((skill) => (
              <span
                key={skill}
                className="text-mono-label"
                style={{ color: 'var(--muted-foreground)' }}
              >
                {skill}
              </span>
            ))}
          </div>
        </SectionReveal>

        {/* Tools */}
        <SectionReveal as="section" delay={150} style={{ paddingTop: 'clamp(3rem, 5vw, 4rem)' }}>
          <h2 className="text-h3" style={{ color: 'var(--foreground)', marginBottom: '1.5rem' }}>
            Tools
          </h2>
          <p
            className="text-mono-label"
            style={{ color: 'var(--muted-foreground)', maxWidth: '65ch', lineHeight: 1.8 }}
          >
            Figma · Framer · Adobe Illustrator · After Effects · Unity ·
            Blender · D3.js · React · Next.js · GSAP
          </p>
        </SectionReveal>

        {/* Education */}
        <SectionReveal as="section" delay={100} style={{ paddingTop: 'clamp(3rem, 5vw, 4rem)' }}>
          <h2 className="text-h3" style={{ color: 'var(--foreground)', marginBottom: '1.5rem' }}>
            Education
          </h2>
          <div>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1rem',
                fontWeight: 500,
                color: 'var(--foreground)',
                marginBottom: '0.25rem',
              }}
            >
              Shiv Nadar University
            </p>
            <p className="text-mono-label" style={{ color: 'var(--muted-foreground)' }}>
              B.Des, Design · 2022–2026
            </p>
          </div>
        </SectionReveal>

        {/* Contact CTA */}
        <SectionReveal
          as="section"
          delay={50}
          style={{
            paddingTop: 'clamp(3rem, 5vw, 4rem)',
            paddingBottom: 'clamp(4rem, 8vw, 7.5rem)',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              lineHeight: 1.6,
              color: 'var(--foreground)',
              maxWidth: '55ch',
              marginBottom: '1.5rem',
            }}
          >
            Available for internships, collaborations, and freelance projects.
            If you&apos;re building something that needs careful thinking, I&apos;d
            like to talk.
          </p>
          <a
            href="mailto:pratyush@example.com"
            style={{ display: 'inline-flex', alignItems: 'center' }}
          >
            <AnimatedUnderline color="violet">
              <span className="text-mono-label" style={{ color: 'var(--foreground)' }}>
                pratyush@example.com
              </span>
            </AnimatedUnderline>
          </a>
        </SectionReveal>
      </div>

      <Footer />
    </main>
  )
}
