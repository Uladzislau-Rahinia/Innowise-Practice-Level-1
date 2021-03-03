import React, { useCallback, useEffect, useReducer, useState } from "react";
import { format } from "date-fns";
import TaskList from "components/TaskList";
import Calendar from "components/Calendar";
import Button from "components/Button/Button";
import ButtonLink from "components/Link/";
import { TodoListWrapper, ButtonWrapper } from "./styles";
import { UpdateUserData, GetUserData } from "services/firebaseDBQueries";
import { auth } from "api/firebase";
import { GetUserId, LogoutUser } from "services/firebaseAuthQueries";
import userDataReducer from "./reducers/UserDataReducer";
import RedirectWrapper from "services/redirect";
import { LINKS } from "utils/constants";

const HomePage = () => {
  const [isUserLoggedIn, setUserLoggedIn] = useState(true);
  const [userData, dispatch] = useReducer(userDataReducer, {});
  const [chosenDay, setChosenDay] = useState(
    format(new Date(Date.now()), "yyyy-MM-dd")
  );

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        let queryResult = await GetUserData(`tasks/${GetUserId()}`);
        if (queryResult) {
          dispatch({ type: "set", payload: queryResult });
        }
        setUserLoggedIn(true);
      } else {
        setUserLoggedIn(false);
      }
    });
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
    dispatch({ type: "update", payload: updatedData });
    const updates = {};
    updates[`/tasks/${GetUserId()}/${chosenDay}`] = updatedTasks;
    UpdateUserData(updatedTasks, `/tasks/${GetUserId()}/${chosenDay}`);
  };

  return (
    <TodoListWrapper>
      <RedirectWrapper isRedirect={!isUserLoggedIn} to={LINKS.LOGIN} />
      <Calendar
        chosenDay={chosenDay}
        handleChoosingDay={useCallback(
          (e) => {
            setChosenDay(e.currentTarget.id);
          },
          [chosenDay]
        )}
        userData={userData}
      />
      <TaskList
        tasks={userData[chosenDay] ? Object.entries(userData[chosenDay]) : []}
        day={chosenDay}
        handleUpdateStatus={handleUpdateStatus}
      />
      <ButtonWrapper>
        <ButtonLink
          to={{ pathname: LINKS.TASK, state: { isUpdate: false } }}
          text="+ Add new task"
        />
        <Button onClick={handleLogOut} text="Log Out" />
      </ButtonWrapper>
    </TodoListWrapper>
  );
};

export default HomePage;
