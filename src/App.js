import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Header from './components/layout/Header';
import UserContext from './context/UserContext';
import UserDisplay from './components/pages/UserDisplay';

function App() {
  const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000';

  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem('auth-token');
      if (token === null) {
        localStorage.setItem('auth-token', '');
        token = '';
      }
      const tokenResponse = await Axios.post(
        `${BACKEND_URL}/users/tokenIsValid`,
        null,
        { headers: { 'x-auth-token': token } }
      );
      if (tokenResponse.data) {
        const userResponse = await Axios.get(`${BACKEND_URL}/users`, {
          headers: { 'x-auth-token': token },
        });
        setUserData({ token, user: userResponse.data });
      }
    };
    checkLoggedIn();
  }, [BACKEND_URL]);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ userData, setUserData, BACKEND_URL }}>
        <Header />
        <div className='container'>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/todos' component={UserDisplay} />
          </Switch>
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
