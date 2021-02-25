import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)`
  width: 280px;
  height: 30px;
  background-color: orange;
  border: 0;
  border-radius: 10px;
  color: white;
  outline: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonLink = (props) => {
  return <StyledLink to={props.to}>{props.text}</StyledLink>;
};

export default ButtonLink;
