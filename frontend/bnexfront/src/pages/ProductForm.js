import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
const API_URL = 'http://backend:8000/produtos/';
const ProductForm = () => {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    valor: '',
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const token = localStorage.getItem('accessToken');
      fetch(`${API_URL}${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => response.json())
      .then(product => setFormData({
        nome: product.nome,
        descricao: product.descricao,
        valor: product.valor,
      }))
      .catch(error => console.error('Error fetching product: ', error));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'valor') {
      const regex = /^\d{0,13}\.?\d{0,2}$/;
      if (regex.test(value)) {
        setFormData(prevFormData => ({
          ...prevFormData,
          [name]: value
        }));
      }
    } else {
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('accessToken');

    const requestOptions = {
      method: id ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    };

    const url = id ? `${API_URL}${id}/` : `${API_URL}`;

    fetch(url, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(() => navigate('/products'))
      .catch(error => console.error('Error submitting product: ', error));
  };

  return (
    <div className="container">
      <h2>{id ? 'Editar' : 'Adicionar'} Produto</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-field">
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
          />
          <label htmlFor="nome" className={id ? 'active' : ''}>Nome</label>
        </div>
        <div className="input-field">
          <input
            type="text"
            id="descricao"
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
          />
          <label htmlFor="descricao" className={id ? 'active' : ''}>Descrição</label>
        </div>
        <div className="input-field">
          <input
            type="text"
            id="valor"
            name="valor"
            value={formData.valor}
            onChange={handleChange}
          />
          <label htmlFor="valor" className={id ? 'active' : ''}>Valor (R$)</label>
        </div>
        <button type="submit" className="btn">{id ? 'Atualizar' : 'Adicionar'}</button>
      </form>
    </div>
  );
};

export default ProductForm;
