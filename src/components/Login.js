import React, { useState } from 'react';

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label style={{ fontWeight: 'bold', marginLeft: '10px'}}>
        Email:
        <input type="email" value={email} onChange={handleEmailChange} style={{ marginLeft: '32px', marginBottom: '10px'}} />
      </label>
      <br />
      <label style={{ fontWeight: 'bold'}}>
        Password:
        <input type="password" value={password} onChange={handlePasswordChange} style={{ marginLeft: '8px', marginBottom: '10px'}}/>
      </label>
      <br />
      <button type="submit" style={{ fontWeight: 'bold', marginLeft: '120px'}}>Login</button>
    </form>
  );
}

export default LoginForm;
