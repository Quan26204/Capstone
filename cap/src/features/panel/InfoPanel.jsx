import React from 'react';
import { useViewer } from '../../context/ViewerContext.jsx';
import { useNavigate } from 'react-router-dom';
import './panel.css';

export default function InfoPanel() {
  const { selectedPOI, setSelectedPOI } = useViewer() || {};
  const navigate = useNavigate();

  if (!selectedPOI) return null;

  return (
    <aside className="info-panel" role="dialog" aria-label="POI details">
      <button
        className="close"
        onClick={() => setSelectedPOI?.(null)}
        aria-label="Close panel"
      >
        ✕
      </button>

      <h3>{selectedPOI.name}</h3>

      {selectedPOI.image && (
        <img
          className="info-thumb"
          src={selectedPOI.image}
          alt={selectedPOI.name}
          loading="lazy"
        />
      )}

      <p>{selectedPOI.description}</p>

      <div style={{ marginTop: 16, display: 'flex', gap: 12 }}>
        <button
          className="btn primary"
          onClick={() => navigate(`/viewer/${selectedPOI.id}`)}
        >
          View 3D Model
        </button>
        <button
          className="btn vr-btn"
          onClick={() => alert('VR mode coming soon!')}
        >
          VR
        </button>
        <button
          className="btn"
          onClick={() => setSelectedPOI?.(null)}
        >
          Close
        </button>
      </div>
    </aside>
  );
}