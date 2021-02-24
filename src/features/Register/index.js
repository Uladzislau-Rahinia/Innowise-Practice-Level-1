import { React, useState } from "react";
import styled from "styled-components";
import TextInput from "../../components/textInput";
import Button from "../../components/Button";
import { auth } from "../../api/firebase";

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

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        console.log(userCredential.user);
        // ...
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
        // ..
      });
  };

  return (
    <RegisterWrapper>
      <span>Todo-List</span>
      <RegisterContainer>
        <span>Please Register</span>
        <TextInput type="text" placeholder="Username" />
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
        <TextInput type="password" placeholder="Comfirm password" />
        <Button onClick={handleSignUp} text="Sign Up" />
      </RegisterContainer>
    </RegisterWrapper>
  );
};

export default RegisterPage;
