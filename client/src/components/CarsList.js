import React, { useState } from "react";
import styled from "styled-components";
export const CarsList = ({ cars }) => {
  const StyledTable = styled.table`
    color: #1d8fbd;
    font-weight: bold;
    font-size: 1rem;
    margin: 10px;
    padding: 10px;
  `;

  const StyledTbody = styled.tbody`
    display: table;
    padding: 10px;
  `;
  const StyledTr = styled.tr`
    padding: 5px 20px;
    display: block;
    border-bottom: 1px solid #1d8fbd;
  `;
  const StyledTd = styled.td`
    margin: 10px;
    padding: 5px 15px;
  `;

  const StyledInput = styled.input`
    padding: 5px;
    border-radius: 7px;
    margin: 3px;
    border: none;
    color: #1d8fbd;
  `;
  const [searchTerm, setSearchTerm] = useState("");
  const handleChange = (event) => {
    setSearchTerm(event.target.value.substr(0, 20));
  };

  let filteredCars = cars.filter((car) => {
    return car.name.toLowerCase().indexOf(searchTerm) !== -1;
  });

  const renderTableData = () => {
    return filteredCars.map((car) => {
      const { id, name, lat, lng } = car;
      return (
        <StyledTr key={id}>
          <StyledTd>{name}</StyledTd>
          <StyledTd> {`lat: ${lat}`}</StyledTd>
          <StyledTd>{`lng: ${lng}`}</StyledTd>
        </StyledTr>
      );
    });
  };

  return (
    <>
      <StyledInput
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleChange}
      />
      <StyledInput type="submit" value="SEARCH" />
      <StyledTable>
        <StyledTbody>{renderTableData()}</StyledTbody>
      </StyledTable>
    </>
  );
};

export default CarsList;
