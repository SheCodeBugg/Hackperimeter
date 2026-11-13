import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from '../perimeter-link';

// When someone opens the desktop view from the phone preview (/phone/),
// the link adds ?from=phone. Show a button to go back to the phone preview.
const cameFromPhone = new URLSearchParams(window.location.search).get('from') === 'phone';

function BackToMobile() {
  return (
    <a
      href="./phone/"
      className="hidden md:flex fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] items-center gap-2 h-11 px-4 rounded-full bg-[#0B1B3F] text-white text-sm font-bold shadow-lg hover:bg-[#1E3A8A] transition-colors"
    >
      <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="2" width="12" height="20" rx="2.5" />
        <line x1="11" y1="18" x2="13" y2="18" />
      </svg>
      Back to mobile view
    </a>
  );
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    {cameFromPhone && <BackToMobile />}
  </React.StrictMode>
);
