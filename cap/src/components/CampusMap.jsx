import React, { useEffect, useState } from 'react';

export default function CampusMap() {
  const [poi, setPoi] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/poi')
      .then(res => res.json())
      .then(data => setPoi(data))
      .catch(err => console.error('Error fetching POI:', err));
  }, []);

  return (
    <div>
      <h2>Points of Interest</h2>
      <ul>
        {poi.map(item => (
          <li key={item.id}>
            <strong>{item.name}</strong> - {item.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
