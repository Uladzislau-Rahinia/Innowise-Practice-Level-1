import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TaskList from "../../components/TaskList";
import Calendar from "../../components/Calendar";
import Button from "../../components/Button";
import { database, auth } from "../../api/firebase";
import { Redirect } from "react-router-dom";
import { format } from "date-fns";
import ButtonLink from "../../components/Link";

const TodoListWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  max-width: 768px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const HomePage = () => {
  const [isUserLoggedIn, setUserLoggedIn] = useState(true);
  //const [redirectTaskCreator, setRedirectTaskCreator] = useState(false);
  const [userData, setUserData] = useState({});
  const [chosenDay, setChosenDay] = useState(
    format(new Date(Date.now()), "yyyy-MM-dd")
  );

  console.log("ALL USER DATA", userData);

  useEffect(() => {
    console.log("EFFECT");
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        let userTasksRef = database.ref("tasks/" + user.uid);
        userTasksRef
          .get()
          .then(function (snapshot) {
            if (snapshot.exists()) {
              console.log(snapshot.val());
              let data = snapshot.val();
              setUserData(data);
            } else {
              console.log("No data available");
            }
          })
          .catch(function (error) {
            console.error(error);
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
    let updatedTasks = userData[chosenDay];
    updatedTasks[e.target.value].status = e.target.checked;
    let updates = {};
    updates["/tasks/" + auth.currentUser.uid + "/" + chosenDay] = updatedTasks;
    database
      .ref()
      .update(updates)
      .then((value) => {
        let updatedData = userData;
        updatedData[chosenDay] = updatedTasks;
        setUserData(updatedData);
      });
  };

  return (
    <TodoListWrapper>
      {isUserLoggedIn ? "" : <Redirect to={`/login`} />}
      {/*redirectTaskCreator ? <Redirect to={`/create-task`} /> : ""*/}
      <Calendar
        chosenDay={chosenDay}
        handleChoosingDay={(e) => {
          setChosenDay(e.currentTarget.id);
        }}
        userData={userData}
      ></Calendar>
      <TaskList
        tasks={userData[chosenDay] ? Object.entries(userData[chosenDay]) : []}
        day={chosenDay}
        handleUpdateStatus={handleUpdateStatus}
      ></TaskList>
      <ButtonWrapper>
        <ButtonLink
          to={{ pathname: "/create-task", state: { isUpdate: false } }}
          text="+ Add new task"
        />
        <Button onClick={handleLogOut} text={"logout"} />
      </ButtonWrapper>
    </TodoListWrapper>
  );
};

export default HomePage;
