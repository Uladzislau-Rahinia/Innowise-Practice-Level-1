import React from "react";
import styled from "styled-components";

const LoginWrapper = styled.div`
  max-width: 762px;
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: center;
`;
const LoginContainer = styled.div`
  width: 90%;
  height: 100%;
  background-color: black;
  color: white;
`;

const LoginPage = () => {
  return (
    <LoginWrapper>
      <LoginContainer>
          TEST TEST TEST HOME PAGE
        </LoginContainer>
    </LoginWrapper>
  );
};

export default LoginPage;
