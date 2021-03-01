import { React, useState } from "react";
import { Redirect, Link } from "react-router-dom";
import TextInput from "components/textInput";
import Button from "components/Button";
import { RegisterWrapper, RegisterContainer } from "./styles";
import ToastContainer, { showErrorToast } from "services/showToast";
import { RegisterUser } from "services/firebaseAuthQueries";
import { CreateUserFolder } from "services/firebaseDBQueries";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordComfirm, setPasswordConfirm] = useState("");
  const [isRedirect, setRedirect] = useState(false);

  const handleSignUp = async () => {
    if (email === "" || password === "" || passwordComfirm === "") {
      showErrorToast("Fill all fields please");
      return;
    }
    if (password !== passwordComfirm) {
      showErrorToast("Passwords should match");
      return;
    }

    const registerResult = await RegisterUser(email, password);
    if (registerResult.isSuccessful) {
      const queryResult = await CreateUserFolder(registerResult.data);
      if (queryResult) setRedirect(true);
    } else {
      showErrorToast(registerResult.message);
    }
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
