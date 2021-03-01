import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import HomePage from "src/pages/HomePage/";
import LoginPage from "src/pages/Login/";
import RegisterPage from "src/pages/Register/";
import CreateTaskPage from "src/pages/TaskCreator/";

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
