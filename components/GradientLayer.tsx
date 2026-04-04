'use client'

import { ShaderGradient, ShaderGradientCanvas } from '@shadergradient/react'

// Separate module required so next/dynamic can tree-shake this from the SSR bundle.
// ShaderGradientCanvas creates a WebGL context — must never run on the server.
export default function GradientLayer() {
  return (
    <ShaderGradientCanvas
      className="absolute inset-0"
      pixelDensity={1}
      fov={45}
      pointerEvents="none"
    >
      <ShaderGradient
        type="waterPlane"
        animate="on"
        uTime={8}
        uSpeed={0.3}
        uStrength={0.8}
        uDensity={1.5}
        uFrequency={0}
        uAmplitude={0}
        range="disabled"
        rangeStart={0}
        rangeEnd={40}
        positionX={0}
        positionY={0}
        positionZ={0}
        rotationX={50}
        rotationY={0}
        rotationZ={-60}
        color1="#606080"
        color2="#8d7dca"
        color3="#212121"
        reflection={0}
        wireframe={false}
        shader="defaults"
        lightType="3d"
        brightness={0.6}
        envPreset="city"
        grain="on"
        zoomOut={false}
        cAzimuthAngle={180}
        cPolarAngle={80}
        cDistance={2.59}
        cameraZoom={9.1}
      />
    </ShaderGradientCanvas>
  )
}
