import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import type { VideoContract } from '../contracts/VideoContract';
import '../../public/AdminDash.css';

const AdminDash = () => {
  const navigate = useNavigate();
  const [cookies, , removeCookie] = useCookies(['admin_id']);
  const [videos, setVideo] = useState<VideoContract[]>([]);

  useEffect(() => {
    LoadVideos();
  }, []);

  function LoadVideos() {
    axios.get('http://127.0.0.1:5050/get-videos').then((response) => {
      setVideo(response.data);
    });
  }

  function handleSignout() {
    removeCookie('admin_id');
    navigate('/');
  }

  return (
    <div className="video-wrapper text-white min-vh-90 p-4">
      <header className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2">
        <h3 className="mb-0 text-light">🛠️ Admin Dashboard</h3>
        <Link to="/add-video" className="btn btn-primary bi bi-camera-video-fill">
          {' '} Add New Video
        </Link>
        <button className="btn btn-warning" onClick={handleSignout}>
          <i className="bi bi-box-arrow-right me-2"></i>Sign Out
        </button>
      </header>

      <section>
        <div className="table-responsive">
          <table className="table table-bordered table-hover table-striped table-dark align-middle text-center">
            <thead className="table-primary text-dark">
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Preview</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {videos?.map((video) => (
                <tr key={video.video_id}>
                  <td>{video.video_id}</td>
                  <td>{video.title}</td>
                  <td>
                    <iframe
                      src={video.url}
                      width="200"
                      height="120"
                      title={video.title}
                      className="rounded"
                    ></iframe>
                  </td>
                  <td>
                    <Link
                      to={`/edit-video/${video.video_id}`}
                      className="btn btn-sm btn-warning me-2"
                      title="Edit"
                    >
                      <i className="bi bi-pencil-square"></i>
                    </Link>
                    <Link
                      to={`/delete-video/${video.video_id}`}
                      className="btn btn-sm btn-danger"
                      title="Delete"
                    >
                      <i className="bi bi-trash-fill"></i>
                    </Link>
                  </td>
                </tr>
              ))}
              {videos.length === 0 && (
                <tr>
                  <td colSpan={3}>No videos uploaded yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AdminDash;
