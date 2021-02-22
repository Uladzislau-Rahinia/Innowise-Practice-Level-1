import React from "react";
import styled from "styled-components";
import TextInput from "../../components/textInput";
import Button from "../../components/Button";

const LoginWrapper = styled.div`
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

const LoginContainer = styled.div`
  width: 300px;
  height: 400px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  justify-content: space-evenly;
`;

const LoginPage = () => {
  return (
    <LoginWrapper>
      <span>Todo-List</span>
      <LoginContainer>
        <span>Please Login</span>
        <TextInput type="text" placeholder="login" />
        <TextInput type="password" placeholder="password" />
        <Button text="Sign In" />
      </LoginContainer>
    </LoginWrapper>
  );
};

export default LoginPage;
