import React from "react";
import { StyledButton } from "./styles";
import PropTypes from "prop-types";

const Button = (props) => (
  <StyledButton isDanger={props.isDanger} onClick={props.onClick}>
    {props.text}
  </StyledButton>
);

Button.propTypes = {
  isDanger: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string,
};

export default Button;
