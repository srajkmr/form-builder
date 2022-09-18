import React, { Children } from "react";
import styled from "styled-components";

const StyledTable = styled.div`
  width: 100%;
`;

const Table = (props) => {
  return (
    <StyledTable {...props}>
      {Children.toArray(props.children)}
    </StyledTable>
  );
};

export { Table };
