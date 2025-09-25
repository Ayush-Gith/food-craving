import { FaGoogle } from 'react-icons/fa';

const GoogleSignIn = ({ userType, text = 'Continue with Google' }) => {
  const handleGoogleSignIn = () => {
    const baseUrl = 'http://localhost:3000';
    const endpoint = userType === 'partner' ? '/api/auth/google/partner' : '/api/auth/google/user';
    
    // Open Google OAuth in the same window
    window.location.href = `${baseUrl}${endpoint}`;
  };

  return (
    <button
      type="button"
      onClick={handleGoogleSignIn}
      className="google-signin-button"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        width: '100%',
        padding: '12px 16px',
        border: '2px solid #dadce0',
        borderRadius: '8px',
        backgroundColor: '#ffffff',
        color: '#3c4043',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = '#f8f9fa';
        e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.15)';
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = '#ffffff';
        e.target.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
      }}
    >
      <FaGoogle style={{ color: '#4285f4', fontSize: '18px' }} />
      {text}
    </button>
  );
};

export default GoogleSignIn;