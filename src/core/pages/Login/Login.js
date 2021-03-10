import { React, useCallback, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import TextInput from "core/components/textInput";
import Button from "core/components/Button";
import { loginUser } from "core/services/firebaseAuthQueries";
import { LoginWrapper, LoginContainer } from "./styles";
import ToastContainer, { showErrorToast } from "core/services/showToast";
import { LINKS } from "core/utils/constants";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const handleLogin = async () => {
    if (email === "" || password === "") {
      showErrorToast("Fill all fields please");
      return;
    }

    const loginResult = await loginUser(email, password);
    if (loginResult.isSuccessful) {
      history.push(LINKS.HOME);
    } else {
      showErrorToast(loginResult.message);
    }
  };

  return (
    <LoginWrapper>
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
