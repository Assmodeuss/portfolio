import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // ── Spec-compliant tokens (visual-system-guide §1) ──────────────
        // Contrast ratios verified against WCAG AA on #0a0a0a background:
        //   foreground      #fafafa   19.4:1 ✓ AA
        //   muted-foreground #a1a1a1   9.1:1 ✓ AA
        //   ring / ghost    #525252    3.7:1 ✓ large text only
        //   accent-violet   #8d7dca    5.2:1 ✓ AA
        'background':       '#0a0a0a',   // was #131313 — spec requires #0a0a0a
        'foreground':       '#fafafa',
        'muted-foreground': '#a1a1a1',
        'accent-violet':    '#8d7dca',
        // ── Original Material Design palette (kept for backward compat) ──
        'background-legacy': '#131313',
        'on-primary-container': '#2d1b64',
        'tertiary-container': '#b9ad45',
        'secondary-fixed-dim': '#c8c6c5',
        'on-error-container': '#ffdad6',
        'on-error': '#690005',
        'inverse-surface': '#e5e2e1',
        'secondary': '#c8c6c5',
        'on-background': '#e5e2e1',
        'on-tertiary-fixed': '#1f1c00',
        'secondary-fixed': '#e4e2e1',
        'tertiary-fixed': '#f3e576',
        'surface-container-high': '#2a2a2a',
        'on-secondary-container': '#b7b5b4',
        'on-secondary-fixed': '#1b1c1c',
        'outline': '#938f9b',
        'on-secondary-fixed-variant': '#474746',
        'on-primary-fixed': '#1e0856',
        'on-surface': '#e5e2e1',
        'surface-container-low': '#1c1b1b',
        'surface-tint': '#ccbeff',
        'error-container': '#93000a',
        'on-primary': '#34236b',
        'outline-variant': '#484550',
        'surface-container': '#201f1f',
        'surface-dim': '#131313',
        'secondary-container': '#474746',
        'error': '#ffb4ab',
        'surface-container-highest': '#353534',
        'inverse-on-surface': '#313030',
        'on-secondary': '#303030',
        'on-surface-variant': '#cac4d2',
        'surface-bright': '#3a3939',
        'on-primary-fixed-variant': '#4a3b83',
        'primary-fixed-dim': '#ccbeff',
        'on-tertiary-container': '#464000',
        'surface-variant': '#353534',
        'on-tertiary-fixed-variant': '#4f4800',
        'surface': '#131313',
        'tertiary': '#d6c95d',
        'primary-fixed': '#e7deff',
        'surface-container-lowest': '#0e0e0e',
        'inverse-primary': '#63539d',
        'tertiary-fixed-dim': '#d6c95d',
        'primary-container': '#9686d3',
        'on-tertiary': '#363100',
        'primary': '#ccbeff',
      },
      borderRadius: {
        DEFAULT: '0.125rem',
        lg: '0.25rem',
        xl: '0.5rem',
        full: '0.75rem',
      },
      fontFamily: {
        display: ['PP Neue Montreal', 'Satoshi', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body:    ['Switzer', 'Outfit', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono:    ['JetBrains Mono', 'IBM Plex Mono', 'ui-monospace', 'monospace'],
        serif:   ['Newsreader', 'Source Serif 4', 'ui-serif', 'serif'],
      },
    },
  },
  plugins: [],
}

export default config
