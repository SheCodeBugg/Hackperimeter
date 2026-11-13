import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import TingApp from '../perimeter-link-ting';
import BuddyApp from '../perimeter_link_gsu_perimeter_college_student_hub (1)';

// One link, two versions. The bar at the top switches between them.
// The choice is kept in the URL (#ting or #buddies) so either view can be shared.
type Version = 'ting' | 'buddies';
const fromHash = (): Version => (window.location.hash === '#buddies' ? 'buddies' : 'ting');

function VersionSwitcher() {
  const [version, setVersion] = useState<Version>(fromHash);

  useEffect(() => {
    const onHash = () => setVersion(fromHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const pick = (v: Version) => {
    window.location.hash = v;
    setVersion(v);
    window.scrollTo(0, 0);
  };

  const tabs: { id: Version; label: string }[] = [
    { id: 'ting', label: 'Ting version' },
    { id: 'buddies', label: 'Study Buddy version' }
  ];

  return (
    <>
      <div className="bg-[#002875] px-3 py-2 flex items-center justify-center gap-2">
        <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider text-amber-300 mr-1">
          Perimeter Link
        </span>
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => pick(t.id)}
            aria-pressed={version === t.id}
            className={`h-9 px-4 rounded-full text-sm font-bold transition ${
              version === t.id ? 'bg-white text-[#002875]' : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      {version === 'ting' ? <TingApp key="ting" /> : <BuddyApp key="buddies" />}
    </>
  );
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <VersionSwitcher />
  </React.StrictMode>
);
