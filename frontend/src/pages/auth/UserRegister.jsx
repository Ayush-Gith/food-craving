import '../../styles/theme.css';
import '../../styles/auth.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';
import axios from '../../config/axios';
import GoogleSignIn from '../../components/GoogleSignIn';

const UserRegister = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const fullname = event.target[0].value;
    const email = event.target[1].value;
    const password = event.target[2].value;

    const formData = {
      fullname,
      email,
      password,
    };

    try {
      await axios.post('/api/auth/user/register', formData);
      navigate('/');
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Join Food Reels 🎥</h1>
        <p className="auth-subtitle">Create your account to start exploring amazing food content</p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-input"
              placeholder="John Doe"
              required
            />
          </div>
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
                placeholder="Choose a strong password"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex="-1"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <button type="submit" className="submit-button">
            Create Account
          </button>
        </form>
        <div className="auth-divider">
          <span>OR</span>
        </div>
        <GoogleSignIn userType="user" text="Sign up with Google" />
        <div className="auth-links">
          <span>
            Already have an account? <Link to="/login">Sign in</Link>
          </span>
          <span>
            Want to showcase your restaurant? <Link to="/partner/register">Join as Partner</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
