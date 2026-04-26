# richdang.ai — Personal Portfolio

## What this is
Single-page personal portfolio for Rich Dang (richdang.ai). Dark, cinematic glass aesthetic built with React 18 + Babel standalone — no build step, no bundler. Opens directly via `file://` or any static host.

## File structure
```
index.html          — Single self-contained file (all CSS + JSX inlined)
assets/
  hero-figure-v9.png — Hero portrait (PNG with transparent bg)
shared.jsx          — Source copy: icons, hooks, data (not loaded at runtime)
skill-cloud.jsx     — Source copy: skill word cloud component
stardust.jsx        — Source copy: canvas sparkle animation
variant-a.jsx       — Source copy: full page layout
styles.css          — Source copy: shared CSS
```

> **Note:** `index.html` is fully self-contained. The `.jsx` and `.css` files are source references only — they are **not** loaded at runtime (Babel standalone can't fetch external files via `file://`). Any edits must be made inside `index.html`.

## Open locally
```
open /Users/richdang/richdang.ai/index.html
```

## Sections
| Section | id | Notes |
|---|---|---|
| Hero | — | Portrait + sparkle canvas, cosmic bg, ember particles |
| About | `#about` | Manifesto copy |
| Skill cloud | `#skills` | Word cloud — hover for proficiency badge |
| Résumé | `#resume` | Timeline of roles |
| Book a meeting | `#book` | Interactive calendar → Calendly |
| Contact | `#contact` | Footer with links |

## Availability rules (calendar)
- **Available:** Monday, Wednesday, Friday
- **Blocked:** Tuesday, Thursday, Saturday, Sunday
- Past dates in the current month are also blocked
- Clicking a date opens Calendly pre-filled with `?month=YYYY-MM&date=YYYY-MM-DD` so real slot availability comes from Calendly's API

## Contact / data
- **Email:** richtdang@gmail.com
- **LinkedIn:** https://www.linkedin.com/in/richdang/
- **GitHub:** https://github.com/dickdang
- **Calendly:** https://calendly.com/richdang/30-minute-meeting

## Design tokens
| Token | Value |
|---|---|
| Accent | `#ffa45a` (warm amber) |
| Background | `#061326` (deep navy) |
| Ink | `#f5f0e8` (warm white) |
| Serif | Instrument Serif |
| Sans | Geist / Inter |
| Mono | JetBrains Mono |

## Key implementation notes
- All JSX must be in `<script type="text/babel">` blocks inside `index.html` — external `.jsx` src= doesn't work via file://
- Sparkles are a canvas animation in `Sparkles` component (stardust.jsx source), cursor-interactive
- Skill cloud words drift via per-word CSS keyframe animations
- `FadeUp` uses IntersectionObserver for scroll-reveal
- `liquid-glass` class uses `backdrop-filter` + a pseudo-element gradient border
