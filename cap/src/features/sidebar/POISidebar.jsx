import React, { useMemo, useState } from 'react';
import { useViewer } from '../../context/ViewerContext.jsx';
import './sidebar.css';

export default function POISidebar({ poi }) {
  const { setSelectedPOI } = useViewer();
  const [q, setQ] = useState('');

  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase();
    if (!qq) return poi;
    return poi.filter(p => (p.name || '').toLowerCase().includes(qq) || (p.description || '').toLowerCase().includes(qq));
  }, [poi, q]);

  const focusPOI = (p) => {
    setSelectedPOI(p);
    window.dispatchEvent(new CustomEvent('focus-poi', { detail: p }));
  };

  return (
    <aside className="poi-sidebar">
      <div className="search">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search places…" />
      </div>

      <ul className="poi-list">
        {filtered.map(p => (
          <li key={p.id} className="poi-card" onClick={() => focusPOI(p)}>
            {p.image && <img src={p.image} alt="" />}
            <div className="meta">
              <h4>{p.name}</h4>
              <p>{p.description}</p>
            </div>
          </li>
        ))}
        {!filtered.length && <p className="muted">No results</p>}
      </ul>
    </aside>
  );
}
