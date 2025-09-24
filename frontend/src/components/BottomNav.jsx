import { useNavigate, useLocation } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import { BsBookmarkFill } from 'react-icons/bs';
import { BiLogOut } from 'react-icons/bi';
import '../styles/bottom-nav.css';
import axios from '../config/axios';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNav = (route) => {
    if (route === '/logout') {
      axios.post('/api/auth/user/logout', {}, { withCredentials: true })
        .then(() => {
          navigate('/login', { replace: true });
          window.location.reload();
        })
        .catch(() => {
          navigate('/login', { replace: true });
        });
    } else {
      navigate(route);
    }
  };

  return (
    <nav className="bottom-nav">
      <button
        className={`nav-btn${location.pathname === '/' ? ' active' : ''}`}
        onClick={() => handleNav('/')}
        aria-label="Home"
        tabIndex={0}
      >
  <AiFillHome size={28} style={{ display: 'block' }} />
  <span className="nav-label">Home</span>
      </button>
      <button
        className={`nav-btn${location.pathname === '/saved' ? ' active' : ''}`}
        onClick={() => handleNav('/saved')}
        aria-label="Saved"
        tabIndex={0}
      >
  <BsBookmarkFill size={26} style={{ display: 'block' }} />
  <span className="nav-label">Saved</span>
      </button>
      <button
        className="nav-btn"
        onClick={() => handleNav('/logout')}
        aria-label="Logout"
        tabIndex={0}
      >
  <BiLogOut size={28} style={{ display: 'block' }} />
  <span className="nav-label">Logout</span>
      </button>
    </nav>
  );
};

export default BottomNav;
