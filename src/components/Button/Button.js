import React from "react";
import { StyledButton } from "./styles";

const Button = (props) => (
  <StyledButton isDanger={props.isDanger} onClick={props.onClick}>
    {props.text}
  </StyledButton>
);

export default Button;
