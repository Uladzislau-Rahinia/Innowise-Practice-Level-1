import React, { useEffect, useState, useReducer } from "react";
import { Redirect } from "react-router-dom";
import { format } from "date-fns";
import TaskList from "components/TaskList";
import Calendar from "components/Calendar";
import Button from "components/Button/Button";
import { database, auth } from "api/firebase";
import ButtonLink from "components/Link/";
import { TodoListWrapper, ButtonWrapper } from "./styles";

const HomePage = () => {
  const [isUserLoggedIn, setUserLoggedIn] = useState(true);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const [userData, setUserData] = useState({});
  const [chosenDay, setChosenDay] = useState(
    format(new Date(Date.now()), "yyyy-MM-dd")
  );

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const userTasksRef = database.ref(`tasks/${user.uid}`);
        userTasksRef.get().then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            setUserData(data);
          }
        });
        setUserLoggedIn(true);
      } else {
        setUserLoggedIn(false);
      }
    });
  }, []);

  const handleLogOut = () => {
    auth.signOut().then(() => {
      setUserLoggedIn(false);
    });
  };

  const handleUpdateStatus = (e) => {
    const updatedTasks = userData[chosenDay];
    updatedTasks[e.currentTarget.id].status = !updatedTasks[e.currentTarget.id]
      .status;
    const updatedData = userData;
    updatedData[chosenDay] = updatedTasks;
    setUserData(updatedData);
    const updates = {};
    updates[`/tasks/${auth.currentUser.uid}/${chosenDay}`] = updatedTasks;
    database.ref().update(updates);
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
