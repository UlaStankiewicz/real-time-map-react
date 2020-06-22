import "./styles/index.css";

import React, { useEffect, useState } from "react";

import CarsList from "./components/CarsList";
import MapLeaflet from "./components/MapLeaflet";
import Title from "./components/Title";
import socketIOClient from "socket.io-client";
import styled from "styled-components";

const StyledInput = styled.input`
  padding: 5px;
  border-radius: 7px;
  margin: 3px;
  border: none;
  color: #1d8fbd;
`;
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
  const [searchTerm, setSearchTerm] = useState("");
  let position = [initialState.lat, initialState.lng];
  const ENDPOINT = "http://127.0.0.1:8080";
  const socket = socketIOClient(ENDPOINT);

  //TODO: replace hardcoded api url with variable
  //TODO: handle errors
  //TODO: write tests!

  useEffect(() => {
    socket.on("carPositionChanged", (updatedCar) => {
      if (cars.length === 0) {
        return;
      }
      const carIndexToUpdate = cars.findIndex(
        (car) => updatedCar.id === car.id
      );
      cars[carIndexToUpdate] = updatedCar;
      const newCars = [...cars];
      setCars(newCars);
    });
    return () => socket.off("carPositionChanged");
  }, [cars]);

  useEffect(() => {
    socket.on("cars", (fetchedCars) => {
      setCars(fetchedCars);
    });
    return () => socket.disconnect();
  }, []);

  // search cars
  const handleChange = (event) => {
    setSearchTerm(event.target.value.substr(0, 20));
  };

  let filteredCars = cars.filter((car) => {
    return car.name.toLowerCase().indexOf(searchTerm) !== -1;
  });

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
        <div className="searchWrapper">
          <StyledInput
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={handleChange}
          />
          <CarsList cars={cars} filteredCars={filteredCars} />
        </div>
      </div>
    </>
  );
};
export default App;
