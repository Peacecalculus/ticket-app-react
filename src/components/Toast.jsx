import React, { useState, useEffect } from 'react';

const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [onClose]);
  
  return (
    <div className={`toast-notification show ${type === 'error' ? 'error' : ''}`}>
      {message}
    </div>
  );
};

export default Toast;
