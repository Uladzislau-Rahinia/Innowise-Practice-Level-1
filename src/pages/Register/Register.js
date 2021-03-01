import { React, useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import TextInput from "components/textInput";
import Button from "components/Button";
import { database, auth } from "api/firebase";
import { RegisterWrapper, RegisterContainer } from "./styles";
import "react-toastify/dist/ReactToastify.css";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordComfirm, setPasswordConfirm] = useState("");
  const [isRedirect, setRedirect] = useState(false);

  const handleSignUp = () => {
    if (email === "" || password === "" || passwordComfirm === "") {
      toast.error("Fill all fields please", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3500,
      });
      return;
    }
    if (password !== passwordComfirm) {
      toast.error("Passwords should match", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3500,
      });
      return;
    }
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const tasksRef = database.ref(`tasks/`);
        const newUser = {};
        newUser[`${userCredential.user.uid}`] = "";
        tasksRef.update(newUser).then(() => {
          setRedirect(true);
        });
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/invalid-email":
            toast.error("Enter valid email please", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3500,
            });
            break;
          case "auth/weak-password":
            toast.error(
              "Password is too weak, it should be at least 6 characters",
              {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3500,
              }
            );
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
    <RegisterWrapper>
      {isRedirect ? <Redirect to="/home" /> : ""}
      <span>Todo-List</span>
      <RegisterContainer>
        <span>Please Register</span>
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
        <TextInput
          onChange={(e) => setPasswordConfirm(e.target.value)}
          value={passwordComfirm}
          type="password"
          placeholder="Comfirm password"
        />
        <Button onClick={handleSignUp} text="Sign Up" />
        <Link to="/login">Already have an account? Sign In here!</Link>
      </RegisterContainer>
      <ToastContainer />
    </RegisterWrapper>
  );
};

export default RegisterPage;
