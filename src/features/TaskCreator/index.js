import React from "react";
import styled from "styled-components";
import Button from "../../components/Button";
import TextInput from "../../components/textInput";
import Calendar from "../../components/Calendar"

const TaskCreatorWrapper = styled.div`
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
    <TaskCreatorWrapper>
      <Calendar></Calendar>
      <TextInput></TextInput>
      <Button text="CreateTask"></Button>
    </TaskCreatorWrapper>
  );
};

export default CreateTaskPage;
