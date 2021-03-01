import React from "react";
import { StyledInput } from "./styles";

function TextInput(props) {
  return (
    <StyledInput
      type={props.type}
      placeholder={props.placeholder}
      onChange={props.onChange}
      value={props.value}
      isError={props.isError}
    />
  );
}
export default TextInput;
