import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <div className="home-container d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light text-center px-3">
  
      <header className="w-100 d-flex justify-content-between align-items-center py-4 px-4">
        <h3 className="fw-bold text-success">SafeSpot Lite</h3>
        <div>
          <Link to="/login" className="me-3 text-success text-decoration-none fw-medium">Login</Link>
          <Link to="/signup" className="btn btn-success px-4 py-2 fw-medium">Sign Up</Link>
        </div>
      </header>

      
      <main className="flex-grow-1 d-flex flex-column justify-content-center align-items-center">
        <h1 className="fw-bold display-5">Quick Safety Reporting <br /><span className="text-success">Made Simple</span></h1>
        <p className="lead text-secondary mt-3 mb-4 px-2" style={{ maxWidth: '600px' }}>
          Report incidents quickly and securely.From danger zones to safe zones one report can make the difference.
        </p>

        <div className="d-flex justify-content-center mb-4">
          <Link to="/signup" className="btn btn-success px-4 py-2 fw-medium">Get Started →</Link>
        </div>

  
        <div className="text-muted small d-flex gap-4 mt-3">
          <span>✓ Secure & Private</span>
          <span>✓ 24/7 Available</span>
          <span>✓ Fast Response</span>
        </div>
      </main>
    </div>
  );
}
