import styled from "styled-components";

export const StyledInput = styled.input`
  font-family: inherit;
  height: 30px;
  border: 3px solid ${(props) => (props.isError ? "red" : "orange")};
  border-radius: 10px;
  width: 280px;
  outline: none;
`;