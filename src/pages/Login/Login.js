import { React, useState } from "react";
import { Redirect, Link } from "react-router-dom";
import TextInput from "components/textInput";
import Button from "components/Button";
import { LoginUser } from "services/firebaseAuthQueries";
import { LoginWrapper, LoginContainer } from "./styles";
import ToastContainer, { showErrorToast } from "services/showToast";

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
      {isRedirect ? <Redirect to="/home" /> : ""}
      <span>Todo-List</span>
      <LoginContainer>
        <span>Please Login</span>
        <TextInput
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="text"
          placeholder="E-mail"
        />
        <TextInput
          onChange={(e) => setPassword(e.target.value)}
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
