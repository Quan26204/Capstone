import React, { useEffect, useMemo, useState } from 'react';
import MapView from '../features/map/MapView.jsx';
import InfoPanel from '../features/panel/InfoPanel.jsx';
import SearchBox from '../components/SearchBox.jsx';
import '../components/SearchBox.css';

export default function Home() {
  const [poi, setPoi] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('/api/poi')
      .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
      .then(data => {
        const modelMap = {
          1: '/models/BST.splat',
          2: '/models/JG.splat',
          3: '/models/JSM.splat',
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

  // Filter POIs based on search query
  const filteredPOIs = useMemo(() => {
    if (!searchQuery) return poiReady;
    return poiReady.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery, poiReady]);

  return (
    <div style={{ height: '100vh', width: '100vw', position: 'relative' }}>
      <MapView poi={poiReady} />
      <InfoPanel />
      <SearchBox
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        results={filteredPOIs}
      />
    </div>
  );
}