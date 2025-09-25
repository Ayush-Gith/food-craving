import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import AuthNotification from './components/AuthNotification';
import './App.css';
import './styles/theme.css';
import './styles/bottom-nav.css';
import './styles/action-icons.css';
import './styles/video-grid.css';
import './styles/video-player.css';
import './styles/saved.css';
import './styles/comment-section.css';

function App() {

  return (
    <Router>
      <AppRoutes />
      <AuthNotification />
    </Router>
  )
}

export default App
