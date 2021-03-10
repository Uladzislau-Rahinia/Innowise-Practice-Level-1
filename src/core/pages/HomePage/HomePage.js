import React, { useCallback, useEffect, useReducer, useState } from "react";
import { format } from "date-fns";
import TaskList from "core/components/TaskList";
import Calendar from "core/components/Calendar";
import Button from "core/components/Button/Button";
import ButtonLink from "core/components/Link";
import { TodoListWrapper, ButtonWrapper } from "./styles";
import { updateUserData, getUserData } from "core/services/firebaseDBQueries";
import { auth } from "core/api/firebase";
import { getUserId, logoutUser } from "core/services/firebaseAuthQueries";
import userDataReducer from "./reducers/UserDataReducer";
import { LINKS } from "core/utils/constants";
import { useHistory } from "react-router";

const HomePage = () => {
  const [userData, dispatch] = useReducer(userDataReducer, {});
  const [chosenDay, setChosenDay] = useState(
    format(new Date(Date.now()), "yyyy-MM-dd")
  );

  const history = useHistory();

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        let queryResult = await getUserData(`tasks/${getUserId()}`);
        if (queryResult) {
          dispatch({ type: "set", payload: queryResult });
        }
      } else {
        history.push(LINKS.LOGIN);
      }
    });
  }, []);

  const handleLogOut = async () => {
    let queryResult = await logoutUser();
    if (queryResult) {
      history.push(LINKS.LOGIN);
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
    updates[`/tasks/${getUserId()}/${chosenDay}`] = updatedTasks;
    updateUserData(updatedTasks, `/tasks/${getUserId()}/${chosenDay}`);
  };

  return (
    <TodoListWrapper>
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
