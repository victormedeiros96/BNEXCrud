import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ProductList = () => {
  console.log("Entrou aqui no product List");
  const [products, setProducts] = useState([]);
  console.log("Entrou aqui no product List1");
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    fetch('${process.env.REACT_APP_BACKEND_URL}/produtos/', {
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
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching data: ', error));
  }, []);
  console.log("Entrou aqui no product List2");
  return (
    <div className="container">
      <h2>Lista de Produtos</h2>
      <ul className="collection">
        {products.map(product => (
          <li key={product.id} className="collection-item">
            <Link to={`/products/${product.id}`}>{product.nome}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
