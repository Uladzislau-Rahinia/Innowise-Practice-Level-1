import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TaskList from "../../components/TaskList";
import Calendar from "../../components/Calendar";
import Button from "../../components/Button";
import { database, auth } from "../../api/firebase";
import { Redirect } from "react-router-dom";
import { format } from "date-fns";

const TodoListWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HomePage = () => {
  const [isUserLoggedIn, setUserLoggedIn] = useState(true);
  const [userTasks, setUserTasks] = useState([]);
  const [chosenDay, setChosenDay] = useState(format(new Date(Date.now()),"yyyy-MM-dd"));

  console.log(chosenDay);

  useEffect(()=>{
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
              console.log(data[chosenDay])
              if(data[chosenDay]) {
                setUserTasks(data[chosenDay]);
              }
              
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
  }, [])
  

  const handleLogOut = () => {
    auth.signOut().then(() => {
      setUserLoggedIn(false);
    });
  };

  console.log(isUserLoggedIn);
  return (
    <TodoListWrapper>
      {isUserLoggedIn ? "" : <Redirect to={`/login`} />}
      <Calendar></Calendar>
      <TaskList tasks={userTasks}></TaskList>
      <Button text={"+ Add new task"} />
      <Button onClick={handleLogOut} text={"logout"} />
    </TodoListWrapper>
  );
};

export default HomePage;
