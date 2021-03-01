import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { format } from "date-fns";
import { toast, ToastContainer } from "react-toastify";
import Button from "../../components/Button";
import TextInput from "../../components/textInput";
import Calendar from "../../components/Calendar";
import { database, auth } from "../../api/firebase";
import ButtonLink from "../../components/Link";
import "react-toastify/dist/ReactToastify.css";

const TaskCreatorWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const TaskCreatorContainer = styled.div`
  max-width: 768px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  & > * {
    margin-bottom: 10px;
  }

  & > span {
    font-size: 20px;
  }
`;

const StyledTextArea = styled.textarea`
  border: 2px solid orange;
  width: 280px;
  height: 200px;
`;

const CreateTaskPage = (props) => {
  const {
    isUpdate,
    textName,
    taskId,
    taskDay,
    taskDescription,
  } = props.location.state;

  const [chosenDay, setChosenDay] = useState(
    taskDay || format(new Date(Date.now()), "yyyy-MM-dd")
  );
  const [taskName, setTaskName] = useState(textName || "");
  const [description, setDescription] = useState(taskDescription || "");
  const [isUserLoggedIn, setUserLoggedIn] = useState(true);
  const [isRedirect, setRedirect] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
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
      const userTasksRef = database.ref(
        `tasks/${auth.currentUser.uid}/${chosenDay}/${taskId}`
      );
      const updatedTask = {
        text: taskName,
        status: false,
        description,
      };
      userTasksRef.update(updatedTask).then(() => {
        toast.success("Task successfully saved", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3500,
        });
      });
    } else {
      const userTasksRef = database.ref(
        `tasks/${auth.currentUser.uid}/${chosenDay}`
      );
      const newTask = {
        text: taskName,
        status: false,
        description,
      };
      userTasksRef.push(newTask).then(() => {
        setRedirect(true);
      });
    }
  };

  const handleTaskDelete = () => {
    const userTasksRef = database.ref(
      `tasks/${auth.currentUser.uid}/${chosenDay}/${taskId}`
    );
    userTasksRef.remove().then(() => {
      setRedirect(true);
    });
  };

  return (
    <TaskCreatorWrapper>
      {isUserLoggedIn ? "" : <Redirect to="/login" />}
      {isRedirect ? <Redirect to="/home" /> : ""}
      <TaskCreatorContainer>
        {isUpdate ? (
          <>
            <span>Update your task!</span>
            <span>This task is assigned on {chosenDay}</span>
          </>
        ) : (
          <>
            <span>Create your task!</span>
            <span>Choose a day</span>
            <Calendar
              chosenDay={chosenDay}
              handleChoosingDay={(e) => setChosenDay(e.currentTarget.id)}
              userData={{}}
            />
          </>
        )}
        <TextInput
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Write your task"
        />
        <StyledTextArea
          placeholder="Write your description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button
          onClick={handleTaskSave}
          text={isUpdate ? "Update task" : "Create Task"}
        />
        {isUpdate ? (
          <Button onClick={handleTaskDelete} isDanger text="Delete task" />
        ) : (
          ""
        )}
        <ButtonLink to="/home" text="Go back" />
      </TaskCreatorContainer>
      <ToastContainer />
    </TaskCreatorWrapper>
  );
};

export default CreateTaskPage;
