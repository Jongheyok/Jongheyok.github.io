import React from 'react';
import './components/Map.css';

function Map() {
  const handleMapClick = () => {
    window.location.href = 'https://jongheyok.github.io';
  };

  return (
    <div id="map" onClick={handleMapClick}>
      <h2>Map</h2>
      <img src="png/map.png" alt="Map" />
    </div>
  );
}

export default Map;
