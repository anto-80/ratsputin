import  React from 'react';
import { useState } from 'react';
import ReactMapGL from 'react-map-gl';

import './App.css';

function App() {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 40.730610,
    longitude:  -73.935242,
    zoom: 8
  });
  return (

    <ReactMapGL
    {...viewport}
    mapboxApiAccessToken={"pk.eyJ1IjoiYW50bzIyIiwiYSI6ImNrd3dteGF1MDA1Nm4ydXJyZmczbDBzeGgifQ._jesruIOH4dRx5t8cjKAJA"}
    onViewportChange={nextViewport => setViewport(nextViewport)}
  />
    
  );
}

export default App;
