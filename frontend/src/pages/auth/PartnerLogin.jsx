import '../../styles/theme.css';
import '../../styles/auth.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';
import axios from '../../config/axios';
import GoogleSignIn from '../../components/GoogleSignIn';

const PartnerLogin = () => {
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
      await axios.post('/api/auth/food-partner/login', formData);
      navigate('/create-food');
    } catch (error) {
      console.error('Error logging in partner:', error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Welcome Partner! 🍽️</h1>
        <p className="auth-subtitle">Sign in to manage your restaurant's content</p>
        <form className="auth-form" onSubmit={handleSubmit}> 
          <div className="form-group">
            <label className="form-label">Business Email</label>
            <input
              type="email"
              className="form-input"
              placeholder="restaurant@example.com"
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
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <button type="submit" className="submit-button">
            Sign In to Dashboard
          </button>
        </form>
        <div className="auth-divider">
          <span>OR</span>
        </div>
        <GoogleSignIn userType="partner" text="Continue with Google" />
        <div className="auth-links">
          <span>
            New restaurant partner? <Link to="/partner/register">Join our network</Link>
          </span>
          <span>
            Looking to explore food? <Link to="/login">Sign in as User</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PartnerLogin;
