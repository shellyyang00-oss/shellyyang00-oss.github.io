# Xiaoqiu (Shelly) Yang — Academic Website

This repository powers [shellyyang00-oss.github.io](https://shellyyang00-oss.github.io/). It is a static, no-build academic website made with semantic HTML and responsive CSS.

## Site files

- `index.html` — page content, metadata, and the small mobile-navigation script
- `styles.css` — layout, visual system, responsive styles, and print styles
- `assets/img/profile.jpg` — profile portrait
- `assets/img/og.png` — 1200×630 social-sharing image
- `assets/img/favicon.svg` — browser icon
- `assets/cv/Xiaoqiu_Yang_Resume.pdf` — downloadable curriculum vitae
- `robots.txt` and `sitemap.xml` — search-engine discovery files
- `.nojekyll` — serves the repository directly through GitHub Pages

## Clone with GitHub CLI

```bash
gh repo clone shellyyang00-oss/shellyyang00-oss.github.io
cd shellyyang00-oss.github.io
```

## Preview locally

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

Open `http://127.0.0.1:8000/`. Check both desktop and mobile widths before merging changes into `main`.

## Preview-first update workflow

```bash
git switch -c preview/site-update
# Edit and review the site locally.
git add index.html styles.css assets README.md
git commit -m "Refresh academic website"
git push -u origin preview/site-update
gh pr create --fill
```

GitHub Pages deploys from the root of `main`. Merge a reviewed preview pull request only when the content and publication status are confirmed.

## Content maintenance

- Keep publication entries in reverse chronological order.
- Label each output clearly as `Published`, `Preprint`, or `Under review`.
- Update the website and CV together when publication titles or statuses change.
- Verify the CV PDF before publishing because it is publicly accessible.
