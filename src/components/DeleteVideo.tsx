import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import type { CategoryContract } from '../contracts/CategoryContract';
import type { VideoContract } from '../contracts/VideoContract';
import axios from 'axios';
import '../../public/DeleteVideo.css';

const DeleteVideo = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [categories, setCategories] = useState<CategoryContract[]>([]);
  const [videos, setVideos] = useState<VideoContract[]>([
    { video_id: 0, title: '', description: '', comments: '', likes: 0, views: 0, url: '', category_id: 0 },
  ]);

  const formik = useFormik({
    initialValues: videos[0],
    onSubmit: () => {},
    enableReinitialize: true,
  });

  const LoadCategories = () => {
    axios.get('http://127.0.0.1:5050/get-categories').then((response) => {
      response.data.unshift({ category_id: -1, category_name: 'Select Category' });
      setCategories(response.data);
    });
  };

  const LoadVideos = () => {
    axios.get(`http://127.0.0.1:5050/get-video/${params.id}`).then((response) => {
      setVideos(response.data);
    });
  };

  const handleDelete = () => {
    axios.delete(`http://127.0.0.1:5050/delete-video/${params.id}`).then(() => {
      alert('Video Deleted Successfully');
      navigate('/admin-dashboard');
    });
  };

  useEffect(() => {
    LoadCategories();
    LoadVideos();
  }, []);

  return (
    <div className="video-dlt-wrapper d-flex justify-content-center align-items-center bg-dark text-white">
      <div className="card delete-video-card shadow-lg p-4">
        <h3 className="text-danger text-center mb-3">⚠️ Confirm Deletion</h3>
        <p className="text-center fw-semibold">Are you sure you want to delete this video?</p>

        <dl className="mb-4">
          <dt className="text-secondary">Title</dt>
          <dd>{videos[0].title}</dd>

          <dt className="text-secondary mb-2">Preview</dt>
          <dd>
            <iframe
              src={videos[0].url}
              width="100%"
              height="250"
              title={videos[0].title}
              className="rounded"
              allowFullScreen
            ></iframe>
          </dd>
        </dl>

        <div className="d-flex justify-content-between">
          <button className="btn btn-danger w-50 me-2" onClick={handleDelete}>
            <i className="bi bi-trash-fill me-1"></i> Yes, Delete
          </button>
          <Link to="/admin-dashboard" className="btn btn-outline-light w-50">
            <i className="bi bi-arrow-left me-1"></i> Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DeleteVideo;
