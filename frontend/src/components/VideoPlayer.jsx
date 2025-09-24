import { useRef, useEffect } from 'react';
import ActionIcons from './ActionIcons';
import '../styles/video-player.css';

const VideoPlayer = ({ video, onVisitStore }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [video]);

  return (
    <div className="video-player-wrapper">
      <video
        ref={videoRef}
        src={video.video}
        className="reel-video"
        loop
        muted
        playsInline
        autoPlay
      />
      <div className="video-overlay">
        <p className="reel-description">{video.description}</p>
        <button className="visit-store-btn" onClick={() => onVisitStore(video.foodPartner)}>
          Visit Store
        </button>
      </div>
      <ActionIcons
        videoId={video._id}
        liked={video.liked}
        bookmarked={video.bookmarked}
        likeCount={video.likeCount}
        bookmarkCount={video.bookmarkCount}
        commentCount={video.commentCount}
      />
    </div>
  );
};

export default VideoPlayer;
