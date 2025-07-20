import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import VideoContract from '../contracts/VideoContract';
import axios from 'axios';
import '../../public/UserDashboard.css';
import { addToSaveList } from '../slicers/video-slicer';
import { useDispatch } from 'react-redux';
import { store } from '../store/store';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [cookies, , removeCookie] = useCookies(['userid']);
  const [video, setVideo] = useState<VideoContract[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  const dispatch = useDispatch();

  useEffect(() => {
    if (cookies['userid'] === undefined) {
      navigate('/user-login');
    } else {
      LoadVideos();
    }
  }, []);

  function LoadVideos() {
    axios.get('http://127.0.0.1:5050/get-videos').then((response) => {
      setVideo(response.data);
    });
  }

  function handleSignout() {
    removeCookie('userid');
    navigate('/user-login');
  }

  function handleSaveClick(video: VideoContract) {
    dispatch(addToSaveList(video));
  }

  // 🔍 Filtered Videos
  const filteredVideos = video.filter((v) =>
    v.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="video-wrapper text-white min-vh-100 p-3">
      {/* Header */}
      <header className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2">
        <h2 className="text-light">🎥 Dashboard - {cookies['userid']}</h2>
        <button className="btn btn-warning" onClick={handleSignout}>
          <i className="bi bi-box-arrow-right me-2"></i>Sign Out
        </button>
      </header>

      {/* Logo + Search */}
      <div className="text-center mb-4">
        <div className="input-group w-50 mx-auto">
          <span className="input-group-text bg-secondary text-white">
            <i className="bi bi-search"></i>
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search videos"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Videos Section */}
      <section className="row justify-content-center">
        {filteredVideos.length > 0 ? (
          filteredVideos.map((video) => (
            <div key={video.video_id} className="col-md-4 col-sm-6 mb-4" style={{ width: '350px', height: '350px' }}>
              <div className="card video-card shadow border-0 h-100">
                <iframe src={video.url} height="200" width="100%" title={video.title} className="rounded-top"></iframe>
                <div className="card-body bg-dark-subtle text-dark">
                  <h5 className="card-title fw-bold">{video.title}</h5>
                  <p className="card-text">{video.description}</p>
                </div>
                <div className="card-footer d-flex justify-content-between align-items-center bg-light">
                  <span className="text-muted">
                    <i className="bi bi-hand-thumbs-up me-1"></i>{video.likes}
                  </span>
                  <span className="text-muted">
                    <i className="bi bi-eye me-1"></i>{video.views}
                  </span>
                  <button onClick={() => handleSaveClick(video)} className="btn btn-sm btn-success">
                    <i className="bi bi-clock me-1"></i>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">No videos found matching your search.</p>
        )}
      </section>
    </div>
  );
};

export default UserDashboard;
