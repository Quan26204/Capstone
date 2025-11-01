import React from 'react';
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './map.css';
import { useViewer } from '../../context/ViewerContext.jsx';
import MapClickLogger from './MapClickLogger';

// Fix default Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// POI list (ensure model paths match public/models)
const poiList = [
  {
    id: 1,
    name: 'Bus Stop',
    coords: [-37.720633390642845, 145.04632099734553],
    modelUrl: '/models/BST.splat',
    description: 'Bus stop on campus',
  },
  {
    id: 2,
    name: 'Statue',
    coords: [-37.71987763017671, 145.0464783764545],
    modelUrl: '/models/JG-BST.splat',
    description: 'Statue near the quad',
  },
  {
    id: 3,
    name: 'Jenny Graves',
    coords: [-37.72079511810905, 145.0470506813924],
    modelUrl: '/models/JG.splat',
    description: 'Jenny Graves building',
  },
  {
    id: 4,
    name: 'John Scott Meeting House',
    coords: [-37.719405172981254, 145.05110354716055],
    modelUrl: '/models/JSM.splat',
    description: 'Meeting house',
  },
  {
    id: 5,
    name: 'Graduate House',
    coords: [-37.71353942258608, 145.05038653906396],
    modelUrl: '/models/NR7.splat',
    description: 'Graduate house',
  },
  {
  id: 6,
  name: 'George Singer Building',
  coords: [-37.7189637428938, 145.0475871562958],
  modelUrl: '/models/NewBuilding.splat',
  description: 'Description of the new building',
  },
  {
  id: 7,
  name: 'Biological Sciences Building',
  coords: [-37.71918015433441, 145.0469219684601],
  modelUrl: '/models/NewBuilding.splat',
  description: 'Description of the new building',
  },
];

export default function MapView() {
  const { setSelectedPOI } = useViewer() || {};
  const navigate = useNavigate();

  const openViewer = (p) => {
    // set selected POI in context then navigate so ModelPage can prefer context
    setSelectedPOI?.(p);
    navigate(`/viewer/${p.id}`);
  };

  return (
    <div className="map-root">
      {/* Remove the old header bar */}
      <MapContainer
        center={[-37.7199, 145.048]}
        zoom={17}
        scrollWheelZoom
        style={{ width: '100%', height: 'calc(100vh)' }}
      >
        <MapClickLogger />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />
        {poiList.map((p) => (
          <Marker
            key={p.id}
            position={p.coords}
            eventHandlers={{
              click: () => setSelectedPOI?.(p),
            }}
          >
            <Popup>
              <div style={{ minWidth: 180 }}>
                <b>{p.name}</b>
                <div style={{ marginTop: 6 }}>{p.description}</div>
                <div style={{ marginTop: 8 }}>
                  <button
                    className="model-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      openViewer(p);
                    }}
                  >
                    View 3D Model
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
        {/* New title overlay */}
        <div className="map-title-overlay">
          La Trobe University – 3D Campus Map
        </div>
      </MapContainer>
    </div>
  );
}