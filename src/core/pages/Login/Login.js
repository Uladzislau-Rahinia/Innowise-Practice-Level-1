import { React, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import TextInput from "core/components/textInput";
import Button from "core/components/Button";
import { LoginUser } from "core/services/firebaseAuthQueries";
import { LoginWrapper, LoginContainer } from "./styles";
import ToastContainer, { showErrorToast } from "core/services/showToast";
import { LINKS } from "core/utils/constants";
import RedirectWrapper from "core/services/redirect";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRedirect, setRedirect] = useState(false);

  const handleLogin = async () => {
    if (email === "" || password === "") {
      showErrorToast("Fill all fields please");
      return;
    }

    const loginResult = await LoginUser(email, password);
    if (loginResult.isSuccessful) {
      setRedirect(true);
    } else {
      showErrorToast(loginResult.message);
    }
  };

  return (
    <LoginWrapper>
      <RedirectWrapper isRedirect={isRedirect} to={LINKS.HOME} />
      <span>Todo-List</span>
      <LoginContainer>
        <span>Please Login</span>
        <TextInput
          onChange={useCallback((e) => setEmail(e.target.value), [email])}
          value={email}
          type="text"
          placeholder="E-mail"
        />
        <TextInput
          onChange={useCallback((e) => setPassword(e.target.value), [password])}
          value={password}
          type="password"
          placeholder="Password"
        />
        <Button onClick={handleLogin} text="Sign In" />
        <Link to="/register">Dont have an account? Sign Up here!</Link>
      </LoginContainer>
      <ToastContainer />
    </LoginWrapper>
  );
};

export default LoginPage;
