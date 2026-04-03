# RULES

You are building a personal design portfolio for Pratyush, a design student. This file defines how you write code, make decisions, and behave across this entire project. Follow every rule. No exceptions.

---

## IDENTITY

This is not a generic portfolio. It is a dark, atmospheric, typographically-led portfolio where the site itself is a design artifact. Every line of code you write contributes to or detracts from that identity. Act accordingly.

The design philosophy: **signal emerging from noise.** Minimal structure, living atmosphere, typography as the primary visual medium, interactions that reward curiosity.

---

## TECH STACK (LOCKED)

```
Framework:    Next.js 14+ (App Router, TypeScript, RSC where possible)
Styling:      Tailwind CSS v4 + CSS custom properties
Animations:   CSS transitions/keyframes (PRIMARY), GSAP ScrollTrigger (orchestration only), WAAPI (FLIP transitions)
3D/Shader:    @shadergradient/react OR Three.js — hero section only, lazy loaded
Icons:        lucide-react (16px, 1.5px stroke, never filled)
Fonts:        next/font, self-hosted (PP Neue Montreal or Satoshi, Switzer, JetBrains Mono)
Deployment:   Vercel
```

### BANNED — do NOT use, import, install, or suggest these:

- `framer-motion` or `motion` — use CSS transitions and WAAPI instead
- `react-spring` — same reason
- `animate.css` — write keyframes manually
- `Barba.js` or any page transition library
- `styled-components`, `@emotion`, or any CSS-in-JS
- Any UI component library (no shadcn/ui components, no Radix primitives, no headless UI — build components from scratch)
- Google Fonts CDN — fonts are self-hosted via next/font
- `axios` — use native fetch
- `lodash` — write utility functions manually or use native JS
- `moment` or `dayjs` — use Intl.DateTimeFormat if needed

If you believe a dependency is necessary, **stop and ask** before installing. Justify the KB cost.

---

## DESIGN TOKENS

Use these values. Do not invent colors, fonts, sizes, or easings. If a value isn't here, ask.

```css
/* COLORS (dark mode — only mode) */
--background: #0a0a0a;
--foreground: #fafafa;
--secondary: #262626;
--muted-foreground: #a1a1a1;
--border: #262626;
--input: #262626;
--ring: #525252;
--primary: #fafafa;
--primary-foreground: #0a0a0a;
--accent-violet: #8d7dca;
--accent-violet-glow: rgba(141, 125, 202, 0.15);
--accent-violet-subtle: rgba(141, 125, 202, 0.08);
--destructive: #e7000b;
--radius: 0.625rem;
--grain-opacity: 0.04;

/* TYPOGRAPHY */
--font-display: 'PP Neue Montreal', 'Satoshi', sans-serif;    /* headings, hero */
--font-body: 'Switzer', 'Outfit', sans-serif;                  /* paragraphs */
--font-mono: 'JetBrains Mono', 'IBM Plex Mono', monospace;    /* metadata, nav, dates */

/* TYPE SCALE — use exactly these values */
Hero:        clamp(3rem, 8vw, 7rem)   | weight 500 | tracking -0.03em | line-height 0.95
H1:          clamp(2rem, 4vw, 3.5rem) | weight 500 | tracking -0.025em | line-height 1.05
H2:          clamp(1.5rem, 3vw, 2.5rem) | weight 500 | tracking -0.02em | line-height 1.1
H3:          1.25rem                    | weight 500 | tracking -0.01em | line-height 1.3
Body:        1rem (16px)               | weight 400 | tracking 0 | line-height 1.6
Body small:  0.875rem                  | weight 400 | tracking 0 | line-height 1.5
Mono label:  0.75rem                   | weight 400 | tracking 0.08em | uppercase | line-height 1.4
Mono nav:    0.8125rem                 | weight 400 | tracking 0.06em | line-height 1

/* EASING CURVES — use these, never bare ease/ease-in/ease-out */
--ease-out: cubic-bezier(0.23, 1, 0.32, 1);          /* entering elements */
--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);      /* on-screen morphs, clip-path */
--ease-in: cubic-bezier(0.55, 0.055, 0.675, 0.19);   /* exiting elements ONLY */
--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);       /* drawer/panel slide */

/* LAYOUT */
Content max-width: 720px
Content alignment: margin-left: 6vw (NOT centered)
Content wide (images): 960px, centered
Section gaps: clamp(4rem, 8vw, 7.5rem)
Page margins: 6vw desktop, 5vw mobile
```

---

## CODE RULES

### General

- TypeScript strict mode. No `any` types. Define interfaces for all data structures.
- Max 3 levels of DOM nesting per component. If you're writing `div > div > div > div`, flatten it.
- Use semantic HTML: `<section>`, `<article>`, `<nav>`, `<header>`, `<footer>`, `<main>`. Not everything is a `<div>`.
- One `<h1>` per page. Heading hierarchy must be sequential (h1 → h2 → h3, never skip).
- All images use `next/image` with explicit `width`, `height`, and `alt` text.
- No inline styles (`style={{ }}`). Use Tailwind utilities or CSS custom properties.
- No `console.log` in committed code. Use it for debugging, remove before completion.
- File names: PascalCase for components (`TextScramble.tsx`), camelCase for utilities (`useLerpValue.ts`).

### CSS & Tailwind

- **Never use `transition: all`.** Always specify exact properties: `transition: transform 300ms var(--ease-out), opacity 300ms var(--ease-out)`.
- **Never use bare CSS easings** (`ease`, `ease-in`, `ease-out`, `ease-in-out`, `linear`). Always use the custom easing variables defined above.
- Colors always reference tokens: `bg-background`, `text-foreground`, `border-border`. Never hardcode hex values in Tailwind classes.
- Body copy max-width: `max-w-[65ch]`. Never let paragraphs stretch wider.
- The content column is left-aligned (`ml-[6vw]`), never centered (`mx-auto`), except for `content-wide` elements (case study images).
- Use `clamp()` for responsive type and spacing. No media query font-size overrides.

### Animations

- **CSS transitions and keyframes are the default.** Use them for all hover states, scroll reveals, and element enters/exits. They run off the main thread.
- **GSAP ScrollTrigger is for orchestration only.** It toggles classes or triggers callbacks. The actual animation is still CSS. Never use gsap.to() or gsap.from() for visual animation.
- **WAAPI (element.animate()) is for FLIP transitions only.** Dynamic start/end values that CSS can't express.
- **requestAnimationFrame + lerp is for cursor tracking only.** Smooth interpolation of mouse-following elements.
- **Never animate with JavaScript what CSS can handle.** If it's a hover state, a scroll-triggered reveal, or an enter/exit — CSS does it.
- Exit animations are always faster than enter animations. Enter: 300–600ms. Exit: 150–250ms.
- All animations must be wrapped in a `prefers-reduced-motion` check. Under reduced motion: no transforms, no clip-path changes. Simple opacity fades at 200ms only.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 200ms !important;
  }
}
```

- Never animate on keyboard-triggered actions. Navigation via keyboard, form submissions, any `keydown` handler — zero transition.
- Scroll reveals fire **once per session** only. Use IntersectionObserver with a `once: true` pattern. Never re-trigger on scroll back.
- Never hijack scroll. No scroll-snap sections, no scrolljacking, no smooth-scroll behavior override.
- Stagger delays: 50ms between children, max 5 children staggered (children beyond 5 all share the 5th delay). Keep total stagger under 300ms.

### React

- Prefer Server Components. Only use `'use client'` when the component needs interactivity (event handlers, hooks, browser APIs).
- Never use `useEffect` for derived state. If a value can be computed from props/state during render, compute it during render.
- Custom hooks for any reusable logic: `useInView`, `useLerpValue`, `useMousePosition`.
- No React context for simple state. Use module-level stores (jotai atom or simple ref callbacks) for global state like "contact drawer open."
- Event listeners added in `useEffect` must be cleaned up in the return function. Always.
- `useEffect` dependency arrays must be exhaustive. No eslint-disable for exhaustive-deps.

### Performance

- Lazy load the shader hero: `next/dynamic` with `ssr: false`.
- All images: WebP format, correctly sized (not scaling down oversized images client-side).
- Font loading: only weights 400 and 500. Subset to Latin. Use `display: 'swap'`.
- No layout shift: reserve explicit dimensions for all images and dynamic elements.
- Target: Lighthouse 95+ on all metrics, FCP < 1.2s, LCP < 2.5s, bundle < 150KB gzipped (excluding lazy-loaded shader).

---

## DESIGN RULES

### Layout

- The content column is **720px max-width, left-aligned** with `margin-left: 6vw`. It is never centered.
- Full-bleed is reserved for exactly 3 things: hero shader, case study hero images, and the footer gradient. Nothing else.
- On wide screens (>1440px), content stays left-aligned. The right side is negative space. Do not stretch content to fill.
- Mobile (< 640px): same left-alignment with `margin-left: 5vw`. No hamburger menus.

### Typography

- Headings use `--font-display` with negative tracking. Always.
- Body text uses `--font-body`. Always.
- Metadata (dates, categories, labels, nav links) uses `--font-mono`, uppercase, wide tracking (0.08em). Always.
- `--font-display` is never used below 20px (1.25rem). Below that, switch to `--font-body`.
- Serif font (`Newsreader` or similar) appears only in case study pull quotes. Nowhere else.

### Color

- No pure black (`#000000`) or pure white (`#ffffff`) anywhere. Use `--background` (#0a0a0a) and `--foreground` (#fafafa).
- The accent violet (`--accent-violet`) appears in exactly 5 places: shader hero gradient, project row hover glow, active nav indicator, loader active dots, and link hover underlines. If you're adding it somewhere else, stop and ask.
- Borders are subtle: `--border` (#262626) on `--background` (#0a0a0a) is a 10% luminance difference. This is intentional. Never increase border contrast.
- The chart color scale (blue range) is reserved for data visualization inside case studies. Never use for decorative purposes.

### Interaction

- Hover reveals imagery. The default state is typographic. Images are earned through interaction, not given.
- Cursor tracking uses lerp smoothing. Factor 0.15 for fast-follow (project hover image), factor 0.05 for slow-follow (shader uniform). Never use direct mouse position without lerp.
- Text scramble uses character set: `ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*`. Not random Unicode. It should feel like decryption.
- The nav compresses from full-width (64px tall) to a centered blurred pill (48px tall, max-width 480px) when scroll position exceeds 100px.
- Contact is a bottom-sheet drawer, not a page. Triggered from nav link. Opens with `--ease-drawer`, closes with `--ease-in`.

---

## WHAT NOT TO BUILD

If you find yourself building any of these, stop immediately:

- Parallax scrolling
- Custom cursor replacement (the large circle cursor trend)
- Dark/light mode toggle — this project is dark mode only
- Hamburger menu
- Blog section
- 3D card tilt effects on project items
- Chatbot or AI assistant widget
- Scroll hijacking or scroll-snap sections
- Page transition animations beyond the FLIP project entry
- Loading skeletons (use the dot loader for initial load, nothing for route changes)
- Toast notifications
- Cookie banners (use privacy-first analytics that don't require consent)
- Carousel or slider for project images
- Tabs or accordions on the homepage

---

## RESPONSE FORMAT

When I ask you to build something:

1. **Read the relevant section of the PRD first** if I reference it. Don't assume — check.
2. **State your approach in 2-3 sentences** before writing code. What component, what pattern, what are the tricky parts.
3. **Write the full component** — not snippets, not pseudocode. Complete, working, production-ready TypeScript.
4. **Include the reduced-motion fallback** in every component that animates.
5. **Include mobile behavior** if it differs from desktop.
6. **Do not explain the code line by line** unless I ask. I can read code. Just write it and note anything non-obvious.

When I ask you to fix something:

1. Show the exact change — before and after.
2. Do not refactor unrelated code in the same response.
3. Do not add features I didn't ask for.

When I ask for your opinion:

1. Be decisive. Pick one option and defend it.
2. If the question is about visual design or brand identity — defer to me. Your job is execution, mine is direction.
3. If the question is about code architecture, performance, or accessibility — give your strong recommendation.

---

## PROJECT CONTEXT

```
Designer:     Pratyush, 3rd year design student, Shiv Nadar University
Competing:    Against NID, Srishti students — the portfolio must be technically and visually exceptional
Stack skills: UX, visual design, typography (including Devanagari), branding, spatial/VR, speculative design
Audience:     Recruiters (15-60 second scan), design leads (deep case study reads), potential freelance clients
Goal:         The site itself is a portfolio piece — the craft of the interactions demonstrates skill

Current projects for case studies:
  - Nestlé Rebrand (brand identity, visual system)
  - The Maze That Listens (VR horror game, Unity, spatial design)
  - Union Budget Dataviz (editorial data visualization, D3.js)
  - Devanagari typeface project
  - Erudio edtech UX (55-screen MVP)
  - Budget tracker app (Vite, Vercel)
```

---

*These rules are non-negotiable. If a rule conflicts with what you'd normally do, the rule wins. If you're unsure whether something is allowed, ask before building.*
