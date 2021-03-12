import { React, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import TextInput from 'core/components/styled/TextInput';
import Button from 'core/components/styled/Button';
import ToastContainer, { showErrorToast } from 'core/services/showToast';
import { registerUser } from 'core/services/firebaseAuthQueries';
import { createUserFolder } from 'core/services/firebaseDBQueries';
import LINKS from 'core/utils/constants';
import { RegisterWrapper, RegisterContainer } from './styles';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordComfirm, setPasswordConfirm] = useState('');

  const history = useHistory();

  const handleSignUp = async () => {
    if (email === '' || password === '' || passwordComfirm === '') {
      showErrorToast('Fill all fields please');
      return;
    }
    if (password !== passwordComfirm) {
      showErrorToast('Passwords should match');
      return;
    }

    try {
      const registerResult = await registerUser(email, password);
      await createUserFolder(registerResult);
      history.push(LINKS.HOME);
    } catch (e) {
      showErrorToast(e);
    }
  };

  return (
    <RegisterWrapper>
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
