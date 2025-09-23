import '../../styles/theme.css';
import '../../styles/auth.css';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import axios from '../../config/axios';

const UserLogin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target[0].value;
    const password = event.target[1].value;

    const formData = {
      email,
      password,
    };
    

    try {
      await axios.post('/api/auth/user/login', formData);
      navigate('/');
    } catch (error) {
      console.error('Error logging in user:', error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Welcome Back! 👋</h1>
        <p className="auth-subtitle">Sign in to continue exploring delicious food reels</p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-input"
              placeholder="yourname@example.com"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                className="form-input"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex="-1"
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
          </div>
          <button type="submit" className="submit-button">
            Sign In
          </button>
        </form>
        <div className="auth-divider">
          <span>OR</span>
        </div>
        <div className="auth-links">
          <span>
            New to Food Reels? <Link to="/register">Create an account</Link>
          </span>
          <span>
            Are you a restaurant partner? <Link to="/partner/login">Sign in here</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
