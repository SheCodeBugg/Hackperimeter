# Perimeter Link · HackPerimeter 2026

A student hub for GSU Perimeter College: campus feed, opportunities, Ask Panther Q&A,
**study groups**, and a points leaderboard.

**Live site:** https://shecodebugg.github.io/Hackperimeter/
(The earlier Crew prototype lives at `/crew/`.)

## Run it on your laptop
1. Install Node.js (LTS) from https://nodejs.org
2. In VS Code: **Terminal → New Terminal**, then:
   ```
   npm install
   npm run dev
   ```
3. Open the link it prints (usually http://localhost:5173). The page reloads every time you save.

## Where things live
- `perimeter_link_gsu_perimeter_college_student_hub.tsx`: main app (tabs, feed, opportunities, Q&A, hub)
- `StudyGroups.tsx`: Study Groups tab
- `src/main.tsx`, `index.html`, `vite.config.ts`: build setup (rarely need to touch)
- `public/crew/`: Crew prototype

## Deploying
Every push to `main` builds and publishes the site automatically
(GitHub Actions → `.github/workflows/deploy.yml`).
