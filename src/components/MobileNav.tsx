import { Home, User, Mail } from "lucide-react";

export default function MobileNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-background/90 backdrop-blur-xl z-[100] border-t border-outline-variant/10">
      <div className="flex justify-around items-center h-full max-w-[720px] mx-auto">
        <a href="#" className="flex flex-col items-center gap-1 text-primary">
          <Home size={20} strokeWidth={1.5} fill="currentColor" />
          <span className="font-mono text-[8px] uppercase tracking-tighter">Work</span>
        </a>
        <a href="#" className="flex flex-col items-center gap-1 text-on-surface/40">
          <User size={20} strokeWidth={1.5} />
          <span className="font-mono text-[8px] uppercase tracking-tighter">About</span>
        </a>
        <a href="#" className="flex flex-col items-center gap-1 text-on-surface/40">
          <Mail size={20} strokeWidth={1.5} />
          <span className="font-mono text-[8px] uppercase tracking-tighter">Contact</span>
        </a>
      </div>
    </nav>
  );
}
