import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'https://safespot-backend.onrender.com/auth/login',
        formData
      );
      alert('Login successful!');
      localStorage.setItem('token', res.data.token);
      navigate('/report');
    } catch (err) {
      alert('Login failed: ' + (err.response?.data?.error || 'Server error'));
    }
  };

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(120deg, #e6f9ed, #d0f5dc)',
    fontFamily: "'Segoe UI', sans-serif",
    padding: '40px',
  };

  const cardStyle = {
    maxWidth: '400px',
    width: '100%',
    animation: 'fadeIn 0.8s ease-in-out',
    borderRadius: '1.5rem',
    border: 'none',
  };

  const keyframesStyle = `
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;

  return (
    <>
      <style>{keyframesStyle}</style>

      <div className="d-flex align-items-center justify-content-center px-3" style={containerStyle}>
        <div className="card shadow-lg p-4 bg-white text-center" style={cardStyle}>
          
          <div className="mb-3">
            <div className="bg-success rounded-circle p-3 d-inline-block">
              <i className="bi bi-shield-lock-fill text-white fs-3"></i>
            </div>
          </div>

          <h3 className="fw-bold text-dark">Welcome Back</h3>
          <p className="text-muted mb-4">Sign in to your SafeSpot Lite account</p>

          <form onSubmit={handleSubmit} className="text-start">
            <div className="mb-3">
              <label className="form-label fw-semibold">Email Address</label>
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0">
                  <i className="bi bi-envelope"></i>
                </span>
                <input
                  type="email"
                  name="email"
                  className="form-control border-start-0"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Password</label>
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0">
                  <i className="bi bi-lock"></i>
                </span>
                <input
                  type="password"
                  name="password"
                  className="form-control border-start-0"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-success w-100 fw-semibold py-2">
              LogIn
            </button>
          </form>

          <div className="text-muted my-3">────────  New to SafeSpot Lite?  ────────</div>

          <Link to="/signup" className="btn btn-outline-success w-100 fw-semibold py-2">
            Create New Account
          </Link>
        </div>
      </div>
    </>
  );
}
