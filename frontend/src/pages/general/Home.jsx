import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../config/axios";
import "../../styles/reels.css";
import BottomNav from "../../components/BottomNav";
import LoaderOverlay from "../../components/LoaderOverlay";
import AlertBox from "../../components/AlertBox";
import ActionIcons from "../../components/ActionIcons";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);
  const videoRefs = useRef({});
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/food/foods", { withCredentials: true })
      .then((response) => {
        setVideos(response.data.foods || []);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setAlert("Error fetching videos.");
        if (error.response && error.response.status === 401) {
          window.location.href = "/login";
        }
      });
  }, []);

  // Intersection Observer for auto-play/pause
  useEffect(() => {
    if (!videos.length) return;
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.9,
    };
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = Number(entry.target.dataset.idx);
          setCurrentIdx(idx);
          entry.target.play().catch(() => {});
          Object.entries(videoRefs.current).forEach(([k, ref]) => {
            if (Number(k) !== idx && ref) ref.pause();
          });
        } else {
          entry.target.pause();
        }
      });
    };
    const observer = new window.IntersectionObserver(
      handleIntersection,
      observerOptions
    );
    const refsSnapshot = { ...videoRefs.current };
    Object.values(refsSnapshot).forEach((video) => {
      if (video) observer.observe(video);
    });
    return () => {
      Object.values(refsSnapshot).forEach((video) => {
        if (video) observer.unobserve(video);
      });
    };
  }, [videos]);

  const handleVisitStore = (foodPartnerId) => {
    navigate(`/partner/${foodPartnerId}`);
  };

  return (
    <div className="reels-container">
      {loading && <LoaderOverlay />}
      {alert && <AlertBox message={alert} onClose={() => setAlert(null)} />}
      <div className="video-container">
        {videos.map((video, index) => (
          <div
            key={video._id}
            className={`video-wrapper${index === currentIdx ? " active" : ""}`}
          >
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              className="reel-video"
              src={video.video}
              loop
              muted
              playsInline
              data-idx={index}
              style={{ pointerEvents: index === currentIdx ? "auto" : "none" }}
            />
            {index === currentIdx && (
              <>
                <div className="video-overlay no-bg">
                  <p className="reel-description">{video.description}</p>
                  <button
                    className="visit-store-btn"
                    onClick={() => handleVisitStore(video.foodPartner)}
                  >
                    Visit Store
                  </button>
                </div>
                <div className="action-icons action-icons-bottom-fixed">
                  <ActionIcons
                    videoId={video._id}
                    liked={video.liked}
                    bookmarked={video.bookmarked}
                    likeCount={video.likeCount}
                    bookmarkCount={video.bookmarkCount}
                    commentCount={video.commentCount}
                  />
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      <BottomNav />
    </div>
  );
};

export default Home;
