import { React, useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import TextInput from "src/components/textInput";
import Button from "src/components/Button";
import { auth } from "src/api/firebase";
import { LoginWrapper, LoginContainer } from "./styles";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRedirect, setRedirect] = useState(false);

  const handleLogin = () => {
    if (email === "" || password === "") {
      toast.error("Fill all fields please", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3500,
      });
      return;
    }

    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setRedirect(true);
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/invalid-email":
            toast.error("Enter valid email please", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3500,
            });
            break;
          case "auth/user-not-found":
            toast.error("User with this email not found", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3500,
            });
            break;
          case "auth/wrong-password":
            toast.error("Wrong password, try again", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3500,
            });
            break;
          default:
            toast.error("Something went wrong :(", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3500,
            });
        }
      });
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
