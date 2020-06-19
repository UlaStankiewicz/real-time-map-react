import React, { useState, useEffect, useCallback } from "react";
import { Map, TileLayer, ZoomControl } from "react-leaflet";
import "./styles/index.css";
import CarsList from "./components/CarsList";
import Cars from "./components/Cars";
import Title from "./components/Title";
import socketIOClient from "socket.io-client";

  // REMEMBER: useCallback / useMemo / errors / loading
  // TODO: replace hardcored api url with variable
  // todo: alphabetical imports, proptypes

export const App = () => {
  const [cars, setCars] = useState([]);
  const [latLng, setLatLng] = useState({
    lat: 54.370044,
    lng: 18.600549,
  });
  const [zoom] = useState(10);
  const [hasError, setError] = useState(false);
  let position = [latLng.lat, latLng.lng];


  // const fetchCarsData = useCallback(async () => {
  //   let response = await fetch("http://localhost:8080/cars");
  //   response = await response.json();
  //   setCars(response);
  // }, []);

  // useEffect(() => {
  //   fetchCarsData();
  // }, [fetchCarsData]);

  const socketData = useCallback(() => {
    const ENDPOINT = "http://127.0.0.1:8080";
    const socket = socketIOClient(ENDPOINT);
    socket.on("cars", (fetchedCars) => {
      setCars(fetchedCars);
    });
  }, []);

  useEffect(() => {
    socketData();
  }, []);
  // useEffect(() => {
  //   const ENDPOINT = "http://127.0.0.1:8080";
  //   const socket = socketIOClient(ENDPOINT);
  //   socket.on("cars", (fetchedCars) => {
  //     setCars(fetchedCars);
  //   });
  //   return () => socket.close();
  // }, []);

  console.log(cars);
  return (
    <>
      <Title title="React Map" />
      <div className="container">
        <Map center={position} zoom={[zoom]} zoomControl={false}>
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
        <CarsList cars={cars} />
      </div>
    </>
  );
};
export default App;
