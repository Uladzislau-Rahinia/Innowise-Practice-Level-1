import React from "react";
import styled from "styled-components";
import TaskList from "../../components/TaskList";
import Calendar from "../../components/Calendar";

const TodoListWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HomePage = () => {
  return (
    <TodoListWrapper>
      <Calendar></Calendar>
      <TaskList></TaskList>
    </TodoListWrapper>
  );
};

export default HomePage;
