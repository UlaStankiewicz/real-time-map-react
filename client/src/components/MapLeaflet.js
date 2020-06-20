import React from "react";
import { Map, TileLayer, ZoomControl } from "react-leaflet";
import L from "leaflet"
import Cars from "./Cars";
import ReactLeafletSearch  from "react-leaflet-search";

export const MapLeaflet = ({ cars, zoom, position }) => {

 return (
    <>
      <Map center={position} zoom={[zoom]} zoomControl={false}>
      <ReactLeafletSearch  provider="OpenStreetMap" />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw"
          id="mapbox/streets-v11"
        />
        <ZoomControl position="topright" />
        {
          (console.log("App: ", cars),
          cars ? <Cars cars={cars} /> : <p>Loading...</p>)
        }
      </Map>
    </>
  );
};
export default MapLeaflet;
