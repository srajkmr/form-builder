import React, { Children } from "react";
import { Col } from "react-bootstrap";
import styled from "styled-components";

const StyledItem = styled(Col)`
  background-color: #0278ff;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
`;
const Sidebar = (props) => {
  return <StyledItem {...props}>{Children.toArray(props.children)}</StyledItem>;
};

export default Sidebar;
