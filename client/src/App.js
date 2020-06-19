import React, { useState, useEffect } from "react";
import { Map, TileLayer } from "react-leaflet";
import "./styles/index.css";
import CarsList from "./components/CarsList";
import Cars from "./components/Cars";
import Title from "./components/Title";
export const App = () => {
  const [state, setState] = useState({
    lat: 54.370044,
    lng: 18.600549,
  });
  const [zoom, setZoom] = useState(10);
  const [cars, setCars] = useState([]);
  const [hasError, setError] = useState(false);

  let position = [state.lat, state.lng];
  // REMEMBER: useCallback / useMemo / errors / loading
  // TODO: replace hardcored url with variable
  useEffect(() => {
    fetch("http://localhost:8080/cars")
      .then((res) => res.json())
      .then(
        (result) => {
          setCars(result);
        },
        (error) => {
          setError(error);
        }
      );
  }, []);

  console.log(cars);
  return (
    <>
      {" "}
      <Title />
      <div className="container">
        <Map center={position} zoom={[zoom]}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw"
            id="mapbox/streets-v11"
          />

          <Cars cars={cars} />
        </Map>
        <CarsList cars={cars} />
      </div>
    </>
  );
};
export default App;
