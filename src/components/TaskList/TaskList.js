import React from "react";
import Checkbox from "../Checkbox";
import { TaskListContainer, StyledLink, Task } from "./styles";

const TaskList = (props) => {
  return (
    <TaskListContainer>
      <span>Tasks for this day</span>
      {props.tasks.length ? (
        props.tasks.map((value, index) => {
          return (
            <Task key={index}>
              <Checkbox
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
                    userId: props.userId,
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
          You dont have any tasks for this day
        </span>
      )}
    </TaskListContainer>
  );
};

export default TaskList;
