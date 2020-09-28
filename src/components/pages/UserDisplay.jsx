import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import UserContext from '../../context/UserContext';
import { useHistory } from 'react-router-dom';

function UserDisplay() {
  const [todos, setTodos] = useState([]);
  const { BACKEND_URL, userData } = useContext(UserContext);
  const history = useHistory();

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

  useEffect(() => {
    if (!userData.user) history.push('/login');
  });

  return (
    <div>
      {todos.map((todo) => {
        return <div key={todo._id}>{todo.title}</div>;
      })}
    </div>
  );
}

export default UserDisplay;
