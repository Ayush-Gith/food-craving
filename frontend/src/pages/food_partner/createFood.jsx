
import { useState, useRef } from 'react';
import '../../styles/food-form.css';
import axios from '../../config/axios';

const CreateFood = ({ onSubmit }) => {
  const [video, setVideo] = useState(null);
  const [videoURL, setVideoURL] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef();


  const validateVideo = (file) => {
    if (!file) return 'No file selected.';
    if (!file.type.startsWith('video/')) return 'Only video files are allowed.';
    if (file.size > 10 * 1024 * 1024) return 'Video size must be less than 10MB.';
    return '';
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    const validationMsg = validateVideo(file);
    if (validationMsg) {
      setError(validationMsg);
      setVideo(null);
      setVideoURL('');
      return;
    }
    setError('');
    setVideo(file);
    setVideoURL(URL.createObjectURL(file));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    const validationMsg = validateVideo(file);
    if (validationMsg) {
      setError(validationMsg);
      setVideo(null);
      setVideoURL('');
      return;
    }
    setError('');
    setVideo(file);
    setVideoURL(URL.createObjectURL(file));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!name || !description || !video) {
      setError('All fields are required.');
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('video', video);

      await axios.post('/api/food/food-partner/add-food-post', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      // Optionally clear form or show success
      setName('');
      setDescription('');
      setVideo(null);
      setVideoURL('');
      setError('');
      if (onSubmit) onSubmit();
      // Optionally show a success message or redirect
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        err?.message ||
        'Failed to add food item. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="food-form-container">
      <div className="food-form-card">
        <h2 className="food-form-title">Add New Food Item</h2>
        <form className="food-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="food-name">Food Name</label>
            <input
              className="form-input"
              id="food-name"
              type="text"
              placeholder="Enter food name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="food-description">Description</label>
            <textarea
              className="form-textarea"
              id="food-description"
              placeholder="Describe your food item"
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="food-video">Food Video</label>
            <div
              className={`video-dropzone${dragActive ? ' drag-active' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => inputRef.current.click()}
              tabIndex={0}
              style={{ cursor: 'pointer' }}
            >
              <input
                className="form-video-input"
                id="food-video"
                type="file"
                accept="video/*"
                ref={inputRef}
                onChange={handleVideoChange}
                style={{ display: 'none' }}
                required
              />
              <div className="video-dropzone-content">
                <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="var(--primary-color)">
                  <rect x="3" y="5" width="18" height="14" rx="3" fill="#fff" stroke="var(--primary-color)" strokeWidth="1.5"/>
                  <polygon points="10,9 16,12 10,15" fill="var(--primary-color)" />
                </svg>
                <div className="video-dropzone-text">
                  <span>Click or drag & drop a video file here</span>
                  <span className="video-dropzone-hint">(MP4, WebM, MOV, max 10MB)</span>
                </div>
              </div>
              {videoURL && (
                <video className="video-preview" src={videoURL} controls />
              )}
            </div>
          </div>
          {error && <div className="form-error" style={{ color: 'var(--error-color)', marginBottom: 8 }}>{error}</div>}
          <button className="submit-button" type="submit" disabled={loading}>
            {loading ? 'Adding...' : 'Add Food Item'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateFood;