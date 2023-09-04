// LoginForm.js
import React, { useState } from 'react';
import { useAuth } from '../Auth/AuthContext';
import { Navigate } from 'react-router-dom';

function LoginForm() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    login(formData); // Calls the login function from AuthContext
    console.log("hii")
    Navigate('/home')
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
