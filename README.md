# Perimeter Link · HackPerimeter 2026

A student hub for GSU Perimeter College: campus feed, opportunities, Ask Panther Q&A,
**study groups**, and a points leaderboard.

**Live site:** https://shecodebugg.github.io/Hackperimeter/ (Ting version)
**v2:** https://shecodebugg.github.io/Hackperimeter/v2/

## Run it on your laptop
1. Install Node.js (LTS) from https://nodejs.org
2. In VS Code: **Terminal → New Terminal**, then:
   ```
   npm install
   npm run dev
   ```
3. Open the link it prints (usually http://localhost:5173). The page reloads every time you save.

## Where things live
- `perimeter-link-ting.tsx`: main app (live at `/` and `/ting/`)
- `perimeter_link_gsu_perimeter_college_student_hub (1).tsx`: v2 (live at `/v2/`)
- `src/`, `index.html`, `ting/`, `v2/`, `vite.config.ts`: build setup (rarely need to touch)

## Deploying
Every push to `main` builds and publishes the site automatically
(GitHub Actions → `.github/workflows/deploy.yml`).
