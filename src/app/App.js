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
import { auth } from "../api/firebase";

function App() {
  const checkIsLoggedIn = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        return true;
      }
      return false;
    });
  };

  return (
    <Router>
      <Switch>
        <Route exact path={`/`}>
          {checkIsLoggedIn() ? <HomePage /> : <Redirect to="/login" />}
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
