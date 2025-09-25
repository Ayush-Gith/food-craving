import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import LoaderOverlay from '../../components/LoaderOverlay';

const AuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const authStatus = searchParams.get('auth');
    
    if (authStatus === 'success') {
      // Check if we're in partner context
      const isPartner = window.location.pathname.includes('partner');
      
      setTimeout(() => {
        if (isPartner) {
          navigate('/create-food');
        } else {
          navigate('/');
        }
      }, 2000);
    } else if (authStatus === 'failed') {
      setTimeout(() => {
        navigate('/login?error=auth_failed');
      }, 2000);
    }
  }, [navigate, searchParams]);

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh',
      background: 'var(--background-color)'
    }}>
      <LoaderOverlay />
      <p style={{ 
        marginTop: '20px', 
        color: 'var(--text-color)',
        fontSize: '16px'
      }}>
        Completing authentication...
      </p>
    </div>
  );
};

export default AuthCallback;