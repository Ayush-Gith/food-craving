import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VideoGrid from '../../components/VideoGrid';
import ActionIcons from '../../components/ActionIcons';
import BottomNav from '../../components/BottomNav';
import '../../styles/saved.css';
import { BiArrowBack } from 'react-icons/bi';
import LoaderOverlay from '../../components/LoaderOverlay';
import AlertBox from '../../components/AlertBox';
import axios from '../../config/axios';

const Saved = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios.get('/api/food/bookmark-food-list', { withCredentials: true })
      .then(res => {
        setVideos(res.data.data || []);
        setLoading(false);
      })
      .catch(err => {
        setAlert('Failed to load saved videos.');
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handlePlay = (idx) => {
    setSelectedIdx(idx);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="saved-page">
      {loading && <LoaderOverlay />}
      {alert && <AlertBox message={alert} onClose={() => setAlert(null)} />}
      <div className="saved-header">
        <button className="back-btn" onClick={handleBack} aria-label="Back">
          <BiArrowBack size={22} color="#fff" />
        </button>
        <h2 className="saved-title">Saved Videos</h2>
        <div style={{ width: 38 }} />
      </div>

      <div className="saved-grid-wrapper">
        <VideoGrid videos={videos} onPlay={handlePlay} />
      </div>
      {selectedIdx !== null && (
        <div className="saved-video-player">
          <button className="saved-close-btn" onClick={() => setSelectedIdx(null)} aria-label="Close">X</button>
          <video src={videos[selectedIdx].video} controls autoPlay />
          <div className="saved-desc">
            <p>{videos[selectedIdx].description}</p>
            <button className="visit-store-btn" onClick={() => navigate(`/partner/${videos[selectedIdx].foodPartner}`)}>
              Visit Store
            </button>
          </div>
          <div className="action-icons action-icons-bottom-fixed">
            <ActionIcons
              videoId={videos[selectedIdx]._id}
              liked={videos[selectedIdx].liked}
              bookmarked={videos[selectedIdx].bookmarked}
                likeCount={videos[selectedIdx].likeCount}
                bookmarkCount={videos[selectedIdx].bookmarkCount}
                commentCount={videos[selectedIdx].commentCount}
            />
          </div>
        </div>
      )}
      <BottomNav />
    </div>
  );
};

export default Saved;
