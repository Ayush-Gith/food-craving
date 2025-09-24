import { useState } from 'react';
import { FaPlayCircle } from 'react-icons/fa';
import '../styles/video-grid.css';

const VideoGrid = ({ videos, onPlay }) => {
  const [playingIndex, setPlayingIndex] = useState(null);

  const handlePlay = (idx) => {
    setPlayingIndex(idx);
    onPlay && onPlay(idx);
  };

  return (
    <div className="video-grid">
      {videos.map((video, idx) => (
        <div className="video-thumb-wrapper" key={video._id}>
          <div className="video-thumb" onClick={() => handlePlay(idx)}>
            <video
              src={video.video}
              poster={video.thumbnail || ''}
              muted
              playsInline
              className={playingIndex === idx ? 'playing' : ''}
            />
            <div className="play-overlay">
              <FaPlayCircle size={38} color="#fff" style={{ filter: 'drop-shadow(0 2px 8px #0008)' }} />
            </div>
          </div>
          <div className="video-title">{video.title || video.description}</div>
        </div>
      ))}
    </div>
  );
};

export default VideoGrid;
