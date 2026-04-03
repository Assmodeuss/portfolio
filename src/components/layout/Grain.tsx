/**
 * Grain overlay — static SVG turbulence noise composited over all content.
 * Fixed position, pointer-events none, z-index 9999.
 * Zero performance cost: no animation, no canvas, no PNG.
 */
export function Grain() {
  return (
    <div
      aria-hidden="true"
      className="grain-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        opacity: 'var(--grain-opacity)',
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        backgroundSize: '256px 256px',
        mixBlendMode: 'overlay',
      }}
    />
  )
}
