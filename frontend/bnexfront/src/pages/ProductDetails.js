import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
const API_BASE = process.env.REACT_APP_API_URL;
const API_URL = `${API_BASE}:8000/produtos/`;
const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const handleDelete = () => {
    if (window.confirm('Tem certeza que deseja remover este produto?')) {
      const token = localStorage.getItem('accessToken');
      const API_BASE = process.env.REACT_APP_API_URL;
      const API_URL = `${API_BASE}:8000/produtos/${id}/`;

      fetch(API_URL, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao remover o produto');
        }
        navigate('/products');
      })
      .catch(error => console.error('Error removing product: ', error));
    }
  };
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    fetch(`${API_URL}${id}/`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then(data => setProduct(data))
    .catch(error => console.error('Error fetching product: ', error));
  }, [id]);

  if (!product) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="container">
      <h2>Detalhes do Produto</h2>
      <div className="card">
        <div className="card-content">
          <span className="card-title">{product.nome}</span>
          <p>{product.descricao}</p>
          <p className="grey-text">R$ {product.valor}</p>
          <button className="btn" onClick={() => navigate(`/edit/${id}`)}>Editar</button>
          <button className="btn" onClick={handleDelete}>Deletar</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
