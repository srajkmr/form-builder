import React, { Children } from "react";
import { ArrowsMove } from "react-bootstrap-icons";
import styled from "styled-components";

const StyledItem = styled.div`
  background-color: #0278ff;
  border-radius: 20px;
  border: 1px dashed white;
  width: 100%;
  text-align: left;
  padding: 0.5rem 1rem;
  color: #fff;
  font-weight: 500;
`;

const StyledIcon = styled(ArrowsMove)`
  margin-right: 1rem;
`;

const DragItem = (props) => {
  return (
    <StyledItem {...props}>
      <StyledIcon />
      {Children.toArray(props.children)}
    </StyledItem>
  );
};

export default DragItem;
