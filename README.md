# tksluangrath.github.io

My portfolio: https://tksluangrath.github.io

Hand-written static HTML, one CSS file, and a little vanilla JS. Hosted on GitHub Pages, no framework and no build server.

## Run it locally

```
python3 -m http.server 8765
```

Then open http://localhost:8765/.

## Add a journal entry

1. Add `journal/entries/YYYY-MM-DD-slug.md` with `title`, `date`, `description` and `tags` in the frontmatter.
2. Run `node scripts/build-journal.js`. It regenerates the journal index and every entry page.
3. Commit the `.md` and the generated HTML.

## Add a project

Copy a folder under `projects/`, edit the copy, add a card to `projects/index.html`, and add the URL to `sitemap.xml`.

## Change the CSS

Edit `assets/css/tokens.css` or `components.css`, then rebuild the minified file the site loads:

```
cat assets/css/tokens.css assets/css/components.css \
 | perl -0pe 's{/\*.*?\*/}{}gs' \
 | tr -s ' \t\r\n' ' ' \
 | sed -E 's/ *([{}:;,]) */\1/g; s/;}/}/g; s/^ //' \
 > assets/css/site.min.css
```

## Deploy

Push to `main`. GitHub Pages serves the repo root, and `.nojekyll` keeps Jekyll out of the way.
