import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

// base './' keeps asset links relative so the site works at
// https://shecodebugg.github.io/Hackperimeter/ (GitHub Pages)
// Each version of the app gets its own page:
//   /            -> perimeter_link_gsu_perimeter_college_student_hub.tsx (+ Study Groups)
//   /ting/       -> perimeter-link-ting.tsx
//   /v2/         -> perimeter_link_gsu_perimeter_college_student_hub (1).tsx
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        ting: resolve(__dirname, 'ting/index.html'),
        v2: resolve(__dirname, 'v2/index.html')
      }
    }
  }
});
