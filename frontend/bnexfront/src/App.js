import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext'; 
import Navbar from './components/Navbar';
import ProductList from './pages/ProductList';
import ProductDetails from './pages/ProductDetails';  
import ProductForm from './pages/ProductForm';
import Login from './pages/Login';
import Register from './pages/Register';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Navigate to="/products" />} />
            <Route path="/products" element={<ProtectedRoute><ProductList /></ProtectedRoute>} />
            <Route path="/products/:id" element={<ProtectedRoute><ProductDetails /></ProtectedRoute>} />
            <Route path="/create" element={<ProtectedRoute><ProductForm /></ProtectedRoute>} />
            <Route path="/edit/:id" element={<ProtectedRoute><ProductForm /></ProtectedRoute>} />
            <Route path="/edit/:id" element={<ProductForm />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
