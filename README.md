# Xiaoqiu (Shelly) Yang — Academic Website

This is a static academic personal website prepared for GitHub Pages. It uses only HTML, CSS, SVG, and a small inline script for the footer year, so it can be hosted directly from a GitHub repository without a build step.

## Files

- `index.html` — main website content
- `styles.css` — responsive styling
- `assets/cv/Xiaoqiu_Yang_Resume.pdf` — downloadable CV/resume
- `assets/img/profile.jpg` — profile image
- `assets/img/profile-placeholder.svg` — fallback placeholder profile image
- `assets/img/favicon.svg` — browser tab icon
- `.nojekyll` — tells GitHub Pages to serve the files as-is

## How to publish on GitHub Pages

1. Create a new GitHub repository. For a personal site, name it `YOUR-GITHUB-USERNAME.github.io`.
2. Unzip this package.
3. Upload all files and folders to the repository root.
4. Commit the files to the `main` branch.
5. In GitHub, go to **Settings → Pages**.
6. Under **Build and deployment**, choose **Deploy from a branch**.
7. Select the `main` branch and `/root`, then save.
8. Your site should appear at `https://YOUR-GITHUB-USERNAME.github.io/` after GitHub finishes deploying.

## Suggested edits after publishing

- Add links to LinkedIn, ORCID, or GitHub when available.
- Replace the CV PDF whenever you update your resume.
- Review the CV PDF before publishing because public GitHub Pages sites are accessible online.

## Local preview

Open `index.html` in a browser, or run a simple local server from this folder:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.
