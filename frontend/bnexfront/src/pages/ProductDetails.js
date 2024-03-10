import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    fetch(`http://localhost:8000/produtos/${id}/`, {
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
    return <div>Carregando...</div>; // Ou alguma representação de loading
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
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
