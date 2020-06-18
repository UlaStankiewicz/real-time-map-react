import React, { useState } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "./styles/index.css";

export const App = () => {
  const [state, setState] = useState({
    lat: 51.505,
    lng: -0.09,
  });
  const [zoom, setZoom] = useState(13);

  // const [lat] = useState(51.505);
  // const [lng] = useState(-0.09);
  // const [zoom, setZoom] = useState(3);

  let position = [state.lat, state.lng];
  let defaultZoom = [zoom];
  return (
    <>
      <Map center={position} zoom={defaultZoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw"
          id="mapbox/streets-v11"
        />
        <Marker position={position}>
          <Popup>sample</Popup>
        </Marker>
      </Map>
    </>
  );
};
export default App;
