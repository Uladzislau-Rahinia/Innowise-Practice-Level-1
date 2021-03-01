import React from "react";
import { StyledLink } from "./styles";

const ButtonLink = (props) => (
  <StyledLink to={props.to}>{props.text}</StyledLink>
);

export default ButtonLink;
