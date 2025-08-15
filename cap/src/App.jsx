import React, { useEffect, useMemo, useState } from 'react';
import MapView from './features/map/MapView.jsx';
import InfoPanel from './features/panel/InfoPanel.jsx';

export default function App() {
  const [poi, setPoi] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/poi')
      .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
      .then(data => { console.log('POIs from API:', data); setPoi(data); })
      .catch(e => { console.error(e); setError(e.message); });
  }, []);

  const poiReady = useMemo(() => {
    const ready = (Array.isArray(poi) ? poi : []).filter(p => p?.xy);
    console.log('poiReady count:', ready.length, ready.slice(0,3));
    return ready;
  }, [poi]);

  const fallback = [{ id: 999, name: 'Fallback', xy: { x: 0.5, y: 0.5 }, description: 'Fallback POI' }];
  const markers = poiReady.length ? poiReady : fallback;

  return (
    <div style={{ padding: 16 }}>
      <h2>La Trobe Campus – Interactive Tour</h2>
      {error && <p style={{ color: 'red' }}>Failed to load POIs: {error}</p>}
      <p>API total: {poi.length} | markers drawn: {markers.length}</p>

      <MapView poi={markers} />
      <InfoPanel />
    </div>
  );
}
