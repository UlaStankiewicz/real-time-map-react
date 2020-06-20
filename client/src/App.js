import React, { useState, useEffect, useCallback } from "react";
import "./styles/index.css";
import CarsList from "./components/CarsList";
import Title from "./components/Title";
import socketIOClient from "socket.io-client";
import MapLeaflet from "./components/MapLeaflet";

// REMEMBER: useCallback / useMemo / errors / loading
// TODO: replace hardcored api url with variable
// todo: alphabetical imports, proptypes

const initialState = {
  loading: false,
  errorMessage: null,
  lat: 54.370044,
  lng: 18.600549,
};

export const App = () => {
  const [cars, setCars] = useState([]);
  const [zoom] = useState(10);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  let position = [initialState.lat, initialState.lng];

  // const fetchCarsData = useCallback(async () => {
  //   let response = await fetch("http://localhost:8080/cars");
  //   response = await response.json();
  //   setCars(response);
  // }, []);

  // useEffect(() => {
  //   fetchCarsData();
  // }, [fetchCarsData]);


// socket.io firt version

  const socketData = useCallback(() => {
    const ENDPOINT = "http://127.0.0.1:8080";
    const socket = socketIOClient(ENDPOINT);
    socket.on("cars", (fetchedCars) => {
      setCars(fetchedCars);
    });
  }, [cars]);

  useEffect(() => {
    socketData();
  }, []);

// socket.io second version

  // useEffect(() => {
  //   const ENDPOINT = "http://127.0.0.1:8080";
  //   const socket = socketIOClient(ENDPOINT);
  //   socket.on("cars", (fetchedCars) => {
  //     setCars(fetchedCars);
  //   });
  //   return () => socket.close();
  // }, [cars]);

  return (
    <>
      <Title title="React Map" />
      <div className="container">
        {loading && !errorMessage ? (
          <span> Loading...</span>
        ) : errorMessage ? (
          <span>{errorMessage}</span>
        ) : (
          <MapLeaflet cars={cars} zoom={zoom} position={position} />
        )}
        <div className="tableWrapper">
          <Title title="Cars Coordinates" />
          <CarsList cars={cars} />
        </div>
      </div>
    </>
  );
};
export default App;
