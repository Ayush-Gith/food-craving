import { useState, useEffect } from 'react';
import axios from '../config/axios';
import '../styles/comment-section.css';
import LoaderOverlay from './LoaderOverlay';
import { BsSendFill } from "react-icons/bs";

const CommentSection = ({ videoId, onClose }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchComments();
  }, [videoId]);

  const fetchComments = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`/api/food/comment/${videoId}`);
      setComments(response.data.data);
    } catch (err) {
      setError('Failed to load comments');
      console.error('Error fetching comments:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      setIsSubmitting(true);
      setError(null); // Clear previous errors
      
      const response = await axios.post('/api/food/comment', {
        foodId: videoId,
        comment: newComment.trim()
      }, {
        withCredentials: true // Ensure cookies are sent
      });
      
      if (response.data.success) {
        setNewComment('');
        setError(null);
        await fetchComments(); // Refresh comments to show the new one
      } else {
        setError(response.data.message || 'Failed to post comment');
      }
    } catch (err) {
      console.error('Error posting comment:', err);
      const errorMessage = err.response?.data?.message || 'Failed to post comment';
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="comment-section-overlay">
      <div className="comment-section-header">
        <h3>Comments</h3>
        <button className="close-button" onClick={onClose}>×</button>
      </div>
      
      <div className="comments-container">
        {isLoading && <LoaderOverlay />}
        {error && <div className="error-message">{error}</div>}
        {!isLoading && !error && comments.length === 0 && (
          <div className="no-comments">No comments yet</div>
        )}
        {comments.map((comment) => (
          <div key={comment._id} className="comment-item">
            <div className="comment-avatar">
              {getInitials(comment.user.fullname)}
            </div>
            <div className="comment-content">
              <div className="comment-header">
                <span className="comment-username">{comment.user.fullname}</span>
                <span className="comment-time">{formatDate(comment.createdAt)}</span>
              </div>
              <p className="comment-text">{comment.comment}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="comment-input-wrapper">
        <form onSubmit={handleSubmitComment} className="comment-input-container">
          <div className="comment-avatar">
            {getInitials('Add Comment')}
          </div>
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="comment-input"
          />
          <button 
            type="submit" 
            className="submit-button"
            disabled={!newComment.trim() || isSubmitting}
            aria-label="Send comment"
          >
            <BsSendFill />
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommentSection;