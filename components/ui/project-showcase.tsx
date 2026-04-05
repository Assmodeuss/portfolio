"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "Lumina",
    category: "Visual Identity",
    href: "#",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDVePecnO3O9jPqSN5Ln_aLCMYMCdU0lyoyn8r9nNKpA014_RKIo-6rUmUim9QDKO5KQdlA2gX1PcwkrC9bXANN32st9ANn1mlloXq6THPtkXt0djbLbUzYZsVg3TqwjFXp2W3KhY396fb1DomZHMCvNxs1x8TlW-tpNJCbCYUHCJwlohv6BR5PJ6xkcv3T5bDWtEMohsAipC15fcTNdIBVLLNGXZeDSa3sAhmYTbn7fWnQizP0xO_zAfp82GhleBQGHe7c2IQqF-E",
    alt: "Abstract minimal 3D composition with soft violet lighting and geometric glass shapes on a dark background",
  },
  {
    title: "Flux",
    category: "Motion System",
    href: "#",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCH0wM6voJO04SX6D5JMXLChYRDcY6us-jsigVx1bOCv617s3kG2egcZrEHZJxy-qjCjYWo9fUT7CO25135yx6GxtLeMVP_WFnewoTY1HUyrugj4qx8CmTdhFDBgpENVCRIFZMW7EyVg1-4LoDIGh7dVDofoP6NvCRNXYpyAclZnxJGryXIngyDqZz-VUkhy1wMDegzbqW69SLQg4DrBfJEDK4AgKnp3hYvg0zmdm76LbW4FBiHRVxVs6CcNIXh_Nv7zd7xjLDffaw",
    alt: "Liquid metal flowing in dark space with iridescent reflections and high contrast lighting",
  },
  {
    title: "Prism",
    category: "Editorial Tool",
    href: "#",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDOs2wVxBZ_MueS6FOwOQiQAoav21zJrRPP4PVfrGnWk1XXKdWrJMEGiMUX6JPLrxf4N4LFhja99RmmnzxcLTiCMLGUTcOCqoHIKRG5N7yYpBMUWSQz4AA3fSpqQS86F9vCT_laely1S_CcaTJ3_CbY2TQnIRL40UgTpEm_YL_LunmTlvCdrvmyd6sfIF4uNCD9zHe3qYP38O2dIpWL5LhKbjOeobx-zJ3nt1DBPbwklG_pHEOM2s9zgG0dfINGlrRw2JLFSlW7PmU",
    alt: "Minimalist typography on glass surface with sharp shadows and subtle refraction effects",
  },
  {
    title: "Vertex",
    category: "Data Visualization",
    href: "#",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCtC6bhEGZ6u-TszGrhZkAmq7MW2Y_SiIXvSD4IWQ8-OYdXL05rpEPx-1soU_w4B_ToCPPZ3U66fLn8-sdFc1g8UaF0W4o6OZKeQcIFqC-STOhI8zs_14BWUzf9OCmD1PdD8-uBrmuQY1ySsKh7TnYk17AG4hiycz8LHf3wQK3Ik9-uSGm9mnoUaktuEw4Bpge6yiqFH1oJ1Uf3zrnS65ZwnOeoRZQaIG9BRupYokrYZl-AeSgLIIPqxMu3OmbB_RqYTb-bz_iu80M",
    alt: "Complex network of glowing lines and particles in deep space with soft cinematic lighting",
  },
];

export function ProjectShowcase() {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const curX = useRef(0);
  const curY = useRef(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
    };

    const loop = () => {
      curX.current += (mouseX.current - curX.current) * 0.1;
      curY.current += (mouseY.current - curY.current) * 0.1;
      if (previewRef.current) {
        previewRef.current.style.transform = `translate(${curX.current}px, ${curY.current}px) translate(-50%, -50%)`;
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="w-full">
      {/* Floating preview — fixed, lerp-smoothed cursor follower */}
      <div
        ref={previewRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-40 w-[280px] h-[180px] border border-[#262626] overflow-hidden shadow-2xl"
        style={{
          opacity: hoverIndex !== null ? 1 : 0,
          transition: "opacity 0.5s ease-out",
        }}
      >
        {projects.map((project, i) => (
          <img
            key={project.title}
            src={project.image}
            alt={project.alt}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              opacity: hoverIndex === i ? 1 : 0,
              transition: "opacity 0.5s ease-out",
            }}
          />
        ))}
      </div>

      {/* Project list */}
      <div className="flex flex-col gap-0">
        {projects.map((project, i) => (
          <div
            key={project.title}
            className="group relative"
            onMouseEnter={() => setHoverIndex(i)}
            onMouseLeave={() => setHoverIndex(null)}
          >
            <a
              data-cursor="active"
              href={project.href}
              className={`flex items-center justify-between py-10 transition-colors${
                i < projects.length - 1
                  ? " border-b border-[#262626] group-hover:border-[#8d7dca]/40"
                  : ""
              }`}
            >
              <h3 className="text-[clamp(2rem,6vw,3.5rem)] font-headline font-light tracking-tighter text-foreground group-hover:pl-4 transition-all duration-500">
                {project.title}
              </h3>
              <div className="flex items-center gap-6">
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {project.category}
                </span>
                <ArrowUpRight
                  size={16}
                  className="text-[#8d7dca] translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
                />
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
