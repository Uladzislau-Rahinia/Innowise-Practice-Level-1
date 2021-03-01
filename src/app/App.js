import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import HomePage from "pages/HomePage";
import LoginPage from "pages/Login";
import RegisterPage from "pages/Register";
import CreateTaskPage from "pages/TaskCreator";

function App() {
  return (
    <Router>
      <Switch>
        <Redirect from="/" to="/home" exact />
        <Route path="/home">
          <HomePage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/register">
          <RegisterPage />
        </Route>
        <Route path="/create-task" component={CreateTaskPage} />
      </Switch>
    </Router>
  );
}

export default App;
