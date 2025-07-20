import React from 'react';
import { Link } from 'react-router-dom';

const UserLoginerr = () => {
  return (
    <div className="d-flex justify-content-center align-items-center video-wrapper text-white" style={{ minHeight: '80vh' }}>
      <div className="card shadow-lg p-4 text-center bg-danger bg-opacity-10 border border-danger" style={{ maxWidth: '500px' }}>
        <h2 className="text-danger mb-3">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>User does not exist
        </h2>
        <p className="mb-4 text-danger">The credentials you entered don’t match any account.</p>
        <Link to="/user-login" className="btn btn-outline-danger">
          <i className="bi bi-arrow-left me-1"></i> Try Again
        </Link>
      </div>
    </div>
  );
};

export default UserLoginerr;
