import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../../context/UserContext';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import ErrorNotice from '../misc/ErrorNotice';

function AddTodo() {
  const { BACKEND_URL, userData } = useContext(UserContext);
  const [error, setError] = useState();

  const [todoInput, setTodoInput] = useState('');
  const history = useHistory();

  useEffect(() => {
    if (!userData.user) history.push('/login');
  });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('auth-token');

      await Axios.post(
        `${BACKEND_URL}/todos`,
        { title: todoInput, userId: userData },
        {
          headers: {
            'x-auth-token': token,
          },
        }
      );

      history.push('/todos');
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <div className='page'>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      <form className='form' onSubmit={submit}>
        <label htmlFor='todo'>add todo</label>
        <input
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
          type='text'
          name='todo'
        />
        <input type='submit' value='Add Todo' />
      </form>
    </div>
  );
}

export default AddTodo;
