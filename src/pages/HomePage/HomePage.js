import React, { useEffect, useState, useReducer } from "react";
import { Redirect } from "react-router-dom";
import { format } from "date-fns";
import TaskList from "components/TaskList";
import Calendar from "components/Calendar";
import Button from "components/Button/Button";
import ButtonLink from "components/Link/";
import { TodoListWrapper, ButtonWrapper } from "./styles";
import { UpdateUserData, GetUserData } from "services/firebaseDBQueries";
import {
  GetUserId,
  IsLoggedIn,
  LogoutUser,
} from "services/firebaseAuthQueries";

const HomePage = () => {
  const [isUserLoggedIn, setUserLoggedIn] = useState(true);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const [userData, setUserData] = useState({});
  const [chosenDay, setChosenDay] = useState(
    format(new Date(Date.now()), "yyyy-MM-dd")
  );

  useEffect(async () => {
    if (IsLoggedIn()) {
      let queryResult = await GetUserData(`tasks/${GetUserId()}`);
      if (queryResult) {
        setUserData(queryResult);
      }
      setUserLoggedIn(true);
    } else {
      setUserLoggedIn(false);
    }
  }, []);

  const handleLogOut = async () => {
    let queryResult = await LogoutUser();
    if (queryResult) {
      setUserLoggedIn(false);
    }
  };

  const handleUpdateStatus = (e) => {
    const updatedTasks = userData[chosenDay];
    updatedTasks[e.currentTarget.id].status = !updatedTasks[e.currentTarget.id]
      .status;
    const updatedData = userData;
    updatedData[chosenDay] = updatedTasks;
    setUserData(updatedData);
    const updates = {};
    updates[`/tasks/${GetUserId()}/${chosenDay}`] = updatedTasks;
    UpdateUserData(updatedTasks, `/tasks/${GetUserId()}/${chosenDay}`);
    forceUpdate();
  };

  return (
    <TodoListWrapper>
      {isUserLoggedIn ? "" : <Redirect to="/login" />}
      <Calendar
        chosenDay={chosenDay}
        handleChoosingDay={(e) => {
          setChosenDay(e.currentTarget.id);
        }}
        userData={userData}
      />
      <TaskList
        tasks={userData[chosenDay] ? Object.entries(userData[chosenDay]) : []}
        day={chosenDay}
        handleUpdateStatus={handleUpdateStatus}
      />
      <ButtonWrapper>
        <ButtonLink
          to={{ pathname: "/create-task", state: { isUpdate: false } }}
          text="+ Add new task"
        />
        <Button onClick={handleLogOut} text="Log Out" />
      </ButtonWrapper>
    </TodoListWrapper>
  );
};

export default HomePage;
