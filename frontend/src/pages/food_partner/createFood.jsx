import { useState, useRef } from 'react';
import '../../styles/food-form.css';
import '../../styles/loader-overlay.css';
import '../../styles/alert-box.css';
import axios from '../../config/axios';
import LoaderOverlay from '../../components/LoaderOverlay';
import AlertBox from '../../components/AlertBox';

const CreateFood = ({ onSubmit }) => {
  const [video, setVideo] = useState(null);
  const [videoURL, setVideoURL] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const [alert, setAlert] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef();



  const validateVideo = (file) => {
    if (!file) return 'No file selected.';
    if (!file.type.startsWith('video/')) return 'Only video files are allowed.';
    if (file.size > 10 * 1024 * 1024) return 'Video size must be less than 10MB.';
    return '';
  };

  const validateForm = () => {
    if (!name.trim()) return 'Food name is required.';
    if (name.length < 2) return 'Food name must be at least 2 characters.';
    if (!description.trim()) return 'Description is required.';
    if (description.length < 8) return 'Description must be at least 8 characters.';
    if (!video) return 'A video file is required.';
    const videoErr = validateVideo(video);
    if (videoErr) return videoErr;
    return '';
  };


  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    const validationMsg = validateVideo(file);
    if (validationMsg) {
      setAlert({ type: 'error', message: validationMsg });
      setVideo(null);
      setVideoURL('');
      return;
    }
    setVideo(file);
    setVideoURL(URL.createObjectURL(file));
  };


  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    const validationMsg = validateVideo(file);
    if (validationMsg) {
      setAlert({ type: 'error', message: validationMsg });
      setVideo(null);
      setVideoURL('');
      return;
    }
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
    const formErr = validateForm();
    if (formErr) {
      setAlert({ type: 'error', message: formErr });
      return;
    }
    setLoading(true);
    setAlert(null);
    try {
      const formData = new FormData();
      formData.append('name', name.trim());
      formData.append('description', description.trim());
      formData.append('video', video);

      await axios.post('/api/food/food-partner/add-food-post', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      setName('');
      setDescription('');
      setVideo(null);
      setVideoURL('');
      setAlert({ type: 'success', message: 'Food item added successfully!' });
      if (onSubmit) onSubmit();
    } catch (err) {
      setAlert({
        type: 'error',
        message:
          err?.response?.data?.message ||
          err?.message ||
          'Failed to add food item. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="food-form-container">
      {loading && <LoaderOverlay />}
      {alert && (
        <AlertBox
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
      <div className="food-form-card">
        <h2 className="food-form-title">Add New Food Item</h2>
        <form className="food-form" onSubmit={handleSubmit} autoComplete="off" noValidate>
          <div className="form-group">
            <label className="form-label" htmlFor="food-name">Food Name</label>
            <input
              className="form-input"
              id="food-name"
              type="text"
              placeholder="Enter food name"
              value={name}
              onChange={e => setName(e.target.value)}
              minLength={2}
              maxLength={50}
              required
              autoComplete="off"
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
              minLength={8}
              maxLength={200}
              required
              autoComplete="off"
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
          <button className="submit-button" type="submit" disabled={loading}>
            {loading ? 'Adding...' : 'Add Food Item'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateFood;