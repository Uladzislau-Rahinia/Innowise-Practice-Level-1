import styled from "styled-components";

export const StyledButton = styled.button`
  max-width: 280px;
  width: 40%;
  height: 30px;
  background-color: ${(props) => (props.isDanger ? "red" : "orange")};
  border: 0;
  border-radius: 10px;
  color: white;
  outline: none;
  cursor: pointer;
  font-size: 14px;
`;
