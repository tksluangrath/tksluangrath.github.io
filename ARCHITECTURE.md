# Architecture

This document governs the build. It records the decisions that the token file and every
page depend on, so that anyone extending the site later works from the same contract rather
than guessing at intent.

## Stack decision

The site is plain HTML, CSS, and vanilla JavaScript with no build server and no Jekyll. The
audit of the previous site found nothing that genuinely needed Jekyll: the whole thing was a
single `README.md` rendered through the `minimal` remote theme, which means the "site" was one
document and a stylesheet supplied by someone else. There was no data layer, no include graph,
no collection logic to preserve. Replicating that in Jekyll would have added a templating layer
whose only job is to stamp a shared header and footer onto a handful of pages, and it would
have pulled in a theme whose typography and color we are replacing wholesale. Hand-authored
HTML gives tighter control over the markup the design system needs, loads faster because there
is no theme CSS to override, and deploys the same way. A `.nojekyll` file at the repository root
tells GitHub Pages to serve the files verbatim instead of running them through the Jekyll
pipeline.

## Typography

The display face is Fraunces and the body face is IBM Plex Sans, with IBM Plex Mono carrying
every number, eyebrow, tag, and button label. Fraunces is a variable serif built with optical
sizing and a set of deliberate "tics" in its letterforms; at large sizes it reads like a plate
from a scientific atlas rather than a neutral headline font, which is exactly the register this
subject wants — the weight and exactness of scientific publishing, but with a pulse. IBM Plex
Sans is the engineering counterweight: it was drawn for a technology company's technical
communication, it stays legible at sixteen pixels on the dark Ink Black background, and it
carries none of the default-answer blandness that Inter or Roboto would. The mono face is the
throughline that makes the site feel like an instrument. A data scientist's page should render
its measurements in a fixed-width readout, so the metrics, the section eyebrows, the navigation,
and the calls to action all speak in IBM Plex Mono, which keeps the numbers aligned and the
interface elements reading as precise rather than decorative. Fonts load through a preconnect to
the Google Fonts hosts followed by a single stylesheet link, never an `@import` inside CSS, so
the browser can start the font fetch before it finishes parsing the page.

## Background texture

The page sits on a dot grid: one-pixel dots on a twenty-four-pixel lattice in Steel Blue at
fifteen percent opacity, implemented as `--texture-bg` in `tokens.css` and applied to `body`.
The flat Ink Black fill reads dead at large viewport sizes, and of the three candidate textures
the dot grid is the one that means something here. It reads as coordinate space, as graph paper,
as the plane the data is plotted on, and it pairs cleanly with the amber rail without competing
with it. The diagonal drafting rule and the radial bloom were both rejected: the rule fights the
strict left-aligned rhythm, and the bloom is a gradient effect that would pull focus from the
one place gold is allowed to live.

## Motion

The signature moment is page load. On `DOMContentLoaded` the navigation links fade down from the
top staggered forty milliseconds apart, the hero name reveals with a short horizontal translate
and fade, the subhead fades up after the name, and the calls to action fade in last. The stagger
is grouped by role rather than applied per letter, which avoids the crawl effect where a name
assembles one character at a time. After load the site holds still: hover states are CSS
transitions of a hundred and fifty milliseconds, and scroll reveals are a single class flip
driven by one `IntersectionObserver` that translates an element twenty-four pixels up into place
and fades it in over three hundred milliseconds. There is no parallax, no autoplay, no
scroll-jacking, and no counter that ticks a number up to its value. Everything animated is
wrapped in `@media (prefers-reduced-motion: no-preference)`, and the JavaScript checks the same
query before scheduling anything, so a visitor who asks for reduced motion gets the finished page
with no transitions at all.

## Layout signature

One accent treatment appears everywhere: a two-pixel vertical rule in Amber Gold with eight
pixels of padding before the content. It is defined once as the `.rail` utility and composed onto
section eyebrows, project cards, and every metric pull-quote. No underlines, no background
highlights, no dot leaders. The rail is the single visual throughline that ties the home page,
the projects index, and all eleven detail pages into one object.

## Page map

```
/                          index.html                         Hero, skills strip, 3 featured projects, footer
/projects/                 projects/index.html                All 11 projects, tag-filterable
/projects/<slug>/          projects/<slug>/index.html         11 individual project pages
/about/                    about/index.html                   Bio rewrite + contact form
/404.html                  404.html                           On-brand not-found page
/sitemap.xml               sitemap.xml                        All page URLs
```

The eleven slugs are `aura-ed`, `speech-isolation-keyword-spotting`, `resumeiq`,
`gold-rush-fitness`, `course-recommendation-agent`, `pandas-vs-polars-benchmark`,
`investment-portfolio-analytics`, `fraud-detection`, `haiti-disaster-relief`,
`energy-demand-forecasting`, and `international-students-mental-health`.

## Navigation

Exactly four labels in this order: Work, About, GitHub, Contact. Work links to `/projects/`.
About links to `/about/`. GitHub links to the external profile at
`https://github.com/tksluangrath` and opens in a new tab. Contact is an anchor to the contact
section at `/about/#contact`. The bar is sticky, starts transparent, and gains the Prussian Blue
surface and a Steel Blue bottom border once the page scrolls past eight pixels.

## Component inventory

- `nav` — sticky top bar, transparent to surface on scroll
- `.hero` — name, positioning statement, two calls to action
- `.skills` — horizontally scrollable row of inline-SVG icon and label pairs
- `.project-card` — surface panel with the rail, a metric callout, tags, and links
- `.project-card--featured` — larger variant used on the home page
- `.filter-bar` — tag filter buttons for the projects index
- `.project-hero` — inline-SVG geometric pattern header for detail pages
- `.pull-quote` — a metric or result set apart at display scale with the rail
- `.tag` — mono pill for a single technology
- `.footer` — GitHub, LinkedIn, and email links only
- `.contact-form` — Formspree-connected Name, Email, and Message fields with a Send button

## Naming

Components follow BEM: `Block__Element--Modifier`. A block is a standalone component, an element
is a part meaningful only inside its block, and a modifier is a variant flag. Utilities that
compose onto anything — `.rail`, `.reveal`, `.wrap`, `.eyebrow` — sit outside the BEM tree. The
full convention note lives at the top of `components/components.css` as well.

## Token contract

`tokens.css` is the single source of truth. No other stylesheet is permitted to write a literal
hex value; every color, size, space, and duration resolves from a custom property defined there.
The Deep Sea palette is fixed and is not reopened. The production stylesheet `site.min.css` is
`tokens.css` followed by `components.css` with comments and whitespace stripped, produced by a
one-line shell command documented in `README.md`.
