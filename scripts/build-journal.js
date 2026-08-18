#!/usr/bin/env node
/*
 * build-journal.js — generates /journal/ and /journal/<slug>/ from Markdown
 * source in journal/entries/*.md. No npm dependencies: a small frontmatter
 * parser and a small Markdown-subset-to-HTML converter, sized to what the
 * Journal actually needs (headings, paragraphs, lists, code fences,
 * blockquotes, links, bold/italic, inline code).
 *
 * Usage: node scripts/build-journal.js
 * Run this after adding or editing a file in journal/entries/, then commit
 * both the .md source and the generated journal/**\/index.html files.
 */
"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const ENTRIES_DIR = path.join(ROOT, "journal", "entries");
const JOURNAL_DIR = path.join(ROOT, "journal");
const SITE_URL = "https://tksluangrath.github.io";

// --- frontmatter (YAML subset: strings, booleans, and "- item" lists) -----
function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) throw new Error("Missing frontmatter block");
  const [, fmBlock, body] = match;
  const data = {};
  const lines = fmBlock.split("\n");
  let currentListKey = null;
  for (const line of lines) {
    const listItem = line.match(/^\s*-\s+(.*)$/);
    if (listItem && currentListKey) {
      data[currentListKey].push(listItem[1].trim().replace(/^["']|["']$/g, ""));
      continue;
    }
    const kv = line.match(/^([A-Za-z_]+):\s*(.*)$/);
    if (!kv) continue;
    const [, key, rawValue] = kv;
    const value = rawValue.trim();
    if (value === "") {
      data[key] = [];
      currentListKey = key;
    } else {
      currentListKey = null;
      if (value === "true" || value === "false") data[key] = value === "true";
      else data[key] = value.replace(/^["']|["']$/g, "");
    }
  }
  return { data, body: body.trim() };
}

// --- inline markdown: bold, italic, inline code, links ---------------------
function inline(text) {
  return text
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>");
}

// --- block markdown: fenced code, blockquotes, lists, headings, paragraphs -
// Content is grouped under each `## heading` into a <section class="article__section">
// to match the hand-authored project article pattern. Anything before the
// first `##` is emitted directly (the article hook / intro).
function markdownToArticleHtml(md) {
  const lines = md.split("\n");
  let html = "";
  let inSection = false;
  let i = 0;

  function closeSection() {
    if (inSection) { html += "</section>\n"; inSection = false; }
  }

  while (i < lines.length) {
    const line = lines[i];

    if (/^##\s+/.test(line)) {
      closeSection();
      html += `<section class="article__section reveal">\n<h2 class="article__heading">${inline(line.replace(/^##\s+/, ""))}</h2>\n`;
      inSection = true;
      i++;
      continue;
    }

    if (/^```/.test(line)) {
      const lang = line.replace(/^```/, "").trim();
      const codeLines = [];
      i++;
      while (i < lines.length && !/^```/.test(lines[i])) { codeLines.push(lines[i]); i++; }
      i++; // skip closing fence
      const cls = lang ? ` class="language-${lang}"` : "";
      const escaped = codeLines.join("\n").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      html += `<pre><code${cls}>${escaped}</code></pre>\n`;
      continue;
    }

    if (/^>\s?/.test(line)) {
      const quoteLines = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) { quoteLines.push(lines[i].replace(/^>\s?/, "")); i++; }
      html += `<blockquote>${inline(quoteLines.join(" "))}</blockquote>\n`;
      continue;
    }

    if (/^[-*]\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i])) { items.push(lines[i].replace(/^[-*]\s+/, "")); i++; }
      html += `<ul class="article__list">${items.map((it) => `<li>${inline(it)}</li>`).join("")}</ul>\n`;
      continue;
    }

    const imageLine = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imageLine) {
      const [, alt, src] = imageLine;
      html += `<figure class="reveal" style="margin:var(--space-6) 0"><img src="${src}" alt="${alt}" style="border-radius:var(--radius-md);border:1px solid var(--color-surface-raised)"></figure>\n`;
      i++;
      continue;
    }

    if (line.trim() === "") { i++; continue; }

    // paragraph: consume until blank line or next block starter
    const paraLines = [line];
    i++;
    while (i < lines.length && lines[i].trim() !== "" && !/^(##\s|```|>\s?|[-*]\s)/.test(lines[i])) {
      paraLines.push(lines[i]);
      i++;
    }
    html += `<p>${inline(paraLines.join(" "))}</p>\n`;
  }
  closeSection();
  return html;
}

function formatDate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).toUpperCase();
}

function slugFromFilename(filename) {
  return filename.replace(/\.md$/, "").replace(/^\d{4}-\d{2}-\d{2}-/, "");
}

const HEAD_FONTS = `  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,700;9..144,900&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&display=swap">
  <link rel="stylesheet" href="/assets/css/site.min.css">
  <script src="/assets/js/main.js" defer></script>`;

function nav(active) {
  const link = (href, label, key) =>
    `<li><a class="nav__link${active === key ? " nav__link--active" : ""} anim-item anim-item--down" href="${href}">${label}</a></li>`;
  return `  <nav class="nav">
    <div class="nav__inner">
      <a class="nav__brand anim-item anim-item--down" href="/">[T]</a>
      <ul class="nav__links">
        ${link("/projects/", "Work", "work")}
        ${link("/journal/", "Journal", "journal")}
        ${link("/about/", "About", "about")}
        ${link("/about/#contact", "Contact", "contact")}
      </ul>
    </div>
  </nav>`;
}

const FOOTER = `  <footer class="footer">
    <div class="wrap footer__inner">
      <span class="footer__note">Terrance Luangrath — Washington, DC Metro Area</span>
      <div class="footer__links">
        <a class="footer__link" href="https://github.com/tksluangrath" target="_blank" rel="noopener">GitHub</a>
        <a class="footer__link" href="https://huggingface.co/tksluangrath" target="_blank" rel="noopener">Hugging Face</a>
        <a class="footer__link" href="https://www.linkedin.com/in/terranceluangrath/" target="_blank" rel="noopener">LinkedIn</a>
        <a class="footer__link" href="mailto:tksluangrath@gmail.com">Email</a>
      </div>
    </div>
  </footer>`;

const LOAD_SCRIPT = `  <script>document.documentElement.classList.add('js');addEventListener('load',function(){setTimeout(function(){if(!document.body.classList.contains('is-loaded')){document.body.classList.add('is-loaded');document.querySelectorAll('.reveal').forEach(function(e){e.classList.add('is-visible')});}},1500);});</script>`;

function entryPageHtml(entry) {
  const { data, slug, bodyHtml } = entry;
  const robots = data.placeholder ? `\n  <meta name="robots" content="noindex">` : "";
  const canonical = `${SITE_URL}/journal/${slug}/`;
  const tagsHtml = (data.tags || []).map((t) => `<span class="tag">${t}</span>`).join("");
  const related = data.project
    ? `\n          <div class="links-row reveal">
            <a class="links-row__item" href="${data.projectUrl || "/projects/"}">${data.project} →</a>
          </div>`
    : "";

  return `<!doctype html>
<html lang="en">
<head>
${LOAD_SCRIPT}
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${data.title} — Journal — Terrance Luangrath</title>
  <meta name="description" content="${data.description}">
  <link rel="canonical" href="${canonical}">${robots}
  <meta property="og:type" content="article">
  <meta property="og:title" content="${data.title}">
  <meta property="og:description" content="${data.description}">
  <meta property="og:url" content="${canonical}">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="${data.title}">
  <meta name="twitter:description" content="${data.description}">
${HEAD_FONTS}
</head>
<body>
${nav("journal")}

  <main>
    <section class="section">
      <div class="wrap">
        <p class="reveal"><a class="links-row__item" href="/journal/">← Back to Journal</a></p>

        <article class="article" style="margin-top:var(--space-5)">
          <h1 class="article__title reveal">${data.title}</h1>
          <p class="eyebrow rail reveal" style="margin-bottom:var(--space-6)">${formatDate(data.date)}${
            data.tags && data.tags.length ? " · " + data.tags.join(" · ") : ""
          }</p>

          ${bodyHtml}

          <div class="tag-list reveal" style="margin-top:var(--space-6)">${tagsHtml}</div>
${related}
          <div class="links-row reveal">
            <a class="links-row__item" href="/journal/">← Back to Journal</a>
          </div>
        </article>
      </div>
    </section>
  </main>

${FOOTER}
</body>
</html>
`;
}

function journalIndexHtml(entries) {
  const cards = entries
    .map((entry) => {
      const { data, slug } = entry;
      const tagsHtml = (data.tags || []).map((t) => `<span class="tag">${t}</span>`).join("");
      return `          <a class="journal-card reveal" href="/journal/${slug}/">
            <p class="journal-card__date">${formatDate(data.date)}</p>
            <h2 class="journal-card__title">${data.title}</h2>
            <p class="journal-card__excerpt">${data.description}</p>
            <div class="journal-card__footer">
              <div class="journal-card__tags tag-list">${tagsHtml}</div>
              <span class="journal-card__arrow" aria-hidden="true">→</span>
            </div>
          </a>`;
    })
    .join("\n\n");

  return `<!doctype html>
<html lang="en">
<head>
${LOAD_SCRIPT}
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Journal — Terrance Luangrath</title>
  <meta name="description" content="A collection of things I've learned, built, and explored — fine-tuning notes, engineering lessons, and the thinking behind the projects.">
  <link rel="canonical" href="${SITE_URL}/journal/">
${HEAD_FONTS}
</head>
<body>
${nav("journal")}

  <main>
    <header class="section" style="padding-bottom:var(--space-6)">
      <div class="wrap">
        <span class="eyebrow rail anim-item" data-anim="name">Journal</span>
        <h1 class="hero__name anim-item" data-anim="name" style="font-size:var(--text-3xl)">A collection of things I've learned, built, and explored.</h1>
      </div>
    </header>

    <section class="section" style="padding-top:0">
      <div class="wrap">
        <div class="project-grid">
${cards}
        </div>
      </div>
    </section>
  </main>

${FOOTER}
</body>
</html>
`;
}

function build() {
  const files = fs.readdirSync(ENTRIES_DIR).filter((f) => f.endsWith(".md"));
  const entries = files.map((filename) => {
    const raw = fs.readFileSync(path.join(ENTRIES_DIR, filename), "utf8");
    const { data, body } = parseFrontmatter(raw);
    const slug = slugFromFilename(filename);
    const bodyHtml = markdownToArticleHtml(body);
    return { data, slug, bodyHtml };
  });
  entries.sort((a, b) => (a.data.date < b.data.date ? 1 : -1));

  for (const entry of entries) {
    const dir = path.join(JOURNAL_DIR, entry.slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "index.html"), entryPageHtml(entry));
    console.log("wrote", `journal/${entry.slug}/index.html`);
  }

  fs.writeFileSync(path.join(JOURNAL_DIR, "index.html"), journalIndexHtml(entries));
  console.log("wrote", "journal/index.html");
}

build();
