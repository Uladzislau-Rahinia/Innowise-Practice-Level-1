import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useState } from "react";
import HomePage from "../features/HomePage";
import LoginPage from "../features/Login";
import RegisterPage from "../features/Register";
import CreateTaskPage from "../features/TaskCreator";
import { auth } from "../api/firebase";

function App() {
  return (
    <Router>
      <Switch>
        <Redirect from={"/"} to={`/home`} exact />
        <Route path={`/home`}>
          <HomePage />
        </Route>
        <Route path={`/login`}>
          <LoginPage />
        </Route>
        <Route path={`/register`}>
          <RegisterPage />
        </Route>
        <Route path={`/create-task`}>
          <CreateTaskPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
