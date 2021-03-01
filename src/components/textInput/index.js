import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  font-family: inherit;
  height: 30px;
  border: 3px solid ${(props) => (props.isError ? "red" : "orange")};
  border-radius: 10px;
  width: 280px;
  outline: none;
`;

const TextInput = (props) => {
  //console.log(props.value)
  return (
    <StyledInput
      type={props.type}
      placeholder={props.placeholder}
      onChange={props.onChange}
      value={props.value}
      isError={props.isError}
    ></StyledInput>
  );
};

export default TextInput;
