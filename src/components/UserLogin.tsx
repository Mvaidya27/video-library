import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import '../../public/UserLogin.css'; // Optional styles

const UserLogin = () => {
  const [cookie, setCookie] = useCookies(['userid']);
  const navigate = useNavigate();

  // Validation Schema
  const validationSchema = Yup.object({
    user_id: Yup.string().required('User ID is required'),
    password: Yup.string()
      .required('Password is required')
      .matches(/[^A-Za-z0-9]/, 'Password must include at least one special character'),
  });

  const formik = useFormik({
    initialValues: {
      user_id: '',
      password: '',
    },
    validationSchema,
    onSubmit: (user) => {
      axios.get('http://127.0.0.1:5050/get-users').then((response) => {
        let result = response.data.find((item: any) => item.user_id === user.user_id);
        if (result) {
          if (result.password === user.password) {
            setCookie('userid', result.user_id);
            navigate('/user-dashboard');
          } else {
            alert('Invalid Password');
          }
        } else {
          navigate('/user-login-err');
        }
      });
    },
  });

  return (
    <div className="d-flex justify-content-center align-items-center login-page bg-dark">
      <div className="card login-card shadow p-4 border-0">
        <h3 className="text-center mb-4 text-primary">🔐 User Login</h3>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold text-white">User ID</label>
            <input
              type="text"
              name="user_id"
              className={`form-control ${formik.touched.user_id && formik.errors.user_id ? 'is-invalid' : ''}`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter your ID"
            />
            {formik.touched.user_id && formik.errors.user_id && (
              <div className="invalid-feedback">{formik.errors.user_id}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold text-white">Password</label>
            <input
              type="password"
              name="password"
              className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter your password"
            />
            {formik.touched.password && formik.errors.password && (
              <div className="invalid-feedback">{formik.errors.password}</div>
            )}
          </div>

          <button type="submit" className="btn btn-warning w-100">
            <i className="bi bi-box-arrow-in-right me-2"></i>Login
          </button>
        </form>

        <div className="text-center mt-3">
          <span className="text-light">New here? </span>
          <Link to="/user-reg" className="text-info text-decoration-none fw-bold">
            Create New Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
