import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  width: 280px;
  height: 30px;
  background-color: ${(props) => (props.isDanger ? "red" : "orange")};
  border: 0;
  border-radius: 10px;
  color: white;
  outline: none;
  cursor: pointer;
`;

const Button = (props) => {
  return (
    <StyledButton isDanger={props.isDanger} onClick={props.onClick}>
      {props.text}
    </StyledButton>
  );
};

export default Button;
