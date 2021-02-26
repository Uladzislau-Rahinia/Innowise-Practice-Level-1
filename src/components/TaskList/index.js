import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const TaskListContainer = styled.div`
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

const Task = styled.div`
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

const StyledLink = styled(Link)`
  text-decoration: none;
  :visited {
    color: black;
  }
`;

const TaskList = (props) => {
  console.log("TASK LIST", props.tasks);
  return (
    <TaskListContainer>
      <span>Tasks for this day</span>
      {!!props.tasks.length ? (
        props.tasks.map((value, index) => {
          console.log(value[1].status);
          return (
            <Task key={index}>
              <input
                type="checkbox"
                checked={value[1].status}
                onChange={props.handleUpdateStatus}
                value={value[0]}
              />
              <StyledLink
                to={{
                  pathname: "/create-task",
                  state: {
                    isUpdate: true,
                    textName: value[1].text,
                    taskId: value[0],
                    taskDay: props.day,
                    taskDescription: value[1].description,
                  },
                }}
              >
                <span>{value[1].text}</span>
              </StyledLink>
            </Task>
          );
        })
      ) : (
        <span className="placeholder">
          You don't have any tasks for this day
        </span>
      )}
    </TaskListContainer>
  );
};

export default TaskList;
