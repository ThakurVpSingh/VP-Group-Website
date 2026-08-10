import React, { useState } from 'react';

const WhatsAppWidget = () => {
  const [isHovered, setIsHovered] = useState(false);
  const phoneNumber = "916388398552";
  const defaultMessage = encodeURIComponent("Hi VP Group & Technologies! I'm interested in your services. Can we connect?");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <div 
      style={{
        position: 'fixed',
        bottom: '28px',
        left: '28px',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        pointerEvents: 'auto',
      }}
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with VP Group on WhatsApp"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: '#25D366',
          boxShadow: '0 8px 24px rgba(37, 211, 102, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.2)',
          color: '#ffffff',
          textDecoration: 'none',
          transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease',
          transform: isHovered ? 'scale(1.1) translateY(-2px)' : 'scale(1)',
          position: 'relative',
          cursor: 'pointer',
        }}
      >
        {/* Pulsing Outer Ring */}
        <span 
          style={{
            position: 'absolute',
            inset: '-4px',
            borderRadius: '50%',
            border: '2px solid #25D366',
            opacity: 0.6,
            animation: 'wa-pulse 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite'
          }} 
        />

        {/* WhatsApp Official SVG */}
        <svg 
          width="30" 
          height="30" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="0" 
          style={{ fill: '#ffffff' }}
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>

        {/* Hover Tooltip Pill */}
        <span 
          style={{
            position: 'absolute',
            left: '68px',
            whiteSpace: 'nowrap',
            backgroundColor: '#0F121E',
            color: '#FFFFFF',
            fontSize: '0.75rem',
            fontWeight: 700,
            padding: '6px 14px',
            borderRadius: '20px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.5), 0 0 0 1px rgba(37, 211, 102, 0.3)',
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? 'translateX(0) scale(1)' : 'translateX(-10px) scale(0.95)',
            pointerEvents: 'none',
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            fontFamily: "'Inter', sans-serif"
          }}
        >
          Chat with VP Group (+91 6388398552)
        </span>
      </a>

      <style>{`
        @keyframes wa-pulse {
          0% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.2); opacity: 0; }
          100% { transform: scale(1); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default WhatsAppWidget;
