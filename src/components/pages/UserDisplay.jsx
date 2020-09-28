import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import UserContext from '../../context/UserContext';

function UserDisplay() {
  const [todos, setTodos] = useState([]);
  const { BACKEND_URL } = useContext(UserContext);

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
  }, [BACKEND_URL]); // Or [] if effect doesn't need props or state

  return (
    <div>
      {todos.map((todo) => {
        return <div key={todo._id}>{todo.title}</div>;
      })}
    </div>
  );
}

export default UserDisplay;
