import React from "react";
import { StyledInput } from "./styles";
import PropTypes from "prop-types";

function TextInput(props) {
  return (
    <StyledInput
      type={props.type}
      placeholder={props.placeholder}
      onChange={props.onChange}
      value={props.value}
      isError={props.isError}
      maxLength={props.maxLength}
    />
  );
}

TextInput.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  isError: PropTypes.bool,
  maxLength: PropTypes.number,
};

export default TextInput;
