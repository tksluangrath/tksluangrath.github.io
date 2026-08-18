# tksluangrath.github.io

The personal portfolio of Terrance Luangrath, a data scientist and applied mathematician.
It is a hand-authored static site: plain HTML, one CSS design system, and a small amount of
vanilla JavaScript, deployed on GitHub Pages with no build server. This document explains the
decisions behind it and how to extend it.

The site was rebuilt from a single Jekyll `README.md` running the `minimal` remote theme. There
was no data layer, no include graph, and no collection logic worth preserving, so a templating
layer whose only job was to stamp a shared header and footer onto a handful of pages wasn't worth
adding back. Hand-authored HTML gives tighter control over the markup the design system needs and
loads faster with no theme CSS to override. A `.nojekyll` file at the repository root tells
GitHub Pages to serve the files verbatim instead of running them through the Jekyll pipeline.

## Page map

```
/                          index.html                         Hero, technical stack, 3 featured projects, footer
/projects/                 projects/index.html                All 18 projects, tag-filterable
/projects/<slug>/          projects/<slug>/index.html          18 individual project pages
/journal/                  journal/index.html                 Journal landing page, generated
/journal/<slug>/           journal/<slug>/index.html           Individual entries, generated from journal/entries/*.md
/about/                    about/index.html                   Bio, headshot, and contact form
/404.html                  404.html                            On-brand not-found page
/sitemap.xml               sitemap.xml                        All page URLs
```

## Navigation

Four labels in this order: Work, Journal, About, Contact. Work links to `/projects/`. Journal
links to `/journal/`. About links to `/about/`. Contact is an anchor to the contact section at
`/about/#contact`. The bar is sticky, starts transparent, and gains the surface color and a
border once the page scrolls past eight pixels.

## Naming convention

Components follow BEM: `Block__Element--Modifier`. A block is a standalone component
(`.project-card`), an element is a part meaningful only inside its block
(`.project-card__metric`), and a modifier is a variant flag (`.project-card--featured`,
`.btn--ghost`). Utilities that compose onto anything — `.rail`, `.reveal`, `.wrap`, `.eyebrow` —
sit outside the BEM tree.

## Component inventory

- `nav` — sticky top bar, transparent to surface on scroll
- `.hero` — name, positioning statement, two calls to action
- `.skills-group` / `.skills` — categorized rows of inline-SVG icon and label pairs
- `.project-card` — surface panel with the rail, a metric callout, tags, and links
- `.project-card--featured` — larger variant used on the home page
- `.filter-bar` — tag filter buttons for the projects index
- `.project-hero` — inline-SVG geometric pattern header for detail pages
- `.journal-card` — whole-card link for the Journal index; date, title, excerpt, tags, arrow
- `.article` — long-form reading layout shared by project pages and Journal entries
- `.pull-quote` — a metric or result set apart at display scale with the rail
- `.tag` — mono pill for a single technology
- `.about-header__photo` — small bordered headshot next to the About page name
- `.footer` — GitHub, Hugging Face, LinkedIn, and email links
- `.contact-form` — Formspree-connected Name, Email, and Message fields with a Send button

## Design decisions

The type pairing is Fraunces for display and IBM Plex Sans for body, with IBM Plex Mono
carrying every number, eyebrow, tag, and button label. Fraunces is a variable serif with real
optical character, so at large sizes it reads like a plate from a scientific atlas rather than a
neutral headline font, which suits a subject who works in applied mathematics and machine
learning. IBM Plex Sans is the engineering counterweight, drawn for technical communication and
legible at sixteen pixels on the cream background. The mono face is the throughline that makes the
interface feel like an instrument: a data scientist's site should render its measurements in a
fixed-width readout, so the metrics and the interface chrome all speak in it.

The palette is the fixed Golden Summer Fields set: Cream for the page, Pale Gold for surfaces,
Sage for borders and hover states, Toasted Terracotta for every accent, and a deep-olive-to-
sage-gray ramp for text. The page sits on a scattered dot texture, two layers of radial-gradient
dots at non-matching scales (24px terracotta, 68px sage) so the overlap never repeats on a clean
beat, reading as chaff or pollen rather than a single coordinate grid. One accent treatment
appears everywhere, a two-pixel Toasted Terracotta left rule with eight pixels of padding,
implemented as the `.rail` utility and composed onto every section eyebrow, project card, and
metric pull-quote. It is the single visual throughline across all pages.

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
| `--color-bg` | `#fefae0` | Page background |
| `--color-surface` | `#faedcd` | Card and panel surfaces |
| `--color-surface-raised` | `#e9edc9` | Borders, hover states |
| `--color-accent` | `#8a5a3a` | CTAs, links, the rail, highlights |
| `--color-accent-soft` | `#9c6a40` | Accent hover |
| `--color-text-primary` | `#33331f` | Body copy |
| `--color-text-secondary` | `#5f5f45` | Captions, metadata |
| `--color-text-muted` | `#6f7658` | Placeholders, footer |
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

## Adding a new Journal entry

1. Add a Markdown file to `journal/entries/`, named `YYYY-MM-DD-slug.md`, with frontmatter
   (`title`, `date`, `description`, `tags`, and optionally `project` / `projectUrl` for a related
   project). See `journal/entries/2026-08-10-completing-my-ms-data-science-uva.md` for a working
   example.
2. Write the entry body in Markdown: `##` headings, paragraphs, lists, fenced code blocks,
   blockquotes, links, and `![alt](src)` images are all supported.
3. Run `node scripts/build-journal.js` to regenerate `journal/index.html` and every
   `journal/<slug>/index.html`.
4. Commit both the `.md` source and the generated HTML.

The build script discovers every file in `journal/entries/` and rewrites the Journal landing page
and entry pages from scratch each run, sorted newest first — no manual index editing.

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
