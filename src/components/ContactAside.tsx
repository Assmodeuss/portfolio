import { ArrowUpRight, FileText, Terminal } from "lucide-react";

const LINKS = [
  { label: "Instagram", icon: ArrowUpRight },
  { label: "LinkedIn", icon: ArrowUpRight },
  { label: "Read.cv", icon: FileText },
  { label: "Twitter", icon: Terminal },
];

export default function ContactAside() {
  return (
    <aside className="fixed right-0 top-0 h-full z-[200] flex flex-col p-8 bg-surface-container-lowest w-[320px] shadow-[0_20px_40px_rgba(0,0,0,0.4)] translate-x-full lg:translate-x-0 hidden">
      <div className="mb-12">
        <h3 className="font-mono text-[10px] tracking-widest uppercase text-primary mb-2">
          GET IN TOUCH
        </h3>
        <p className="font-mono text-[10px] tracking-widest uppercase text-on-surface/40 leading-relaxed">
          Currently available for editorial projects.
        </p>
      </div>

      <div className="flex flex-col gap-1 flex-grow">
        {LINKS.map(({ label, icon: Icon }) => (
          <a
            key={label}
            href="#"
            className="flex justify-between items-center py-3 px-2 text-on-surface/40 hover:bg-surface-container-high hover:text-primary transition-colors font-mono text-[10px] tracking-widest uppercase group"
          >
            <span>{label}</span>
            <Icon size={14} strokeWidth={1.5} />
          </a>
        ))}
      </div>

      <button className="mt-auto py-4 border border-outline-variant text-primary font-mono text-[10px] tracking-widest uppercase hover:bg-surface-container-high transition-colors">
        Copy Email
      </button>
    </aside>
  );
}
