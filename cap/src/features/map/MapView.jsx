import React, { useCallback, useRef, useState } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { useViewer } from '../../context/ViewerContext.jsx';
import './map.css';

export default function MapView({ poi, width = 1600, height = 1000 }) {
  const ctx = useViewer?.();
  const setSelectedPOI = ctx?.setSelectedPOI ?? (() => {});

  const imgRef = useRef(null);
  const [imgError, setImgError] = useState(false);
  const onImgError = () => setImgError(true);

  // Click to log normalized coords (helps you author xy later)
  const onCanvasClick = useCallback((e) => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    console.log('Marker XY (0..1):', { x: +x.toFixed(4), y: +y.toFixed(4) });
  }, []);

  const items = Array.isArray(poi) ? poi : [];
  const markerSrc = '/markers/pin.png';                  // <-- your custom marker from 3D folder

  return (
    <div className="map-root">
      <TransformWrapper minScale={0.8} maxScale={5} wheel={{ step: 0.15 }} doubleClick={{ disabled: true }}>
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            <div className="map-toolbar">
              <button onClick={zoomIn}>＋</button>
              <button onClick={zoomOut}>－</button>
              <button onClick={resetTransform}>Reset</button>
            </div>

            <TransformComponent>
              <div className="map-canvas" style={{ width, height }} onClick={onCanvasClick}>
                {!imgError ? (
                  <img
                    ref={imgRef}
                    src="/map/campus.jpg"
                    onError={onImgError}
                    alt="Campus map"
                    className="map-image"
                    draggable={false}
                  />
                ) : (
                  <div className="map-placeholder">
                    <div className="grid" />
                    <p>Add your map at <code>/public/map/campus.jpg</code></p>
                  </div>
                )}

                {items.filter(p => p?.xy).map(p => (
                  <button
                    key={p.id}
                    className="poi-marker"
                    style={{ left: `${p.xy.x * 100}%`, top: `${p.xy.y * 100}%` }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPOI(p);
                    }}
                    title={p.name}
                    aria-label={p.name}
                  >
                    {/* Use your custom marker image */}
                    <img src={markerSrc} alt="" className="poi-icon" />
                    {/* Fallback dot (uncomment if you want both)
                    <span className="poi-dot" />
                    */}
                  </button>
                ))}
              </div>
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </div>
  );
}
