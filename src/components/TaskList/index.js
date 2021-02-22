import React from "react";
import styled from "styled-components";

const TaskListContainer = styled.div`
  max-width: 762px;
  width: 90%;
  height: 400px;
  border: 1px solid red;
`;

const TaskList = () => {
  return <TaskListContainer>TaskList</TaskListContainer>;
};

export default TaskList;
