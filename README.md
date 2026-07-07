# tksluangrath.github.io

The personal portfolio of Terrance Luangrath, a data scientist and applied mathematician.
It is a hand-authored static site: plain HTML, one CSS design system, and a small amount of
vanilla JavaScript, deployed on GitHub Pages with no build server. This document explains the
decisions behind it and how to extend it. The governing design contract lives in
`ARCHITECTURE.md`; this file is the operational companion.

## Design decisions

The type pairing is Fraunces for display and IBM Plex Sans for body, with IBM Plex Mono
carrying every number, eyebrow, tag, and button label. Fraunces is a variable serif with real
optical character, so at large sizes it reads like a plate from a scientific atlas rather than a
neutral headline font, which suits a subject who works in applied mathematics and machine
learning. IBM Plex Sans is the engineering counterweight, drawn for technical communication and
legible at sixteen pixels on the dark background. The mono face is the throughline that makes the
interface feel like an instrument: a data scientist's site should render its measurements in a
fixed-width readout, so the metrics and the interface chrome all speak in it.

The palette is the fixed Deep Sea set: Ink Black for the page, Prussian Blue for surfaces, Steel
Blue for borders and hover states, Amber Gold for every accent, and a warm-white-to-muted-blue
ramp for text. The page sits on a dot-grid texture, one-pixel dots on a twenty-four-pixel
lattice at fifteen percent opacity, which reads as coordinate space without competing with the
content. One accent treatment appears everywhere, a two-pixel Amber Gold left rule with eight
pixels of padding, implemented as the `.rail` utility and composed onto every section eyebrow,
project card, and metric pull-quote. It is the single visual throughline across all pages.

Motion is concentrated at page load. The navigation links fade down staggered, the hero name
translates in and fades, the subhead follows, and the buttons land last. After that the site
holds still: hover states are short CSS transitions and scroll reveals are a single class flip
driven by one `IntersectionObserver`. Everything animated is wrapped in
`prefers-reduced-motion: no-preference`, and the hidden initial states are gated on a `.js` class
set synchronously in the head, so a visitor with reduced motion, or with JavaScript disabled or
broken, always receives the fully rendered page.

## Token reference

Every color, size, space, and duration resolves from a custom property in
`assets/css/tokens.css`. No other stylesheet writes a literal hex value. The most-used tokens:

| Token | Value | Usage |
| --- | --- | --- |
| `--color-bg` | `#0d1b2a` | Page background |
| `--color-surface` | `#1b263b` | Card and panel surfaces |
| `--color-surface-raised` | `#415a77` | Borders, hover states |
| `--color-accent` | `#e0a500` | CTAs, links, the rail, highlights |
| `--color-accent-soft` | `#f4c542` | Accent hover |
| `--color-text-primary` | `#e0e1dd` | Body copy |
| `--color-text-secondary` | `#a8b2c1` | Captions, metadata |
| `--color-text-muted` | `#778da9` | Placeholders, footer |
| `--font-display` | Fraunces | Hero, titles, section headings |
| `--font-body` | IBM Plex Sans | Paragraph copy |
| `--font-mono` | IBM Plex Mono | Metrics, eyebrows, tags, buttons |
| `--text-4xl` | `clamp(2.75rem, 9vw, 4.5rem)` | Hero display |
| `--space-section` | `clamp(64px, 10vw, 128px)` | Vertical section rhythm |
| `--texture-bg` | dot-grid radial-gradient | Body background texture |
| `--transition-fast` | `150ms ease` | Hover states |
| `--transition-base` | `300ms ease-out` | Scroll reveals |

## Adding a new project page

1. Copy an existing directory under `projects/`, for example `projects/fraud-detection/`, into a
   new `projects/<slug>/` where the slug is the kebab-case title.
2. Edit the `<title>`, meta description, project-hero SVG, headings, and copy. Choose an SVG
   pattern that fits the project's domain, and color every shape with `currentColor` driven by an
   inline `style="color:var(--color-...)"` so it stays inside the token system.
3. Add a matching `.project-card` to `projects/index.html` with the correct `data-tags` so the
   filter picks it up, and link it from the card and, if it belongs there, from the three
   featured cards on `index.html`.
4. Add the new URL to `sitemap.xml`.
5. Leave the shared head, nav, and footer markup unchanged so the page inherits the design system
   and behavior automatically.

## Font loading

Fonts load through a preconnect to `fonts.googleapis.com` and `fonts.gstatic.com` followed by a
single stylesheet link in the head, never an `@import` inside CSS. The preconnect lets the
browser open the font connection before it finishes parsing the page, and keeping the request out
of the CSS avoids the extra round trip that an `@import` would force. The `display=swap` parameter
means text renders immediately in the fallback and swaps to the web font when it arrives, so the
page is never blank waiting on a font.

## Build and deploy

The production stylesheet `assets/css/site.min.css` is `tokens.css` followed by `components.css`
with comments and whitespace stripped. Regenerate it after any CSS change with:

```
cat assets/css/tokens.css assets/css/components.css \
 | perl -0pe 's{/\*.*?\*/}{}gs' \
 | tr -s ' \t\r\n' ' ' \
 | sed -E 's/ *([{}:;,]) */\1/g; s/;}/}/g; s/^ //' \
 > assets/css/site.min.css
```

Deployment is manual and needs no workflow: commit to the default branch and GitHub Pages serves
the repository root. The `.nojekyll` file tells Pages to serve the files verbatim rather than
running them through Jekyll. To preview locally, run `python3 -m http.server 8765` from the
repository root and open `http://localhost:8765/`.

## Contact form

The About page carries a Formspree form whose `action` is a placeholder,
`https://formspree.io/f/YOUR_ENDPOINT`. Create a form at formspree.io and replace that endpoint
to start receiving submissions; until then the form posts nowhere.
