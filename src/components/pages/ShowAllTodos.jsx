import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import UserContext from '../../context/UserContext';
import { useHistory, Link } from 'react-router-dom';

function ShowAllTodos() {
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
      <h2>All current todos</h2>
      <ul>
        {todos.map((todo) => {
          return (
            <Link key={todo._id} to={`/todo/${todo._id}`}>
              <li>
                {todo.title}``
                <button
                  onClick={() => deleteTodo(todo._id)}
                  className='delete-button'
                >
                  X
                </button>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}

export default ShowAllTodos;
