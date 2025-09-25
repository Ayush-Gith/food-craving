import '../../styles/theme.css';
import '../../styles/auth.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';
import axios from '../../config/axios';
import GoogleSignIn from '../../components/GoogleSignIn';

const PartnerRegister = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const name = event.target[0].value;
    const contactName = event.target[1].value;
    const phone = event.target[2].value;
    const address = event.target[3].value;
    const email = event.target[4].value;
    const password = event.target[5].value;

    const formData = {
      name,
      contactName,
      phone,
      address,
      email,
      password,
    };

    try {
      await axios.post('/api/auth/food-partner/register', formData);
      navigate('/create-food');
    } catch (error) {
      console.error('Error registering partner:', error);
    }
  };

  return (
    <div className="auth-container partner-register">
      <div className="auth-card">
        <h1 className="auth-title">Join as Partner 🌟</h1>
        <p className="auth-subtitle">Start showcasing your culinary creations</p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Restaurant Name</label>
            <input
              type="text"
              className="form-input"
              placeholder="Your Restaurant's Name"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Contact Person</label>
            <input
              type="text"
              className="form-input"
              placeholder="Your Name"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Business Phone</label>
            <input
              type="tel"
              className="form-input"
              placeholder="Enter your phone number"
              pattern="[0-9]{10}"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Restaurant Address</label>
            <input
              type="text"
              className="form-input"
              placeholder="Complete restaurant address"
              required
            />
          </div>
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
            <label className="form-label">Create Password</label>
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
            Create Partner Account
          </button>
        </form>
        <div className="auth-divider">
          <span>OR</span>
        </div>
        <GoogleSignIn userType="partner" text="Sign up with Google" />
        <div className="auth-links">
          <span>
            Already a partner? <Link to="/partner/login">Sign in to dashboard</Link>
          </span>
          <span>
            Want to explore food reels? <Link to="/register">Join as User</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PartnerRegister;
