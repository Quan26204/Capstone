import { useMapEvent } from 'react-leaflet';

export default function MapClickLogger() {
  useMapEvent('click', (e) => {
    console.log('Clicked coordinates:', e.latlng);
  });
  return null;
}