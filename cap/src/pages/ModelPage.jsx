import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useViewer } from '../context/ViewerContext.jsx';
import ModelViewer from '../features/viewer/ModelViewer.jsx';

export default function ModelPage() {
  const { id } = useParams();
  const { selectedPOI, setSelectedPOI } = useViewer() || {};
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await fetch('/api/poi');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const all = await res.json();
        const found = all.find(p => String(p.id) === String(id));
        if (active) {
          setSelectedPOI?.(found || null);
          setLoading(false);
        }
      } catch (e) {
        if (active) { setErr(e.message); setLoading(false); }
      }
    })();
    return () => { active = false; };
  }, [id, setSelectedPOI]);

  if (loading) return <div style={{ padding: 16 }}><Link to="/">← Back</Link><p>Loading…</p></div>;
  if (err)     return <div style={{ padding: 16 }}><Link to="/">← Back</Link><p style={{color:'red'}}>Error: {err}</p></div>;
  if (!selectedPOI) return <div style={{ padding: 16 }}><Link to="/">← Back</Link><p>POI not found.</p></div>;

  return (
    <div style={{ padding: 16 }}>
      <div style={{ display:'flex', alignItems:'center', gap:12 }}>
        <Link to="/">← Back to Map</Link>
        <h2 style={{ margin:0 }}>{selectedPOI.name}</h2>
      </div>
      <p style={{ marginTop: 4 }}>{selectedPOI.description}</p>

      {/* Renders .splat via <Splat /> and .glb via GLTF loader */}
      <ModelViewer />

      {selectedPOI.image && (
        <img
          src={selectedPOI.image}
          alt={selectedPOI.name}
          style={{ width: 320, borderRadius: 12, marginTop: 12 }}
        />
      )}
    </div>
  );
}
