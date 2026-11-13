import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// base './' keeps asset links relative so the site works at
// https://shecodebugg.github.io/Hackperimeter/ (GitHub Pages)
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()]
});
