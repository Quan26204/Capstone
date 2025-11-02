import React from 'react';
import { useViewer } from '../../context/ViewerContext.jsx';
import { Link } from 'react-router-dom';
import './panel.css';

export default function InfoPanel() {
  const { selectedPOI, setSelectedPOI } = useViewer() || {};
  
  if (!selectedPOI) return null;

  const hasVideo = typeof selectedPOI.video === 'string' && selectedPOI.video.endsWith('.mp4');
  const hasImage = typeof selectedPOI.image === 'string';

  return (
    <aside className="info-panel">
      <button 
        className="close" 
        onClick={() => setSelectedPOI?.(null)}
        aria-label="Close panel"
      >
        ✕
      </button>

      <h3>{selectedPOI.name}</h3>
      
      {hasImage && (
        <img 
          className="info-thumb" 
          src={selectedPOI.image} 
          alt={selectedPOI.name}
          loading="lazy"
        />
      )}

      <p>{selectedPOI.description}</p>

      {hasVideo && (
        <video 
          className="info-video" 
          controls 
          src={selectedPOI.video}
          preload="metadata"
        />
      )}

      <div style={{ 
        marginTop: 16,
        display: 'flex',
        gap: 12,
        justifyContent: 'flex-start'
      }}>
        <Link 
          className="btn primary" 
          to={`/viewer/${selectedPOI.id}`}
        >
          View 3D Model
        </Link>
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