"use client";

import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface Project {
  title: string;
  category: string;
  href: string;
  image: string;
  alt: string;
}

const PROJECTS: Project[] = [
  {
    title: "Lumina",
    category: "Visual Identity",
    href: "#",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDVePecnO3O9jPqSN5Ln_aLCMYMCdU0lyoyn8r9nNKpA014_RKIo-6rUmUim9QDKO5KQdlA2gX1PcwkrC9bXANN32st9ANn1mlloXq6THPtkXt0djbLbUzYZsVg3TqwjFXp2W3KhY396fb1DomZHMCvNxs1x8TlW-tpNJCbCYUHCJwlohv6BR5PJ6xkcv3T5bDWtEMohsAipC15fcTNdIBVLLNGXZeDSa3sAhmYTbn7fWnQizP0xO_zAfp82GhleBQGHe7c2IQqF-E",
    alt: "Abstract minimal 3D composition with soft violet lighting and geometric glass shapes on a dark background",
  },
  {
    title: "Flux",
    category: "Motion System",
    href: "#",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCH0wM6voJO04SX6D5JMXLChYRDcY6us-jsigVx1bOCv617s3kG2egcZrEHZJxy-qjCjYWo9fUT7CO25135yx6GxtLeMVP_WFnewoTY1HUyrugj4qx8CmTdhFDBgpENVCRIFZMW7EyVg1-4LoDIGh7dVDofoP6NvCRNXYpyAclZnxJGryXIngyDqZz-VUkhy1wMDegzbqW69SLQg4DrBfJEDK4AgKnp3hYvg0zmdm76LbW4FBiHRVxVs6CcNIXh_Nv7zd7xjLDffaw",
    alt: "Liquid metal flowing in dark space with iridescent reflections and high contrast lighting",
  },
  {
    title: "Prism",
    category: "Editorial Tool",
    href: "#",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDOs2wVxBZ_MueS6FOwOQiQAoav21zJrRPP4PVfrGnWk1XXKdWrJMEGiMUX6JPLrxf4N4LFhja99RmmnzxcLTiCMLGUTcOCqoHIKRG5N7yYpBMUWSQz4AA3fSpqQS86F9vCT_laely1S_CcaTJ3_CbY2TQnIRL40UgTpEm_YL_LunmTlvCdrvmyd6sfIF4uNCD9zHe3qYP38O2dIpWL5LhKbjOeobx-zJ3nt1DBPbwklG_pHEOM2s9zgG0dfINGlrRw2JLFSlW7PmU",
    alt: "Minimalist typography on glass surface with sharp shadows and subtle refraction effects",
  },
  {
    title: "Vertex",
    category: "Data Visualization",
    href: "#",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCtC6bhEGZ6u-TszGrhZkAmq7MW2Y_SiIXvSD4IWQ8-OYdXL05rpEPx-1soU_w4B_ToCPPZ3U66fLn8-sdFc1g8UaF0W4o6OZKeQcIFqC-STOhI8zs_14BWUzf9OCmD1PdD8-uBrmuQY1ySsKh7TnYk17AG4hiycz8LHf3wQK3Ik9-uSGm9mnoUaktuEw4Bpge6yiqFH1oJ1Uf3zrnS65ZwnOeoRZQaIG9BRupYokrYZl-AeSgLIIPqxMu3OmbB_RqYTb-bz_iu80M",
    alt: "Complex network of glowing lines and particles in deep space with soft cinematic lighting",
  },
];

export default function ProjectList() {
  const imageRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const posRef = useRef({ x: 0, y: 0 });
  const activeRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const animate = useCallback(() => {
    posRef.current.x = lerp(posRef.current.x, mouseRef.current.x, 0.15);
    posRef.current.y = lerp(posRef.current.y, mouseRef.current.y, 0.15);

    if (imageRef.current) {
      imageRef.current.style.left = `${posRef.current.x}px`;
      imageRef.current.style.top = `${posRef.current.y}px`;
    }

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [animate]);

  const showImage = (src: string) => {
    if (!imageRef.current) return;
    const img = imageRef.current.querySelector("img") as HTMLImageElement | null;
    if (img) img.src = src;
    imageRef.current.classList.add("visible");
    activeRef.current = true;
  };

  const hideImage = () => {
    if (!imageRef.current) return;
    imageRef.current.classList.remove("visible");
    activeRef.current = false;
  };

  return (
    <>
      {/* Cursor-following image — rAF lerp */}
      <div ref={imageRef} className="project-image" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src=""
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <ul className="flex flex-col" role="list">
        {PROJECTS.map((project, i) => (
          <li
            key={project.title}
            className="group relative"
            onMouseEnter={() => showImage(project.image)}
            onMouseLeave={hideImage}
          >
            <a
              href={project.href}
              className={[
                "flex items-center justify-between py-10",
                "border-t border-border",
                i === PROJECTS.length - 1 ? "border-b" : "",
              ].join(" ")}
            >
              <h3
                className="text-[clamp(2rem,6vw,3.5rem)] font-display font-light tracking-tighter text-foreground"
                style={{
                  fontFamily: "var(--font-display)",
                  transition: "padding-left 500ms var(--ease-out)",
                }}
              >
                <span className="group-hover:pl-4 block transition-[padding-left] duration-500"
                  style={{ transitionTimingFunction: "var(--ease-out)" }}>
                  {project.title}
                </span>
              </h3>

              <div className="flex items-center gap-6">
                <span className="font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground">
                  {project.category}
                </span>
                <ArrowUpRight
                  size={16}
                  strokeWidth={1.5}
                  className="text-accent-violet translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
                  style={{
                    transition:
                      "transform 300ms var(--ease-out), opacity 300ms var(--ease-out)",
                  }}
                />
              </div>
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
