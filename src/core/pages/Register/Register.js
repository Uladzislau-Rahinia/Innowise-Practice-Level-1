import { React, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import TextInput from "core/components/textInput";
import Button from "core/components/Button";
import { RegisterWrapper, RegisterContainer } from "./styles";
import ToastContainer, { showErrorToast } from "core/services/showToast";
import { RegisterUser } from "core/services/firebaseAuthQueries";
import { CreateUserFolder } from "core/services/firebaseDBQueries";
import RedirectWrapper from "core/services/redirect";
import { LINKS } from "core/utils/constants";

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
      <RedirectWrapper isRedirect={isRedirect} to={LINKS.HOME} />
      <span>Todo-List</span>
      <RegisterContainer>
        <span>Please Register</span>
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
        <TextInput
          onChange={useCallback((e) => setPasswordConfirm(e.target.value), [
            passwordComfirm,
          ])}
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
