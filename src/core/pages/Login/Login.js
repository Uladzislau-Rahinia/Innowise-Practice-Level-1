import { React, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import TextInput from 'core/components/styled/TextInput';
import Button from 'core/components/styled/Button';
import { loginUser } from 'core/services/firebaseAuthQueries';
import ToastContainer, { showErrorToast } from 'core/services/showToast';
import LINKS from 'core/utils/constants';
import { LoginWrapper, LoginContainer } from './styles';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const handleLogin = async () => {
    if (email === '' || password === '') {
      showErrorToast('Fill all fields please');
      return;
    }

    try {
      await loginUser(email, password);
      history.push(LINKS.HOME);
    } catch (e) {
      showErrorToast(e);
    }
  };

  return (
    <LoginWrapper>
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
