"use client";

import { useEffect, useRef, useState } from "react";

export function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    // Only show on non-touch / pointer-fine devices
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;
    setVisible(true);

    let raf: number;
    let mouseX = 0;
    let mouseY = 0;
    let curX = 0;
    let curY = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const loop = () => {
      curX += (mouseX - curX) * 0.18;
      curY += (mouseY - curY) * 0.18;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${curX}px, ${curY}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };

    const onEnter = () => setHovered(true);
    const onLeave = () => setHovered(false);

    const bindTargets = () => {
      document
        .querySelectorAll<HTMLElement>('[data-cursor="active"]')
        .forEach((el) => {
          el.addEventListener("mouseenter", onEnter);
          el.addEventListener("mouseleave", onLeave);
        });
    };

    // Bind immediately and re-bind whenever the DOM changes
    bindTargets();
    const observer = new MutationObserver(bindTargets);
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      observer.disconnect();
      document
        .querySelectorAll<HTMLElement>('[data-cursor="active"]')
        .forEach((el) => {
          el.removeEventListener("mouseenter", onEnter);
          el.removeEventListener("mouseleave", onLeave);
        });
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      style={{
        width: 20,
        height: 20,
        border: hovered ? "2px solid white" : "2px solid transparent",
        transition: "border-color 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
      className="fixed top-0 left-0 pointer-events-none z-[999] rounded-full mix-blend-difference bg-white"
    />
  );
}
