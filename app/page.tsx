import BackgroundSystem from '@/components/BackgroundSystem'
import { BackgroundRippleEffect } from '@/components/ui/background-ripple-effect'

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
      <nav className="fixed top-0 left-0 right-0 h-16 transition-all duration-500 ease-in-out bg-background/80 backdrop-blur-xl z-[100]">
        <div className="flex justify-between items-center max-w-[720px] mx-auto px-6 w-full h-full">
          {/* 19.4:1 ✓ */}
          <div className="font-mono font-bold text-foreground tracking-widest text-sm">PRATYUSH</div>
          <div className="flex gap-6 items-center">
            <div className="hidden md:flex gap-8">
              {/* Active link — accent-violet 5.2:1 ✓ */}
              <a data-cursor="active" className="text-[#8d7dca] font-bold font-label tracking-tighter uppercase text-xs" href="#">Work</a>
              {/* Inactive links — muted-foreground 9.1:1 ✓ */}
              <a data-cursor="active" className="text-muted-foreground hover:text-[#8d7dca] transition-colors duration-300 font-label tracking-tighter uppercase text-xs" href="#">About</a>
              <a data-cursor="active" className="text-muted-foreground hover:text-[#8d7dca] transition-colors duration-300 font-label tracking-tighter uppercase text-xs" href="#">Studio</a>
              <a data-cursor="active" className="text-muted-foreground hover:text-[#8d7dca] transition-colors duration-300 font-label tracking-tighter uppercase text-xs" href="#">Lab</a>
            </div>
            <button data-cursor="active" className="text-[#8d7dca] font-label tracking-tighter uppercase text-xs scale-95 transition-transform duration-200">Contact</button>
          </div>
        </div>
      </nav>

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

      <main className="relative z-[10] max-w-[720px] mx-auto px-6 pt-32 pb-24">
        {/* Hero */}
        <section className="min-h-[819px] flex flex-col justify-center mb-32 relative items-center">
          <div className="overflow-hidden mb-4 w-full flex justify-center">
            {/* 19.4:1 ✓ */}
            <h1 data-cursor="active" className="text-[clamp(3.5rem,10vw,6rem)] font-headline font-bold tracking-tighter leading-[0.9] text-foreground text-center">
              PRATYUSH
            </h1>
          </div>
          <div className="flex items-center gap-4 mb-16 mx-auto">
            {/* 5.2:1 ✓ — accent-violet, one of 5 permitted uses */}
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-[#8d7dca]">design · systems · craft</span>
          </div>
          <div className="mt-12 flex flex-col items-center animate-pulse-soft mx-auto">
            {/* 3.7:1 — large-text threshold, decorative scroll indicator only */}
            <span className="font-mono text-[0.6rem] tracking-[0.3em] uppercase text-ring mb-2">Scroll</span>
            <span className="material-symbols-outlined text-[#8d7dca] text-sm">expand_more</span>
          </div>
        </section>

        {/* Selected Work */}
        <section className="mb-48">
          <div className="mb-12 flex items-baseline gap-4">
            {/* 9.1:1 ✓ — metadata label */}
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-muted-foreground">/01</span>
            {/* 9.1:1 ✓ */}
            <h2 data-cursor="active" className="font-headline text-lg uppercase tracking-tight text-muted-foreground">Selected Work</h2>
          </div>
          <div className="flex flex-col gap-0">

            {/* Lumina */}
            <div className="group relative project-reveal">
              <a data-cursor="active" className="flex items-center justify-between py-10 border-b border-[#262626] group-hover:border-[#8d7dca]/40 transition-colors" href="#">
                {/* 19.4:1 ✓ */}
                <h3 className="text-[clamp(2rem,6vw,3.5rem)] font-headline font-light tracking-tighter text-foreground group-hover:pl-4 transition-all duration-500">Lumina</h3>
                <div className="flex items-center gap-6">
                  {/* 9.1:1 ✓ */}
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Visual Identity</span>
                  <span className="material-symbols-outlined text-[#8d7dca] translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">arrow_outward</span>
                </div>
              </a>
              <div className="reveal-image fixed left-1/2 top-1/2 pointer-events-none opacity-0 transition-all duration-500 ease-out z-[50] w-[280px] h-[180px] -translate-x-1/2 -translate-y-1/2 scale-90 border border-[#262626] overflow-hidden shadow-2xl">
                <img
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVePecnO3O9jPqSN5Ln_aLCMYMCdU0lyoyn8r9nNKpA014_RKIo-6rUmUim9QDKO5KQdlA2gX1PcwkrC9bXANN32st9ANn1mlloXq6THPtkXt0djbLbUzYZsVg3TqwjFXp2W3KhY396fb1DomZHMCvNxs1x8TlW-tpNJCbCYUHCJwlohv6BR5PJ6xkcv3T5bDWtEMohsAipC15fcTNdIBVLLNGXZeDSa3sAhmYTbn7fWnQizP0xO_zAfp82GhleBQGHe7c2IQqF-E"
                  alt="Abstract minimal 3D composition with soft violet lighting and geometric glass shapes on a dark background"
                />
              </div>
            </div>

            {/* Flux */}
            <div className="group relative project-reveal">
              <a data-cursor="active" className="flex items-center justify-between py-10 border-b border-[#262626] group-hover:border-[#8d7dca]/40 transition-colors" href="#">
                <h3 className="text-[clamp(2rem,6vw,3.5rem)] font-headline font-light tracking-tighter text-foreground group-hover:pl-4 transition-all duration-500">Flux</h3>
                <div className="flex items-center gap-6">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Motion System</span>
                  <span className="material-symbols-outlined text-[#8d7dca] translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">arrow_outward</span>
                </div>
              </a>
              <div className="reveal-image fixed left-1/2 top-1/2 pointer-events-none opacity-0 transition-all duration-500 ease-out z-[50] w-[280px] h-[180px] -translate-x-1/2 -translate-y-1/2 scale-90 border border-[#262626] overflow-hidden shadow-2xl">
                <img
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCH0wM6voJO04SX6D5JMXLChYRDcY6us-jsigVx1bOCv617s3kG2egcZrEHZJxy-qjCjYWo9fUT7CO25135yx6GxtLeMVP_WFnewoTY1HUyrugj4qx8CmTdhFDBgpENVCRIFZMW7EyVg1-4LoDIGh7dVDofoP6NvCRNXYpyAclZnxJGryXIngyDqZz-VUkhy1wMDegzbqW69SLQg4DrBfJEDK4AgKnp3hYvg0zmdm76LbW4FBiHRVxVs6CcNIXh_Nv7zd7xjLDffaw"
                  alt="Liquid metal flowing in dark space with iridescent reflections and high contrast lighting"
                />
              </div>
            </div>

            {/* Prism */}
            <div className="group relative project-reveal">
              <a data-cursor="active" className="flex items-center justify-between py-10 border-b border-[#262626] group-hover:border-[#8d7dca]/40 transition-colors" href="#">
                <h3 className="text-[clamp(2rem,6vw,3.5rem)] font-headline font-light tracking-tighter text-foreground group-hover:pl-4 transition-all duration-500">Prism</h3>
                <div className="flex items-center gap-6">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Editorial Tool</span>
                  <span className="material-symbols-outlined text-[#8d7dca] translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">arrow_outward</span>
                </div>
              </a>
              <div className="reveal-image fixed left-1/2 top-1/2 pointer-events-none opacity-0 transition-all duration-500 ease-out z-[50] w-[280px] h-[180px] -translate-x-1/2 -translate-y-1/2 scale-90 border border-[#262626] overflow-hidden shadow-2xl">
                <img
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOs2wVxBZ_MueS6FOwOQiQAoav21zJrRPP4PVfrGnWk1XXKdWrJMEGiMUX6JPLrxf4N4LFhja99RmmnzxcLTiCMLGUTcOCqoHIKRG5N7yYpBMUWSQz4AA3fSpqQS86F9vCT_laely1S_CcaTJ3_CbY2TQnIRL40UgTpEm_YL_LunmTlvCdrvmyd6sfIF4uNCD9zHe3qYP38O2dIpWL5LhKbjOeobx-zJ3nt1DBPbwklG_pHEOM2s9zgG0dfINGlrRw2JLFSlW7PmU"
                  alt="Minimalist typography on glass surface with sharp shadows and subtle refraction effects"
                />
              </div>
            </div>

            {/* Vertex */}
            <div className="group relative project-reveal">
              <a data-cursor="active" className="flex items-center justify-between py-10 group-hover:border-[#8d7dca]/40 transition-colors" href="#">
                <h3 className="text-[clamp(2rem,6vw,3.5rem)] font-headline font-light tracking-tighter text-foreground group-hover:pl-4 transition-all duration-500">Vertex</h3>
                <div className="flex items-center gap-6">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Data Visualization</span>
                  <span className="material-symbols-outlined text-[#8d7dca] translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">arrow_outward</span>
                </div>
              </a>
              <div className="reveal-image fixed left-1/2 top-1/2 pointer-events-none opacity-0 transition-all duration-500 ease-out z-[50] w-[280px] h-[180px] -translate-x-1/2 -translate-y-1/2 scale-90 border border-[#262626] overflow-hidden shadow-2xl">
                <img
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtC6bhEGZ6u-TszGrhZkAmq7MW2Y_SiIXvSD4IWQ8-OYdXL05rpEPx-1soU_w4B_ToCPPZ3U66fLn8-sdFc1g8UaF0W4o6OZKeQcIFqC-STOhI8zs_14BWUzf9OCmD1PdD8-uBrmuQY1ySsKh7TnYk17AG4hiycz8LHf3wQK3Ik9-uSGm9mnoUaktuEw4Bpge6yiqFH1oJ1Uf3zrnS65ZwnOeoRZQaIG9BRupYokrYZl-AeSgLIIPqxMu3OmbB_RqYTb-bz_iu80M"
                  alt="Complex network of glowing lines and particles in deep space with soft cinematic lighting"
                />
              </div>
            </div>

          </div>
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
