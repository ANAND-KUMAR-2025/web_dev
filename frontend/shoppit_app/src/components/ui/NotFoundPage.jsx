import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.css';

const NotFoundPage = () => {
  return (
    <div className="notfound-wrapper d-flex flex-column justify-content-center align-items-center text-center px-3">
      <div className="notfound-illustration">
        {/* SVG Wave-style illustration */}
        <svg width="200" height="200" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10
             10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
            fill="#7F00FF"
          />
        </svg>
      </div>
      <h1 className="display-4 fw-bold mt-4 text-gradient">404</h1>
      <h3 className="mb-3">Oops! Page not found</h3>
      <p className="text-muted mb-4">The page you're looking for doesn’t exist or was moved.</p>
      <Link to="/" className="btn btn-lg btn-dark rounded-pill px-4 py-2 shadow-sm">
        ⬅️ Go Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
