import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, signup, validateAuth } from '../utils/helpers';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Toast from '../components/Toast';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate
    const validation = validateAuth(formData, !isLogin);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    
    // Attempt auth
    let result;
    if (isLogin) {
      result = login(formData.email, formData.password);
    } else {
      result = signup(formData.name, formData.email, formData.password);
    }
    
    if (result.success) {
      setToast({ message: `${isLogin ? 'Login' : 'Signup'} successful!`, type: 'success' });
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } else {
      setToast({ message: result.error, type: 'error' });
    }
  };
  
  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({ name: '', email: '', password: '' });
    setErrors({});
  };
  
  return (
    <div className="app-container">
      <Header />
      
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      <div className="auth-wrapper">
        <section className="auth-section">
          <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p>{isLogin ? 'Login to your account' : 'Sign up to get started'}</p>
          
          <form className="auth-form" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                />
                {errors.name && <div className="error-message">{errors.name}</div>}
              </div>
            )}
            
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
              />
              {errors.email && <div className="error-message">{errors.email}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
              />
              {errors.password && <div className="error-message">{errors.password}</div>}
            </div>
            
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </form>
          
          <div className="auth-switch">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <a href="#" onClick={(e) => { e.preventDefault(); toggleForm(); }}>
              {isLogin ? 'Sign Up' : 'Login'}
            </a>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
};

export default Auth;
