import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../config/axios';
import '../../styles/reels.css';

const Home = () => {
  const [videos, setVideos] = useState([]);
  const videoRefs = useRef({});

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        // Make request with credentials to include cookies
        const response = await axios.get('/api/food/foods');
        setVideos(response.data.foods);
      } catch (error) {
        console.error('Error fetching videos:', error);
        // If unauthorized, redirect to login
        if (error.response && error.response.status === 401) {
          window.location.href = '/login';
        }
      }
    };
    fetchVideos();
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.9,
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const video = entry.target;
          video.play().catch(err => console.log('Playback failed:', err));
          
          // Pause all other videos
          Object.values(videoRefs.current).forEach(ref => {
            if (ref !== video) {
              ref.pause();
            }
          });
        } else {
          entry.target.pause();
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    const currentVideos = Object.values(videoRefs.current);
    currentVideos.forEach(video => {
      if (video) {
        observer.observe(video);
      }
    });

    return () => {
      currentVideos.forEach(video => {
        if (video) {
          observer.unobserve(video);
        }
      });
    };
  }, [videos]);

  const navigate = useNavigate();

  const handleVisitStore = (foodPartnerId) => {
    navigate(`/partner/${foodPartnerId}`);
  };

  return (
    <div className="reels-container">
      <div className="video-container">
        {videos.map((video, index) => (
          <div key={video._id} className="video-wrapper">
            <video
              ref={el => videoRefs.current[index] = el}
              className="reel-video"
              src={video.video}
              loop
              muted
              playsInline
            />
            <div className="video-overlay">
              <p className="reel-description">{video.description}</p>
              <button 
                className="visit-store-btn"
                onClick={() => handleVisitStore(video.foodPartner)}
              >
                Visit Store
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;