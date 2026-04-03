# Gradient 
    <ShaderGradient
      animate="on"
      axesHelper="off"
      bgColor1="#000000"
      bgColor2="#000000"
      brightness={1.8}
      cAzimuthAngle={180}
      cDistance={2.59}
      cPolarAngle={80}
      cameraZoom={9.1}
      color1="#606080"
      color2="#8d7dca"
      color3="#212121"
      destination="onCanvas"
      embedMode="off"
      envPreset="city"
      format="gif"
      fov={45}
      frameRate={10}
      gizmoHelper="hide"
      grain="on"
      lightType="3d"
      pixelDensity={1}
      positionX={0}
      positionY={0}
      positionZ={0}
      range="disabled"
      rangeEnd={40}
      rangeStart={0}
      reflection={0}
      rotationX={50}
      rotationY={0}
      rotationZ={-60}
      shader="defaults"
      type="waterPlane"
      uAmplitude={0}
      uDensity={1.5}
      uFrequency={0}
      uSpeed={0.3}
      uStrength={1.5}
      uTime={8}
      wireframe={false}
      zoomOut={false}
    />

# Sparkles
`npx shadcn@latest add @aceternity/sparkles-demo`

# Text hover effect
`npx shadcn@latest add @aceternity/text-hover-effect-demo`

# Interactive Background
`npx shadcn@latest add @aceternity/background-ripple-effect-demo`

# Pointer Highlight
`npx shadcn@latest add @aceternity/pointer-highlight-demo`

# Resizable Navbar
`npx shadcn@latest add @aceternity/resizable-navbar-demo`

# 3D Marquee
`npx shadcn@latest add @aceternity/3d-marquee-demo`

# Flip Words
`npx shadcn@latest add @aceternity/flip-words-demo`

# Multi Step Loader
`npx shadcn@latest add @aceternity/multi-step-loader-demo`

# website loader
```html
<!-- From Uiverse.io by Nawsome --> 
<div aria-label="Orange and tan hamster running in a metal wheel" role="img" class="wheel-and-hamster">
	<div class="wheel"></div>
	<div class="hamster">
		<div class="hamster__body">
			<div class="hamster__head">
				<div class="hamster__ear"></div>
				<div class="hamster__eye"></div>
				<div class="hamster__nose"></div>
			</div>
			<div class="hamster__limb hamster__limb--fr"></div>
			<div class="hamster__limb hamster__limb--fl"></div>
			<div class="hamster__limb hamster__limb--br"></div>
			<div class="hamster__limb hamster__limb--bl"></div>
			<div class="hamster__tail"></div>
		</div>
	</div>
	<div class="spoke"></div>
</div>

```
```css
/* From Uiverse.io by Nawsome */ 
.wheel-and-hamster {
  --dur: 1s;
  position: relative;
  width: 12em;
  height: 12em;
  font-size: 14px;
}

.wheel,
.hamster,
.hamster div,
.spoke {
  position: absolute;
}

.wheel,
.spoke {
  border-radius: 50%;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.wheel {
  background: radial-gradient(100% 100% at center,hsla(0,0%,60%,0) 47.8%,hsl(0,0%,60%) 48%);
  z-index: 2;
}

.hamster {
  animation: hamster var(--dur) ease-in-out infinite;
  top: 50%;
  left: calc(50% - 3.5em);
  width: 7em;
  height: 3.75em;
  transform: rotate(4deg) translate(-0.8em,1.85em);
  transform-origin: 50% 0;
  z-index: 1;
}

.hamster__head {
  animation: hamsterHead var(--dur) ease-in-out infinite;
  background: hsl(30,90%,55%);
  border-radius: 70% 30% 0 100% / 40% 25% 25% 60%;
  box-shadow: 0 -0.25em 0 hsl(30,90%,80%) inset,
		0.75em -1.55em 0 hsl(30,90%,90%) inset;
  top: 0;
  left: -2em;
  width: 2.75em;
  height: 2.5em;
  transform-origin: 100% 50%;
}

.hamster__ear {
  animation: hamsterEar var(--dur) ease-in-out infinite;
  background: hsl(0,90%,85%);
  border-radius: 50%;
  box-shadow: -0.25em 0 hsl(30,90%,55%) inset;
  top: -0.25em;
  right: -0.25em;
  width: 0.75em;
  height: 0.75em;
  transform-origin: 50% 75%;
}

.hamster__eye {
  animation: hamsterEye var(--dur) linear infinite;
  background-color: hsl(0,0%,0%);
  border-radius: 50%;
  top: 0.375em;
  left: 1.25em;
  width: 0.5em;
  height: 0.5em;
}

.hamster__nose {
  background: hsl(0,90%,75%);
  border-radius: 35% 65% 85% 15% / 70% 50% 50% 30%;
  top: 0.75em;
  left: 0;
  width: 0.2em;
  height: 0.25em;
}

.hamster__body {
  animation: hamsterBody var(--dur) ease-in-out infinite;
  background: hsl(30,90%,90%);
  border-radius: 50% 30% 50% 30% / 15% 60% 40% 40%;
  box-shadow: 0.1em 0.75em 0 hsl(30,90%,55%) inset,
		0.15em -0.5em 0 hsl(30,90%,80%) inset;
  top: 0.25em;
  left: 2em;
  width: 4.5em;
  height: 3em;
  transform-origin: 17% 50%;
  transform-style: preserve-3d;
}

.hamster__limb--fr,
.hamster__limb--fl {
  clip-path: polygon(0 0,100% 0,70% 80%,60% 100%,0% 100%,40% 80%);
  top: 2em;
  left: 0.5em;
  width: 1em;
  height: 1.5em;
  transform-origin: 50% 0;
}

.hamster__limb--fr {
  animation: hamsterFRLimb var(--dur) linear infinite;
  background: linear-gradient(hsl(30,90%,80%) 80%,hsl(0,90%,75%) 80%);
  transform: rotate(15deg) translateZ(-1px);
}

.hamster__limb--fl {
  animation: hamsterFLLimb var(--dur) linear infinite;
  background: linear-gradient(hsl(30,90%,90%) 80%,hsl(0,90%,85%) 80%);
  transform: rotate(15deg);
}

.hamster__limb--br,
.hamster__limb--bl {
  border-radius: 0.75em 0.75em 0 0;
  clip-path: polygon(0 0,100% 0,100% 30%,70% 90%,70% 100%,30% 100%,40% 90%,0% 30%);
  top: 1em;
  left: 2.8em;
  width: 1.5em;
  height: 2.5em;
  transform-origin: 50% 30%;
}

.hamster__limb--br {
  animation: hamsterBRLimb var(--dur) linear infinite;
  background: linear-gradient(hsl(30,90%,80%) 90%,hsl(0,90%,75%) 90%);
  transform: rotate(-25deg) translateZ(-1px);
}

.hamster__limb--bl {
  animation: hamsterBLLimb var(--dur) linear infinite;
  background: linear-gradient(hsl(30,90%,90%) 90%,hsl(0,90%,85%) 90%);
  transform: rotate(-25deg);
}

.hamster__tail {
  animation: hamsterTail var(--dur) linear infinite;
  background: hsl(0,90%,85%);
  border-radius: 0.25em 50% 50% 0.25em;
  box-shadow: 0 -0.2em 0 hsl(0,90%,75%) inset;
  top: 1.5em;
  right: -0.5em;
  width: 1em;
  height: 0.5em;
  transform: rotate(30deg) translateZ(-1px);
  transform-origin: 0.25em 0.25em;
}

.spoke {
  animation: spoke var(--dur) linear infinite;
  background: radial-gradient(100% 100% at center,hsl(0,0%,60%) 4.8%,hsla(0,0%,60%,0) 5%),
		linear-gradient(hsla(0,0%,55%,0) 46.9%,hsl(0,0%,65%) 47% 52.9%,hsla(0,0%,65%,0) 53%) 50% 50% / 99% 99% no-repeat;
}

/* Animations */
@keyframes hamster {
  from, to {
    transform: rotate(4deg) translate(-0.8em,1.85em);
  }

  50% {
    transform: rotate(0) translate(-0.8em,1.85em);
  }
}

@keyframes hamsterHead {
  from, 25%, 50%, 75%, to {
    transform: rotate(0);
  }

  12.5%, 37.5%, 62.5%, 87.5% {
    transform: rotate(8deg);
  }
}

@keyframes hamsterEye {
  from, 90%, to {
    transform: scaleY(1);
  }

  95% {
    transform: scaleY(0);
  }
}

@keyframes hamsterEar {
  from, 25%, 50%, 75%, to {
    transform: rotate(0);
  }

  12.5%, 37.5%, 62.5%, 87.5% {
    transform: rotate(12deg);
  }
}

@keyframes hamsterBody {
  from, 25%, 50%, 75%, to {
    transform: rotate(0);
  }

  12.5%, 37.5%, 62.5%, 87.5% {
    transform: rotate(-2deg);
  }
}

@keyframes hamsterFRLimb {
  from, 25%, 50%, 75%, to {
    transform: rotate(50deg) translateZ(-1px);
  }

  12.5%, 37.5%, 62.5%, 87.5% {
    transform: rotate(-30deg) translateZ(-1px);
  }
}

@keyframes hamsterFLLimb {
  from, 25%, 50%, 75%, to {
    transform: rotate(-30deg);
  }

  12.5%, 37.5%, 62.5%, 87.5% {
    transform: rotate(50deg);
  }
}

@keyframes hamsterBRLimb {
  from, 25%, 50%, 75%, to {
    transform: rotate(-60deg) translateZ(-1px);
  }

  12.5%, 37.5%, 62.5%, 87.5% {
    transform: rotate(20deg) translateZ(-1px);
  }
}

@keyframes hamsterBLLimb {
  from, 25%, 50%, 75%, to {
    transform: rotate(20deg);
  }

  12.5%, 37.5%, 62.5%, 87.5% {
    transform: rotate(-60deg);
  }
}

@keyframes hamsterTail {
  from, 25%, 50%, 75%, to {
    transform: rotate(30deg) translateZ(-1px);
  }

  12.5%, 37.5%, 62.5%, 87.5% {
    transform: rotate(10deg) translateZ(-1px);
  }
}

@keyframes spoke {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(-1turn);
  }
}
```
# Text Highlighter
`npx shadcn@latest add @magicui/highlighter`

# Text Reveal
`npx shadcn@latest add @magicui/text-reveal`

# Project view
    import { ProjectShowcase } from "@/components/ui/project-showcase";
    
    export default function Home() {
      return (
        <main className="min-h-screen bg-background flex items-center justify-center w-full max-w-xl">
          <ProjectShowcase />
        </main>
      )
    }
    

    "use client"
    
    import type React from "react"
    
    import { useState, useRef, useEffect } from "react"
    import { ArrowUpRight } from "lucide-react"
    
    interface Project {
      title: string
      description: string
      year: string
      link: string
      image: string
    }
    
    const projects: Project[] = [
      {
        title: "Lumina",
        description: "AI-powered design system generator.",
        year: "2024",
        link: "#",
        image: "https://plus.unsplash.com/premium_photo-1723489242223-865b4a8cf7b8?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D$0",
      },
      {
        title: "Flux",
        description: "Real-time collaboration for creative teams.",
        year: "2024",
        link: "#",
        image: "https://images.unsplash.com/photo-1530435460869-d13625c69bbf?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D$0",
      },
      {
        title: "Prism",
        description: "Color palette extraction from any image.",
        year: "2023",
        link: "#",
        image: "https://i.pinimg.com/1200x/99/ca/5c/99ca5cf82cf12df8801f7b2bef38d325.jpg",
      },
      {
        title: "Vertex",
        description: "3D modeling toolkit for the web.",
        year: "2023",
        link: "#",
        image: "https://i.pinimg.com/736x/7c/15/39/7c1539cf7ff0207cb49ce0d338de1e5f.jpg",
      },
    ]
    
    export function ProjectShowcase() {
      const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
      const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
      const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 })
      const [isVisible, setIsVisible] = useState(false)
      const containerRef = useRef<HTMLDivElement>(null)
      const animationRef = useRef<number | null>(null)
    
      useEffect(() => {
        const lerp = (start: number, end: number, factor: number) => {
          return start + (end - start) * factor
        }
    
        const animate = () => {
          setSmoothPosition((prev) => ({
            x: lerp(prev.x, mousePosition.x, 0.15),
            y: lerp(prev.y, mousePosition.y, 0.15),
          }))
          animationRef.current = requestAnimationFrame(animate)
        }
    
        animationRef.current = requestAnimationFrame(animate)
    
        return () => {
          if (animationRef.current) {
            cancelAnimationFrame(animationRef.current)
          }
        }
      }, [mousePosition])
    
      const handleMouseMove = (e: React.MouseEvent) => {
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect()
          setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
          })
        }
      }
    
      const handleMouseEnter = (index: number) => {
        setHoveredIndex(index)
        setIsVisible(true)
      }
    
      const handleMouseLeave = () => {
        setHoveredIndex(null)
        setIsVisible(false)
      }
    
      return (
        <section ref={containerRef} onMouseMove={handleMouseMove} className="relative w-full max-w-2xl mx-auto px-6 py-16">
          <h2 className="text-muted-foreground text-sm font-medium tracking-wide uppercase mb-8">Selected Work</h2>
    
          <div
            className="pointer-events-none fixed z-50 overflow-hidden rounded-xl shadow-2xl"
            style={{
              left: containerRef.current?.getBoundingClientRect().left ?? 0,
              top: containerRef.current?.getBoundingClientRect().top ?? 0,
              transform: `translate3d(${smoothPosition.x + 20}px, ${smoothPosition.y - 100}px, 0)`,
              opacity: isVisible ? 1 : 0,
              scale: isVisible ? 1 : 0.8,
              transition: "opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), scale 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <div className="relative w-[280px] h-[180px] bg-secondary rounded-xl overflow-hidden">
              {projects.map((project, index) => (
                <img
                  key={project.title}
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out"
                  style={{
                    opacity: hoveredIndex === index ? 1 : 0,
                    scale: hoveredIndex === index ? 1 : 1.1,
                    filter: hoveredIndex === index ? "none" : "blur(10px)",
                  }}
                />
              ))}
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
            </div>
          </div>
    
          <div className="space-y-0">
            {projects.map((project, index) => (
              <a
                key={project.title}
                href={project.link}
                className="group block"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="relative py-5 border-t border-border transition-all duration-300 ease-out">
                  {/* Background highlight on hover */}
                  <div
                    className={`
                      absolute inset-0 -mx-4 px-4 bg-secondary/50 rounded-lg
                      transition-all duration-300 ease-out
                      ${hoveredIndex === index ? "opacity-100 scale-100" : "opacity-0 scale-95"}
                    `}
                  />
    
                  <div className="relative flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      {/* Title with animated underline */}
                      <div className="inline-flex items-center gap-2">
                        <h3 className="text-foreground font-medium text-lg tracking-tight">
                          <span className="relative">
                            {project.title}
                            {/* Animated underline */}
                            <span
                              className={`
                                absolute left-0 -bottom-0.5 h-px bg-foreground
                                transition-all duration-300 ease-out
                                ${hoveredIndex === index ? "w-full" : "w-0"}
                              `}
                            />
                          </span>
                        </h3>
    
                        {/* Arrow that slides in */}
                        <ArrowUpRight
                          className={`
                            w-4 h-4 text-muted-foreground
                            transition-all duration-300 ease-out
                            ${
                              hoveredIndex === index
                                ? "opacity-100 translate-x-0 translate-y-0"
                                : "opacity-0 -translate-x-2 translate-y-2"
                            }
                          `}
                        />
                      </div>
    
                      {/* Description with fade effect */}
                      <p
                        className={`
                          text-muted-foreground text-sm mt-1 leading-relaxed
                          transition-all duration-300 ease-out
                          ${hoveredIndex === index ? "text-foreground/70" : "text-muted-foreground"}
                        `}
                      >
                        {project.description}
                      </p>
                    </div>
    
                    {/* Year badge */}
                    <span
                      className={`
                        text-xs font-mono text-muted-foreground tabular-nums
                        transition-all duration-300 ease-out
                        ${hoveredIndex === index ? "text-foreground/60" : ""}
                      `}
                    >
                      {project.year}
                    </span>
                  </div>
                </div>
              </a>
            ))}
    
            {/* Bottom border for last item */}
            <div className="border-t border-border" />
          </div>
        </section>
      )
    }
    

# Text Scramble
`npx shadcn@latest add https://21st.dev/r/jatin-yadav05/text-scramble`
    import { TextScramble } from "@/components/ui/text-scramble";
    
    export default function Home() {
      return (
        <main className="min-h-screen flex flex-col items-center justify-center gap-20 bg-background px-6">
          <div className="text-center space-y-3">
            <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground font-mono">Hover to decode</p>
          </div>
    
          <div className="flex flex-col items-center gap-12">
            <TextScramble text="VIEW WORK" />
          </div>
    
          <p className="text-xs text-muted-foreground font-mono tracking-wide">[ kinetic typography ]</p>
        </main>
      )
    }
    

    "use client"
    
    import { useState, useCallback, useRef, useEffect } from "react"
    
    const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*"
    
    interface TextScrambleProps {
      text: string
      className?: string
    }
    
    export function TextScramble({ text, className = "" }: TextScrambleProps) {
      const [displayText, setDisplayText] = useState(text)
      const [isHovering, setIsHovering] = useState(false)
      const [isScrambling, setIsScrambling] = useState(false)
      const intervalRef = useRef<NodeJS.Timeout | null>(null)
      const frameRef = useRef(0)
    
      const scramble = useCallback(() => {
        setIsScrambling(true)
        frameRef.current = 0
        const duration = text.length * 3
    
        if (intervalRef.current) clearInterval(intervalRef.current)
    
        intervalRef.current = setInterval(() => {
          frameRef.current++
    
          const progress = frameRef.current / duration
          const revealedLength = Math.floor(progress * text.length)
    
          const newText = text
            .split("")
            .map((char, i) => {
              if (char === " ") return " "
              if (i < revealedLength) return text[i]
              return CHARS[Math.floor(Math.random() * CHARS.length)]
            })
            .join("")
    
          setDisplayText(newText)
    
          if (frameRef.current >= duration) {
            if (intervalRef.current) clearInterval(intervalRef.current)
            setDisplayText(text)
            setIsScrambling(false)
          }
        }, 30)
      }, [text])
    
      const handleMouseEnter = () => {
        setIsHovering(true)
        scramble()
      }
    
      const handleMouseLeave = () => {
        setIsHovering(false)
      }
    
      useEffect(() => {
        return () => {
          if (intervalRef.current) clearInterval(intervalRef.current)
        }
      }, [])
    
      return (
        <div
          className={`group relative inline-flex flex-col cursor-pointer select-none ${className}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <span className="relative font-mono text-lg tracking-widest uppercase">
            {displayText.split("").map((char, i) => (
              <span
                key={i}
                className={`inline-block transition-all duration-150 ${
                  isScrambling && char !== text[i] ? "text-primary scale-110" : "text-foreground"
                }`}
                style={{
                  transitionDelay: `${i * 10}ms`,
                }}
              >
                {char}
              </span>
            ))}
          </span>
    
          {/* Animated underline */}
          <span className="relative h-px w-full mt-2 overflow-hidden">
            <span
              className={`absolute inset-0 bg-foreground transition-transform duration-500 ease-out origin-left ${
                isHovering ? "scale-x-100" : "scale-x-0"
              }`}
            />
            <span className="absolute inset-0 bg-border" />
          </span>
    
          {/* Subtle glow on hover */}
          <span
            className={`absolute -inset-4 rounded-lg bg-primary/5 transition-opacity duration-300 -z-10 ${
              isHovering ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
      )
    }
    

# Playful Loader
    import { DotLoader } from "@/components/ui/dot-loader";
    
    const game = [
        [14, 7, 0, 8, 6, 13, 20],
        [14, 7, 13, 20, 16, 27, 21],
        [14, 20, 27, 21, 34, 24, 28],
        [27, 21, 34, 28, 41, 32, 35],
        [34, 28, 41, 35, 48, 40, 42],
        [34, 28, 41, 35, 48, 42, 46],
        [34, 28, 41, 35, 48, 42, 38],
        [34, 28, 41, 35, 48, 30, 21],
        [34, 28, 41, 48, 21, 22, 14],
        [34, 28, 41, 21, 14, 16, 27],
        [34, 28, 21, 14, 10, 20, 27],
        [28, 21, 14, 4, 13, 20, 27],
        [28, 21, 14, 12, 6, 13, 20],
        [28, 21, 14, 6, 13, 20, 11],
        [28, 21, 14, 6, 13, 20, 10],
        [14, 6, 13, 20, 9, 7, 21],
    ];
    
    export const Demo = () => {
        return (
            <div className="flex items-center gap-5 rounded bg-black px-4 py-3 text-white">
                <div className="">
                    <DotLoader
                        frames={game}
                        className="gap-0.5"
                        dotClassName="bg-white/15 [&.active]:bg-white size-1.5"></DotLoader>
                </div>
                <p className="font-medium">Playing</p>
            </div>
        );
    };
    
    export default Demo; 
    "use client";
    
    import { ComponentProps, useCallback, useEffect, useRef } from "react";
    
    import { cn } from "@/lib/utils";
    
    type DotLoaderProps = {
        frames: number[][];
        dotClassName?: string;
        isPlaying?: boolean;
        duration?: number;
        repeatCount?: number;
        onComplete?: () => void;
    } & ComponentProps<"div">;
    
    export const DotLoader = ({
        frames,
        isPlaying = true,
        duration = 100,
        dotClassName,
        className,
        repeatCount = -1,
        onComplete,
        ...props
    }: DotLoaderProps) => {
        const gridRef = useRef<HTMLDivElement>(null);
        const currentIndex = useRef(0);
        const repeats = useRef(0);
        const interval = useRef<NodeJS.Timeout>(null);
    
        const applyFrameToDots = useCallback(
            (dots: HTMLDivElement[], frameIndex: number) => {
                const frame = frames[frameIndex];
                if (!frame) return;
    
                dots.forEach((dot, index) => {
                    dot.classList.toggle("active", frame.includes(index));
                });
            },
            [frames],
        );
    
        useEffect(() => {
            currentIndex.current = 0;
            repeats.current = 0;
        }, [frames]);
    
        useEffect(() => {
            if (isPlaying) {
                if (currentIndex.current >= frames.length) {
                    currentIndex.current = 0;
                }
                const dotElements = gridRef.current?.children;
                if (!dotElements) return;
                const dots = Array.from(dotElements) as HTMLDivElement[];
                interval.current = setInterval(() => {
                    applyFrameToDots(dots, currentIndex.current);
                    if (currentIndex.current + 1 >= frames.length) {
                        if (repeatCount != -1 && repeats.current + 1 >= repeatCount) {
                            clearInterval(interval.current!);
                            onComplete?.();
                        }
                        repeats.current++;
                    }
                    currentIndex.current = (currentIndex.current + 1) % frames.length;
                }, duration);
            } else {
                if (interval.current) clearInterval(interval.current);
            }
    
            return () => {
                if (interval.current) clearInterval(interval.current);
            };
        }, [frames, isPlaying, applyFrameToDots, duration, repeatCount, onComplete]);
    
        return (
            <div {...props} ref={gridRef} className={cn("grid w-fit grid-cols-7 gap-0.5", className)}>
                {Array.from({ length: 49 }).map((_, i) => (
                    <div key={i} className={cn("h-1.5 w-1.5 rounded-sm", dotClassName)} />
                ))}
            </div>
        );
    };
    

# shader animation

    import { ShaderAnimation } from "@/components/ui/shader-animation";
    
    export default function DemoOne() {
      return (
        <div className="relative flex h-[650px] w-full flex-col items-center justify-center overflow-hidden rounded-xl border bg-blue-700">
          <ShaderAnimation/>
          <span className="absolute pointer-events-none z-10 text-center text-7xl leading-none font-semibold tracking-tighter whitespace-pre-wrap text-white">
            Shader Animation
          </span>
        </div>
      )
    }

    "use client"
    
    import { useEffect, useRef } from "react"
    import * as THREE from "three"
    
    export function ShaderAnimation() {
      const containerRef = useRef<HTMLDivElement>(null)
      const sceneRef = useRef<{
        camera: THREE.Camera
        scene: THREE.Scene
        renderer: THREE.WebGLRenderer
        uniforms: any
        animationId: number
      } | null>(null)
    
      useEffect(() => {
        if (!containerRef.current) return
    
        const container = containerRef.current
    
        // Vertex shader
        const vertexShader = `
          void main() {
            gl_Position = vec4( position, 1.0 );
          }
        `
    
        // Fragment shader
        const fragmentShader = `
          #define TWO_PI 6.2831853072
          #define PI 3.14159265359
    
          precision highp float;
          uniform vec2 resolution;
          uniform float time;
    
          void main(void) {
            vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
            float t = time*0.05;
            float lineWidth = 0.002;
    
            vec3 color = vec3(0.0);
            for(int j = 0; j < 3; j++){
              for(int i=0; i < 5; i++){
                color[j] += lineWidth*float(i*i) / abs(fract(t - 0.01*float(j)+float(i)*0.01)*5.0 - length(uv) + mod(uv.x+uv.y, 0.2));
              }
            }
            
            gl_FragColor = vec4(color[0],color[1],color[2],1.0);
          }
        `
    
        // Initialize Three.js scene
        const camera = new THREE.Camera()
        camera.position.z = 1
    
        const scene = new THREE.Scene()
        const geometry = new THREE.PlaneGeometry(2, 2)
    
        const uniforms = {
          time: { type: "f", value: 1.0 },
          resolution: { type: "v2", value: new THREE.Vector2() },
        }
    
        const material = new THREE.ShaderMaterial({
          uniforms: uniforms,
          vertexShader: vertexShader,
          fragmentShader: fragmentShader,
        })
    
        const mesh = new THREE.Mesh(geometry, material)
        scene.add(mesh)
    
        const renderer = new THREE.WebGLRenderer({ antialias: true })
        renderer.setPixelRatio(window.devicePixelRatio)
    
        container.appendChild(renderer.domElement)
    
        // Handle window resize
        const onWindowResize = () => {
          const width = container.clientWidth
          const height = container.clientHeight
          renderer.setSize(width, height)
          uniforms.resolution.value.x = renderer.domElement.width
          uniforms.resolution.value.y = renderer.domElement.height
        }
    
        // Initial resize
        onWindowResize()
        window.addEventListener("resize", onWindowResize, false)
    
        // Animation loop
        const animate = () => {
          const animationId = requestAnimationFrame(animate)
          uniforms.time.value += 0.05
          renderer.render(scene, camera)
    
          if (sceneRef.current) {
            sceneRef.current.animationId = animationId
          }
        }
    
        // Store scene references for cleanup
        sceneRef.current = {
          camera,
          scene,
          renderer,
          uniforms,
          animationId: 0,
        }
    
        // Start animation
        animate()
    
        // Cleanup function
        return () => {
          window.removeEventListener("resize", onWindowResize)
    
          if (sceneRef.current) {
            cancelAnimationFrame(sceneRef.current.animationId)
    
            if (container && sceneRef.current.renderer.domElement) {
              container.removeChild(sceneRef.current.renderer.domElement)
            }
    
            sceneRef.current.renderer.dispose()
            geometry.dispose()
            material.dispose()
          }
        }
      }, [])
    
      return (
        <div
          ref={containerRef}
          className="w-full h-screen"
          style={{
            background: "#000",
            overflow: "hidden",
          }}
        />
      )
    }
    

Reference website 1 `https://jakubjakubik.com/`
Reference website 2 `https://alexezhov.com/?ref=minimal.gallery`
Reference website 3 `https://adero.netlify.app/?ref=minimal.gallery`
Reference website 4 `https://godly.website/website/bryn-taylor-159`
Reference website 5 `https://godly.website/website/fanfanfan-243`
Reference website 6 `https://godly.website/website/jantana-hennard-661`
Reference website 7 `https://godly.website/website/elva-design-group-856`
Reference website 8 `https://godly.website/website/roasted-1018`
Reference website 9 `https://godly.website/website/build-in-amsterdam-873`
Reference website 10 `https://www.heyvalentin.club/`
Reference website 11 `https://shawnlukas.com/`