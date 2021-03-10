import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledLink = styled(Link)`
  max-width: 280px;
  width: 40%;
  height: 30px;
  background-color: orange;
  border: 0;
  border-radius: 10px;
  color: white;
  outline: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
`;
