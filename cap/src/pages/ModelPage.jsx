import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useViewer } from '../context/ViewerContext.jsx';
import ModelViewer from '../features/viewer/ModelViewer.jsx';

export default function ModelPage() {
  const { id } = useParams();
  const { selectedPOI } = useViewer() || {};
  const [modelUrl, setModelUrl] = useState(null);
  const [title, setTitle] = useState('');

  // fallback mapping when user navigates directly
  const modelMap = {
    '1': '/models/BST.splat',
    '2': '/models/JG-BST.splat',
    '3': '/models/JG.splat',
    '4': '/models/JSM.splat',
    '5': '/models/NR7.splat',
  };

  useEffect(() => {
    // prefer selectedPOI from context if it matches route id
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
    <div style={{ height: '100vh', position: 'relative' }}>
      <h2 style={{ position: 'absolute', left: 16, top: 8, zIndex: 2000 }}>
        {title}
      </h2>
      <ModelViewer modelUrl={modelUrl} />
    </div>
  );
}