import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../../public/UserReg.css';

const UserReg = () => {
  const [userMsg, setUserMsg] = useState('');
  const [userColor, setUserColor] = useState('');
  const navigate = useNavigate();

  // ✅ Validation Schema
  const validationSchema = Yup.object({
    user_id: Yup.string().required('User ID is required'),
    user_name: Yup.string().required('User Name is required'),
    password: Yup.string()
      .required('Password is required')
      .matches(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
    confirm_password: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    mobile: Yup.string()
      .required('Mobile number is required')
      .matches(/^(\+91)?[6-9]\d{9}$/, 'Invalid Indian mobile number'),
  });

  const formik = useFormik({
    initialValues: {
      user_id: '',
      user_name: '',
      password: '',
      confirm_password: '',
      email: '',
      mobile: '',
    },
    validationSchema,
    onSubmit: (user) => {
      // Remove confirm_password before sending
      const { confirm_password, ...userData } = user;

      axios.post('http://127.0.0.1:5050/register-user', userData).then(() => {
        alert('User registered successfully');
        navigate('/user-login');
      });
    },
  });

  function VerifyUser(e: any) {
    axios.get(`http://127.0.0.1:5050/get-users`).then((response) => {
      const exists = response.data.find((u: any) => u.user_id === e.target.value);
      if (exists) {
        setUserMsg('User ID already exists - try another');
        setUserColor('text-danger');
      } else {
        setUserMsg('User ID is available');
        setUserColor('text-success');
      }
    });
  }

  function handleBlur() {
    setUserMsg('');
  }

  return (
    <div className="d-flex justify-content-center align-items-center register-page bg-dark">
      <div className="card register-card shadow p-4 border-0">
        <h3 className="text-center text-primary mb-4">👤 Register New User</h3>
        <form onSubmit={formik.handleSubmit}>
          {/* User ID */}
          <div className="mb-3">
            <label className="form-label text-white fw-bold">User ID</label>
            <input
              type="text"
              name="user_id"
              className={`form-control ${formik.touched.user_id && formik.errors.user_id ? 'is-invalid' : ''}`}
              onChange={(e) => {
                formik.handleChange(e);
                VerifyUser(e);
              }}
              onBlur={(e) => {
                formik.handleBlur(e);
                handleBlur();
              }}
              placeholder="Choose your ID"
            />
            {userMsg && <div className={`form-text ${userColor}`}>{userMsg}</div>}
            {formik.touched.user_id && formik.errors.user_id && (
              <div className="invalid-feedback">{formik.errors.user_id}</div>
            )}
          </div>

          {/* User Name */}
          <div className="mb-3">
            <label className="form-label text-white fw-bold">User Name</label>
            <input
              type="text"
              name="user_name"
              className={`form-control ${formik.touched.user_name && formik.errors.user_name ? 'is-invalid' : ''}`}
              value={formik.values.user_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Your full name"
            />
            {formik.touched.user_name && formik.errors.user_name && (
              <div className="invalid-feedback">{formik.errors.user_name}</div>
            )}
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label text-white fw-bold">Password</label>
            <input
              type="password"
              name="password"
              className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Create password"
            />
            {formik.touched.password && formik.errors.password && (
              <div className="invalid-feedback">{formik.errors.password}</div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-3">
            <label className="form-label text-white fw-bold">Confirm Password</label>
            <input
              type="password"
              name="confirm_password"
              className={`form-control ${formik.touched.confirm_password && formik.errors.confirm_password ? 'is-invalid' : ''}`}
              value={formik.values.confirm_password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Re-enter password"
            />
            {formik.touched.confirm_password && formik.errors.confirm_password && (
              <div className="invalid-feedback">{formik.errors.confirm_password}</div>
            )}
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label text-white fw-bold">Email</label>
            <input
              type="email"
              name="email"
              className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="you@example.com"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="invalid-feedback">{formik.errors.email}</div>
            )}
          </div>

          {/* Mobile */}
          <div className="mb-4">
            <label className="form-label text-white fw-bold">Mobile</label>
            <input
              type="text"
              name="mobile"
              className={`form-control ${formik.touched.mobile && formik.errors.mobile ? 'is-invalid' : ''}`}
              value={formik.values.mobile}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="10-digit mobile number"
            />
            {formik.touched.mobile && formik.errors.mobile && (
              <div className="invalid-feedback">{formik.errors.mobile}</div>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-100">
            <i className="bi bi-person-plus-fill me-2"></i>Register
          </button>
        </form>

        <div className="text-center mt-3">
          <Link to="/user-login" className="text-info text-decoration-none">
            Already have an account?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserReg;
