import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const isAuthenticated = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/login');
  };

  return (
    <nav>
      <div className="nav-wrapper ">
        <Link to="/" className="brand-logo left hide-on-med-and-down">BNEX Products</Link>
        <ul id="nav-mobile" className="right">
          {isAuthenticated ? (
            <>
              <li><Link to="/products">Produtos</Link></li>
              <li><Link to="/create">Adicionar Produto</Link></li>
              <li><a href="#!" onClick={handleLogout}>Logout</a></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Registrar</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
