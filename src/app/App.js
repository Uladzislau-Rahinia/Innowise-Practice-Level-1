import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "../features/HomePage";
import LoginPage from "../features/Login";
import RegisterPage from "../features/Register";
import CreateTaskPage from "../features/TaskCreator";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={`/Innowise-Practice-Level-1/`}>
          <HomePage />
        </Route>
        <Route path={`/Innowise-Practice-Level-1/login`}>
          <LoginPage />
        </Route>
        <Route path={`/Innowise-Practice-Level-1/register`}>
          <RegisterPage />
        </Route>
        <Route path={`/Innowise-Practice-Level-1/create-task`}>
          <CreateTaskPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
