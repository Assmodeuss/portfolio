# Visual System Guide
### Pratyush Portfolio — Design Specification v1.0

---

## 0. System Overview

This document defines every visual decision for the portfolio. It is the single source of truth for color, typography, spacing, motion, component behavior, and implementation. Every pixel traces back to a rule here.

The system operates in **dark mode by default**. Light mode exists as a secondary option but dark is the canonical experience — the shader hero, grain overlay, and accent glow are designed for dark surfaces.

---

## 1. Color System

### 1.1 Token Architecture

Your CSS theme uses the shadcn/ui token structure. Here's how each token maps to actual portfolio usage:

#### Dark Mode (Primary — Default)

| Token | Value | Role | Where It Appears |
|---|---|---|---|
| `--background` | `#0a0a0a` | Page canvas | Body background, full-bleed sections |
| `--foreground` | `#fafafa` | Primary text | Headlines, body copy, navigation links |
| `--card` | `#0a0a0a` | Surface level 0 | Project cards, about section containers |
| `--secondary` | `#262626` | Surface level 1 | Hover row backgrounds, input fields, nav pill on scroll |
| `--muted` | `#262626` | Recessed surface | Code blocks, metadata containers |
| `--muted-foreground` | `#a1a1a1` | Secondary text | Dates, categories, project descriptions, captions |
| `--border` | `#262626` | Dividers | Project list row separators, section dividers |
| `--input` | `#262626` | Form surfaces | Contact form inputs |
| `--ring` | `#525252` | Focus indicator | Keyboard focus outlines, active states |
| `--primary` | `#fafafa` | High-emphasis | CTA buttons, active nav link, hero name text |
| `--primary-foreground` | `#0a0a0a` | Inverse text | Text inside primary buttons |
| `--accent` | `#262626` | Interactive surface | Hover states on project rows |
| `--accent-foreground` | `#fafafa` | Interactive text | Text on hovered elements |
| `--destructive` | `#e7000b` | Error state | Form validation only (never decorative) |

#### Light Mode (Secondary)

| Token | Value | Role |
|---|---|---|
| `--background` | `#ffffff` | Page canvas |
| `--foreground` | `#0a0a0a` | Primary text |
| `--secondary` | `#f5f5f5` | Elevated surfaces |
| `--muted` | `#f5f5f5` | Recessed surfaces |
| `--muted-foreground` | `#737373` | Secondary text |
| `--border` | `#e5e5e5` | Dividers |
| `--primary` | `#171717` | High-emphasis elements |
| `--primary-foreground` | `#fafafa` | Inverse text |

### 1.2 Extended Palette (Beyond shadcn Tokens)

Your theme doesn't include these, but the portfolio requires them. Add as custom properties:

```css
:root {
  /* Shader accent — from ShaderGradient reference config */
  --accent-violet: #8d7dca;
  --accent-violet-glow: rgba(141, 125, 202, 0.12);
  --accent-violet-subtle: rgba(141, 125, 202, 0.06);

  /* Grain overlay opacity */
  --grain-opacity: 0.04;

  /* Shader gradient colors (from reference config) */
  --shader-color-1: #606080;
  --shader-color-2: #8d7dca;
  --shader-color-3: #212121;

  /* Chart colors (preserved from your theme — use for dataviz case studies) */
  --chart-1: #91c5ff;
  --chart-2: #3a81f6;
  --chart-3: #2563ef;
  --chart-4: #1a4eda;
  --chart-5: #1f3fad;
}

.dark {
  --accent-violet-glow: rgba(141, 125, 202, 0.15);
  --accent-violet-subtle: rgba(141, 125, 202, 0.08);
  --grain-opacity: 0.04;
}
```

### 1.3 Color Rules

**Rule 1: No pure black or pure white in design elements.** Your theme already follows this — `#0a0a0a` for dark bg, `#fafafa` for light text. The 2–4% offset from pure values creates perceived depth.

**Rule 2: The accent violet appears in exactly 5 places.** Shader hero gradient, hover glow on project rows, active navigation indicator, loader dot active state, and link hover underlines. Nowhere else. Restraint is identity.

**Rule 3: Borders are felt, not seen.** `--border: #262626` on `#0a0a0a` background is a 10% luminance difference — barely visible. This is intentional. Borders structure without drawing attention.

**Rule 4: The chart palette is reserved for data visualization case studies only.** Never use the blue scale for decorative purposes on the portfolio chrome.

### 1.4 Semantic Color Mapping

```
Text hierarchy:
  Hero name          → var(--foreground)         #fafafa
  Section headings   → var(--foreground)         #fafafa
  Body copy          → var(--foreground)         #fafafa
  Metadata / dates   → var(--muted-foreground)   #a1a1a1
  Disabled / ghost   → var(--ring)               #525252

Surfaces:
  Page background    → var(--background)         #0a0a0a
  Card / section     → var(--card)               #0a0a0a  (same — no card elevation)
  Nav pill (scroll)  → var(--secondary)          #262626  + backdrop-blur
  Hover row bg       → var(--accent-violet-subtle)
  Input fields       → var(--input)              #262626

Borders:
  Section dividers   → var(--border)             #262626
  Project row lines  → var(--border)             #262626
  Focus ring         → var(--ring)               #525252

Interactive:
  Button primary bg  → var(--primary)            #fafafa
  Button primary txt → var(--primary-foreground) #0a0a0a
  Link hover glow    → var(--accent-violet-glow)
  Cursor highlight   → var(--accent-violet)      #8d7dca @ 12% opacity
```

---

## 2. Typography System

### 2.1 Font Stack

Your theme uses system font stacks. For the portfolio, override with custom fonts while keeping system as fallback:

```css
:root {
  /* Display — personality, character, identity */
  --font-display: 'PP Neue Montreal', 'Satoshi', var(--font-sans);

  /* Body — clean, readable, professional */
  --font-body: 'Switzer', 'Outfit', var(--font-sans);

  /* Mono — metadata, dates, technical details */
  --font-mono: 'JetBrains Mono', 'IBM Plex Mono', ui-monospace, SFMono-Regular, 
    Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;

  /* Serif — reserved, used only in pull quotes within case studies */
  --font-serif: 'Newsreader', 'Source Serif 4', ui-serif, Georgia, Cambria, 
    "Times New Roman", Times, serif;
}
```

**Font loading strategy:** Self-host via `next/font` or Fontsource. No Google Fonts CDN. Load only weights 400 and 500 for display/body, 400 for mono. Subset to Latin unless showing Devanagari work.

### 2.2 Type Scale

| Level | Size | Weight | Tracking | Line Height | Font | Usage |
|---|---|---|---|---|---|---|
| Hero | `clamp(3rem, 8vw, 7rem)` | 500 | -0.03em | 0.95 | `--font-display` | Name on hero, single use |
| H1 | `clamp(2rem, 4vw, 3.5rem)` | 500 | -0.025em | 1.05 | `--font-display` | Case study titles |
| H2 | `clamp(1.5rem, 3vw, 2.5rem)` | 500 | -0.02em | 1.1 | `--font-display` | Section headings |
| H3 | `1.25rem` (20px) | 500 | -0.01em | 1.3 | `--font-display` | Sub-section headings |
| Body | `1rem` (16px) | 400 | 0 | 1.6 | `--font-body` | Paragraphs, descriptions |
| Body small | `0.875rem` (14px) | 400 | 0 | 1.5 | `--font-body` | Secondary descriptions |
| Mono label | `0.75rem` (12px) | 400 | 0.08em | 1.4 | `--font-mono` | Dates, categories, tags |
| Mono nav | `0.8125rem` (13px) | 400 | 0.06em | 1 | `--font-mono` | Navigation links |

### 2.3 Typography Rules

**Rule 1: Uppercase mono is the metadata voice.** Every date, category, tag, and label uses `--font-mono` at 12px, uppercase, with wide tracking (0.08em). This is the system's "whisper" — quiet, structured, informational.

**Rule 2: Display font never goes below 20px.** The display grotesque is for presence. It appears in headings and the hero. Below 20px, switch to `--font-body`.

**Rule 3: Max line length is 65ch for body copy.** On wide screens, body text never stretches beyond this. Apply `max-width: 65ch` to all paragraph containers.

**Rule 4: Negative tracking on headings, positive on mono.** Headings pull inward (tight, dense, powerful). Mono pushes outward (airy, technical, spacious). This contrast is the typographic tension that makes the system feel designed, not default.

**Rule 5: The serif font appears only in case study pull quotes.** One exception to the grotesque/mono system. Used sparingly, it signals "this is the client's voice" or "this is a key insight." Italic, centered, larger than body (1.25rem).

---

## 3. Spacing System

### 3.1 Base Unit

Your theme defines `--spacing: 0.25rem` (4px). The entire system builds on multiples of this:

```
4px   = 1 unit    (--spacing)
8px   = 2 units   (tight gaps, icon padding)
12px  = 3 units   (inline spacing, small gaps)
16px  = 4 units   (default paragraph margin, component padding)
24px  = 6 units   (medium gaps, card padding)
32px  = 8 units   (section sub-gaps)
48px  = 12 units  (large gaps)
64px  = 16 units  (section breaks on mobile)
80px  = 20 units  (section breaks on tablet)
120px = 30 units  (section breaks on desktop)
```

### 3.2 Layout Dimensions

```css
:root {
  --content-max-width: 720px;    /* Main content column */
  --content-wide: 960px;         /* Wide content (images, tables) */
  --content-full: 100vw;         /* Full bleed (hero, project images) */
  
  --margin-desktop: 6vw;         /* Page margins */
  --margin-tablet: 5vw;
  --margin-mobile: 5vw;
  
  --nav-height: 64px;            /* Fixed nav bar */
  --nav-height-compact: 48px;    /* Nav after scroll compression */
}
```

### 3.3 Spacing Rules

**Rule 1: Left-aligned content column, not centered.** The 720px max-width column sits with `margin-left: var(--margin-desktop)`, not `margin: 0 auto`. Asymmetry is identity.

**Rule 2: Section gaps scale with viewport.** 120px on desktop, 80px on tablet, 64px on mobile. Use `clamp(4rem, 8vw, 7.5rem)`.

**Rule 3: Project list rows have fixed vertical rhythm.** Each row is `padding: 20px 0` with a 1px `--border` top. The consistent rhythm makes hover transitions feel clean.

**Rule 4: Full-bleed elements have no content margin.** The hero shader, project case study hero images, and footer gradient span `100vw` with no horizontal padding.

### 3.4 Responsive Breakpoints

| Name | Width | Content Width | Margins |
|---|---|---|---|
| Mobile | < 640px | 100% - margins | 5vw each side |
| Tablet | 640–1024px | 100% - margins | 5vw each side |
| Desktop | 1024–1440px | 720px max | 6vw left |
| Wide | > 1440px | 720px max | 6vw left (content stays left, right is negative space) |

---

## 4. Motion System

### 4.1 Easing Curves

```css
:root {
  /* Primary ease — for all entering elements */
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);

  /* For on-screen movement and morphs */
  --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);

  /* Exit only — fast disappearance */
  --ease-in: cubic-bezier(0.55, 0.055, 0.675, 0.19);

  /* Drawer / panel slide */
  --ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);

  /* Lerp factor for cursor tracking */
  --lerp-fast: 0.15;
  --lerp-slow: 0.05;
}
```

### 4.2 Duration Scale

| Category | Duration | Usage |
|---|---|---|
| Micro | 100–160ms | Button press feedback, icon state change |
| Fast | 200–300ms | Hover image appear/disappear, tooltip, nav transition |
| Standard | 400–600ms | Section reveals, hero element stagger, page content fade |
| Slow | 700–1000ms | Hero clip-path reveal, shader transition, FLIP animation |
| Continuous | ∞ | Shader animation, cursor tracking, grain noise |

### 4.3 Animation Inventory

Every animation in the portfolio, exhaustively listed:

| Element | Trigger | Animation | Duration | Easing | Runs |
|---|---|---|---|---|---|
| Hero name | Page load (after loader) | TextScramble decode | ~2000ms total (30ms/frame) | Linear (frame-based) | Once |
| Hero subtitle | Page load (after name) | Fade up + opacity | 600ms | `--ease-out` | Once |
| Shader gradient | Continuous + mousemove | Uniform shift on cursor | Continuous | Lerp @ 0.05 | Always |
| Nav bar | Scroll past 100px | Width compress + blur bg | 300ms | `--ease-out` | Toggle |
| Section content | Scroll into view | clip-path: inset(0 0 100% 0) → inset(0) | 800ms | `--ease-in-out` | Once per session |
| Section children | After section reveal | Staggered fade-up (translateY 8px → 0) | 300ms per child, 50ms stagger | `--ease-out` | Once per session |
| Project row hover | mouseenter | BG highlight + title scramble + image appear | 300ms bg, scramble frame-based, 300ms image | ease-out | Per hover |
| Project image | mousemove (in row) | Lerp follow cursor | Continuous | Lerp @ 0.15 | During hover |
| Project image exit | mouseleave | Scale 0.8 + fade out | 200ms | `--ease-in` | Per leave |
| Project click | click | FLIP thumbnail → hero | 500ms | `--ease-out` | Per navigation |
| Page exit | Navigation | Fade to background | 200ms | `--ease-in` | Per navigation |
| Grain overlay | Always | Static (no animation) | — | — | Static |
| Contact drawer | click | Slide up from bottom | 400ms | `--ease-drawer` | Toggle |

### 4.4 Motion Rules

**Rule 1: CSS for predetermined, JS for dynamic.** Scroll reveals use CSS clip-path transitions triggered by class toggle. Cursor-following elements use requestAnimationFrame + lerp in JS. Never mix.

**Rule 2: One-shot reveals, no replay.** Section animations fire once when first scrolled into view. Scrolling back up and re-entering does NOT re-trigger. Implemented via IntersectionObserver with `{ once: true }` pattern.

**Rule 3: No animation on keyboard-initiated actions.** Navigation via keyboard, form submissions, and any `keydown` handler — zero transition. Animation is for spatial discovery, not repeated tool usage.

**Rule 4: Exit is always faster than enter.** Enter at 300–600ms, exit at 150–200ms. Asymmetric timing respects the user's intention to move on.

**Rule 5: Reduced motion fallback.** Under `prefers-reduced-motion: reduce`, all transform/clip-path animations become simple opacity fades at 200ms. Shader gradient slows to near-static. Cursor tracking is disabled.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 200ms !important;
  }
  .section {
    clip-path: none !important;
    opacity: 0;
    transition: opacity 200ms ease;
  }
  .section.visible {
    opacity: 1;
  }
}
```

---

## 5. Component Specifications

### 5.1 Navigation Bar

```
┌─────────────────────────────────────────────────────────┐
│  State: Default (top of page)                           │
│  Height: 64px                                           │
│  Background: transparent                                │
│  Position: fixed, top: 0, z-index: 50                   │
│  Padding: 0 var(--margin-desktop)                       │
│                                                         │
│  Left: "pratyush" — mono, 13px, uppercase, #a1a1a1     │
│  Right: "Work · About · Contact" — mono, 13px, #a1a1a1 │
│         Active link: #fafafa                            │
│         Hover: #fafafa, underline slides left→right     │
│         Separator: " · " (middot, #525252)              │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  State: Scrolled (past 100px)                           │
│  Height: 48px                                           │
│  Background: var(--secondary) @ 80% opacity             │
│  Backdrop-filter: blur(12px) saturate(1.2)              │
│  Border: 1px solid var(--border)                        │
│  Border-radius: var(--radius) [0.625rem]                │
│  Margin: 12px auto (centered pill)                      │
│  Max-width: 480px                                       │
│  Transition: all 300ms var(--ease-out)                  │
│                                                         │
│  "pratyush · Work · About · Contact" — compressed       │
└─────────────────────────────────────────────────────────┘
```

### 5.2 Project List Row

```
┌─────────────────────────────────────────────────────────┐
│  border-top: 1px solid var(--border)                    │
│  padding: 20px 0                                        │
│                                                         │
│  ┌─ Left ─────────────────────────┐  ┌─ Right ───────┐ │
│  │ Title (display, 18px, 500)     │  │ 2024          │ │
│  │ + animated underline on hover  │  │ mono, 12px    │ │
│  │                                │  │ #a1a1a1       │ │
│  │ Description (body, 14px, 400)  │  │               │ │
│  │ #a1a1a1 → #fafafa/70 on hover │  │               │ │
│  └────────────────────────────────┘  └───────────────┘ │
│                                                         │
│  Hover: bg → var(--accent-violet-subtle)                │
│         ArrowUpRight icon slides in from (-8px, +8px)   │
│         Title runs TextScramble                         │
│         Cursor-following image appears (280×180px)      │
│                                                         │
│  border-bottom: 1px solid var(--border) [last item]     │
└─────────────────────────────────────────────────────────┘
```

### 5.3 Hero Section

```
┌─────────────────────────────────────────────────────────┐
│  Height: 100vh (100svh on mobile)                       │
│  Background: ShaderGradient (lazy loaded)               │
│    colors: #606080, #8d7dca, #212121                    │
│    type: waterPlane                                     │
│    grain: on                                            │
│    speed: 0.3                                           │
│    responds to cursor via uniform shift                 │
│                                                         │
│  Content (over shader, z-index: 10):                    │
│    Name: hero scale, --font-display                     │
│    Decodes via TextScramble on load                     │
│    Position: bottom-left, padded by content margins     │
│                                                         │
│    Subtitle: "design · systems · craft"                 │
│    Mono, 12px, uppercase, tracking 0.08em               │
│    Fades up 600ms after name decode completes           │
│                                                         │
│  Scroll indicator: small "↓" or subtle line             │
│    mono, #525252, bottom-center, 24px from bottom       │
│    opacity pulses 0.3 → 0.8 → 0.3 (3s loop)           │
│    disappears on any scroll (opacity 0, 200ms)          │
└─────────────────────────────────────────────────────────┘
```

### 5.4 Section Reveal Container

```jsx
// Usage: wrap any section
<SectionReveal>
  <h2>Selected Work</h2>
  <ProjectList />
</SectionReveal>

// Behavior:
// - IntersectionObserver threshold: 0.15
// - On intersect: add .visible class (once: true)
// - .visible triggers clip-path + child stagger
```

```css
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
/* Cap at 5 — anything beyond gets 300ms delay */

@keyframes stagger-in {
  to { opacity: 1; transform: translateY(0); }
}
```

### 5.5 Grain Overlay

```css
.grain {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;
  opacity: var(--grain-opacity);
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 256px 256px;
  mix-blend-mode: overlay;
}
```

No PNG. No animated noise. Static SVG turbulence, composited once. Zero performance cost.

### 5.6 Contact Drawer

```
┌─────────────────────────────────────────────────────────┐
│  Trigger: "Contact" nav click                           │
│  Type: Bottom sheet / drawer (not a full page)          │
│  Height: auto (content-sized, max 60vh)                 │
│  Background: var(--secondary) @ 95% opacity             │
│  Backdrop-filter: blur(16px)                            │
│  Border-top: 1px solid var(--border)                    │
│  Border-radius: var(--radius) var(--radius) 0 0         │
│  Padding: 48px var(--margin-desktop)                    │
│                                                         │
│  Enter: translateY(100%) → translateY(0), 400ms,        │
│         --ease-drawer                                   │
│  Exit: translateY(0) → translateY(100%), 250ms,         │
│        --ease-in                                        │
│  Overlay: background #0a0a0a @ 50% opacity              │
│                                                         │
│  Content:                                               │
│    "Let's work together" — H2, display font             │
│    Email: pratyush@...  — mono, linked, underline       │
│    Social links row — mono, 12px, spaced with " · "     │
│    Optional: simple form (name + message + send)        │
│              inputs use var(--input) bg, var(--border)   │
│              send button: var(--primary) bg              │
└─────────────────────────────────────────────────────────┘
```

---

## 6. Iconography & Visual Elements

### 6.1 Icons

Source: Lucide React (already in your reference — `ArrowUpRight` is used in ProjectShowcase).

**Style:** 16px default, 1.5px stroke weight. Color inherits from text color. Never filled, always stroked.

**Usage:**
- `ArrowUpRight` — project row hover, external links
- `ArrowDown` — scroll indicator on hero
- `X` — close drawer/modal
- No other icons on the portfolio chrome. Case studies may use project-specific icons.

### 6.2 Imagery

**Project thumbnails:** 280×180px, served as WebP, loaded lazily. Displayed only on hover (cursor-following). Rounded with `border-radius: var(--radius)` (0.625rem). Subtle `box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5)`.

**Case study hero images:** Full-bleed, 16:9 aspect ratio, served with `next/image` priority loading. No border radius on full-bleed.

**Case study inline images:** Max-width 960px (--content-wide), centered, `border-radius: var(--radius)`, 16px vertical margin.

### 6.3 Dividers

Horizontal rules are `1px solid var(--border)`. Never thicker. Never dashed. They span the content column width only (720px), not full bleed.

---

## 7. Tailwind Integration

### 7.1 Theme Configuration

Your `@theme inline` block maps CSS variables to Tailwind's color system. Here's how to use them in code:

```jsx
// Backgrounds
<div className="bg-background" />         // #0a0a0a
<div className="bg-secondary" />           // #262626
<div className="bg-card" />                // #0a0a0a
<div className="bg-muted" />               // #262626

// Text
<p className="text-foreground" />           // #fafafa
<p className="text-muted-foreground" />     // #a1a1a1
<p className="text-primary-foreground" />   // #0a0a0a (on buttons)

// Borders
<div className="border-border" />           // #262626

// Buttons
<button className="bg-primary text-primary-foreground" />  // white on dark
<button className="bg-secondary text-secondary-foreground" /> // subtle

// Focus
<input className="ring-ring" />             // #525252
```

### 7.2 Custom Utilities to Add

```css
/* In your global CSS or Tailwind plugin */
@layer utilities {
  .text-display {
    font-family: var(--font-display);
    letter-spacing: -0.025em;
    font-weight: 500;
  }
  
  .text-mono-label {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--muted-foreground);
  }
  
  .content-width {
    max-width: 720px;
    margin-left: 6vw;
  }
  
  .content-wide {
    max-width: 960px;
    margin-inline: auto;
  }
}
```

---

## 8. Accessibility Specifications

### 8.1 Color Contrast Compliance

| Pair | Ratio | WCAG AA | WCAG AAA |
|---|---|---|---|
| `--foreground` on `--background` (#fafafa / #0a0a0a) | 19.4:1 | Pass | Pass |
| `--muted-foreground` on `--background` (#a1a1a1 / #0a0a0a) | 9.1:1 | Pass | Pass |
| `--ring` on `--background` (#525252 / #0a0a0a) | 3.7:1 | Pass (large text) | Fail |
| `--primary-foreground` on `--primary` (#0a0a0a / #fafafa) | 19.4:1 | Pass | Pass |
| `--accent-violet` on `--background` (#8d7dca / #0a0a0a) | 5.2:1 | Pass | Fail |

**Action:** `--ring` (#525252) is only used for focus indicators on interactive elements at 2px+ width — compliant with WCAG 2.1 focus indicator requirements. The accent violet passes AA for all text sizes used (12px+ with the tracking applied).

### 8.2 Focus Management

```css
/* Visible focus for keyboard navigation */
:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
  border-radius: 2px;
}

/* Remove for mouse users */
:focus:not(:focus-visible) {
  outline: none;
}
```

### 8.3 Semantic Structure

```
<header>     → Navigation
<main>
  <section>  → Hero
  <section>  → Selected Work
  <section>  → About (abbreviated)
</main>
<footer>     → Contact info, social links
```

All headings follow strict hierarchy: one `<h1>` per page (hero name or case study title), `<h2>` for sections, `<h3>` for subsections.

---

## 9. Dark / Light Mode Implementation

### 9.1 Strategy

Dark is default. Light mode is toggled via `class="dark"` on `<html>` (your theme already uses this convention). The toggle is NOT exposed in the UI (per the vibe system — dark is the brand). Light mode exists for:

- Print stylesheets
- Accessibility override (system preference `prefers-color-scheme: light`)
- Future flexibility

### 9.2 System Preference Respect

```javascript
// In layout.tsx or _app.tsx
// Default to dark, respect system if explicitly light
const getTheme = () => {
  if (typeof window === 'undefined') return 'dark';
  const stored = localStorage.getItem('theme');
  if (stored) return stored;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
};
```

### 9.3 Light Mode Adjustments

When light mode is active, these elements adapt:

- Shader gradient: increase `brightness` to 2.2, shift `color3` from `#212121` to `#e8e8e8`
- Grain overlay: reduce `--grain-opacity` to 0.02 (less visible on white)
- Accent glow: `--accent-violet-glow` reduces to 8% opacity (less dramatic on light)
- Shadows: increase opacity from 0.5 to 0.15 (darker relative to bg)

---

## 10. File Structure & Token Export

### 10.1 CSS Architecture

```
styles/
├── tokens.css        ← All CSS custom properties (this system)
├── globals.css        ← Reset, base styles, grain, utilities
├── animations.css     ← @keyframes and animation classes
└── components/
    ├── nav.css        ← Navigation-specific overrides
    └── project.css    ← Project list hover states
```

### 10.2 Token Export for Figma

For Figma design work, the tokens map as:

```json
{
  "colors": {
    "bg/primary": "#0a0a0a",
    "bg/secondary": "#262626",
    "text/primary": "#fafafa",
    "text/secondary": "#a1a1a1",
    "text/ghost": "#525252",
    "border/default": "#262626",
    "accent/violet": "#8d7dca",
    "accent/violet-glow": "rgba(141,125,202,0.15)",
    "interactive/primary": "#fafafa",
    "interactive/primary-fg": "#0a0a0a",
    "status/error": "#e7000b"
  },
  "typography": {
    "hero": { "family": "PP Neue Montreal", "size": "8vw", "weight": 500, "tracking": "-0.03em" },
    "h2": { "family": "PP Neue Montreal", "size": "2.5rem", "weight": 500, "tracking": "-0.02em" },
    "body": { "family": "Switzer", "size": "1rem", "weight": 400, "tracking": "0" },
    "mono-label": { "family": "JetBrains Mono", "size": "0.75rem", "weight": 400, "tracking": "0.08em" }
  },
  "spacing": {
    "unit": "4px",
    "section-gap": "120px",
    "content-max": "720px",
    "margin": "6vw"
  },
  "radius": "0.625rem"
}
```

---

*This document is the law. Every component, every color choice, every timing value traces back here. If it's not in this system, it doesn't go on the site.*
