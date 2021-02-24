import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  height: 30px;
  border: 3px solid orange;
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
    ></StyledInput>
  );
};

export default TextInput;
