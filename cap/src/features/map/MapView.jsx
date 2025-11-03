import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './map.css';
import { useViewer } from '../../context/ViewerContext.jsx';
import MapClickLogger from './MapClickLogger';

// Custom marker icon using your image in public/markers/pin.png
const customIcon = new L.Icon({
  iconUrl: '/markers/pin.png', // path relative to public folder
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const customIconLarge = new L.Icon({
  iconUrl: '/markers/pin.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [35, 57], // Larger size for animation
  iconAnchor: [17, 57],
  popupAnchor: [1, -44],
  shadowSize: [57, 57]
});

// Component to reset selectedPOI when map is clicked
function MapClickResetter({ setSelectedPOI }) {
  useMapEvents({
    click: () => setSelectedPOI(null)
  });
  return null;
}

export default function MapView({ poi }) {
  const { setSelectedPOI, selectedPOI } = useViewer() || {};
  const navigate = useNavigate();
  const markerRefs = useRef({});

  useEffect(() => {
    if (selectedPOI && markerRefs.current[selectedPOI.id]) {
      markerRefs.current[selectedPOI.id].openPopup();
    }
  }, [selectedPOI]);
  
  const openViewer = (p) => {
    setSelectedPOI?.(p);
    navigate(`/viewer/${p.id}`);
  };

  const openVR = (p) => {
    alert('VR mode coming soon!');
  };

  return (
    <div className="map-root">
      <MapContainer
        center={[-37.7199, 145.048]}
        zoom={17}
        scrollWheelZoom
        style={{ width: '100%', height: 'calc(100vh)' }}
      >
        <MapClickLogger />
        <MapClickResetter setSelectedPOI={setSelectedPOI} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />
        {poi.map((p) => (
          <Marker
            key={p.id}
            position={p.coords}
            icon={selectedPOI?.id === p.id ? customIconLarge : customIcon}
            ref={ref => { markerRefs.current[p.id] = ref; }}
            eventHandlers={{
              click: () => setSelectedPOI?.(p),
            }}
          >
            <Popup>
              <div style={{ minWidth: 180 }}>
                <b>{p.name}</b>
                <div style={{ marginTop: 6 }}>{p.description}</div>
                <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
                  <button
                    className="model-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      openViewer(p);
                    }}
                  >
                    View 3D Model
                  </button>
                  <button
                    className="vr-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      openVR(p);
                    }}
                  >
                    VR
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
        <div className="map-title-overlay">
          La Trobe University – 3D Campus Digital Twin
        </div>
      </MapContainer>
    </div>
  );
}