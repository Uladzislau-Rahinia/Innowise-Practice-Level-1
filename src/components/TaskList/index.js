import React from "react";
import styled from "styled-components";

const TaskListContainer = styled.div`
  max-width: 768px;
  width: 100%;
  height: 400px;
  border: 1px solid red;
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
`;

const Task = styled.div`
  width: 80%;
  height: 30px;
  border: 1px solid blue;
  margin-top: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  & > * {
    margin-left: 20px;
  }
`;

const TaskList = (props) => {
  console.log("TASK LIST", props.tasks);
  return (
    <TaskListContainer>
      <span>Tasks for this day</span>
      {props.tasks.map((value, index) => {
        return(
        <Task key={index}>
          <input type="checkbox" defaultChecked={value.status} onChange={props.handleUpdateStatus} value={index} />
          <span>{value.text}</span>
        </Task>);
      })}
    </TaskListContainer>
  );
};

export default TaskList;
