import React from "react";
import styled from "styled-components";

export const Title = ({ title }) => {
  const StyledHeader = styled.header`
    font-size: 1.8em;
    margin: 10px;
    display: flex;
    justify-content: center;
    letter-spacing: 0.1em;
    color: #1d8fbd;
      font-weight: bold;
  `
  return (
    <>
      <StyledHeader className="titleHeader"> {title} </StyledHeader>
    </>
  );
};
export default Title;
