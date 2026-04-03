# PRD: Pratyush Design Portfolio
### Full Vision — v1.0

---

## 0. How to Use This Document

This PRD is structured for AI-assisted development. Each section is self-contained — you can paste any section directly into Claude Code or Cursor as a build prompt. The sections are ordered by build sequence (what to build first → last).

**Convention:** Sections marked with `[PROMPT-READY]` can be pasted directly into a coding AI. Sections marked with `[CONTEXT]` are background information the AI needs but doesn't act on alone.

**Companion documents:**
- `portfolio-vibe-system.md` — strategic design decisions, interaction concepts, kill list
- `visual-system-guide.md` — exact token values, component specs, accessibility
- `ai-prompting-dos-donts.md` — how to work with AI during this build

---

## 1. Product Overview

`[CONTEXT]`

### What

A personal design portfolio website for Pratyush, a third-year design student at Shiv Nadar University. The site showcases UX, visual design, branding, spatial design, and speculative/conceptual design work.

### Why

Pratyush competes for internships and projects against students from dedicated design institutions (NID, Srishti). The portfolio must demonstrate both design craft and technical capability at a level that makes institutional background irrelevant. The site itself IS a portfolio piece — the interactions, the visual system, and the technical execution all demonstrate skill.

### Who Visits

1. **Recruiters / hiring managers** — scanning 30+ portfolios in a sitting. They spend 15–60 seconds before deciding to go deeper. The hero and project list must hook them instantly.
2. **Design leads / creative directors** — evaluating craft, process, and thinking depth. They'll read case studies. The experience must feel designed, not templated.
3. **Potential clients** — evaluating whether to hire Pratyush for freelance design/dev work. They need to see range and professionalism.
4. **Peers / design community** — the portfolio should be good enough to get featured on Godly, Awwwards, or Minimal Gallery.

### Success Metrics

- Lighthouse score: 95+ on all four metrics (Performance, Accessibility, Best Practices, SEO)
- First Contentful Paint: < 1.2s
- Largest Contentful Paint: < 2.5s
- Total bundle size (excluding lazy-loaded shader): < 150KB gzipped
- Case study completion rate: track via simple analytics (scroll depth)
- Contact form / email link clicks: track as conversion

---

## 2. Tech Stack

`[CONTEXT]` — paste this at the top of every coding conversation as context.

```
TECH STACK:
- Framework: Next.js 14+ (App Router, TypeScript, RSC where possible)
- Styling: Tailwind CSS v4 + CSS custom properties
- Animations: CSS transitions/keyframes (primary), GSAP ScrollTrigger (orchestration), WAAPI (FLIP)
- 3D/Shader: @shadergradient/react OR Three.js (hero section only, lazy loaded)
- Icons: lucide-react
- Fonts: next/font, self-hosted (PP Neue Montreal or Satoshi, Switzer, JetBrains Mono)
- Deployment: Vercel
- Analytics: Vercel Analytics or Plausible (privacy-first)
- Forms: Vercel Edge Functions or Resend API

DO NOT USE:
- framer-motion (use CSS + WAAPI instead)
- react-spring
- Barba.js or any page transition library
- animate.css
- Any UI component library (no shadcn components — custom only)
- styled-components / emotion
- Google Fonts CDN

CONSTRAINTS:
- No parallax scrolling
- No scroll hijacking
- No custom cursor replacement
- No dark/light mode toggle (dark mode only, system preference as silent fallback)
- No hamburger menu
- No blog section
- Max 3 levels of DOM nesting per component
- All animations must respect prefers-reduced-motion
```

---

## 3. Design Tokens

`[CONTEXT]` — paste this into any conversation where the AI generates visual code.

```css
/* === COLOR TOKENS (Dark Mode — Default) === */
--background: #0a0a0a;
--foreground: #fafafa;
--card: #0a0a0a;
--secondary: #262626;
--muted: #262626;
--muted-foreground: #a1a1a1;
--border: #262626;
--input: #262626;
--ring: #525252;
--primary: #fafafa;
--primary-foreground: #0a0a0a;
--accent: #262626;
--accent-foreground: #fafafa;
--destructive: #e7000b;
--radius: 0.625rem;

/* Extended tokens */
--accent-violet: #8d7dca;
--accent-violet-glow: rgba(141, 125, 202, 0.15);
--accent-violet-subtle: rgba(141, 125, 202, 0.08);
--grain-opacity: 0.04;
--shader-color-1: #606080;
--shader-color-2: #8d7dca;
--shader-color-3: #212121;

/* === TYPOGRAPHY === */
--font-display: 'PP Neue Montreal', 'Satoshi', sans-serif;
--font-body: 'Switzer', 'Outfit', sans-serif;
--font-mono: 'JetBrains Mono', 'IBM Plex Mono', monospace;

/* Type scale:
   Hero:      clamp(3rem, 8vw, 7rem)  | 500 | -0.03em | line-height: 0.95
   H1:        clamp(2rem, 4vw, 3.5rem) | 500 | -0.025em | 1.05
   H2:        clamp(1.5rem, 3vw, 2.5rem) | 500 | -0.02em | 1.1
   H3:        1.25rem                   | 500 | -0.01em | 1.3
   Body:      1rem (16px)              | 400 | 0 | 1.6
   Body sm:   0.875rem                 | 400 | 0 | 1.5
   Mono label: 0.75rem                 | 400 | 0.08em | uppercase | 1.4
   Mono nav:  0.8125rem                | 400 | 0.06em | 1
*/

/* === SPACING === */
--spacing: 0.25rem;  /* 4px base unit */
/* Section gaps: clamp(4rem, 8vw, 7.5rem) */
/* Content max-width: 720px, left-aligned with margin-left: 6vw */
/* Content wide: 960px, centered */

/* === EASING === */
--ease-out: cubic-bezier(0.23, 1, 0.32, 1);
--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
--ease-in: cubic-bezier(0.55, 0.055, 0.675, 0.19);
--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);
```

---

## 4. Information Architecture

`[CONTEXT]`

### Sitemap

```
/                       → Home (hero + selected work + about teaser)
/work/[slug]            → Case study page (per project)
/about                  → Full about page
```

Contact is a drawer overlay (not a page). It triggers from the nav on any route.

### Home Page Sections (scroll order)

```
1. HERO              — Full viewport. Shader gradient + decoded name + subtitle
2. SELECTED WORK     — Project list (typographic rows with hover image)
3. ABOUT TEASER      — 2-3 sentences + link to /about
4. FOOTER            — Email, social links, copyright. Mono typography.
```

### Case Study Page Structure

```
1. HERO IMAGE        — Full-bleed, 16:9, arrives via FLIP from project list
2. PROJECT META      — Title (H1), year, categories, client (if applicable)
3. OVERVIEW          — 2-3 paragraph project summary
4. BODY              — Free-form content: images, text, pull quotes, embeds
5. OUTCOME           — Results, learnings, metrics
6. NEXT PROJECT      — Link to next case study (loops)
7. FOOTER            — Same global footer
```

### Content Model

```typescript
interface Project {
  slug: string;                    // URL path segment
  title: string;                   // Display name
  description: string;             // One-liner (shown in project list)
  year: number;                    // 4-digit year
  categories: string[];            // e.g. ["Brand Identity", "Visual System"]
  thumbnail: string;               // Path to 280x180 WebP (hover image)
  heroImage: string;               // Path to full-bleed hero WebP
  client?: string;                 // Optional client name
  featured: boolean;               // Show on homepage
  order: number;                   // Sort order in list
  content: MDXContent;             // Case study body (MDX)
}

interface SiteConfig {
  name: string;                    // "Pratyush"
  title: string;                   // "Pratyush — Design Portfolio"
  description: string;             // Meta description
  url: string;                     // Canonical URL
  email: string;                   // Contact email
  social: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    dribbble?: string;
  };
  subtitle: string;                // "design · systems · craft"
}
```

---

## 5. File Structure

`[PROMPT-READY]` — Use this as the scaffold prompt for project initialization.

```
Create a Next.js 14 App Router project with TypeScript and Tailwind CSS v4.
Use the following file structure exactly:

src/
├── app/
│   ├── layout.tsx                 # Root layout: fonts, metadata, Nav, Grain, analytics
│   ├── page.tsx                   # Home: Hero + ProjectList + AboutTeaser + Footer
│   ├── about/
│   │   └── page.tsx               # Full about page
│   └── work/
│       └── [slug]/
│           └── page.tsx           # Case study template
│
├── components/
│   ├── layout/
│   │   ├── Nav.tsx                # Resizable nav (wide → compact pill on scroll)
│   │   ├── Footer.tsx             # Global footer
│   │   ├── Grain.tsx              # SVG noise overlay (fixed, pointer-events: none)
│   │   └── SectionReveal.tsx      # IntersectionObserver wrapper (clip-path reveal)
│   │
│   ├── hero/
│   │   ├── ShaderHero.tsx         # Lazy-loaded shader gradient background
│   │   ├── HeroContent.tsx        # Name decode + subtitle fade-up
│   │   └── ScrollIndicator.tsx    # Pulsing down arrow
│   │
│   ├── work/
│   │   ├── ProjectList.tsx        # Typographic project rows
│   │   ├── ProjectRow.tsx         # Individual row with hover behavior
│   │   ├── ProjectHoverImage.tsx  # Cursor-following thumbnail
│   │   └── CaseStudyLayout.tsx    # Shared case study page structure
│   │
│   ├── contact/
│   │   └── ContactDrawer.tsx      # Bottom sheet with email + form
│   │
│   └── shared/
│       ├── TextScramble.tsx       # Reusable decode animation
│       └── AnimatedUnderline.tsx  # Hover underline (left→right reveal)
│
├── lib/
│   ├── lerp.ts                    # export function lerp(start, end, factor)
│   ├── flip.ts                    # FLIP animation utility
│   ├── useInView.ts              # IntersectionObserver hook (once: true)
│   ├── useMousePosition.ts       # Throttled mouse position with lerp
│   ├── useLerpValue.ts           # Generic animated value with rAF lerp
│   └── projects.ts               # Project data + getter functions
│
├── content/
│   └── projects/                  # MDX files for case studies
│       ├── nestle-rebrand.mdx
│       ├── maze-that-listens.mdx
│       ├── union-budget-dataviz.mdx
│       └── ...
│
└── styles/
    ├── tokens.css                 # All CSS custom properties
    ├── globals.css                # Reset, base styles, grain, utilities
    └── animations.css             # @keyframes definitions

public/
├── images/
│   ├── thumbnails/                # 280x180 WebP hover images
│   └── projects/                  # Case study images (various sizes)
├── fonts/                         # Self-hosted font files
└── og-image.png                   # Open Graph fallback
```

Initialize with:
- next/font configured for PP Neue Montreal (or Satoshi), Switzer, JetBrains Mono
- Tailwind v4 with the CSS tokens from the design system
- TypeScript strict mode
- The Project type interface defined in lib/projects.ts
- Empty component files with correct exports (fill later)
```

---

## 6. Build Phases

`[CONTEXT]` — Follow this order. Each phase is a complete, testable milestone.

### Phase 1: Foundation
**Goal:** Project scaffold, tokens, layout shell, grain overlay, nav (static).

| Task | File(s) | Acceptance |
|---|---|---|
| Initialize Next.js + Tailwind + TS | project root | `npm run dev` works |
| Set up font loading | `layout.tsx` | Three fonts load with `display: swap` |
| Create `tokens.css` with all custom properties | `styles/tokens.css` | All variables resolve in browser devtools |
| Create `globals.css` with reset + base styles | `styles/globals.css` | Body has correct bg, text color, font |
| Build `Grain.tsx` overlay | `components/layout/Grain.tsx` | Subtle noise visible over dark background |
| Build static `Nav.tsx` (no scroll behavior yet) | `components/layout/Nav.tsx` | Name left, links right, correct typography |
| Build `Footer.tsx` | `components/layout/Footer.tsx` | Email, social links, copyright, mono type |
| Assemble `layout.tsx` | `app/layout.tsx` | Full page renders with nav, grain, dark bg |

### Phase 2: Hero — "The Decode" + "The Presence"
**Goal:** Full hero section with shader background, name scramble, cursor reactivity.

| Task | File(s) | Acceptance |
|---|---|---|
| Build `TextScramble.tsx` component | `components/shared/TextScramble.tsx` | Takes `text` prop, decodes on trigger, 30ms interval |
| Build `ShaderHero.tsx` (lazy loaded) | `components/hero/ShaderHero.tsx` | Shader gradient renders, responds to mousemove |
| Build `HeroContent.tsx` | `components/hero/HeroContent.tsx` | Name decodes after 500ms delay, subtitle fades up after |
| Build `ScrollIndicator.tsx` | `components/hero/ScrollIndicator.tsx` | Pulsing arrow, disappears on scroll |
| Create `useLerpValue.ts` hook | `lib/useLerpValue.ts` | Smoothly interpolates value with rAF |
| Create `useMousePosition.ts` hook | `lib/useMousePosition.ts` | Returns smoothed mouse coords |
| Assemble hero on home page | `app/page.tsx` | Full hero: shader + decode + cursor reactivity |
| Mobile fallback: gyroscope or static | `ShaderHero.tsx` | Graceful fallback on touch devices |
| Reduced motion: skip scramble, static shader | all hero files | Respects `prefers-reduced-motion` |

### Phase 3: Project List — "The Reveal"
**Goal:** Typographic project list with hover image, scramble title, full interaction.

| Task | File(s) | Acceptance |
|---|---|---|
| Define project data (minimum 4 projects) | `lib/projects.ts` | Typed array of Project objects |
| Build `ProjectRow.tsx` | `components/work/ProjectRow.tsx` | Renders title, description, year, categories |
| Build `ProjectHoverImage.tsx` | `components/work/ProjectHoverImage.tsx` | Cursor-following image, lerp 0.15, fade in 300ms |
| Integrate TextScramble into ProjectRow hover | `ProjectRow.tsx` | Title scrambles on mouseenter, resolves |
| Build hover background glow | `ProjectRow.tsx` | `accent-violet-subtle` bg on hover |
| Build `AnimatedUnderline.tsx` | `components/shared/AnimatedUnderline.tsx` | Left→right reveal on hover |
| Build `ArrowUpRight` slide-in | `ProjectRow.tsx` | Icon slides in from lower-left on hover |
| Assemble `ProjectList.tsx` | `components/work/ProjectList.tsx` | Full list with all hover states working |
| Add to home page with SectionReveal | `app/page.tsx` | List appears below hero with scroll reveal |
| Mobile: no hover image, tap to navigate | all work files | Touch-friendly, no hover dependency |

### Phase 4: Section Reveals — "The Unfurl"
**Goal:** Scroll-triggered clip-path reveals on all sections, staggered children.

| Task | File(s) | Acceptance |
|---|---|---|
| Build `useInView.ts` hook | `lib/useInView.ts` | IntersectionObserver with `once: true`, threshold 0.15 |
| Build `SectionReveal.tsx` wrapper | `components/layout/SectionReveal.tsx` | Clip-path inset animation, child stagger |
| Wrap Work section in SectionReveal | `app/page.tsx` | Section unfurls on first scroll into view |
| Wrap About teaser in SectionReveal | `app/page.tsx` | Same behavior |
| Wrap Footer in SectionReveal | `app/page.tsx` | Same behavior |
| Verify one-shot behavior | all | Scrolling up and back down does NOT re-trigger |
| Reduced motion fallback | `SectionReveal.tsx` | Simple opacity fade, no clip-path |

### Phase 5: Nav Scroll Behavior
**Goal:** Nav compresses from full-width to centered blurred pill on scroll.

| Task | File(s) | Acceptance |
|---|---|---|
| Add scroll listener to Nav | `components/layout/Nav.tsx` | Detects scroll position > 100px |
| Implement width compression | `Nav.tsx` | Transitions from full-width to max-width 480px centered |
| Add backdrop blur + bg | `Nav.tsx` | `backdrop-filter: blur(12px)`, `--secondary` @ 80% opacity |
| Add border + radius | `Nav.tsx` | 1px `--border`, `--radius` corners |
| Reduce height 64px → 48px | `Nav.tsx` | Smooth height transition |
| Compress layout (name · links) | `Nav.tsx` | Links join name with middot separator |
| Mobile: always compact | `Nav.tsx` | Mobile starts in compact state |
| Active link indicator | `Nav.tsx` | Current route link uses `--foreground` color |

### Phase 6: Case Study Pages
**Goal:** Full case study template with MDX rendering, hero image, project meta, next project link.

| Task | File(s) | Acceptance |
|---|---|---|
| Set up MDX processing | `next.config.ts`, dependencies | MDX files in `/content/projects/` render as pages |
| Build `CaseStudyLayout.tsx` | `components/work/CaseStudyLayout.tsx` | Hero image + meta + body + outcome + next project |
| Build case study hero image section | `CaseStudyLayout.tsx` | Full-bleed, 16:9, priority loading |
| Build project meta section | `CaseStudyLayout.tsx` | Title H1, year, categories, client — all typed correctly |
| Style MDX body content | `globals.css` or MDX components | Paragraphs, images, headings, pull quotes styled |
| Build "Next Project" component | `CaseStudyLayout.tsx` | Links to next project in order (loops to first) |
| Build `[slug]/page.tsx` | `app/work/[slug]/page.tsx` | Loads correct project data + MDX |
| Generate static params | `[slug]/page.tsx` | All project slugs pre-rendered at build time |
| Write 2-3 case studies in MDX | `content/projects/*.mdx` | Real content for Nestlé rebrand, Maze VR, Budget dataviz |

### Phase 7: FLIP Transitions — "The Portal"
**Goal:** Clicking a project row morphs the hover thumbnail into the case study hero.

| Task | File(s) | Acceptance |
|---|---|---|
| Build `flip.ts` utility | `lib/flip.ts` | FLIP helper: records rect, computes delta, animates with WAAPI |
| Store thumbnail rect on click | `ProjectRow.tsx` | Saves bounding rect to shared state before navigation |
| Receive rect on case study mount | `CaseStudyLayout.tsx` | Reads stored rect, applies inverse transform to hero |
| Animate hero from thumbnail → full | `CaseStudyLayout.tsx` | 500ms, `--ease-out`, hero morphs into place |
| Fade out project list during transition | `ProjectList.tsx` | 200ms opacity fade, `--ease-in` |
| Reverse FLIP on back navigation | `CaseStudyLayout.tsx` + `ProjectList.tsx` | Hero shrinks back, list fades in |
| Fallback: no FLIP if no stored rect | `CaseStudyLayout.tsx` | Standard fade-in if navigated directly to URL |
| View Transitions API integration (if supported) | `flip.ts` | Use native `document.startViewTransition()` where available |

### Phase 8: Contact Drawer
**Goal:** Bottom sheet contact panel with email, social links, optional form.

| Task | File(s) | Acceptance |
|---|---|---|
| Build `ContactDrawer.tsx` | `components/contact/ContactDrawer.tsx` | Slides up from bottom, blurred bg, overlay |
| Wire "Contact" nav link to open drawer | `Nav.tsx` | Click opens drawer, doesn't navigate |
| Implement open animation | `ContactDrawer.tsx` | translateY(100%) → 0, 400ms, `--ease-drawer` |
| Implement close (click overlay, X, or Escape) | `ContactDrawer.tsx` | translateY(0) → 100%, 250ms, `--ease-in` |
| Email link with mono styling | `ContactDrawer.tsx` | Clickable `mailto:` link |
| Social links row | `ContactDrawer.tsx` | LinkedIn, GitHub, etc. with middot separators |
| Optional: simple contact form | `ContactDrawer.tsx` | Name + message + send. Wired to Resend or edge function. |
| Trap focus inside drawer when open | `ContactDrawer.tsx` | Accessible focus management |
| Prevent body scroll when open | `ContactDrawer.tsx` | `overflow: hidden` on body |

### Phase 9: About Page
**Goal:** Full about page with personal narrative, skills, experience.

| Task | File(s) | Acceptance |
|---|---|---|
| Build `/about/page.tsx` | `app/about/page.tsx` | Renders about content with correct layout |
| Content: background, design philosophy, skills | `page.tsx` | Written by Pratyush (not AI-generated copy) |
| Typography: display headings, body paragraphs | `page.tsx` | Follows type scale precisely |
| Section reveals on scroll | `page.tsx` | Each content block unfurls |
| Resume/CV download link (optional) | `page.tsx` | PDF download if desired |
| Photo (optional) | `page.tsx` | If included: small, not hero-sized. Rounded, B&W. |

### Phase 10: Polish & Performance
**Goal:** Hit all performance targets, add SEO, test everything.

| Task | File(s) | Acceptance |
|---|---|---|
| Lighthouse audit all pages | — | 95+ on all metrics |
| SEO: metadata, OG image, sitemap | `layout.tsx`, `next-sitemap` | Correct meta on every page |
| Test reduced motion on all interactions | all | Every animation has fallback |
| Test keyboard navigation end-to-end | all | Tab order logical, focus visible, drawer trappable |
| Test mobile (real device) | all | Touch targets 44px+, no hover dependencies, readable type |
| Test Safari, Firefox, Chrome | all | No browser-specific breaks |
| Image optimization audit | all | All images WebP, correctly sized, lazy where appropriate |
| Bundle analysis | `next build` output | No unexpected large chunks |
| Error states: 404 page, broken images | `app/not-found.tsx` | Custom 404 with nav and styling |
| Analytics setup | `layout.tsx` | Vercel Analytics or Plausible script |

---

## 7. Component Specifications

`[PROMPT-READY]` — Each subsection below can be pasted as a standalone build prompt. Prepend with Sections 2 (tech stack) and 3 (design tokens) for full context.

---

### 7.1 TextScramble

```
BUILD: TextScramble component

File: src/components/shared/TextScramble.tsx

Props:
  text: string           — the final resolved text
  trigger: boolean       — when true, start scramble. when false, display final text
  speed?: number         — ms per frame (default: 30)
  className?: string     — passthrough

Behavior:
1. When trigger flips from false→true, scramble begins
2. Each frame (every `speed` ms):
   - Characters not yet resolved show random char from: ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*
   - Characters resolve left-to-right progressively
   - Total frames = text.length × 3
   - At frame N, characters at index < Math.floor((N / totalFrames) * text.length) are resolved
3. When complete, display final text and call onComplete callback if provided
4. Spaces always render as spaces (never scrambled)
5. Each character wraps in a <span> for individual styling

Output: renders a <span> containing character <span>s
  - Scrambling characters get class "scrambling" (for optional styling)
  - Resolved characters get class "resolved"

NO external dependencies. Vanilla React with useCallback, useRef, useEffect.
Do NOT use framer-motion.

Reduced motion: if prefers-reduced-motion, skip scramble entirely — render final text with a simple 200ms opacity fade.
```

---

### 7.2 ShaderHero

```
BUILD: ShaderHero component (lazy loaded)

File: src/components/hero/ShaderHero.tsx

This component renders a full-viewport animated shader gradient background.

Option A (preferred — simpler):
Use @shadergradient/react with these exact config values:
  animate="on"
  brightness={1.8}
  cAzimuthAngle={180}    ← this value is driven by mouse X position
  cDistance={2.59}
  cPolarAngle={80}       ← this value is driven by mouse Y position
  cameraZoom={9.1}
  color1="#606080"
  color2="#8d7dca"
  color3="#212121"
  grain="on"
  lightType="3d"
  type="waterPlane"
  uDensity={1.5}
  uSpeed={0.3}
  uStrength={1.5}

Option B (if Option A has bundle size issues):
Custom Three.js fragment shader (see reference_list.md shader animation section).
Renders concentric ring pattern. Uniform `time` increments at 0.05/frame.
Resolution uniform updates on resize.

Cursor reactivity:
- On mousemove, compute normalized X and Y (-1 to 1 range)
- Map to cAzimuthAngle: 180 ± 30° (X axis)
- Map to cPolarAngle: 80 ± 15° (Y axis)
- Smooth with lerp factor 0.05 (very slow, dreamlike)
- Use requestAnimationFrame loop for smooth updates

Mobile:
- Try DeviceOrientationEvent for gyroscope input
- If not available: static gradient, no cursor reactivity
- Reduce uSpeed to 0.15 for performance

Container:
- Position: absolute, inset: 0 (fills parent)
- z-index: 0
- Parent is h-screen relative container

This component MUST be lazy loaded:
  const ShaderHero = dynamic(() => import('./ShaderHero'), {
    ssr: false,
    loading: () => <div className="h-screen bg-background" />
  });

Performance: if Three.js, dispose renderer/geometry/material on unmount.
Reduced motion: freeze animation (uSpeed: 0), no cursor reactivity.
```

---

### 7.3 ProjectRow + ProjectHoverImage

```
BUILD: ProjectRow and ProjectHoverImage components

Files:
  src/components/work/ProjectRow.tsx
  src/components/work/ProjectHoverImage.tsx

=== ProjectRow ===

Props:
  project: Project       — typed project object
  index: number          — position in list
  onHover: (index: number | null, mousePos: {x, y}) => void

Renders:
  <a> wrapping the entire row (links to /work/[slug])
  
  Layout (flexbox, justify-between, items-start):
    Left side:
      - Title: font-display, 18px (1.125rem), weight 500, tracking -0.01em
        - Wraps in AnimatedUnderline component
        - Also wraps in TextScramble (trigger on hover)
      - ArrowUpRight icon: 16px, muted-foreground
        - Hidden by default (opacity 0, translate -8px X, +8px Y)
        - On hover: opacity 1, translate 0,0 — 300ms ease-out
      - Description: font-body, 14px, muted-foreground
        - On hover: color transitions to foreground/70
    
    Right side:
      - Year: font-mono, 12px, uppercase, tracking 0.08em, muted-foreground
        - On hover: transitions to foreground/60

  Row styling:
    - padding: 20px 0
    - border-top: 1px solid var(--border)
    - Last row gets border-bottom too
    - Relative positioned (for bg highlight)

  Hover background:
    - Absolute positioned div, inset 0, -mx-4 px-4
    - Background: var(--accent-violet-subtle)
    - border-radius: var(--radius)
    - Opacity 0 → 1 on hover, scale 0.95 → 1 on hover
    - Transition: 300ms ease-out

  Events:
    - onMouseEnter: call onHover(index, mousePosition)
    - onMouseMove: update mouse position for parent
    - onMouseLeave: call onHover(null)

=== ProjectHoverImage ===

Props:
  projects: Project[]
  hoveredIndex: number | null
  mousePosition: {x: number, y: number}
  containerRef: RefObject<HTMLDivElement>

Renders:
  A fixed-position div (pointer-events: none, z-index: 50)
  
  Contains one <img> per project (all pre-rendered, toggled by opacity)
  
  Position:
    - Uses smoothed mouse position (lerp factor 0.15 via useLerpValue)
    - Offset: +20px X, -100px Y from cursor
    - transform: translate3d(smoothX + 20, smoothY - 100, 0)
  
  Visibility:
    - Opacity: 0 when hoveredIndex is null, 1 when set
    - Scale: 0.8 when hidden, 1 when visible
    - Transition: opacity 300ms ease-out, scale 300ms ease-out
  
  Image container:
    - 280px × 180px
    - border-radius: var(--radius)
    - overflow: hidden
    - box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5)
  
  Each image:
    - Absolute, inset 0, object-cover
    - Opacity based on hoveredIndex match
    - Active image: opacity 1, scale 1, filter none
    - Inactive: opacity 0, scale 1.1, filter blur(10px)
    - Transition: 500ms ease-out on all

  Gradient overlay:
    - Absolute div, inset 0
    - background: linear-gradient to top, background/20 → transparent

Mobile: this component does not render (return null if touch device).
Use (hover: hover) and (pointer: fine) media query or check on mount.
```

---

### 7.4 Nav

```
BUILD: Nav component with scroll-responsive compression

File: src/components/layout/Nav.tsx

Two states based on scroll position:

=== DEFAULT STATE (scroll Y <= 100px) ===
  Position: fixed, top 0, left 0, right 0, z-index 50
  Height: 64px
  Background: transparent
  Padding: 0 6vw (var(--margin-desktop))
  Display: flex, justify-between, align-center

  Left: "pratyush"
    - font-mono, 13px, uppercase, tracking 0.06em
    - color: muted-foreground
    - Links to /

  Right: "Work" "About" "Contact"
    - font-mono, 13px, uppercase, tracking 0.06em
    - color: muted-foreground
    - Hover: color foreground, AnimatedUnderline
    - Active route: color foreground
    - Gap: 32px between links
    - "Contact" triggers ContactDrawer.open() instead of navigation

=== COMPACT STATE (scroll Y > 100px) ===
  Position: fixed, top 12px, left 50%, transform translateX(-50%), z-index 50
  Height: 48px
  Max-width: 480px
  Width: auto (shrink-to-fit content with padding)
  Background: var(--secondary) with 80% opacity
  Backdrop-filter: blur(12px) saturate(1.2)
  Border: 1px solid var(--border)
  Border-radius: var(--radius)
  Padding: 0 24px
  Display: flex, align-center, gap 24px

  Content: "pratyush · Work · About · Contact"
    - All on one line
    - Middot separator "·" in muted-foreground/50
    - Same font styling as default state

=== TRANSITION between states ===
  All properties transition at 300ms var(--ease-out)
  Use a wrapper div that morphs (not two separate elements)

=== MOBILE (< 640px) ===
  Always in compact state
  Fixed bottom: 12px (not top)
  Same pill styling
  Slightly smaller: font 12px, height 44px, padding 0 16px

Implementation:
  Use useState for scrolled boolean
  useEffect with scroll listener (passive: true)
  Throttle scroll check with requestAnimationFrame
  Clean up listener on unmount
```

---

### 7.5 SectionReveal

```
BUILD: SectionReveal wrapper component

File: src/components/layout/SectionReveal.tsx

Props:
  children: ReactNode
  className?: string
  delay?: number          — additional delay before reveal (ms, default 0)
  threshold?: number      — IntersectionObserver threshold (default 0.15)

Behavior:
1. Wraps children in a <section> (or <div> if semantically needed)
2. Uses useInView hook with { once: true, threshold }
3. When first visible: adds "visible" class
4. CSS handles the animation (not JS)

CSS (in animations.css):

.section-reveal {
  clip-path: inset(0 0 100% 0);
  opacity: 0;
  will-change: clip-path, opacity;
}

.section-reveal.visible {
  clip-path: inset(0 0 0% 0);
  opacity: 1;
  transition: 
    clip-path 800ms var(--ease-in-out),
    opacity 600ms var(--ease-out);
  transition-delay: var(--reveal-delay, 0ms);
}

.section-reveal.visible > * {
  opacity: 0;
  transform: translateY(8px);
  animation: stagger-in 300ms var(--ease-out) forwards;
}

.section-reveal.visible > *:nth-child(1) { animation-delay: 100ms; }
.section-reveal.visible > *:nth-child(2) { animation-delay: 150ms; }
.section-reveal.visible > *:nth-child(3) { animation-delay: 200ms; }
.section-reveal.visible > *:nth-child(4) { animation-delay: 250ms; }
.section-reveal.visible > *:nth-child(5) { animation-delay: 300ms; }
.section-reveal.visible > *:nth-child(n+6) { animation-delay: 300ms; }

@keyframes stagger-in {
  to { opacity: 1; transform: translateY(0); }
}

Reduced motion:
@media (prefers-reduced-motion: reduce) {
  .section-reveal {
    clip-path: none;
    opacity: 0;
    transition: opacity 200ms ease;
  }
  .section-reveal.visible { opacity: 1; }
  .section-reveal.visible > * {
    animation: none;
    opacity: 1;
    transform: none;
  }
}

The component sets --reveal-delay via inline style if delay prop is provided.
```

---

### 7.6 ContactDrawer

```
BUILD: ContactDrawer component

File: src/components/contact/ContactDrawer.tsx

Managed via React context or zustand store for global open/close state.
Or simpler: export open/close functions via module-level state (jotai atom or simple callback ref).

=== STRUCTURE ===
Renders a portal (createPortal to document.body):

  Overlay:
    - Fixed, inset 0, z-index 60
    - Background: #0a0a0a @ 50% opacity
    - Opacity: 0 → 1 on open (300ms ease-out)
    - Click to close

  Drawer:
    - Fixed, bottom 0, left 0, right 0, z-index 61
    - Height: auto (content-sized), max-height: 60vh
    - Background: var(--secondary) @ 95% opacity
    - Backdrop-filter: blur(16px)
    - Border-top: 1px solid var(--border)
    - Border-radius: var(--radius) var(--radius) 0 0
    - Padding: 48px 6vw

  Open animation:
    - transform: translateY(100%) → translateY(0)
    - Duration: 400ms
    - Easing: var(--ease-drawer)

  Close animation:
    - transform: translateY(0) → translateY(100%)
    - Duration: 250ms
    - Easing: var(--ease-in)

  Close triggers:
    - Click overlay
    - Press Escape
    - Click X button (top-right of drawer)

=== CONTENT ===
  Heading: "Let's work together"
    - font-display, H2 scale, foreground color
  
  Email: pratyush@[domain]
    - font-mono, 14px, foreground color
    - Underline on hover
    - mailto: link
  
  Social links: "LinkedIn · GitHub · Dribbble" (whatever applies)
    - font-mono, 12px, uppercase, muted-foreground
    - Middot separator
    - External links, target _blank, rel noopener

  Optional form (Phase 2 of contact):
    - Name input: bg var(--input), border var(--border), font-body
    - Message textarea: same styling
    - Send button: bg var(--primary), text var(--primary-foreground)
    - Submits to /api/contact edge function

=== ACCESSIBILITY ===
  - Trap focus inside drawer when open (Tab cycles within drawer)
  - Set aria-modal="true", role="dialog"
  - On open: focus first focusable element
  - On close: return focus to trigger element (Contact link)
  - Body: overflow hidden when drawer is open
```

---

### 7.7 FLIP Transition Utility

```
BUILD: FLIP animation utility and integration

File: src/lib/flip.ts

=== UTILITY ===

export interface FlipRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export function storeFlipRect(rect: FlipRect): void
  → saves rect to sessionStorage key "flip-rect"

export function getFlipRect(): FlipRect | null
  → reads from sessionStorage, removes after reading (one-shot)

export function playFlip(element: HTMLElement, fromRect: FlipRect): Animation
  → computes current rect of element (the "last" position)
  → calculates deltas (translate X/Y and scale X/Y)
  → calls element.animate() with WAAPI:
     keyframes: [
       { transform: `translate(${dX}px, ${dY}px) scale(${sX}, ${sY})`, borderRadius: '0.625rem' },
       { transform: 'none', borderRadius: '0' }
     ]
     options: {
       duration: 500,
       easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
       fill: 'forwards'
     }
  → returns the Animation object

=== VIEW TRANSITIONS API (progressive enhancement) ===

If document.startViewTransition is available:
  Wrap the navigation + FLIP in startViewTransition()
  Assign view-transition-name: "project-hero" to both the thumbnail and case study hero

If not available:
  Fall back to manual FLIP with sessionStorage

=== INTEGRATION: ProjectRow (on click) ===

  onClick handler:
  1. Prevent default navigation
  2. Get bounding rect of the hover thumbnail (or the row itself if no image)
  3. Call storeFlipRect(rect)
  4. Navigate to /work/[slug] via router.push()

=== INTEGRATION: CaseStudyLayout (on mount) ===

  useEffect on mount:
  1. Call getFlipRect()
  2. If rect exists:
     a. Get ref to hero image element
     b. Call playFlip(heroRef.current, rect)
  3. If no rect (direct URL access):
     a. Simple fade-in: opacity 0 → 1, 400ms ease-out

=== REVERSE (back navigation) ===

  On popstate or back button:
  1. Store hero image rect before leaving
  2. On project list re-mount: animate thumbnail from stored rect
  3. OR: skip reverse FLIP (simpler, acceptable compromise)
```

---

## 8. Page Assemblies

`[PROMPT-READY]` — Each page's composition in detail.

### 8.1 Home Page (`app/page.tsx`)

```
Page composition, top to bottom:

1. <ShaderHero> (lazy loaded, h-screen, relative)
   └── <HeroContent> (absolute, bottom-left, z-10)
       ├── <TextScramble text="PRATYUSH" /> (hero type scale)
       ├── <p>"design · systems · craft"</p> (mono label, fades up after decode)
       └── <ScrollIndicator /> (bottom-center, pulsing)

2. <SectionReveal>
   └── <section> "Selected Work"
       ├── <h2>"Selected Work"</h2> (mono label style, not display — it's a section label)
       └── <ProjectList projects={featuredProjects} />

3. <SectionReveal delay={100}>
   └── <section> "About" teaser
       ├── <p> 2-3 sentences about Pratyush (body type, max-width 65ch)
       └── <a href="/about">"More about me →"</a> (mono, with hover underline)

4. <Footer />

Spacing between sections: clamp(4rem, 8vw, 7.5rem)
Content alignment: margin-left 6vw, max-width 720px (except hero which is full-bleed)
```

### 8.2 Case Study Page (`app/work/[slug]/page.tsx`)

```
Page composition:

1. <div> Hero image container (full-bleed, 16:9 aspect-ratio)
   └── <Image> (next/image, priority, ref for FLIP)
   └── On mount: check for FLIP rect, animate if present

2. <section> Project meta (content-width, padded top 48px)
   ├── <h1> project.title (H1 type scale)
   ├── <div> meta row (flex, gap-16, mono label style):
   │   ├── project.year
   │   ├── project.categories.join(" · ")
   │   └── project.client (if exists)

3. <SectionReveal>
   └── <section> Overview (content-width)
       └── <p> project overview paragraphs (body type, max-width 65ch)

4. <SectionReveal>
   └── <article> MDX body (content-width for text, content-wide for images)
       └── Rendered MDX with custom components for:
           - Images (content-wide, rounded, with optional captions)
           - Pull quotes (serif italic, centered, 1.25rem)
           - Code blocks (mono, bg muted, rounded)

5. <SectionReveal>
   └── <section> Next project
       ├── <p>"Next project"</p> (mono label)
       └── <a> next project title (display font, H2 scale, hover underline)

6. <Footer />
```

### 8.3 About Page (`app/about/page.tsx`)

```
Page composition:

1. <SectionReveal>
   └── <section> Intro (content-width)
       ├── <h1>"About"</h1> (H1 scale) — or skip h1, use a more personal opening
       └── <p> paragraphs (body, max-width 65ch) — personal narrative

2. <SectionReveal>
   └── <section> What I do (content-width)
       ├── <h2> section heading
       └── <p> skills / focus areas in prose form (NOT a bullet list)

3. <SectionReveal>
   └── <section> Experience (content-width)
       ├── <h2> section heading
       └── Experience entries (each: role, company, year — mono for metadata)

4. <SectionReveal>
   └── <section> Currently (content-width)
       └── <p> What Pratyush is working on now, learning, exploring

5. <Footer />

NOTE: This page is content-driven. No shader, no special interactions beyond
SectionReveal. Let the writing breathe. The About page earns trust through
clarity, not effects.
```

---

## 9. SEO & Metadata

`[PROMPT-READY]`

```
Set up metadata in app/layout.tsx:

export const metadata: Metadata = {
  title: {
    default: 'Pratyush — Design Portfolio',
    template: '%s — Pratyush'
  },
  description: 'Design portfolio of Pratyush. UX, visual design, branding, spatial design, and speculative work.',
  metadataBase: new URL('https://pratyush.design'),  // update with actual domain
  openGraph: {
    title: 'Pratyush — Design Portfolio',
    description: 'UX, visual design, branding, spatial design.',
    url: 'https://pratyush.design',
    siteName: 'Pratyush',
    locale: 'en_US',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pratyush — Design Portfolio',
    description: 'UX, visual design, branding, spatial design.',
  },
  robots: { index: true, follow: true },
};

Each case study page overrides:
  title: project.title
  description: project.description
  openGraph image: project.heroImage (or custom OG per project)

Generate sitemap.xml with next-sitemap or app router generateSitemap().
Generate robots.txt allowing all.
Add canonical URLs to all pages.
```

---

## 10. Acceptance Criteria (Definition of Done)

The portfolio is DONE when all of the following are true:

```
VISUAL
  [ ] Hero shader renders and responds to cursor
  [ ] Name decodes via TextScramble on first load
  [ ] Nav compresses on scroll
  [ ] Project list rows have full hover interaction (image + scramble + glow + arrow)
  [ ] All sections reveal via clip-path on first scroll
  [ ] FLIP transition works from project list to case study
  [ ] Contact drawer opens and closes with correct animation
  [ ] Grain overlay is visible on all pages
  [ ] Typography matches the type scale exactly

CONTENT
  [ ] Minimum 4 projects in the project list
  [ ] Minimum 2 complete case studies (real content, real images)
  [ ] About page has real written content
  [ ] All images are real project work (no placeholders in production)

PERFORMANCE
  [ ] Lighthouse Performance: 95+
  [ ] Lighthouse Accessibility: 95+
  [ ] Lighthouse Best Practices: 95+
  [ ] Lighthouse SEO: 95+
  [ ] FCP < 1.2s
  [ ] LCP < 2.5s
  [ ] CLS < 0.1
  [ ] Bundle < 150KB gzipped (excluding lazy shader)

ACCESSIBILITY
  [ ] All animations respect prefers-reduced-motion
  [ ] Keyboard navigation works end-to-end (tab, enter, escape)
  [ ] Focus indicators visible on all interactive elements
  [ ] Contact drawer traps focus
  [ ] All images have alt text
  [ ] Heading hierarchy is correct (one h1 per page)
  [ ] Color contrast passes WCAG AA on all text

RESPONSIVE
  [ ] Works on 375px width (iPhone SE)
  [ ] Works on 768px width (iPad)
  [ ] Works on 1440px width (standard desktop)
  [ ] Works on 1920px+ (wide monitors — content stays left-aligned)
  [ ] No horizontal scroll on any viewport
  [ ] Touch targets minimum 44×44px on mobile

DEPLOYMENT
  [ ] Deployed to Vercel
  [ ] Custom domain connected
  [ ] HTTPS working
  [ ] OG image renders correctly on Twitter/LinkedIn
  [ ] 404 page is styled
  [ ] Analytics tracking live
```

---

*End of PRD. Build in phase order. Test each phase before moving to the next. Paste component specs directly into Claude Code with Sections 2 + 3 prepended as context.*
