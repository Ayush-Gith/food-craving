import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VideoGrid from '../../components/VideoGrid';
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
    axios.get('/api/food/saved-food-items', { withCredentials: true })
      .then(res => {
        setVideos(res.data.foods || []);
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
      <button className="back-btn" onClick={handleBack} aria-label="Back">
        <BiArrowBack size={22} color="#fff" />
      </button>
      <VideoGrid videos={videos} onPlay={handlePlay} />
      {selectedIdx !== null && (
        <div className="saved-video-player">
          <video src={videos[selectedIdx].video} controls autoPlay />
          <div className="saved-desc">
            <p>{videos[selectedIdx].description}</p>
            <button className="visit-store-btn" onClick={() => navigate(`/partner/${videos[selectedIdx].foodPartner}`)}>
              Visit Store
            </button>
          </div>
        </div>
      )}
      <BottomNav />
    </div>
  );
};

export default Saved;
