import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF, Bounds } from '@react-three/drei';
import { useViewer } from '../../context/ViewerContext.jsx';
import './viewer.css';

// Simple error boundary so a failed model load won't blank the app
class R3FErrorBoundary extends React.Component {
  constructor(props){ super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError(){ return { hasError: true }; }
  componentDidCatch(err){ console.error('3D load error:', err); }
  render(){ return this.state.hasError ? <div className="viewer-placeholder">Model failed to load.</div> : this.props.children; }
}

function Model({ url }) {
  const gltf = useGLTF(url);
  return <primitive object={gltf.scene} />;
}

export default function ModelViewer() {
  const { selectedPOI } = useViewer();
  const url = selectedPOI?.modelUrl || null;

  return (
    <div className="viewer-root">
      <div className="viewer-header">
        <h3>3D Viewer</h3>
        <span className="muted">{selectedPOI ? selectedPOI.name : 'Select a marker'}</span>
      </div>

      <Canvas camera={{ position: [2.5, 2.0, 2.5], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 10, 5]} intensity={0.8} />
        <R3FErrorBoundary>
          <Suspense fallback={null}>
            {url ? (
              <Bounds fit clip observe margin={1.2}>
                <Model url={url} />
              </Bounds>
            ) : null}
            <Environment preset="city" />
          </Suspense>
        </R3FErrorBoundary>
        <OrbitControls enableDamping />
      </Canvas>

      {!url && (
        <div className="viewer-placeholder">
          <p>Select a marker to load its 3D model.</p>
        </div>
      )}
    </div>
  );
}
