# Portfolio — Akash M D

Static portfolio site for GitHub Pages.

## What is included
- `index.html` — the single-page portfolio
- `assets/css/style.css` — styling (dark theme)
- `assets/js/script.js` — small interactions (smooth scroll, coming-soon toast)

## Deploy to GitHub Pages (quick)
1. Create a new repository on GitHub (e.g. `portfolio`).
2. Push these files to the repository root.
3. Go to *Settings → Pages* (or *Pages* in the repo sidebar).
4. Select the `main` branch and `/ (root)` folder, save.
5. Wait a minute — site will be available at `https://<your-username>.github.io/<repo>` (or `https://<your-username>.github.io` if repo named `<your-username>.github.io`).

## How I wired projects
- The portfolio acts as a hub. Each project card links to external deployed apps or GitHub repos.
- Deploy your Flask/Streamlit apps separately (Render, Streamlit Cloud, Hugging Face, or a VPS), then replace the "Live Demo" `href="#"` with the real URL.

## Next steps I can help with
- Add actual live-demo links when you deploy the Flask and Streamlit apps.
- Generate thumbnails/screenshots and swap placeholders.
- Add a lightweight CMS or markdown-driven project listing if you want to manage projects without editing HTML.
- Convert to a React/Tailwind site if you want animations or filters.

----
Built for fast deployment on GitHub Pages.
