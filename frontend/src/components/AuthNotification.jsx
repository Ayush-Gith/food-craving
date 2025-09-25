import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const AuthNotification = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const authStatus = searchParams.get('auth');
    const error = searchParams.get('error');

    if (authStatus === 'success') {
      setNotification({
        type: 'success',
        message: 'Successfully signed in with Google!'
      });
    } else if (authStatus === 'failed' || error === 'auth_failed') {
      setNotification({
        type: 'error',
        message: 'Authentication failed. Please try again.'
      });
    }

    // Clear URL parameters after showing notification
    if (authStatus || error) {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('auth');
      newParams.delete('error');
      setSearchParams(newParams);

      // Auto-hide notification after 5 seconds
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  }, [searchParams, setSearchParams]);

  if (!notification) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '12px 16px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '500',
        fontSize: '14px',
        zIndex: 1000,
        backgroundColor: notification.type === 'success' ? '#10b981' : '#ef4444',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        animation: 'slideIn 0.3s ease-out'
      }}
    >
      {notification.message}
      <style>
        {`
          @keyframes slideIn {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
};

export default AuthNotification;