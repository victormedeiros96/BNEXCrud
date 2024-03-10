// src/pages/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api/AuthService';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(username, password);
      alert("Registro bem-sucedido!");
      navigate('/login'); // Redireciona o usuário para a página de login após o registro
    } catch (error) {
      alert("Falha no registro, tente novamente.");
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h2>Registrar</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-field">
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label htmlFor="username">Nome de Usuário</label>
        </div>
        <div className="input-field">
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor="password">Senha</label>
        </div>
        <button type="submit" className="btn">Registrar</button>
      </form>
    </div>
  );
};

export default Register;
