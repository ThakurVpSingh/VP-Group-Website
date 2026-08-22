import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      style={{
        position: 'fixed',
        bottom: '28px',
        right: '28px',
        zIndex: 9999,
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        backgroundColor: 'rgba(24, 24, 27, 0.9)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(12px)',
        transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px) scale(1.1)';
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.35)';
        e.currentTarget.style.backgroundColor = '#27272a';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
        e.currentTarget.style.backgroundColor = 'rgba(24, 24, 27, 0.9)';
      }}
    >
      <ArrowUp size={22} color="#ffffff" />
    </button>
  );
};

export default ScrollToTop;
