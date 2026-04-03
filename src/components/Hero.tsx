import { ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="min-h-[819px] flex flex-col justify-center mb-32 relative items-center">
      <div className="overflow-hidden mb-4 w-full flex justify-center">
        <h1 className="text-[clamp(3.5rem,10vw,6rem)] font-headline font-bold tracking-tighter leading-[0.9] text-on-surface text-center">
          PRATYUSH
        </h1>
      </div>

      <div className="flex items-center gap-4 mb-16 mx-auto">
        <span className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-primary">
          design · systems · craft
        </span>
      </div>

      <div className="mt-12 flex flex-col items-center animate-pulse-soft mx-auto">
        <span className="font-mono text-[0.6rem] tracking-[0.3em] uppercase opacity-30 mb-2">
          Scroll
        </span>
        <ChevronDown size={16} strokeWidth={1.5} className="text-primary" />
      </div>
    </section>
  );
}
