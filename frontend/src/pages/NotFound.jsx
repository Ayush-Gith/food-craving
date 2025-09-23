import { Link } from 'react-router-dom';
import '../styles/theme.css';

const NotFound = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'var(--bg-primary)',
        color: 'var(--text-primary)',
        padding: 'var(--spacing-md)',
        textAlign: 'center',
        backgroundImage: 'radial-gradient(circle at 100% 100%, var(--bg-accent) 0%, transparent 50%), radial-gradient(circle at 0% 0%, var(--bg-accent) 0%, transparent 50%)'
      }}
    >
      <div
        style={{
          background: 'var(--bg-secondary)',
          padding: 'var(--spacing-xl)',
          borderRadius: 'var(--border-radius-xl)',
          boxShadow: 'var(--shadow-lg)',
          maxWidth: '500px',
          width: '90%',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'var(--gradient-primary)'
          }}
        />
        <h1 
          style={{ 
            fontSize: '6rem', 
            margin: '0', 
            background: 'var(--gradient-primary)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: '800'
          }}
        >
          404
        </h1>
        <h2 style={{ 
          fontSize: '2rem', 
          marginBottom: 'var(--spacing-md)',
          color: 'var(--text-primary)',
          fontWeight: '600'
        }}>
          Recipe Not Found
        </h2>
        <p style={{ 
          marginBottom: 'var(--spacing-xl)', 
          color: 'var(--text-secondary)',
          fontSize: '1.1rem',
          lineHeight: '1.5'
        }}>
          Looks like this dish isn't on our menu! Let's get you back to exploring some delicious food reels.
        </p>
        <Link
          to="/"
          style={{
            display: 'inline-block',
            padding: 'var(--spacing-md) var(--spacing-xl)',
            background: 'var(--gradient-primary)',
            color: 'var(--text-light)',
            textDecoration: 'none',
            borderRadius: 'var(--border-radius-md)',
            fontWeight: '600',
            transition: 'all 0.3s ease',
            boxShadow: 'var(--shadow-md)'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'var(--shadow-md)';
          }}
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
