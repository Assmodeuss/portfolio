"use client";

import { useEffect, useRef, useState } from "react";

interface MagneticTextProps {
  text: string;
  hoverText?: string;
  className?: string;
}

export function MagneticText({ text, hoverText = text, className = "" }: MagneticTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const rafRef = useRef<number>(0);
  const targetX = useRef(0);
  const targetY = useRef(0);
  const curX = useRef(0);
  const curY = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    const circle = circleRef.current;
    if (!container || !circle) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetX.current = e.clientX - rect.left;
      targetY.current = e.clientY - rect.top;
    };

    const loop = () => {
      curX.current += (targetX.current - curX.current) * 0.12;
      curY.current += (targetY.current - curY.current) * 0.12;
      circle.style.transform = `translate(${curX.current}px, ${curY.current}px) translate(-50%, -50%)`;
      rafRef.current = requestAnimationFrame(loop);
    };

    const onEnter = () => setIsHovered(true);
    const onLeave = () => setIsHovered(false);

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseenter", onEnter);
    container.addEventListener("mouseleave", onLeave);
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseenter", onEnter);
      container.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      {/* Magnetic circle: z-[10] — above text, below nav z-[100] and global cursor z-[999] */}
      <div
        ref={circleRef}
        aria-hidden="true"
        className="absolute top-0 left-0 pointer-events-none z-[10] w-32 h-32 rounded-full border border-[#8d7dca]/50 bg-[#8d7dca]/[0.04]"
        style={{ opacity: isHovered ? 1 : 0, transition: "opacity 0.25s ease" }}
      />
      <span style={{ transition: "opacity 0.2s ease", opacity: isHovered && hoverText !== text ? 0.9 : 1 }}>
        {isHovered && hoverText !== text ? hoverText : text}
      </span>
    </div>
  );
}
