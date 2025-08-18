import React from 'react';
import { useViewer } from '../../context/ViewerContext.jsx';
import { Link } from 'react-router-dom';
import './panel.css';

export default function InfoPanel() {
  const { selectedPOI, setSelectedPOI } = useViewer() || {};
  if (!selectedPOI) return null;

  const hasVideo = typeof selectedPOI.video === 'string' && selectedPOI.video.endsWith('.mp4');

  return (
    <aside className="info-panel">
      <button className="close" onClick={() => setSelectedPOI?.(null)}>✕</button>
      <h3>{selectedPOI.name}</h3>
      <p>{selectedPOI.description}</p>
      {selectedPOI.image && <img className="info-thumb" src={selectedPOI.image} alt={selectedPOI.name} />}
      {hasVideo && <video className="info-video" controls src={selectedPOI.video} />}

      <div style={{ marginTop: 12, display:'flex', gap:8 }}>
        <Link className="btn primary" to={`/viewer/${selectedPOI.id}`}>Open 3D model</Link>
        <button className="btn" onClick={() => setSelectedPOI?.(null)}>Close</button>
      </div>
    </aside>
  );
}
