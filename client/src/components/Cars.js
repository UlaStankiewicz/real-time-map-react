import React from "react";
import { Marker, Popup } from "react-leaflet";
import '../styles/index.css'

export const Cars = ({ cars }) => {
  return (
    <>
    <section className="carsMarkers">
      {cars.map((car) => {
        console.log(car);
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
