"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";

const ShaderGradientCanvas = dynamic(
  () => import("@shadergradient/react").then((m) => ({ default: m.ShaderGradientCanvas })),
  { ssr: false }
);

const ShaderGradient = dynamic(
  () => import("@shadergradient/react").then((m) => ({ default: m.ShaderGradient })),
  { ssr: false }
);

export default function ShaderBackground() {
  const prefersReducedRef = useRef(false);

  useEffect(() => {
    prefersReducedRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  return (
    <div className="fixed inset-0 -z-10" aria-hidden="true">
      <ShaderGradientCanvas
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <ShaderGradient
          control="props"
          type="waterPlane"
          animate="on"
          uTime={8}
          uSpeed={0.3}
          uStrength={1.5}
          uDensity={1.5}
          uFrequency={0}
          uAmplitude={0}
          positionX={0}
          positionY={0}
          positionZ={0}
          rotationX={50}
          rotationY={0}
          rotationZ={-60}
          color1="#606080"
          color2="#8d7dca"
          color3="#212121"
          brightness={1.8}
          lightType="3d"
          envPreset="city"
          cDistance={2.59}
          cPolarAngle={80}
          cAzimuthAngle={180}
          cameraZoom={9.1}
          grain="on"
        />
      </ShaderGradientCanvas>
    </div>
  );
}
