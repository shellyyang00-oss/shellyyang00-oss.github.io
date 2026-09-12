# Xiaoqiu (Shelly) Yang: academic website

Source for [shellyyang00-oss.github.io](https://shellyyang00-oss.github.io/), hosted by GitHub Pages from the root of `main`.

The site has five independently addressable pages: About, Research, Publications, Experience, and Contact. Tab navigation, CV links, publication summaries, and citation downloads work without JavaScript. A small script updates the copyright year and redirects legacy homepage fragment links to their new pages.

The color theme defaults to Auto, following the visitor's device appearance and changing with it. The header control cycles through Auto, Light, and Dark; a manual choice persists across pages and visits. Automatic appearance also works without JavaScript. Print styles always use a light background.

## Editing content

- `content/about.html`: biography and recent publication highlight
- `content/research.html`: research questions and conceptual framework
- `content/publications.html`: papers, author lists, summaries, and manuscript status
- `content/experience.html`: research training, education, awards, and mentoring
- `content/contact.html`: professional contact details
- `scripts/build.py`: shared page structure, metadata, navigation, and sitemap
- `styles.css`: responsive layout, typography, and print styles
- `assets/theme.js`: early theme selection, saved preferences, and theme control
- `assets/figures/`: original, editable SVG research illustrations
- `assets/img/profile.jpg`: portrait prepared for the web
- `assets/img/og.png`: social sharing image
- `assets/citations/`: per-paper and combined BibTeX downloads
- `assets/cv/Xiaoqiu_Yang_Resume.pdf`: existing downloadable CV

After editing content or the shared layout, regenerate the committed HTML with Python 3. The generator uses only the standard library; GitHub Pages serves the generated files directly.

The generator versions asset URLs from their file contents, so updated styles and images load correctly for returning visitors.

```sh
python3 scripts/build.py
python3 scripts/build.py --check
python3 scripts/check_site.py
node --check assets/site.js
node --check assets/theme.js
```

To preview:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Open `http://127.0.0.1:8000/`. Check desktop and phone layouts, navigation, and research figures in both color themes before publishing. Confirm that Auto follows device appearance and that manual choices persist after navigation or reload.

The optional `scripts/render-social.cjs` renders the social card using Node.js and the `sharp` package. It is not needed to build or serve the website.

## Academic content

Keep publication titles and author order consistent with publisher records. The 2026 Cardiovascular Research paper is published online as an accepted manuscript; its DOI is [10.1093/cvr/cvag190](https://doi.org/10.1093/cvr/cvag190). The 2023 and 2022 entries use [10.1161/ATVBAHA.123.319145](https://doi.org/10.1161/ATVBAHA.123.319145) and [10.1016/j.isci.2022.105390](https://doi.org/10.1016/j.isci.2022.105390).

The separate manuscript entry records the status supplied in 2025. Confirm its identity and current status before combining it with another paper or changing its publication category. The CV is a separately maintained PDF.

Research illustrations show a conceptual framework, not experimental data or a complete causal pathway. Preserve the schematic captions when editing the figures.

## GitHub workflow

```sh
gh repo clone shellyyang00-oss/shellyyang00-oss.github.io
git switch -c codex/site-update
# Edit, regenerate, and verify the site.
git add .
git commit -m "Update academic website"
git push -u origin codex/site-update
gh pr create --fill
```

Merging the reviewed changes into `main` publishes them through GitHub Pages. `.nojekyll` keeps the site independent of Jekyll. `404.html`, `robots.txt`, and the generated `sitemap.xml` support navigation and search discovery.
