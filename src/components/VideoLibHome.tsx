import React from 'react';
import { Link } from 'react-router-dom';
import '../../public/VideoLibHome.css'; 

const VideoLibHome = () => {
  return (
    <div className="video-lib-home d-flex justify-content-center align-items-center">
      <div className="home-card card p-4 shadow-lg border-0 text-center">
        <h2 className="mb-4 text-white">🎬Video Library</h2>

        <div className="d-grid gap-3">
          <Link to="/user-login" className="btn btn-warning btn-lg">
            <i className="bi bi-person-circle me-2"></i>User Login
          </Link>

          <Link to="/admin-login" className="btn btn-dark btn-lg">
            <i className="bi bi-person-lock me-2"></i>Admin Login
          </Link>

          <hr className="bg-light" />

          <Link to="/user-reg" className="btn btn-outline-light">
            <i className="bi bi-person-plus me-2"></i>Register as New User
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VideoLibHome;
