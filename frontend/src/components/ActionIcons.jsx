import { useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BsBookmarkFill, BsBookmark } from 'react-icons/bs';
import { FaRegCommentDots } from 'react-icons/fa';
import '../styles/action-icons.css';
import axios from '../config/axios';

const ActionIcons = ({ videoId, liked, bookmarked, likeCount, bookmarkCount, commentCount, onAction }) => {
  const [isLiked, setIsLiked] = useState(liked);
  const [isBookmarked, setIsBookmarked] = useState(bookmarked);
  const [likes, setLikes] = useState(typeof likeCount === 'number' ? likeCount : 0);
  const [bookmarks, setBookmarks] = useState(typeof bookmarkCount === 'number' ? bookmarkCount : 0);
  const [comments, setComments] = useState(typeof commentCount === 'number' ? commentCount : 0);
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await axios.post('/api/food/likes', { foodId: videoId }, { withCredentials: true });
      setIsLiked(res.data.liked);
      setLikes(typeof res.data.likes === 'number' ? res.data.likes : 0);
      onAction && onAction('like', res.data);
    } catch {
      // ignore error
    }
    setLoading(false);
  };

  const handleBookmark = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await axios.post('/api/food/bookmark', { foodId: videoId }, { withCredentials: true });
      setIsBookmarked(res.data.bookmarked);
      setBookmarks(res.data.bookmarks);
      onAction && onAction('bookmark', res.data);
    } catch {
      // ignore error
    }
    setLoading(false);
  };

  const handleComment = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await axios.post('/api/food/comment', { foodId: videoId }, { withCredentials: true });
      setComments(res.data.comments);
      onAction && onAction('comment', res.data);
    } catch {
      // ignore error
    }
    setLoading(false);
  };

  return (
    <div className="action-icons">
      <button className={`icon-btn${isLiked ? ' filled' : ''}`} onClick={handleLike} aria-label="Like">
        {isLiked ? <AiFillHeart size={28} color="#FC6C4C" /> : <AiOutlineHeart size={28} color="#fff" />}
  <span className="icon-count">{typeof likes === 'number' ? likes : 0}</span>
      </button>
      <button className={`icon-btn${isBookmarked ? ' filled' : ''}`} onClick={handleBookmark} aria-label="Bookmark">
        {isBookmarked ? <BsBookmarkFill size={26} color="#FC6C4C" /> : <BsBookmark size={26} color="#fff" />}
  <span className="icon-count">{typeof bookmarks === 'number' ? bookmarks : 0}</span>
      </button>
      <button className="icon-btn" onClick={handleComment} aria-label="Comment">
        <FaRegCommentDots size={26} color="#fff" />
  <span className="icon-count">{typeof comments === 'number' ? comments : 0}</span>
      </button>
    </div>
  );
};

export default ActionIcons;
