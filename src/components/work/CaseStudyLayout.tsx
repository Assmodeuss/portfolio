'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import type { Project } from '@/lib/projects'
import { getFlipRect, playFlip } from '@/lib/flip'
import { SectionReveal } from '@/components/layout/SectionReveal'
import { Footer } from '@/components/layout/Footer'
import { ArrowUpRight } from 'lucide-react'
import { AnimatedUnderline } from '@/components/shared/AnimatedUnderline'

interface CaseStudyLayoutProps {
  project: Project
  nextProject: Project
  children: React.ReactNode
}

/**
 * Shared case study page structure.
 * Hero image arrives via FLIP from project list (if rect stored).
 * Falls back to opacity fade if navigated directly.
 */
export function CaseStudyLayout({
  project,
  nextProject,
  children,
}: CaseStudyLayoutProps) {
  const heroRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const rect = getFlipRect()
    const heroEl = heroRef.current

    if (!heroEl) return

    if (rect) {
      // FLIP: animate from thumbnail rect to full hero
      playFlip(heroEl, rect)
    } else {
      // Direct navigation: simple fade-in
      heroEl.animate(
        [
          { opacity: 0 },
          { opacity: 1 },
        ],
        {
          duration: 400,
          easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
          fill: 'forwards',
        }
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main>
      {/* Hero image — full bleed, 16:9 */}
      <div
        ref={heroRef}
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16/9',
          overflow: 'hidden',
          viewTransitionName: 'project-hero',
        }}
      >
        <Image
          ref={imgRef}
          src={project.heroImage}
          alt={project.title}
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover' }}
        />
      </div>

      {/* Project meta */}
      <div
        className="content-col"
        style={{ paddingTop: '3rem' }}
      >
        <h1 className="text-h1" style={{ color: 'var(--foreground)', marginBottom: '1.5rem' }}>
          {project.title}
        </h1>

        <div
          className="text-mono-label"
          style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}
        >
          <span>{project.year}</span>
          <span style={{ color: 'var(--ring)' }}>·</span>
          <span>{project.categories.join(' · ')}</span>
          {project.client && (
            <>
              <span style={{ color: 'var(--ring)' }}>·</span>
              <span>{project.client}</span>
            </>
          )}
        </div>
      </div>

      {/* Overview */}
      <SectionReveal as="section" className="content-col" delay={100}>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.125rem',
            lineHeight: 1.6,
            color: 'var(--foreground)',
            maxWidth: '65ch',
            paddingTop: 'clamp(2rem, 4vw, 3rem)',
          }}
        >
          {project.overview}
        </p>
      </SectionReveal>

      {/* MDX body */}
      <SectionReveal as="article">
        <div className="content-col prose-content" style={{ paddingTop: 'clamp(2rem, 4vw, 3rem)' }}>
          {children}
        </div>
      </SectionReveal>

      {/* Next project */}
      <SectionReveal as="section" className="content-col" delay={50}>
        <div
          style={{
            borderTop: '1px solid var(--border)',
            paddingTop: '2rem',
            paddingBottom: 'clamp(4rem, 8vw, 7.5rem)',
          }}
        >
          <p className="text-mono-label" style={{ marginBottom: '0.75rem' }}>
            Next project
          </p>
          <Link
            href={`/work/${nextProject.slug}`}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <AnimatedUnderline>
              <span className="text-h2" style={{ color: 'var(--foreground)' }}>
                {nextProject.title}
              </span>
            </AnimatedUnderline>
            <ArrowUpRight
              size={24}
              strokeWidth={1.5}
              style={{ color: 'var(--muted-foreground)', flexShrink: 0 }}
            />
          </Link>
        </div>
      </SectionReveal>

      <Footer />
    </main>
  )
}
