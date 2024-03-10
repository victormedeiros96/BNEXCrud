import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const isAuthenticated = await login(username, password);
      if (isAuthenticated) {
        navigate('/products'); // Redireciona para produtos
      } else {
        console.log("Login falhou.");
      }
    } catch (error) {
      alert("Falha no login");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-field">
          <input
            id="username"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <label htmlFor="username">Nome de Usuário</label>
        </div>
        <div className="input-field">
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <label htmlFor="password">Senha</label>
        </div>
        <button type="submit" className="btn">Entrar</button>
      </form>
    </div>
  );
};

export default Login;