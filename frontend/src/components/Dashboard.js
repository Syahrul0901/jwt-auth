/* eslint-disable no-undef */
/* eslint-disable no-template-curly-in-string */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useHistory } from 'react-router-dom';

const Dashboard = () => {
  const [name, setName] = useState('');
  const [token, settToken] = useState('');
  const [expire, setExpire] = useState('');
  const history = useHistory();

  useEffect(() => {
    refreshToken();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get('http://localhost:5000/token');
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setName(decoded.name);
      setExpire(decoded.exp);
    } catch (error) {
      if (error.response) {
        history.push('/');
      }
    }
  };

  const getUsers = async () => {
    const response = await axios.get('http://localhost:5000/users', {
      headers: {
        Authorization: 'Bearer ${token}',
      },
    });
    console.log(response.data);
  };

  return (
    <div className="container mt-5">
      <h1>Welcome Back: {name}</h1>
      <button onClick={getUsers} className="button is-info">
        Get Users
      </button>
    </div>
  );
};

export default Dashboard;
