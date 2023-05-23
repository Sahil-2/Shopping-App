import React, { useState } from 'react';

function LoginForm({ onLogin, onRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleLogin = () => {
    onLogin({ email, password });
  };

  const handleRegister = () => {
    if (name.trim() === '' || email.trim() === '' || password.trim() === '') {
      return;
    }

    // Create a new user object
    const newUser = {
      name,
      email,
      password,
    };

    onRegister(newUser);
  };

  return (
    <div>
      <h2>Login / Register</h2>
      <label>
        Email:
        <input type="text" value={email} onChange={handleEmailChange} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={handlePasswordChange} />
      </label>
      <button onClick={handleLogin}>Login</button>
      <hr />
      {/* <h3>Register</h3>
      <label>
        Name:
        <input type="text" value={name} onChange={handleNameChange} />
      </label> 
      <button onClick={handleRegister}>Register</button> */}
    </div>
  );
}

export default LoginForm;
