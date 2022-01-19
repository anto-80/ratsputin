import  React from 'react';
import { useState, useEffect } from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import * as parkData from "./data/skateboard-parks.json"

import './App.css';

function App() {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 45.4211,
    longitude:  -75.6903,
    zoom: 8
  });

  const [selectedPark, setSelectedPark] = useState(null);

  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedPark(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <div>
    <ReactMapGL
    {...viewport}
    mapboxApiAccessToken="pk.eyJ1IjoiYW50bzIyIiwiYSI6ImNrd3dteGF1MDA1Nm4ydXJyZmczbDBzeGgifQ._jesruIOH4dRx5t8cjKAJA"
     mapStyle="mapbox://styles/mapbox/dark-v10"
    onViewportChange={viewport => setViewport(viewport)}
    >
  
    {parkData.features.map(park => (
      <Marker key={park.properties.PARK_ID}
      latitude={park.geometry.coordinates[1]}  
      longitude={park.geometry.coordinates[0]}
      >
        <button  className="marker-btn"
              onClick={e => {
                e.preventDefault();
                setSelectedPark(park);
              }}>
          <img src="/skateboard.png" alt="Skate park icon"/>
        </button>
      </Marker>
    ))}

{selectedPark ? (
          <Popup
            latitude={selectedPark.geometry.coordinates[1]}
            longitude={selectedPark.geometry.coordinates[0]}
            onClose={() => {
              setSelectedPark(null);
            }}
          >
            <div>
              <h2>{selectedPark.properties.NAME}</h2>
              <p>{selectedPark.properties.DESCRIPTION}</p>
              <p>{selectedPark.properties.ADDRESS}</p>
            </div>
          </Popup>
        ) : null}
    </ReactMapGL>
    </div>
  );
}

export default App;
