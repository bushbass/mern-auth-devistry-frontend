import React from 'react';
import { useHistory } from 'react-router-dom';

function AuthOptions() {
  const history = useHistory();

  const register = () => history.push('/register');
  const login = () => history.push('/login');
  return (
    <nav>
      <button onClick={register}>Register</button>
      <button onClick={login}>Login</button>
    </nav>
  );
}

export default AuthOptions;
