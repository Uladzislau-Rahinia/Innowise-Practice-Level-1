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
  //const [redirectTaskCreator, setRedirectTaskCreator] = useState(false);
  const [userData, setUserData] = useState([]);
  const [chosenDay, setChosenDay] = useState(format(new Date(Date.now()),"yyyy-MM-dd"));

  //console.log(isUserLoggedIn, redirectTaskCreator, userData, chosenDay);

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
              if(data[chosenDay]) {
                setUserData(data[chosenDay]);
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

  const handleUpdateStatus = (e) => {
    let updatedTasks = userData[chosenDay];
    updatedTasks[e.target.value].status = e.target.checked;
    let updates = {};
    updates['/tasks/' + auth.currentUser.uid + '/' + chosenDay] = updatedTasks;
    database.ref().update(updates).then((value) => {
      let updatedData = userData;
      updatedData[chosenDay] = updatedTasks;
      setUserData(updatedData);
    });
  }

  return (
    <TodoListWrapper>
      {isUserLoggedIn ? "" : <Redirect to={`/login`} />}
      {/*redirectTaskCreator ? <Redirect to={`/create-task`} /> : ""*/}
      <Calendar chosenDay={chosenDay} handleChoosingDay={(e) => {
    setChosenDay(e.target.id);
  }}></Calendar>
      <TaskList tasks={userData} day={chosenDay} handleUpdateStatus={handleUpdateStatus}></TaskList>
      <Button text={"+ Add new task"} /*onClick={/*setRedirectTaskCreator(true)}*//>
      <Button onClick={handleLogOut} text={"logout"} />
    </TodoListWrapper>
  );
};

export default HomePage;
