import React, { Children } from "react";
import { Button } from "react-bootstrap";
import { ArrowRepeat } from "react-bootstrap-icons";
import styled from "styled-components";

const StyledItem = styled(Button)`
  background-color: #fff;
  border-radius: 20px;
  border: 1px dashed white;
  width: 100%;
  text-align: left;
  padding: 0.5rem 1rem;
  color: #0278ff;
  font-weight: 500;
`;

const StyledIcon = styled(ArrowRepeat)`
  margin-right: 1rem;
`;

const ValidateButton = (props) => {
  return (
    <StyledItem {...props}>
      <StyledIcon />
      {Children.toArray(props.children)}
    </StyledItem>
  );
};

export default ValidateButton;
