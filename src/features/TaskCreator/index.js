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
  console.log(props.location);
  let { isUpdate, textName, taskId, taskDay } = props.location.state;
  const [chosenDay, setChosenDay] = useState(
    taskDay || format(new Date(Date.now()), "yyyy-MM-dd")
  );
  const [taskName, setTaskName] = useState(textName || "");
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

    if (isUpdate) {
      let userTasksRef = database.ref(
        `tasks/${auth.currentUser.uid}/${chosenDay}/${taskId}`
      );
      let updatedTask = {
        text: taskName,
        status: false,
      };
      userTasksRef.update(updatedTask).then(() => {
        toast.success("Task successfully saved", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3500,
        });
      });
    } else {
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
    }
  };

  return (
    <TaskCreatorWrapper>
      {isUserLoggedIn ? "" : <Redirect to={`/login`} />}
      <TaskCreatorContainer>
        <span>Create or update your task!</span>
        <span>Choose a day</span>
        <Calendar
          chosenDay={chosenDay}
          handleChoosingDay={isUpdate ?  (()=>{}) : ((e) => setChosenDay(e.currentTarget.id))}
          userData={{}}
        ></Calendar>
        <TextInput
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Write your task"
        ></TextInput>
        <Button onClick={handleTaskSave} text={isUpdate ? "Update task" : "Create Task"}></Button>
        <ButtonLink to="/home" text="Go back" />
      </TaskCreatorContainer>
      <ToastContainer />
    </TaskCreatorWrapper>
  );
};

export default CreateTaskPage;
