import React, { useEffect, useState } from "react";
import "../styles/alert-box.css";

const icons = {
  success: (
    <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="12" fill="#2ecc40"/>
      <path d="M7 13l3 3 7-7" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  error: (
    <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="12" fill="#e74c3c"/>
      <path d="M8 8l8 8M16 8l-8 8" stroke="#fff" strokeWidth="2.2" strokeLinecap="round"/>
    </svg>
  ),
};

const AlertBox = ({ type = "success", message, onClose, duration = 3500 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!duration) return;
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  return (
    <div className={`alert-box alert-${type}`} tabIndex={0}>
      <span className="alert-icon">{icons[type]}</span>
      <span className="alert-message">{message}</span>
      <button className="alert-close" onClick={() => { setVisible(false); if (onClose) onClose(); }} aria-label="Close">&times;</button>
    </div>
  );
};

export default AlertBox;
