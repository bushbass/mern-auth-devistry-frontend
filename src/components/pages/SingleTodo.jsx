import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import UserContext from '../../context/UserContext';
import { useHistory, useParams } from 'react-router-dom';

function SingleTodo() {
  const { BACKEND_URL, userData } = useContext(UserContext);
  const history = useHistory();
  const [renderToggle] = useState(true);
  const { pageId } = useParams();
  const [todo, setTodo] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem('auth-token');
      const getAllResponse = await Axios.get(`${BACKEND_URL}/todos/${pageId}`, {
        headers: {
          'x-auth-token': token,
        },
      });

      setTodo(getAllResponse.data[0]);
    }
    fetchData();
  }, [BACKEND_URL, renderToggle, pageId]); // Or [] if effect doesn't need props or state

  useEffect(() => {
    if (!userData.user) history.push('/login');
  });

  return (
    <div>
      <h2>Show one todo</h2>
      <p className='todo-single'>{todo.title}</p>
    </div>
  );
}

export default SingleTodo;
