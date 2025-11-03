import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useViewer } from '../context/ViewerContext.jsx';
import ModelViewer from '../features/viewer/ModelViewer.jsx';

export default function ModelPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedPOI } = useViewer() || {};
  const [modelUrl, setModelUrl] = useState(null);
  const [title, setTitle] = useState('');
  const [showInfo, setShowInfo] = useState(false);

  const modelMap = {
    '1': '/models/BST.splat',
    '2': '/models/JG-BST.splat',
    '3': '/models/JG.splat',
    '4': '/models/JSM.splat',
    '5': '/models/NR7.splat',
  };

  useEffect(() => {
    if (selectedPOI && String(selectedPOI.id) === String(id)) {
      setModelUrl(selectedPOI.modelUrl || selectedPOI.model || null);
      setTitle(selectedPOI.name || `Model ${id}`);
    } else {
      setModelUrl(modelMap[id] || null);
      setTitle(`Model ${id}`);
    }
  }, [id, selectedPOI]);

  if (!modelUrl) return <div style={{ padding: 20 }}>Model not found.</div>;

  // Info to show in the box
  const infoName = selectedPOI?.name || title;
  const infoDesc = selectedPOI?.description || 'No description available.';
  const infoCode = selectedPOI?.buildingCode || 'N/A';
  const infoTime = selectedPOI?.timeBuilt || 'N/A';
  const infoCarpark = selectedPOI?.closestCarpark || 'N/A';

  return (
    <div style={{ height: '100vh', width: '100vw', position: 'relative' }}>
      {/* Back button */}
      <button
        style={{
          position: 'absolute',
          left: 16,
          top: 16,
          zIndex: 2100,
          padding: '8px 16px',
          background: '#1976d2',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: 500,
          fontSize: '1rem'
        }}
        onClick={() => navigate('/')}
      >
        ← Back to Map
      </button>

      {/* Info button on the left */}
      <button
        style={{
          position: 'absolute',
          left: 16,
          top: 80,
          zIndex: 2100,
          padding: '8px 16px',
          background: '#ff0000ff',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: 500,
          fontSize: '1rem'
        }}
        onClick={() => setShowInfo(v => !v)}
      >
        ℹ️ Info
      </button>

      {/* Info box */}
      {showInfo && (
        <div
          style={{
            position: 'absolute',
            left: 16,
            top: 120,
            width: 280,
            background: '#fff',
            borderRadius: 12,
            boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
            padding: 20,
            zIndex: 2200,
            color: '#222'
          }}
        >
          <h3 style={{ marginTop: 0 }}>{infoName}</h3>
          <p style={{ marginBottom: 8 }}>{infoDesc}</p>
          <div><b>Building Code:</b> {infoCode}</div>
          <div><b>Time Built:</b> {infoTime}</div>
          <div><b>Closest Carpark:</b> {infoCarpark}</div>
        </div>
      )}

      {/* Title in the center */}
      <h2
        style={{
          position: 'absolute',
          left: '50%',
          top: -7,
          transform: 'translateX(-50%)',
          zIndex: 2000,
          textAlign: 'center',
          color: '#ffffffff'
        }}
      >
        {title}
      </h2>
      <ModelViewer modelUrl={modelUrl} />
    </div>
  );
}