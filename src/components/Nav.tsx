export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 transition-all duration-500 ease-in-out bg-background/80 backdrop-blur-xl z-[100]">
      <div className="flex justify-between items-center max-w-[720px] mx-auto px-6 w-full h-full">
        <div className="font-mono font-bold text-on-surface tracking-widest text-sm">
          PRATYUSH
        </div>

        <div className="flex gap-6 items-center">
          <div className="hidden md:flex gap-8">
            <a
              href="#"
              className="text-primary font-bold font-label tracking-tighter uppercase text-xs"
            >
              Work
            </a>
            <a
              href="#"
              className="text-on-surface/60 hover:text-primary transition-colors duration-300 font-label tracking-tighter uppercase text-xs"
            >
              About
            </a>
            <a
              href="#"
              className="text-on-surface/60 hover:text-primary transition-colors duration-300 font-label tracking-tighter uppercase text-xs"
            >
              Studio
            </a>
            <a
              href="#"
              className="text-on-surface/60 hover:text-primary transition-colors duration-300 font-label tracking-tighter uppercase text-xs"
            >
              Lab
            </a>
          </div>
          <button className="text-primary font-label tracking-tighter uppercase text-xs scale-95 transition-transform duration-200">
            Contact
          </button>
        </div>
      </div>
    </nav>
  );
}
