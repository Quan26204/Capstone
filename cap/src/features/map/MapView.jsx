import React, { useCallback, useRef, useState } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { useViewer } from '../../context/ViewerContext.jsx';
import './map.css';

export default function MapView({ poi, width = 1600, height = 1000 }) {
  const ctx = (typeof useViewer === 'function') ? useViewer() : undefined;
  const setSelectedPOI = ctx?.setSelectedPOI ?? (() => {});

  const wrapperRef = useRef(null);
  const imgRef = useRef(null);
  const [imgError, setImgError] = useState(false);
  const onImgError = () => setImgError(true);

  const onCanvasClick = useCallback((e) => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    console.log('Marker XY (0..1):', { x: +x.toFixed(4), y: +y.toFixed(4) });
  }, []);

  const items = Array.isArray(poi) ? poi : [];
  const markerSrc = '/markers/pin.png';

  return (
    <div className="map-root">
      <div className="map-toolbar" role="group" aria-label="Map controls" style={{ zIndex: 100, pointerEvents: 'auto' }}>
        <button onClick={() => wrapperRef.current?.zoomIn?.()} aria-label="Zoom in">＋</button>
        <button onClick={() => wrapperRef.current?.zoomOut?.()} aria-label="Zoom out">－</button>
        <button onClick={() => wrapperRef.current?.resetTransform?.()} aria-label="Reset view">Reset</button>
      </div>

      <TransformWrapper
        ref={wrapperRef}
        minScale={0.8}
        maxScale={5}
        wheel={{ step: 0.15 }}
        doubleClick={{ disabled: true }}
      >
        <TransformComponent>
          <div
            className="map-canvas"
            onClick={onCanvasClick}
            style={{
              width, height, position: 'relative', margin: '0 auto',
              borderRadius: 12, overflow: 'hidden', boxShadow: '0 6px 18px rgba(0,0,0,.08)', background: '#f5f6f8'
            }}
          >
            {!imgError ? (
              <img
                ref={imgRef}
                src="/map/campus.jpg"
                onError={onImgError}
                alt="Campus map"
                className="map-image"
                draggable={false}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', pointerEvents: 'none' }}
              />
            ) : (
              <div className="map-placeholder" style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center', background: '#e9eef5', color: '#6b7280' }}>
                <p>Add your map at <code>/public/map/campus.jpg</code></p>
              </div>
            )}

            {items.filter(p => p?.xy && typeof p.xy.x === 'number' && typeof p.xy.y === 'number').map(p => (
              <button
                key={p.id}
                className="poi-marker"
                title={p.name}
                aria-label={p.name}
                onClick={(e) => { e.stopPropagation(); setSelectedPOI(p); }}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedPOI(p); } }}
                style={{
                  position: 'absolute',
                  left: `${p.xy.x * 100}%`,
                  top:  `${p.xy.y * 100}%`,
                  transform: 'translate(-50%, -100%)',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  zIndex: 3,
                  padding: 0
                }}
              >
                <img src={markerSrc} alt="" className="poi-icon" style={{ width: 28, height: 28, objectFit: 'contain', pointerEvents: 'none', filter: 'drop-shadow(0 2px 6px rgba(0,0,0,.25))' }} />
              </button>
            ))}
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
}
