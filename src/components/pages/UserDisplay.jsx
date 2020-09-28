import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function UserDisplay() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem('auth-token');
      const getAllResponse = await Axios.get('http://localhost:5000/todos', {
        headers: {
          'x-auth-token': token,
        },
      });

      setTodos(getAllResponse.data);
    }
    fetchData();
  }, []); // Or [] if effect doesn't need props or state

  return (
    <div>
      {todos.map((todo) => {
        return <div key={todo._id}>{todo.title}</div>;
      })}
    </div>
  );
}

export default UserDisplay;
