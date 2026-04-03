import dynamic from 'next/dynamic'
import Link from 'next/link'
import type { Metadata } from 'next'
import { featuredProjects } from '@/lib/projects'
import { HeroContent } from '@/components/hero/HeroContent'
import { ProjectList } from '@/components/work/ProjectList'
import { SectionReveal } from '@/components/layout/SectionReveal'
import { Footer } from '@/components/layout/Footer'

// Lazy load the shader — ssr: false, excludes from initial bundle
const ShaderHero = dynamic(() => import('@/components/hero/ShaderHero'), {
  ssr: false,
  loading: () => (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: 'var(--background)',
      }}
    />
  ),
})

export const metadata: Metadata = {
  title: 'Pratyush — Design Portfolio',
}

export default function HomePage() {
  return (
    <main>
      {/* === HERO === */}
      <section
        style={{
          position: 'relative',
          height: '100svh',
          minHeight: '600px',
          overflow: 'hidden',
        }}
        aria-label="Hero"
      >
        <ShaderHero />
        <HeroContent />
      </section>

      {/* === SELECTED WORK === */}
      <div id="work" className="content-col section-gap">
        <SectionReveal as="section">
          <p
            className="text-mono-label"
            style={{ marginBottom: '2rem', color: 'var(--muted-foreground)' }}
          >
            Selected Work
          </p>
          <ProjectList projects={featuredProjects} />
        </SectionReveal>
      </div>

      {/* === ABOUT TEASER === */}
      <div className="content-col" style={{ paddingBottom: 'clamp(4rem, 8vw, 7.5rem)' }}>
        <SectionReveal as="section" delay={100}>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              lineHeight: 1.6,
              color: 'var(--foreground)',
              maxWidth: '65ch',
              marginBottom: '1.5rem',
            }}
          >
            Third-year design student at Shiv Nadar University. I work across UX,
            visual identity, typography, and spatial design — treating each as a
            different lens on the same question: how does form create meaning?
          </p>
          <Link
            href="/about"
            className="text-mono-label animated-underline"
            style={{ color: 'var(--foreground)', display: 'inline-block' }}
          >
            More about me →
          </Link>
        </SectionReveal>
      </div>

      {/* === FOOTER === */}
      <Footer />
    </main>
  )
}
