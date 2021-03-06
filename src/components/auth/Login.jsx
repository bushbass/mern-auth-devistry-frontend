import React, { useState, useContext } from 'react';
import Axios from 'axios';
import UserContext from '../../context/UserContext';
import { useHistory } from 'react-router-dom';
import ErrorNotice from '../misc/ErrorNotice';

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const { setUserData, BACKEND_URL } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const loginUser = { email, password };
      await Axios.post(`${BACKEND_URL}/users/login`, loginUser);
      const loginResponse = await Axios.post(`${BACKEND_URL}/users/login`, {
        email,
        password,
      });
      setUserData({
        token: loginResponse.data.token,
        user: loginResponse.data.user,
      });
      localStorage.setItem('auth-token', loginResponse.data.token);
      history.push('/');
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <div className='page'>
      <h2>Login</h2>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      <form className='form' onSubmit={submit}>
        <label htmlFor='login-email'>Email</label>
        <input
          id='login-email'
          type='email'
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor='login-password'>Password</label>
        <input
          id='login-password'
          type='password'
          onChange={(e) => setPassword(e.target.value)}
        />

        <input type='submit' value='Login' />
      </form>
    </div>
  );
}

export default Login;
