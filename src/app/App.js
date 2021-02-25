import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import HomePage from "../features/HomePage";
import LoginPage from "../features/Login";
import RegisterPage from "../features/Register";
import CreateTaskPage from "../features/TaskCreator";

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
        <Route path={`/create-task`} component={CreateTaskPage}></Route>
      </Switch>
    </Router>
  );
}

export default App;
