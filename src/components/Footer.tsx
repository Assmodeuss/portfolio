export default function Footer() {
  return (
    <footer className="max-w-[720px] mx-auto px-6 flex justify-between items-end w-full pb-12 pt-24 border-t border-outline-variant/10">
      <div className="flex flex-col gap-4">
        <div className="text-on-surface font-mono font-bold text-xs">PRATYUSH</div>
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.05em] text-on-surface/30">
          © 2025 PRATYUSH — BUILT WITH SILENCE
        </p>
      </div>

      <div className="flex gap-8">
        <a
          href="#"
          className="font-mono text-[0.6875rem] uppercase tracking-[0.05em] text-on-surface/30 hover:text-on-surface transition-colors underline underline-offset-4 decoration-primary"
        >
          Email
        </a>
        <a
          href="#"
          className="font-mono text-[0.6875rem] uppercase tracking-[0.05em] text-on-surface/30 hover:text-on-surface transition-colors"
        >
          Archive
        </a>
        <a
          href="#"
          className="font-mono text-[0.6875rem] uppercase tracking-[0.05em] text-on-surface/30 hover:text-on-surface transition-colors"
        >
          Source
        </a>
      </div>
    </footer>
  );
}
