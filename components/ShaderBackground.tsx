'use client'

import Script from 'next/script'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'shader-gradient': { [key: string]: unknown }
    }
  }
}

export default function ShaderBackground() {
  return (
    <>
      <Script
        src="https://unpkg.com/@shadergradient/react@1.1.2/dist/index.js"
        strategy="afterInteractive"
      />
      <div className="fixed inset-0 -z-10">
        <shader-gradient
          animate="on"
          axeshelper="off"
          bgcolor1="#000000"
          bgcolor2="#000000"
          brightness="1.8"
          camerazoom="9.1"
          cazimuthangle="180"
          cdistance="2.59"
          color1="#606080"
          color2="#8d7dca"
          color3="#212121"
          cpolarangle="80"
          destination="onCanvas"
          embedmode="off"
          envpreset="city"
          format="gif"
          fov="45"
          framerate="10"
          gizmohelper="hide"
          grain="on"
          lighttype="3d"
          pixeldensity="1"
          positionx="0"
          positiony="0"
          positionz="0"
          range="disabled"
          rangeend="40"
          rangestart="0"
          reflection="0"
          rotationx="50"
          rotationy="0"
          rotationz="-60"
          shader="defaults"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          type="waterPlane"
          uamplitude="0"
          udensity="1.5"
          ufrequency="0"
          uspeed="0.3"
          ustrength="1.5"
          utime="8"
          wireframe="false"
          zoomout="false"
        />
      </div>
    </>
  )
}
