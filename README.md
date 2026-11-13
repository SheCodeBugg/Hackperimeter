# Perimeter Link · HackPerimeter 2026

A student hub for GSU Perimeter College: campus feed, Study Buddies, opportunities,
Ask Panther Q&A, and a points leaderboard.

**Live site:** https://shecodebugg.github.io/Hackperimeter/?v=9

## Where things live
- `perimeter-link.tsx`: **the app** (edit this one). Built from `perimeter_link_gsu_perimeter_college_student_hub (3).tsx` with the Ting version's Opportunities tab.
- `perimeter-link-ting.tsx` and the `(1)` and `(3)` files: source versions, kept for reference. Not on the live site.
- `src/`, `index.html`, `vite.config.ts`: build setup (rarely need to touch)

## Run it on your laptop
1. Install Node.js (LTS) from https://nodejs.org
2. In VS Code: **Terminal → New Terminal**, then:
   ```
   npm install
   npm run dev
   ```
3. Open the link it prints (usually http://localhost:5173). The page reloads every time you save.

## Deploying
Every push to `main` builds and publishes the site automatically
(GitHub Actions → `.github/workflows/deploy.yml`).
