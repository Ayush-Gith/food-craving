import { useState } from 'react';
import ActionIcons from './ActionIcons';
import CommentSection from './CommentSection';
import '../styles/video-player.css';

const VideoPlayer = ({ video }) => {
  const [showComments, setShowComments] = useState(false);

  const handleCommentClick = () => {
    setShowComments(true);
  };

  return (
    <>
      <ActionIcons
        videoId={video._id}
        liked={video.liked}
        bookmarked={video.bookmarked}
        likeCount={video.likeCount}
        bookmarkCount={video.bookmarkCount}
        commentCount={video.commentCount}
        onCommentClick={handleCommentClick}
      />
      {showComments && (
        <>
          <div className="comment-overlay-backdrop" onClick={() => setShowComments(false)} />
          <CommentSection videoId={video._id} onClose={() => setShowComments(false)} />
        </>
      )}
    </>
  );
};

export default VideoPlayer;
