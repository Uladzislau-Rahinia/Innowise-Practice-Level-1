import React from "react";
import styled from "styled-components";
import TextInput from "../../components/textInput";
import Button from "../../components/Button";

const RegisterWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  font-family: "Rowdies";
  display: flex;
  flex-direction:column;
  justify-content: flex-start;
  align-items: center;
  background-color: orange;
  &>span {
    color:white;
    font-size: 50px;
    margin-bottom: 50px;
  }
`;

const RegisterContainer = styled.div`
  width: 300px;
  height: 400px;
  border-radius: 10px;
  display: flex;
  flex-direction:column;
  align-items: center;
  background-color: white;
  justify-content: space-evenly;
`;

const RegisterPage = () => {
  return (
    <RegisterWrapper>
      <span>Todo-List</span>
      <RegisterContainer>
        <span>Please Register</span>
        <TextInput type="text" placeholder="Username"/>
        <TextInput type="text" placeholder="E-mail"/>
        <TextInput type="password" placeholder="Password"/>
        <TextInput type="password" placeholder="Comfirm password"/>
        <Button text="Sign Up"/>
      </RegisterContainer>
    </RegisterWrapper>
  );
};

export default RegisterPage;