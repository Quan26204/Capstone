import React, { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Bounds, Splat, useGLTF } from '@react-three/drei';
import { useViewer } from '../../context/ViewerContext.jsx';
import './viewer.css';

function MeshModel({ url }) {
  const gltf = useGLTF(url);
  return <primitive object={gltf.scene} />;
}

export default function ModelViewer() {
  const { selectedPOI } = useViewer() || {};
  const url = selectedPOI?.modelUrl || '';

  const isSplat = useMemo(() => url?.toLowerCase().endsWith('.splat'), [url]);
  const isGlb   = useMemo(() => url?.toLowerCase().endsWith('.glb') || url?.toLowerCase().endsWith('.gltf'), [url]);

  return (
    <div className="viewer-root">
      <div className="viewer-header">
        <h3>3D Viewer</h3>
        <span className="muted">{selectedPOI?.name || 'Select a marker'}</span>
      </div>

      {isSplat && (
        <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 2]}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 10, 5]} intensity={0.8} />
          <Suspense fallback={null}>
            <Splat src={url} />
            <Environment preset="city" />
          </Suspense>
          <OrbitControls enableDamping />
        </Canvas>
      )}

      {isGlb && (
        <Canvas camera={{ position: [2.5, 2, 2.5], fov: 50 }} dpr={[1, 2]}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 10, 5]} intensity={0.8} />
          <Suspense fallback={null}>
            <Bounds fit clip observe margin={1.2}>
              <MeshModel url={url} />
            </Bounds>
            <Environment preset="city" />
          </Suspense>
          <OrbitControls enableDamping />
        </Canvas>
      )}

      {!url && <div className="viewer-placeholder"><p>Select a marker to load its 3D model.</p></div>}
    </div>
  );
}
