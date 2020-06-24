import "./styles/index.css";

import React, { useEffect, useReducer, useState } from "react";

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
const initialCars = [];
const initialState = {
  loading: false,
  errorMessage: null,
  lat: 54.370044,
  lng: 18.600549,
};

function reducer(state, action) {
  switch (action.type) {
    case "setCars":
      return action.payload;
    case "updateCar":
      if (state.length === 0) {
        return;
      }
      const carIndexToUpdate = state.findIndex(
        (car) => action.payload.id === car.id
      );
      state[carIndexToUpdate] = action.payload;
      const newCars = [...state];
      return newCars;
    default:
      throw new Error("Action not handled");
  }
}
const ENDPOINT = "http://127.0.0.1:8080";
const socket = socketIOClient(ENDPOINT);

export const App = () => {
  const [state, dispatch] = useReducer(reducer, initialCars);
  const [zoom] = useState(10);
  const [errorMessage] = useState(null);
  const [loading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const position = [initialState.lat, initialState.lng];

  //TODO: replace hardcoded api url with variable
  //TODO: handle errors
  //TODO: write tests!

  useEffect(() => {
    socket.on("cars", (fetchedCars) => {
      dispatch({ type: "setCars", payload: fetchedCars });
    });
    socket.on("carPositionChanged", (updatedCar) => {
      dispatch({ type: "updateCar", payload: updatedCar });
    });

    return () => {
      socket.off("cars");
      socket.off("carPositionChanged");
      socket.disconnect();
    };
  }, []);

  // search cars
  const handleChange = (event) => {
    setSearchTerm(event.target.value.substr(0, 20));
  };

  let filteredCars = state.filter((car) => {
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
          <MapLeaflet cars={state} zoom={zoom} position={position} />
        )}
        <div className="searchWrapper">
          <StyledInput
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={handleChange}
          />
          <CarsList cars={state} filteredCars={filteredCars} />
        </div>
      </div>
    </>
  );
};
export default App;
