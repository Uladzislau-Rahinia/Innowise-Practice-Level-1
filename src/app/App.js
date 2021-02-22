import { HashRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "../features/HomePage";
import LoginPage from "../features/Login";
import RegisterPage from "../features/Register";
import CreateTaskPage from "../features/TaskCreator";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={`/`}>
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
