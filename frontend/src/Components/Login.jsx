// src/components/LoginPage.js

import React, { useState,} from 'react';
import axios from 'axios';
import { Link,useNavigate} from 'react-router-dom';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/accounts/users/login/', {
        email,
        password,
      });
        localStorage.setItem('user_id', response.data.user_id);
        localStorage.setItem('user_email', response.data.email);
        
      console.log(localStorage.getItem('user_id'), localStorage.getItem('user_email'));
      navigate('/');
      // Handle successful login, e.g., redirect to another page
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage('An error occurred during login');
      }
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="bg-white shadow-md rounded px-8 py-8 w-96">
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
        {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleLogin}
          >
            Login
          </button>
          <Link
            to='/register'
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => alert('Redirect to sign up page')}
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
