import ShaderBackground from '@/components/ShaderBackground'

export default function Home() {
  return (
    <>
      <ShaderBackground />

      {/* Desktop nav */}
      <nav className="fixed top-0 left-0 right-0 h-16 transition-all duration-500 ease-in-out bg-[#131313]/80 backdrop-blur-xl z-[100]">
        <div className="flex justify-between items-center max-w-[720px] mx-auto px-6 w-full h-full">
          <div className="font-mono font-bold text-[#e5e2e1] tracking-widest text-sm">PRATYUSH</div>
          <div className="flex gap-6 items-center">
            <div className="hidden md:flex gap-8">
              <a className="text-[#ccbeff] font-bold font-label tracking-tighter uppercase text-xs" href="#">Work</a>
              <a className="text-[#e5e2e1]/60 hover:text-[#ccbeff] transition-colors duration-300 font-label tracking-tighter uppercase text-xs" href="#">About</a>
              <a className="text-[#e5e2e1]/60 hover:text-[#ccbeff] transition-colors duration-300 font-label tracking-tighter uppercase text-xs" href="#">Studio</a>
              <a className="text-[#e5e2e1]/60 hover:text-[#ccbeff] transition-colors duration-300 font-label tracking-tighter uppercase text-xs" href="#">Lab</a>
            </div>
            <button className="text-[#ccbeff] font-label tracking-tighter uppercase text-xs scale-95 transition-transform duration-200">Contact</button>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside className="fixed right-0 top-0 h-full z-[200] flex flex-col p-8 bg-[#0e0e0e] w-[320px] shadow-[0_20px_40px_rgba(0,0,0,0.4)] translate-x-full lg:translate-x-0 hidden">
        <div className="mb-12">
          <h3 className="font-mono text-[10px] tracking-widest uppercase text-[#ccbeff] mb-2">GET IN TOUCH</h3>
          <p className="font-mono text-[10px] tracking-widest uppercase text-[#e5e2e1]/40 leading-relaxed">Currently available for editorial projects.</p>
        </div>
        <div className="flex flex-col gap-1 flex-grow">
          <a className="flex justify-between items-center py-3 px-2 text-[#e5e2e1]/40 hover:bg-[#2a2a2a] hover:text-[#ccbeff] transition-all font-mono text-[10px] tracking-widest uppercase group" href="#">
            <span>Instagram</span>
            <span className="material-symbols-outlined text-[14px]">arrow_outward</span>
          </a>
          <a className="flex justify-between items-center py-3 px-2 text-[#e5e2e1]/40 hover:bg-[#2a2a2a] hover:text-[#ccbeff] transition-all font-mono text-[10px] tracking-widest uppercase group" href="#">
            <span>LinkedIn</span>
            <span className="material-symbols-outlined text-[14px]">arrow_outward</span>
          </a>
          <a className="flex justify-between items-center py-3 px-2 text-[#e5e2e1]/40 hover:bg-[#2a2a2a] hover:text-[#ccbeff] transition-all font-mono text-[10px] tracking-widest uppercase group" href="#">
            <span>Read.cv</span>
            <span className="material-symbols-outlined text-[14px]">description</span>
          </a>
          <a className="flex justify-between items-center py-3 px-2 text-[#e5e2e1]/40 hover:bg-[#2a2a2a] hover:text-[#ccbeff] transition-all font-mono text-[10px] tracking-widest uppercase group" href="#">
            <span>Twitter</span>
            <span className="material-symbols-outlined text-[14px]">terminal</span>
          </a>
        </div>
        <button className="mt-auto py-4 border border-outline-variant text-[#ccbeff] font-mono text-[10px] tracking-widest uppercase hover:bg-surface-container-high transition-colors">Copy Email</button>
      </aside>

      <main className="max-w-[720px] mx-auto px-6 pt-32 pb-24">
        {/* Hero */}
        <section className="min-h-[819px] flex flex-col justify-center mb-32 relative items-center">
          <div className="overflow-hidden mb-4 w-full flex justify-center">
            <h1 className="text-[clamp(3.5rem,10vw,6rem)] font-headline font-bold tracking-tighter leading-[0.9] text-on-surface text-center">
              PRATYUSH
            </h1>
          </div>
          <div className="flex items-center gap-4 mb-16 mx-auto">
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-primary">design · systems · craft</span>
          </div>
          <div className="mt-12 flex flex-col items-center animate-pulse-soft mx-auto">
            <span className="font-mono text-[0.6rem] tracking-[0.3em] uppercase opacity-30 mb-2">Scroll</span>
            <span className="material-symbols-outlined text-primary text-sm">expand_more</span>
          </div>
        </section>

        {/* Selected Work */}
        <section className="mb-48">
          <div className="mb-12 flex items-baseline gap-4">
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-on-surface/30">/01</span>
            <h2 className="font-headline text-lg uppercase tracking-tight text-on-surface/60">Selected Work</h2>
          </div>
          <div className="flex flex-col gap-0">

            {/* Lumina */}
            <div className="group relative project-reveal">
              <a className="flex items-center justify-between py-10 border-b border-outline-variant/20 group-hover:border-primary/40 transition-colors" href="#">
                <h3 className="text-[clamp(2rem,6vw,3.5rem)] font-headline font-light tracking-tighter group-hover:pl-4 transition-all duration-500">Lumina</h3>
                <div className="flex items-center gap-6">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-on-surface/40">Visual Identity</span>
                  <span className="material-symbols-outlined text-primary translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">arrow_outward</span>
                </div>
              </a>
              <div className="reveal-image fixed left-1/2 top-1/2 pointer-events-none opacity-0 transition-all duration-500 ease-out z-[50] w-[280px] h-[180px] -translate-x-1/2 -translate-y-1/2 scale-90 border border-outline-variant/30 overflow-hidden shadow-2xl">
                <img
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVePecnO3O9jPqSN5Ln_aLCMYMCdU0lyoyn8r9nNKpA014_RKIo-6rUmUim9QDKO5KQdlA2gX1PcwkrC9bXANN32st9ANn1mlloXq6THPtkXt0djbLbUzYZsVg3TqwjFXp2W3KhY396fb1DomZHMCvNxs1x8TlW-tpNJCbCYUHCJwlohv6BR5PJ6xkcv3T5bDWtEMohsAipC15fcTNdIBVLLNGXZeDSa3sAhmYTbn7fWnQizP0xO_zAfp82GhleBQGHe7c2IQqF-E"
                  alt="Abstract minimal 3D composition with soft violet lighting and geometric glass shapes on a dark background"
                />
              </div>
            </div>

            {/* Flux */}
            <div className="group relative project-reveal">
              <a className="flex items-center justify-between py-10 border-b border-outline-variant/20 group-hover:border-primary/40 transition-colors" href="#">
                <h3 className="text-[clamp(2rem,6vw,3.5rem)] font-headline font-light tracking-tighter group-hover:pl-4 transition-all duration-500">Flux</h3>
                <div className="flex items-center gap-6">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-on-surface/40">Motion System</span>
                  <span className="material-symbols-outlined text-primary translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">arrow_outward</span>
                </div>
              </a>
              <div className="reveal-image fixed left-1/2 top-1/2 pointer-events-none opacity-0 transition-all duration-500 ease-out z-[50] w-[280px] h-[180px] -translate-x-1/2 -translate-y-1/2 scale-90 border border-outline-variant/30 overflow-hidden shadow-2xl">
                <img
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCH0wM6voJO04SX6D5JMXLChYRDcY6us-jsigVx1bOCv617s3kG2egcZrEHZJxy-qjCjYWo9fUT7CO25135yx6GxtLeMVP_WFnewoTY1HUyrugj4qx8CmTdhFDBgpENVCRIFZMW7EyVg1-4LoDIGh7dVDofoP6NvCRNXYpyAclZnxJGryXIngyDqZz-VUkhy1wMDegzbqW69SLQg4DrBfJEDK4AgKnp3hYvg0zmdm76LbW4FBiHRVxVs6CcNIXh_Nv7zd7xjLDffaw"
                  alt="Liquid metal flowing in dark space with iridescent reflections and high contrast lighting"
                />
              </div>
            </div>

            {/* Prism */}
            <div className="group relative project-reveal">
              <a className="flex items-center justify-between py-10 border-b border-outline-variant/20 group-hover:border-primary/40 transition-colors" href="#">
                <h3 className="text-[clamp(2rem,6vw,3.5rem)] font-headline font-light tracking-tighter group-hover:pl-4 transition-all duration-500">Prism</h3>
                <div className="flex items-center gap-6">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-on-surface/40">Editorial Tool</span>
                  <span className="material-symbols-outlined text-primary translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">arrow_outward</span>
                </div>
              </a>
              <div className="reveal-image fixed left-1/2 top-1/2 pointer-events-none opacity-0 transition-all duration-500 ease-out z-[50] w-[280px] h-[180px] -translate-x-1/2 -translate-y-1/2 scale-90 border border-outline-variant/30 overflow-hidden shadow-2xl">
                <img
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOs2wVxBZ_MueS6FOwOQiQAoav21zJrRPP4PVfrGnWk1XXKdWrJMEGiMUX6JPLrxf4N4LFhja99RmmnzxcLTiCMLGUTcOCqoHIKRG5N7yYpBMUWSQz4AA3fSpqQS86F9vCT_laely1S_CcaTJ3_CbY2TQnIRL40UgTpEm_YL_LunmTlvCdrvmyd6sfIF4uNCD9zHe3qYP38O2dIpWL5LhKbjOeobx-zJ3nt1DBPbwklG_pHEOM2s9zgG0dfINGlrRw2JLFSlW7PmU"
                  alt="Minimalist typography on glass surface with sharp shadows and subtle refraction effects"
                />
              </div>
            </div>

            {/* Vertex */}
            <div className="group relative project-reveal">
              <a className="flex items-center justify-between py-10 group-hover:border-primary/40 transition-colors" href="#">
                <h3 className="text-[clamp(2rem,6vw,3.5rem)] font-headline font-light tracking-tighter group-hover:pl-4 transition-all duration-500">Vertex</h3>
                <div className="flex items-center gap-6">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-on-surface/40">Data Visualization</span>
                  <span className="material-symbols-outlined text-primary translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">arrow_outward</span>
                </div>
              </a>
              <div className="reveal-image fixed left-1/2 top-1/2 pointer-events-none opacity-0 transition-all duration-500 ease-out z-[50] w-[280px] h-[180px] -translate-x-1/2 -translate-y-1/2 scale-90 border border-outline-variant/30 overflow-hidden shadow-2xl">
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
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-on-surface/30">/02</span>
            <h2 className="font-headline text-lg uppercase tracking-tight text-on-surface/60">Introduction</h2>
          </div>
          <div className="max-w-[540px]">
            <p className="text-[1.375rem] leading-[1.6] text-on-surface/80 font-light mb-8">
              A design student at <span className="text-on-surface font-normal">Shiv Nadar University</span>, obsessed with the convergence of typography, motion, and digital craftsmanship. I build interfaces that breathe and systems that endure.
            </p>
            <a className="inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-primary group" href="#">
              READ THE ARCHIVE
              <span className="h-[1px] w-8 bg-primary/40 group-hover:w-12 transition-all"></span>
            </a>
          </div>
        </section>
      </main>

      <footer className="max-w-[720px] mx-auto px-6 flex justify-between items-end w-full pb-12 pt-24 border-t border-outline-variant/10">
        <div className="flex flex-col gap-4">
          <div className="text-[#e5e2e1] font-mono font-bold text-xs">PRATYUSH</div>
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.05em] text-[#e5e2e1]/30">
            © 2024 PRATYUSH — BUILT WITH SILENCE
          </p>
        </div>
        <div className="flex gap-8">
          <a className="font-mono text-[0.6875rem] uppercase tracking-[0.05em] text-[#e5e2e1]/30 hover:text-[#e5e2e1] transition-opacity underline underline-offset-4 decoration-[#ccbeff]" href="#">Email</a>
          <a className="font-mono text-[0.6875rem] uppercase tracking-[0.05em] text-[#e5e2e1]/30 hover:text-[#e5e2e1] transition-opacity" href="#">Archive</a>
          <a className="font-mono text-[0.6875rem] uppercase tracking-[0.05em] text-[#e5e2e1]/30 hover:text-[#e5e2e1] transition-opacity" href="#">Source</a>
        </div>
      </footer>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#131313]/90 backdrop-blur-xl z-[100] border-t border-outline-variant/10">
        <div className="flex justify-around items-center h-full max-w-[720px] mx-auto">
          <a className="flex flex-col items-center gap-1 text-[#ccbeff]" href="#">
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
            <span className="font-mono text-[8px] uppercase tracking-tighter">Work</span>
          </a>
          <a className="flex flex-col items-center gap-1 text-[#e5e2e1]/40" href="#">
            <span className="material-symbols-outlined text-[20px]">person</span>
            <span className="font-mono text-[8px] uppercase tracking-tighter">About</span>
          </a>
          <a className="flex flex-col items-center gap-1 text-[#e5e2e1]/40" href="#">
            <span className="material-symbols-outlined text-[20px]">mail</span>
            <span className="font-mono text-[8px] uppercase tracking-tighter">Contact</span>
          </a>
        </div>
      </nav>
    </>
  )
}
