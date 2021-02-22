import React from "react";
import styled from "styled-components";

const TodoListWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CalendarContainer = styled.div`
  max-width: 762px;
  width: 90%;
`;

const TasksListContainer = styled.div`
  max-width: 762px;
  width: 90%;
`;

const CreateTaskPage = () => {
  return (
    <TodoListWrapper>
      <CalendarContainer></CalendarContainer>
      <TasksListContainer></TasksListContainer>
    </TodoListWrapper>
  );
};

export default CreateTaskPage;
