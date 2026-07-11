import React from 'react';

const ACCENT_COLORS = {
  primary: '#5B6BFF',
  success: '#2BE08C',
  warning: '#F5D547',
  info:    '#3DD7E5',
  error:   '#FF3A5C',
};

/**
 * HaloCard — surface card with optional 2px accent top border
 * Props:
 *   accent     string — 'primary'|'success'|'warning'|'info'|'error'|null
 *   elevated   bool   — uses elevated surface + stronger shadow
 *   padding    string — CSS padding override
 *   onClick    fn
 *   className  string
 *   style      object
 *   children
 *   hoverable  bool   — adds lift on hover
 */
export default function HaloCard({
  accent,
  elevated = false,
  padding = '24px',
  children,
  onClick,
  hoverable = false,
  style = {},
}) {
  const accentColor = accent ? (ACCENT_COLORS[accent] || ACCENT_COLORS.primary) : null;

  const base = {
    position: 'relative',
    background: elevated ? '#1E2029' : '#14151C',
    border: `1px solid ${elevated ? '#3A3D4A' : '#2A2D38'}`,
    borderRadius: '16px',
    padding,
    overflow: 'hidden',
    transition: 'border-color 240ms cubic-bezier(0.2,0.6,0.2,1), transform 240ms cubic-bezier(0.2,0.6,0.2,1), box-shadow 240ms cubic-bezier(0.2,0.6,0.2,1)',
    boxShadow: elevated ? '0 8px 24px rgba(0,0,0,0.45), 0 1px 0 rgba(255,255,255,0.03) inset' : 'none',
    cursor: onClick ? 'pointer' : 'default',
    ...style,
  };

  const handleMouseEnter = (e) => {
    if (hoverable || onClick) {
      e.currentTarget.style.borderColor = '#3A3D4A';
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.5)';
    }
  };
  const handleMouseLeave = (e) => {
    if (hoverable || onClick) {
      e.currentTarget.style.borderColor = elevated ? '#3A3D4A' : '#2A2D38';
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = elevated ? '0 8px 24px rgba(0,0,0,0.45), 0 1px 0 rgba(255,255,255,0.03) inset' : 'none';
    }
  };

  return (
    <div style={base} onClick={onClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {/* 2px signal accent top hairline */}
      {accentColor && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: accentColor, borderRadius: '16px 16px 0 0' }} />
      )}
      {children}
    </div>
  );
}
