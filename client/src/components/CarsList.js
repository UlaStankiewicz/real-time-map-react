import React from "react";
import "../styles/index.css";
export const CarsList = ({ cars }) => {

  const renderTableData = () => {
    return cars.map((car) => {
      const { id, name, lat, lng } = car;
      return (
        <tr key={id}>
          <td>{name}</td>
          <td> {`lat: ${lat}`}</td>
          <td>{`lng: ${lng}`}</td>
        </tr>
      );
    });
  };

  return (
    <>
      <table className="carsTable">
        <tbody>{renderTableData()}</tbody>
      </table>
    </>
  );
};

export default CarsList;
