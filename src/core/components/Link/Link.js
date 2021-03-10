import React from "react";
import { StyledLink } from "./styles";
import PropTypes from "prop-types";

const ButtonLink = (props) => (
  <StyledLink to={props.to}>{props.text}</StyledLink>
);

ButtonLink.propTypes = {
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  text: PropTypes.string,
};

export default ButtonLink;
