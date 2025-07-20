import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../public/AdminLogin.css';

const AdminLogin = () => {
  const navigate = useNavigate();

  const form = useFormik({
    initialValues: {
      admin_id: '',
      password: '',
    },
    onSubmit: (admin: any) => {
      axios.get(`http://127.0.0.1:5050/get-admin`).then((response) => {
        let result = response.data.find((item: any) => item.admin_id === admin.admin_id);
        if (result) {
          if (result.password === admin.password) {
            navigate('/admin-dashboard');
          } else {
            alert('Invalid Password');
          }
        } else {
          alert('Admin does not exist');
        }
      });
    },
  });

  return (
    <div className="d-flex justify-content-center align-items-center login-page bg-dark">
      <div className="card login-card shadow p-4 border-0">
        <h3 className="text-center mb-4 text-warning">🛡️ Admin Login</h3>
        <form onSubmit={form.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="admin_id" className="form-label fw-bold text-white">Admin ID</label>
            <input
              type="text"
              id="admin_id"
              name="admin_id"
              className="form-control"
              onChange={form.handleChange}
              placeholder="Enter admin ID"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-bold text-white">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              onChange={form.handleChange}
              placeholder="Enter password"
            />
          </div>

          <button type="submit" className="btn btn-warning w-100">
            <i className="bi bi-box-arrow-in-right me-2"></i>Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
