import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../context/UserContext';

function AuthOptions() {
  const { userData, setUserData } = useContext(UserContext);

  const history = useHistory();

  const register = () => history.push('/register');
  const login = () => history.push('/login');
  const showTodos = () => history.push('/todos');
  const addTodo = () => history.push('/addTodo');
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem('auth-token', '');
  };

  return (
    <nav>
      {userData.user ? (
        <>
          <button onClick={addTodo}>Add Todo</button>
          <button onClick={showTodos}>Show Todos</button>
          <button onClick={logout}>Log out</button>
        </>
      ) : (
        <>
          <button onClick={register}>Register</button>
          <button onClick={login}>Login</button>
        </>
      )}
    </nav>
  );
}

export default AuthOptions;
