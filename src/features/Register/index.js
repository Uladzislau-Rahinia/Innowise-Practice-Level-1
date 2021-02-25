import { React, useState } from "react";
import { Redirect, Link } from "react-router-dom";
import styled from "styled-components";
import TextInput from "../../components/textInput";
import Button from "../../components/Button";
import { database, auth } from "../../api/firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  font-family: "Rowdies";
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: orange;
  & > span {
    color: white;
    font-size: 50px;
    margin-bottom: 50px;
  }
`;

const RegisterContainer = styled.div`
  width: 300px;
  height: 400px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  justify-content: space-evenly;
`;

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
    } else if (password !== passwordComfirm) {
      toast.error("Passwords should match", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3500,
      });
      return;
    }
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        let tasksRef = database.ref(`tasks/`);
        let newUser = {};
        newUser[`${userCredential.user.uid}`] = "";
        console.log(newUser);
        tasksRef.update(newUser).then(() => {
          setRedirect(true);
        });

        console.log(userCredential.user);
        // ...
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
        console.log(error.code);
        console.log(error.message);
        // ..
      });
  };

  return (
    <RegisterWrapper>
      {isRedirect ? <Redirect to={`/home`} /> : ""}
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
