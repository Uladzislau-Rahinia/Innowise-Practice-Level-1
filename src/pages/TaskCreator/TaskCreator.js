import React, { useState, useEffect, useCallback } from "react";
import { format } from "date-fns";
import Button from "components/Button";
import TextInput from "components/textInput";
import Calendar from "components/Calendar";
import ButtonLink from "components/Link";
import {
  TaskCreatorContainer,
  TaskCreatorWrapper,
  StyledTextArea,
} from "./styles";
import ToastContainer, {
  showErrorToast,
  showSuccessToast,
} from "services/showToast";
import {
  UpdateUserData,
  AddUserData,
  DeleteUserData,
} from "services/firebaseDBQueries";
import { auth } from "api/firebase";
import RedirectWrapper from "services/redirect";
import { LINKS } from "utils/constants";

const CreateTaskPage = (props) => {
  const {
    isUpdate,
    textName,
    taskId,
    taskDay,
    taskDescription,
    userId,
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

  const handleTaskSave = async () => {
    if (taskName === "") {
      showErrorToast("Please enter your task");
      return;
    }

    if (isUpdate) {
      const updatedTask = {
        text: taskName,
        status: false,
        description,
      };

      let queryResult = UpdateUserData(
        updatedTask,
        `tasks/${userId}/${chosenDay}/${taskId}`
      );
      if (queryResult) {
        showSuccessToast("Task successfully saved");
      }
    } else {
      const newTask = {
        text: taskName,
        status: false,
        description,
      };
      let queryResult = await AddUserData(
        newTask,
        `tasks/${userId}/${chosenDay}`
      );
      if (queryResult) {
        setRedirect(true);
      }
    }
  };

  const handleTaskDelete = async () => {
    const queryResult = await DeleteUserData(
      `tasks/${userId}/${chosenDay}/${taskId}`
    );
    if (queryResult) setRedirect(true);
  };

  return (
    <TaskCreatorWrapper>
      <RedirectWrapper isRedirect={!isUserLoggedIn} to={LINKS.LOGIN} />
      <RedirectWrapper isRedirect={isRedirect} to={LINKS.HOME} />
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
              handleChoosingDay={useCallback(
                (e) => setChosenDay(e.currentTarget.id),
                [chosenDay]
              )}
            />
          </>
        )}
        <TextInput
          value={taskName}
          onChange={useCallback((e) => setTaskName(e.target.value), [taskName])}
          placeholder="Write your task"
        />
        <StyledTextArea
          placeholder="Write your description"
          value={description}
          onChange={useCallback((e) => setDescription(e.target.value), [
            description,
          ])}
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
        <ButtonLink to={LINKS.HOME} text="Go back" />
      </TaskCreatorContainer>
      <ToastContainer />
    </TaskCreatorWrapper>
  );
};

export default CreateTaskPage;
