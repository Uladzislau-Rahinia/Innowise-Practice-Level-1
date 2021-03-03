import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import HomePage from "pages/HomePage";
import LoginPage from "pages/Login";
import RegisterPage from "pages/Register";
import TaskPage from "pages/TaskCreator";
import { LINKS } from "utils/constants";

function App() {
  return (
    <Router>
      <Switch>
        <Redirect from={LINKS.ROOT} to={LINKS.HOME} exact />
        <Route path={LINKS.HOME}>
          <HomePage />
        </Route>
        <Route path={LINKS.LOGIN}>
          <LoginPage />
        </Route>
        <Route path={LINKS.REGISTER}>
          <RegisterPage />
        </Route>
        <Route path={LINKS.TASK} component={TaskPage} />
      </Switch>
    </Router>
  );
}

export default App;
