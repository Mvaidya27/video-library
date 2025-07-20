import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import type { CategoryContract } from '../contracts/CategoryContract';
import type { VideoContract } from '../contracts/VideoContract';
import axios from 'axios';
import '../../public/EditVideo.css';

const EditVideo = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [categories, setCategories] = useState<CategoryContract[]>([]);
  const [videos, setVideos] = useState<VideoContract[]>([
    { video_id: 0, title: '', description: '', comments: '', likes: 0, views: 0, url: '', category_id: 0 },
  ]);

  const formik = useFormik({
    initialValues: videos[0],
    onSubmit: (video) => {
      axios.put(`http://127.0.0.1:5050/edit-video/${params.id}`, video).then(() => {
        alert('Video Updated Successfully');
        navigate('/admin-dashboard');
      });
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    axios.get('http://127.0.0.1:5050/get-categories').then((res) => {
      res.data.unshift({ category_id: -1, category_name: 'Select Category' });
      setCategories(res.data);
    });

    axios.get(`http://127.0.0.1:5050/get-video/${params.id}`).then((res) => {
      setVideos(res.data);
    });
  }, [params.id]);

  return (
    <div className="video-wrapper d-flex justify-content-center align-items-center bg-dark text-white">
      <div className="card edit-video-card shadow-lg p-4 w-100">
        <h3 className="text-center text-warning mb-4">Edit Video</h3>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold">Video ID</label>
            <input type="number" name="video_id" value={formik.values.video_id} onChange={formik.handleChange} className="form-control" />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Title</label>
            <input type="text" name="title" value={formik.values.title} onChange={formik.handleChange} className="form-control" />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Description</label>
            <textarea name="description" value={formik.values.description} onChange={formik.handleChange} className="form-control" rows={2}></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Comments</label>
            <input type="text" name="comments" value={formik.values.comments} onChange={formik.handleChange} className="form-control" />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">URL</label>
            <input type="text" name="url" value={formik.values.url} onChange={formik.handleChange} className="form-control" />
          </div>

          <div className="d-flex gap-3 mb-3">
            <div className="flex-fill">
              <label className="form-label fw-bold">Likes</label>
              <input type="number" name="likes" value={formik.values.likes} onChange={formik.handleChange} className="form-control" />
            </div>
            <div className="flex-fill">
              <label className="form-label fw-bold">Views</label>
              <input type="number" name="views" value={formik.values.views} onChange={formik.handleChange} className="form-control" />
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label fw-bold">Category</label>
            <select name="category_id" value={formik.values.category_id} onChange={formik.handleChange} className="form-select">
              {categories.map((cat) => (
                <option key={cat.category_id} value={cat.category_id}>
                  {cat.category_name}
                </option>
              ))}
            </select>
          </div>

          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-success w-50 me-2">
              <i className="bi bi-save me-1"></i> Save
            </button>
            <Link to="/admin-dashboard" className="btn btn-danger w-50">
              <i className="bi bi-x-circle me-1"></i> Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditVideo;
