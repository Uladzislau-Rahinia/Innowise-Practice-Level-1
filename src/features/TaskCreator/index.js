import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import Button from "../../components/Button";
import TextInput from "../../components/textInput";
import Calendar from "../../components/Calendar";
import { format } from "date-fns";
import { database, auth } from "../../api/firebase";
import ButtonLink from "../../components/Link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TaskCreatorWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const TaskCreatorContainer = styled.div`
  max-width: 768px;
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  & > * {
    margin-bottom: 10px;
  }

  & > span {
    align-self: flex-start;
    font-size: 20px;
  }
`;

const CreateTaskPage = (props) => {
  console.log(props);
  const [chosenDay, setChosenDay] = useState(
    format(new Date(Date.now()), "yyyy-MM-dd")
  );
  const [taskName, setTaskName] = useState("");
  const [isUserLoggedIn, setUserLoggedIn] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        setUserLoggedIn(true);
      } else {
        setUserLoggedIn(false);
      }
    });
  }, []);

  const handleTaskSave = () => {
    if (taskName === "") {
      toast.error("Please enter your task", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3500,
      });
      return;
    }
    let userTasksRef = database.ref(
      `tasks/${auth.currentUser.uid}/${chosenDay}`
    );
    let newTask = {
      text: taskName,
      status: false,
    };
    userTasksRef.push(newTask).then(() => {
      toast.success("Task successfully saved", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3500,
      });
    });
  };

  return (
    <TaskCreatorWrapper>
      {isUserLoggedIn ? "" : <Redirect to={`/login`} />}
      <TaskCreatorContainer>
        <span>Create or update your task!</span>
        <span>Choose a day</span>
        <Calendar
          chosenDay={chosenDay}
          handleChoosingDay={(e) => setChosenDay(e.target.id)}
        ></Calendar>
        <TextInput
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Write your task"
        ></TextInput>
        <Button onClick={handleTaskSave} text="CreateTask"></Button>
        <ButtonLink to="/home" text="Go back" />
      </TaskCreatorContainer>
      <ToastContainer />
    </TaskCreatorWrapper>
  );
};

export default CreateTaskPage;
