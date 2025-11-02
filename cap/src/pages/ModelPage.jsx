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

  return (
    <div style={{ height: '100vh', width: '100vw', position: 'relative' }}>
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
      <h2
        style={{
          position: 'absolute',
          left: '50%',
          top: -5,
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