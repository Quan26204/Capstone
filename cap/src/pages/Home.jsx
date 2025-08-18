import React, { useEffect, useMemo, useState } from 'react';
import MapView from '../features/map/MapView.jsx';
import InfoPanel from '../features/panel/InfoPanel.jsx';

export default function Home() {
  const [poi, setPoi] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/poi')
      .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
      .then(data => {
        // Map of id -> modelUrl (and/or xy) you want to attach
        const modelMap = {
          1: '/models/BST.splat',
          2: '/models/JG.splat',
          3: '/models/JSM.splat',
          // 4: '/models/NR7.splat',
          // 5: '/models/JG-BST.splat',
        };
        const xyMap = {
          1: { x: 0.452, y: 0.381 },
          2: { x: 0.600, y: 0.400 },
          3: { x: 0.500, y: 0.520 },
        };

        const merged = (Array.isArray(data) ? data : []).map(p => ({
          ...p,
          modelUrl: modelMap[p.id] ?? p.modelUrl,
          xy: p.xy ?? xyMap[p.id] ?? p.xy
        }));

        console.log('POIs merged:', merged);
        setPoi(merged);
      })
      .catch(e => { console.error(e); setError(e.message); });
  }, []);

  const poiReady = useMemo(() => (Array.isArray(poi) ? poi : []).filter(p => p?.xy), [poi]);

  return (
    <div style={{ padding: 16 }}>
      <h2>La Trobe Campus – Interactive Tour</h2>
      {error && <p style={{ color: 'red' }}>Failed to load POIs: {error}</p>}
      <p>API total: {poi.length} | markers drawn: {poiReady.length}</p>

      <MapView poi={poiReady} />
      <InfoPanel />
    </div>
  );
}
