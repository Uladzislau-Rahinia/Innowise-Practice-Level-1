import { Link } from "react-router-dom";
import styled from "styled-components";

export const TaskListContainer = styled.div`
  max-width: 768px;
  width: 100%;
   solid red;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > span {
    align-self: flex-start;
    margin-left: 50px;
    font-size: 20px;
    font-weight: bold;
  }

  .placeholder {
    font-weight: normal;
    color: grey;
    font-size: 15px;
  }
`;

export const Task = styled.div`
  width: 80%;
  height: 30px;
   solid blue;
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;

  & > * {
    margin-left: 20px;
    height: 20px;
  }
  img {
    justify-self: flex-end;
    display: none;
    cursor: pointer;
  }
  :hover {
    img {
      display: block;
    }
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  :visited {
    color: black;
  }
`;
