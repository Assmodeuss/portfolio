export default function Introduction() {
  return (
    <section className="mb-48">
      <div className="mb-12 flex items-baseline gap-4">
        <span className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-on-surface/30">
          /02
        </span>
        <h2 className="font-headline text-lg uppercase tracking-tight text-on-surface/60">
          Introduction
        </h2>
      </div>

      <div className="max-w-[540px]">
        <p className="text-[1.375rem] leading-[1.6] text-on-surface/80 font-light mb-8">
          A design student at{" "}
          <span className="text-on-surface font-normal">
            Shiv Nadar University
          </span>
          , obsessed with the convergence of typography, motion, and digital
          craftsmanship. I build interfaces that breathe and systems that endure.
        </p>
        <a
          href="#"
          className="inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-primary group"
        >
          READ THE ARCHIVE
          <span className="h-[1px] w-8 bg-primary/40 group-hover:w-12 transition-all" />
        </a>
      </div>
    </section>
  );
}
