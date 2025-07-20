import React from 'react';
import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import VideoLibHome from './components/VideoLibHome';
import UserLogin from './components/UserLogin';
import UserReg from './components/UserReg';
import UserDashboard from './components/UserDashboard';
import UserLoginerr from './components/UserLoginerr';
import AdminLogin from './components/AdminLogin';
import AdminDash from './components/AdminDash';
import AddVideo from './components/AddVideo';
import EditVideo from './components/EditVideo';
import DeleteVideo from './components/DeleteVideo';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="container-fluid p-0 min-vh-100 d-flex flex-column">
      <BrowserRouter>
        <header className="navbar-gradient text-white py-3 shadow-sm">
          <div className="container d-flex justify-content-between align-items-center">
            <h1 className="h3 m-0">
              <Link to="/" className="text-white text-decoration-none">
                🎬 Video Library
              </Link>
            </h1>
            <nav>
              <Link to="/user-login" className="btn btn-outline-light me-2">User Login</Link>
              <Link to="/admin-login" className="btn btn-outline-light">Admin Login</Link>
            </nav>
          </div>
        </header>


        <main className="flex-fill bg-dark">
          <div>
            <Routes>
              <Route path="/" element={<VideoLibHome />} />
              <Route path="/user-login" element={<UserLogin />} />
              <Route path="/user-reg" element={<UserReg />} />
              <Route path="/user-dashboard" element={<UserDashboard />} />
              <Route path="/user-login-err" element={<UserLoginerr />} />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/admin-dashboard" element={<AdminDash />} />
              <Route path="/add-video" element={<AddVideo />} />
              <Route path="/edit-video/:id" element={<EditVideo />} />
              <Route path="/delete-video/:id" element={<DeleteVideo />} />
            </Routes>
          </div>
        </main>

        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
