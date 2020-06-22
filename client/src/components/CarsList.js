import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

export const CarsList = ({ filteredCars }) => {
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
      <StyledTable>
        <StyledTbody>{renderTableData()}</StyledTbody>
      </StyledTable>
    </>
  );
};

export default CarsList;

CarsList.propTypes = {
  cars: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      lat: PropTypes.number,
      lng: PropTypes.number,
    })
  ).isRequired,
};
