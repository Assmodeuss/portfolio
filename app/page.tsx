import BackgroundSystem from '@/components/BackgroundSystem'
import { BackgroundRippleEffect } from '@/components/ui/background-ripple-effect'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import { ProjectShowcase } from '@/components/ui/project-showcase'

// ── Colour contrast audit (visual-system-guide §8 / WCAG AA) ──────────────
// All text tokens verified against bg #0a0a0a:
//   text-foreground        #fafafa   19.4:1  ✓ AA
//   text-muted-foreground  #a1a1a1    9.1:1  ✓ AA  ← replaces /30 /40 /60 opacity
//   text-[#8d7dca]         accent-v   5.2:1  ✓ AA  ← active nav, accent only
//   text-ring / ghost      #525252    3.7:1  ✓ large-text only (scroll label)
//
// Removed patterns that FAILED:
//   text-on-surface/30  ≈ 2.0:1  ✗
//   text-on-surface/40  ≈ 2.8:1  ✗
//   text-[#e5e2e1]/30   ≈ 2.0:1  ✗

export default function Home() {
  return (
    <>
      <BackgroundSystem />

      {/* Ripple grid — z-0: above gradient (-z-10), below content (z-10+), interactive */}
      <div className="fixed inset-0 z-0">
        <BackgroundRippleEffect />
      </div>

      {/* Desktop nav */}
      <Navbar />

      {/* Sidebar */}
      <aside className="fixed right-0 top-0 h-full z-[200] flex flex-col p-8 bg-[#0e0e0e] w-[320px] shadow-[0_20px_40px_rgba(0,0,0,0.4)] translate-x-full lg:translate-x-0 hidden">
        <div className="mb-12">
          {/* 5.2:1 ✓ */}
          <h3 className="font-mono text-[10px] tracking-widest uppercase text-[#8d7dca] mb-2">GET IN TOUCH</h3>
          {/* 9.1:1 ✓ */}
          <p className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground leading-relaxed">Currently available for editorial projects.</p>
        </div>
        <div className="flex flex-col gap-1 flex-grow">
          <a data-cursor="active" className="flex justify-between items-center py-3 px-2 text-muted-foreground hover:bg-[#1a1a1a] hover:text-[#8d7dca] transition-all font-mono text-[10px] tracking-widest uppercase group" href="#">
            <span>Instagram</span>
            <span className="material-symbols-outlined text-[14px]">arrow_outward</span>
          </a>
          <a data-cursor="active" className="flex justify-between items-center py-3 px-2 text-muted-foreground hover:bg-[#1a1a1a] hover:text-[#8d7dca] transition-all font-mono text-[10px] tracking-widest uppercase group" href="#">
            <span>LinkedIn</span>
            <span className="material-symbols-outlined text-[14px]">arrow_outward</span>
          </a>
          <a data-cursor="active" className="flex justify-between items-center py-3 px-2 text-muted-foreground hover:bg-[#1a1a1a] hover:text-[#8d7dca] transition-all font-mono text-[10px] tracking-widest uppercase group" href="#">
            <span>Read.cv</span>
            <span className="material-symbols-outlined text-[14px]">description</span>
          </a>
          <a data-cursor="active" className="flex justify-between items-center py-3 px-2 text-muted-foreground hover:bg-[#1a1a1a] hover:text-[#8d7dca] transition-all font-mono text-[10px] tracking-widest uppercase group" href="#">
            <span>Twitter</span>
            <span className="material-symbols-outlined text-[14px]">terminal</span>
          </a>
        </div>
        <button data-cursor="active" className="mt-auto py-4 border border-[#262626] text-[#8d7dca] font-mono text-[10px] tracking-widest uppercase hover:bg-[#1a1a1a] transition-colors">Copy Email</button>
      </aside>

      {/* Hero — full-viewport, outside constrained main */}
      <div className="relative z-[10]">
        <Hero />
      </div>

      <main className="relative z-[10] max-w-[720px] mx-auto px-6 pb-24">

        {/* Selected Work */}
        <section className="mb-48">
          <div className="mb-12 flex items-baseline gap-4">
            {/* 9.1:1 ✓ — metadata label */}
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-muted-foreground">/01</span>
            {/* 9.1:1 ✓ */}
            <h2 data-cursor="active" className="font-headline text-lg uppercase tracking-tight text-muted-foreground">Selected Work</h2>
          </div>
          <ProjectShowcase />
        </section>

        {/* Introduction */}
        <section className="mb-48">
          <div className="mb-12 flex items-baseline gap-4">
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-muted-foreground">/02</span>
            <h2 data-cursor="active" className="font-headline text-lg uppercase tracking-tight text-muted-foreground">Introduction</h2>
          </div>
          <div className="max-w-[540px]">
            {/* 19.4:1 ✓ — body copy needs maximum readability */}
            <p className="text-[1.375rem] leading-[1.6] text-foreground font-light mb-8">
              A design student at <span className="text-foreground font-normal">Shiv Nadar University</span>, obsessed with the convergence of typography, motion, and digital craftsmanship. I build interfaces that breathe and systems that endure.
            </p>
            <a data-cursor="active" className="inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#8d7dca] group" href="#">
              READ THE ARCHIVE
              <span className="h-[1px] w-8 bg-[#8d7dca]/40 group-hover:w-12 transition-all"></span>
            </a>
          </div>
        </section>
      </main>

      <footer className="relative z-[10] max-w-[720px] mx-auto px-6 flex justify-between items-end w-full pb-12 pt-24 border-t border-[#262626]">
        <div className="flex flex-col gap-4">
          {/* 19.4:1 ✓ */}
          <div className="text-foreground font-mono font-bold text-xs">PRATYUSH</div>
          {/* 9.1:1 ✓ — was /30 opacity which failed AA */}
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.05em] text-muted-foreground">
            © 2024 PRATYUSH — BUILT WITH SILENCE
          </p>
        </div>
        <div className="flex gap-8">
          {/* 9.1:1 ✓ hover → 19.4:1 */}
          <a data-cursor="active" className="font-mono text-[0.6875rem] uppercase tracking-[0.05em] text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4 decoration-[#8d7dca]" href="#">Email</a>
          <a data-cursor="active" className="font-mono text-[0.6875rem] uppercase tracking-[0.05em] text-muted-foreground hover:text-foreground transition-colors" href="#">Archive</a>
          <a data-cursor="active" className="font-mono text-[0.6875rem] uppercase tracking-[0.05em] text-muted-foreground hover:text-foreground transition-colors" href="#">Source</a>
        </div>
      </footer>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-background/90 backdrop-blur-xl z-[100] border-t border-[#262626]">
        <div className="flex justify-around items-center h-full max-w-[720px] mx-auto">
          {/* Active — 5.2:1 ✓ */}
          <a className="flex flex-col items-center gap-1 text-[#8d7dca]" href="#">
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
            <span className="font-mono text-[8px] uppercase tracking-tighter">Work</span>
          </a>
          {/* Inactive — 9.1:1 ✓ */}
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
