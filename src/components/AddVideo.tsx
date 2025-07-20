import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import type { CategoryContract } from '../contracts/CategoryContract';
import '../../public/AddVideo.css';

const AddVideo = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState<CategoryContract[]>([]);

    const formik = useFormik({
        initialValues: {
            video_id: 0,
            title: '',
            description: '',
            comments: '',
            likes: 0,
            views: 0,
            url: '',
            category_id: -1,
        },
        onSubmit: (video) => {
            axios.post('http://127.0.0.1:5050/add-video', video).then(() => {
                alert('Video Added Successfully');
                navigate('/admin-dashboard');
            });
        },
    });

    useEffect(() => {
        axios.get('http://127.0.0.1:5050/get-categories').then((response) => {
            response.data.unshift({ category_id: -1, category_name: 'Select Category' });
            setCategories(response.data);
        });
    }, []);

    return (
        <div className="d-flex justify-content-center align-items-center add-video-page bg-dark">
            <div className="card add-video-card shadow p-4 border-0">
                <h3 className="text-center text-warning mb-4">Add New Video</h3>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label text-white fw-bold">Video ID</label>
                        <input
                            type="number"
                            name="video_id"
                            className="form-control"
                            onChange={formik.handleChange}
                            placeholder="Enter video ID"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label text-white fw-bold">Title</label>
                        <input
                            type="text"
                            name="title"
                            className="form-control"
                            onChange={formik.handleChange}
                            placeholder="Video title"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label text-white fw-bold">Description</label>
                        <textarea
                            name="description"
                            className="form-control"
                            rows={2}
                            onChange={formik.handleChange}
                            placeholder="Short description"
                        ></textarea>
                    </div>

                    <div className="mb-3">
                        <label className="form-label text-white fw-bold">Comments</label>
                        <input
                            type="text"
                            name="comments"
                            className="form-control"
                            onChange={formik.handleChange}
                            placeholder="Initial comments (optional)"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label text-white fw-bold">URL</label>
                        <input
                            type="text"
                            name="url"
                            className="form-control"
                            onChange={formik.handleChange}
                            placeholder="Embed URL"
                        />
                    </div>

                    <div className="d-flex gap-3 mb-3">
                        <div className="flex-fill">
                            <label className="form-label text-white fw-bold">Likes</label>
                            <input
                                type="number"
                                name="likes"
                                className="form-control"
                                onChange={formik.handleChange}
                            />
                        </div>
                        <div className="flex-fill">
                            <label className="form-label text-white fw-bold">Views</label>
                            <input
                                type="number"
                                name="views"
                                className="form-control"
                                onChange={formik.handleChange}
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="form-label text-white fw-bold">Category</label>
                        <select
                            name="category_id"
                            className="form-select"
                            onChange={formik.handleChange}
                            value={formik.values.category_id}
                        >
                            {categories.map((cat) => (
                                <option key={cat.category_id} value={cat.category_id}>
                                    {cat.category_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="d-flex justify-content-between">
                        <button type="submit" className="btn btn-primary w-50 me-2">
                            <i className="bi bi-plus-circle me-1"></i>Add Video
                        </button>
                        <Link to="/admin-dashboard" className="btn btn-danger w-50">
                            <i className="bi bi-x-circle me-1"></i>Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddVideo;
