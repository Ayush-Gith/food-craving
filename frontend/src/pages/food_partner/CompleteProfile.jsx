import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/theme.css';
import '../../styles/auth.css';
import axios from '../../config/axios';

const CompletePartnerProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [partner, setPartner] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    const checkProfile = async () => {
      try {
        // Check if partner needs to complete profile
        const response = await axios.get('/api/food-partner/profile', {
          withCredentials: true
        });
        
        const partnerData = response.data.data;
        
        // If partner has complete profile, redirect to dashboard
        if (partnerData.phone && partnerData.address) {
          navigate('/create-food');
          return;
        }
        
        // If profile is incomplete, show form
        setPartner(partnerData);
        setFormData({
          name: partnerData.name || '',
          phone: partnerData.phone || '',
          address: partnerData.address || ''
        });
        
      } catch (error) {
        console.error('Error checking partner profile:', error);
        // If not authenticated, redirect to login
        navigate('/partner/login');
      } finally {
        setLoading(false);
      }
    };

    checkProfile();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      await axios.put('/api/food-partner/complete-profile', formData, {
        withCredentials: true
      });
      
      navigate('/create-food');
    } catch (error) {
      console.error('Error completing profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (loading) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <div className="loader" style={{
              width: '40px',
              height: '40px',
              border: '4px solid #f3f3f3',
              borderTop: '4px solid var(--primary-color)',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto'
            }}></div>
            <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>
              Loading...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Complete Your Profile 🍽️</h1>
        <p className="auth-subtitle">
          Welcome {partner?.contactName}! Please complete your restaurant profile to get started.
        </p>
        
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Restaurant Name</label>
            <input
              type="text"
              name="name"
              className="form-input"
              placeholder="Your Restaurant's Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Business Phone</label>
            <input
              type="tel"
              name="phone"
              className="form-input"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              pattern="[0-9]{10}"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Restaurant Address</label>
            <input
              type="text"
              name="address"
              className="form-input"
              placeholder="Complete restaurant address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Saving...' : 'Complete Profile'}
          </button>
        </form>
      </div>
      
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default CompletePartnerProfile;