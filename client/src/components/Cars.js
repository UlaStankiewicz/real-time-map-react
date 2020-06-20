import React from "react";
import { Marker, Popup } from "react-leaflet";

export const Cars = ({ cars }) => {
  return (
    <>
      <section>
        {cars.map((car) => {
          let positionCar = [car.lat, car.lng];
          return (
            <Marker position={positionCar} key={car.id}>
              <Popup>{car.name}</Popup>
            </Marker>
          );
        })}
      </section>
    </>
  );
};
export default Cars;
