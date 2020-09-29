import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import UserContext from '../../context/UserContext';
import { useHistory } from 'react-router-dom';

function UserDisplay() {
  const [todos, setTodos] = useState([]);
  const { BACKEND_URL, userData } = useContext(UserContext);
  const history = useHistory();
  const [renderToggle, setRenderToggle] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem('auth-token');
      const getAllResponse = await Axios.get(`${BACKEND_URL}/todos`, {
        headers: {
          'x-auth-token': token,
        },
      });

      setTodos(getAllResponse.data);
    }
    fetchData();
  }, [BACKEND_URL, renderToggle]); // Or [] if effect doesn't need props or state

  useEffect(() => {
    if (!userData.user) history.push('/login');
  });

  //delete todo
  const deleteTodo = async (id) => {
    try {
      const token = localStorage.getItem('auth-token');

      await Axios.delete(`${BACKEND_URL}/todos/${id}`, {
        headers: {
          'x-auth-token': token,
        },
      });
      setRenderToggle(!renderToggle);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='page'>
      {console.log(renderToggle)}
      <h2>All current todos</h2>
      {todos.map((todo) => {
        return (
          <div key={todo._id}>
            {todo.title} + {todo._id}{' '}
            <button
              onClick={() => deleteTodo(todo._id)}
              className='delete-button'
            >
              X
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default UserDisplay;
